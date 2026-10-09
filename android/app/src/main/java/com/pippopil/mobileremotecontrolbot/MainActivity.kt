package com.pippopil.mobileremotecontrolbot

import android.annotation.SuppressLint
import android.graphics.Color
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.ViewGroup
import android.view.WindowManager
import android.webkit.ConsoleMessage
import android.webkit.RenderProcessGoneDetail
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import android.widget.TextView
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.WindowCompat
import androidx.webkit.ServiceWorkerClientCompat
import androidx.webkit.ServiceWorkerControllerCompat
import androidx.webkit.WebViewFeature
import java.io.InputStream

class MainActivity : AppCompatActivity() {

    companion object {
        private const val TAG = "BotHubMainActivity"
        private const val ASSET_DOMAIN = "appassets.androidplatform.net"
        private const val ENTRY_URL = "https://appassets.androidplatform.net/index.html"
        private const val BG_COLOR = "#0F172A"
    }

    private var webView: WebView? = null
    private var isRecoveringRenderProcess = false

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Safety handler: Prevents silent process crash to home screen on uncaught errors
        Thread.setDefaultUncaughtExceptionHandler { thread, throwable ->
            Log.e(TAG, "Uncaught exception on thread ${thread.name}: ${throwable.message}", throwable)
        }

        try {
            setupWindowAppearance()
            setupServiceWorkerIntercept()
            setupWebView()
        } catch (e: Throwable) {
            Log.e(TAG, "Fatal exception during MainActivity.onCreate", e)
            showFatalErrorView("Не удалось запустить экран приложения:\n${e.localizedMessage ?: e.javaClass.simpleName}")
        }

        // Handle hardware and gesture back navigation
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                val currentWebView = webView
                if (currentWebView != null && currentWebView.canGoBack()) {
                    currentWebView.goBack()
                } else {
                    isEnabled = false
                    onBackPressedDispatcher.onBackPressed()
                }
            }
        })
    }

    private fun setupWindowAppearance() {
        val darkBgColor = Color.parseColor(BG_COLOR)
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)
        window.statusBarColor = darkBgColor
        window.navigationBarColor = darkBgColor

        try {
            val insetsController = WindowCompat.getInsetsController(window, window.decorView)
            insetsController.isAppearanceLightStatusBars = false
            insetsController.isAppearanceLightNavigationBars = false
        } catch (e: Exception) {
            Log.w(TAG, "Could not set insetsController appearance", e)
        }
    }

    private fun setupServiceWorkerIntercept() {
        try {
            if (WebViewFeature.isFeatureSupported(WebViewFeature.SERVICE_WORKER_BASIC_USAGE)) {
                ServiceWorkerControllerCompat.getInstance().setServiceWorkerClient(object : ServiceWorkerClientCompat() {
                    override fun shouldInterceptRequest(request: WebResourceRequest): WebResourceResponse? {
                        return handleAssetRequest(request.url)
                    }
                })
            }
        } catch (e: Exception) {
            Log.w(TAG, "ServiceWorkerControllerCompat setup skipped: ${e.message}")
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun setupWebView() {
        val darkBgColor = Color.parseColor(BG_COLOR)

        val newWebView = try {
            WebView(this)
        } catch (e: Throwable) {
            Log.e(TAG, "Failed to instantiate WebView", e)
            showFatalErrorView("Компонент Android System WebView недоступен или обновляется в системе:\n${e.message}")
            return
        }

        this.webView = newWebView
        setContentView(newWebView)

        newWebView.setBackgroundColor(darkBgColor)

        newWebView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            allowFileAccess = true
            allowContentAccess = true
            useWideViewPort = true
            loadWithOverviewMode = true
            cacheMode = WebSettings.LOAD_DEFAULT
            mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
            mediaPlaybackRequiresUserGesture = false
            setSupportMultipleWindows(false)
            javaScriptCanOpenWindowsAutomatically = false

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                safeBrowsingEnabled = false
            }
        }

        newWebView.webViewClient = object : WebViewClient() {
            override fun shouldInterceptRequest(
                view: WebView,
                request: WebResourceRequest
            ): WebResourceResponse? {
                return handleAssetRequest(request.url)
            }

            @Deprecated("Deprecated in Java")
            override fun shouldInterceptRequest(
                view: WebView,
                url: String
            ): WebResourceResponse? {
                return handleAssetRequest(Uri.parse(url))
            }

            override fun onRenderProcessGone(
                view: WebView?,
                detail: RenderProcessGoneDetail?
            ): Boolean {
                val didCrash = detail?.didCrash() ?: false
                Log.e(TAG, "WebView render process gone! didCrash=$didCrash. Recovering gracefully...")

                if (isRecoveringRenderProcess) {
                    return true
                }
                isRecoveringRenderProcess = true

                // Detach and clean up crashed WebView
                val parent = view?.parent as? ViewGroup
                parent?.removeView(view)
                try {
                    view?.destroy()
                } catch (ignored: Exception) {}
                this@MainActivity.webView = null

                // Recreate WebView on UI thread
                runOnUiThread {
                    try {
                        setupWebView()
                    } catch (e: Exception) {
                        Log.e(TAG, "Error recovering WebView after render process gone", e)
                        showFatalErrorView("Сбой графического движка WebView. Пожалуйста, перезапустите приложение.")
                    } finally {
                        isRecoveringRenderProcess = false
                    }
                }
                // Returning true prevents the OS from killing the app process!
                return true
            }

            override fun onReceivedError(
                view: WebView,
                request: WebResourceRequest,
                error: WebResourceError
            ) {
                super.onReceivedError(view, request, error)
                if (request.isForMainFrame) {
                    Log.e(TAG, "Main frame error: ${error.description} code: ${error.errorCode}")
                }
            }
        }

        newWebView.webChromeClient = object : WebChromeClient() {
            override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
                if (consoleMessage != null) {
                    Log.d("BotHubWebConsole", "[${consoleMessage.messageLevel()}] ${consoleMessage.message()} (at ${consoleMessage.sourceId()}:${consoleMessage.lineNumber()})")
                }
                return super.onConsoleMessage(consoleMessage)
            }
        }

        // Load entry point
        newWebView.loadUrl(ENTRY_URL)
    }

    private fun handleAssetRequest(uri: Uri): WebResourceResponse? {
        val host = uri.host ?: return null
        if (host != ASSET_DOMAIN) {
            return null
        }

        var path = uri.path ?: "/index.html"
        if (path.isEmpty() || path == "/") {
            path = "/index.html"
        }

        val cleanPath = path.removePrefix("/")

        // Build list of possible file paths inside android assets directory
        val candidates = mutableListOf<String>()
        candidates.add(cleanPath)
        candidates.add("public/$cleanPath")

        if (cleanPath.startsWith("assets/")) {
            candidates.add(cleanPath.removePrefix("assets/"))
            candidates.add("public/" + cleanPath.removePrefix("assets/"))
        }

        if (cleanPath.startsWith("public/")) {
            candidates.add(cleanPath.removePrefix("public/"))
        }

        for (candidate in candidates) {
            try {
                val inputStream: InputStream = assets.open(candidate)
                val mimeType = getMimeType(candidate)
                val headers = HashMap<String, String>().apply {
                    put("Access-Control-Allow-Origin", "*")
                    put("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS")
                    put("Cache-Control", "no-cache")
                }
                return WebResourceResponse(
                    mimeType,
                    "UTF-8",
                    200,
                    "OK",
                    headers,
                    inputStream
                )
            } catch (_: Exception) {
                // Asset not found at this candidate path, continue to next
            }
        }

        // SPA Navigation Fallback: for HTML requests without file extension or .html
        if (!cleanPath.contains(".") || cleanPath.endsWith(".html")) {
            val htmlCandidates = listOf("index.html", "public/index.html")
            for (htmlCandidate in htmlCandidates) {
                try {
                    val fallbackStream = assets.open(htmlCandidate)
                    val headers = HashMap<String, String>().apply {
                        put("Access-Control-Allow-Origin", "*")
                    }
                    return WebResourceResponse(
                        "text/html",
                        "UTF-8",
                        200,
                        "OK",
                        headers,
                        fallbackStream
                    )
                } catch (_: Exception) {}
            }
        }

        Log.w(TAG, "Local asset not found: $path (clean: $cleanPath)")
        return null
    }

    private fun getMimeType(filePath: String): String {
        val lower = filePath.lowercase()
        return when {
            lower.endsWith(".html") || lower.endsWith(".htm") -> "text/html"
            lower.endsWith(".js") || lower.endsWith(".mjs") -> "application/javascript"
            lower.endsWith(".css") -> "text/css"
            lower.endsWith(".json") -> "application/json"
            lower.endsWith(".webmanifest") -> "application/manifest+json"
            lower.endsWith(".svg") -> "image/svg+xml"
            lower.endsWith(".png") -> "image/png"
            lower.endsWith(".jpg") || lower.endsWith(".jpeg") -> "image/jpeg"
            lower.endsWith(".gif") -> "image/gif"
            lower.endsWith(".ico") -> "image/x-icon"
            lower.endsWith(".webp") -> "image/webp"
            lower.endsWith(".woff2") -> "font/woff2"
            lower.endsWith(".woff") -> "font/woff"
            lower.endsWith(".ttf") -> "font/ttf"
            lower.endsWith(".otf") -> "font/otf"
            lower.endsWith(".txt") -> "text/plain"
            else -> "application/octet-stream"
        }
    }

    private fun showFatalErrorView(message: String) {
        val container = FrameLayout(this).apply {
            setBackgroundColor(Color.parseColor(BG_COLOR))
            setPadding(48, 120, 48, 48)
        }

        val textView = TextView(this).apply {
            text = "📱 BotHub Pro\n\n$message\n\nПожалуйста, убедитесь, что приложение обновлено и Android System WebView включен на вашем устройстве."
            setTextColor(Color.WHITE)
            textSize = 15f
            setLineSpacing(8f, 1.25f)
        }

        container.addView(textView)
        setContentView(container)
    }

    override fun onResume() {
        super.onResume()
        webView?.onResume()
    }

    override fun onPause() {
        super.onPause()
        webView?.onPause()
    }

    override fun onDestroy() {
        webView?.destroy()
        webView = null
        super.onDestroy()
    }
}
