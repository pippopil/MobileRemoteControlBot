import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// 1. Original standard icon SVG (for icon.svg, pwa-192, pwa-512, apple-touch-icon, favicon)
const standardSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050814" />
      <stop offset="40%" stop-color="#0b1329" />
      <stop offset="100%" stop-color="#151b3b" />
    </linearGradient>

    <!-- Border Ring Gradient -->
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="45%" stop-color="#6366f1" />
      <stop offset="100%" stop-color="#a855f7" />
    </linearGradient>

    <!-- Robot Chassis Gradient -->
    <linearGradient id="chassisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>

    <!-- Neon Accent Gradient -->
    <linearGradient id="cyanNeon" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00f2fe" />
      <stop offset="100%" stop-color="#4facfe" />
    </linearGradient>

    <linearGradient id="pulseNeon" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#818cf8" />
      <stop offset="100%" stop-color="#c084fc" />
    </linearGradient>

    <!-- Glow Filter -->
    <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="7" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background Base with rounded squircle -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)" />

  <!-- Outer Neon Border Ring -->
  <rect x="12" y="12" width="488" height="488" rx="100" fill="none" stroke="url(#borderGrad)" stroke-width="4" opacity="0.6" />

  <!-- Tech Grid Background Pattern -->
  <g opacity="0.08" stroke="#38bdf8" stroke-width="1.5">
    <line x1="64" y1="0" x2="64" y2="512" />
    <line x1="128" y1="0" x2="128" y2="512" />
    <line x1="384" y1="0" x2="384" y2="512" />
    <line x1="448" y1="0" x2="448" y2="512" />
    <line x1="0" y1="128" x2="512" y2="128" />
    <line x1="0" y1="384" x2="512" y2="384" />
  </g>

  <!-- Remote Transmission Waves (Antenna Broadcast) -->
  <g filter="url(#softGlow)" stroke-linecap="round">
    <!-- Outer wave arc -->
    <path d="M 180 82 A 90 90 0 0 1 332 82" fill="none" stroke="url(#cyanNeon)" stroke-width="5" opacity="0.4" />
    <!-- Middle wave arc -->
    <path d="M 204 104 A 62 62 0 0 1 308 104" fill="none" stroke="url(#cyanNeon)" stroke-width="6" opacity="0.75" />
    <!-- Inner wave arc -->
    <path d="M 228 126 A 34 34 0 0 1 284 126" fill="none" stroke="#38bdf8" stroke-width="6" />
    
    <!-- Transmitter Antenna Stem -->
    <line x1="256" y1="134" x2="256" y2="174" stroke="url(#cyanNeon)" stroke-width="8" />
    <!-- Pulsing Transmitter Node -->
    <circle cx="256" cy="132" r="10" fill="#38bdf8" filter="url(#neonGlow)" />
    <circle cx="256" cy="132" r="4" fill="#ffffff" />
  </g>

  <!-- Network Circuit Lines / Multi-Bot Nodes (Telegram, MAX, WhatsApp, VK) -->
  <g stroke="url(#pulseNeon)" stroke-width="3" opacity="0.7" stroke-linecap="round">
    <path d="M 174 195 L 126 195 L 102 225" fill="none" />
    <circle cx="102" cy="225" r="5" fill="#38bdf8" />
    <path d="M 338 195 L 386 195 L 410 225" fill="none" />
    <circle cx="410" cy="225" r="5" fill="#818cf8" />
    <path d="M 145 370 L 115 395 L 90 395" fill="none" />
    <circle cx="90" cy="395" r="5" fill="#38bdf8" />
    <path d="M 367 370 L 397 395 L 422 395" fill="none" />
    <circle cx="422" cy="395" r="5" fill="#c084fc" />
  </g>

  <!-- Outer Cyber Hexagonal Frame / Bot Body -->
  <polygon points="256,160 380,210 380,360 256,430 132,360 132,210" 
           fill="url(#chassisGrad)" 
           stroke="url(#borderGrad)" 
           stroke-width="5" />

  <!-- Robot Head / Command Module Inner Visor -->
  <rect x="156" y="215" width="200" height="135" rx="36" fill="#040714" stroke="#1e293b" stroke-width="4" />

  <!-- Visor High-Tech Corner Accents -->
  <path d="M 170 240 L 170 230 L 180 230" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" />
  <path d="M 342 240 L 342 230 L 332 230" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" />
  <path d="M 170 325 L 170 335 L 180 335" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" />
  <path d="M 342 325 L 342 335 L 332 335" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" />

  <!-- Glowing Robot AI Eyes (HUD Interface) -->
  <g filter="url(#neonGlow)">
    <rect x="188" y="250" width="42" height="32" rx="10" fill="#00f2fe" opacity="0.9" />
    <rect x="194" y="256" width="30" height="20" rx="6" fill="#ffffff" />
  </g>
  <g filter="url(#neonGlow)">
    <rect x="282" y="250" width="42" height="32" rx="10" fill="#00f2fe" opacity="0.9" />
    <rect x="288" y="256" width="30" height="20" rx="6" fill="#ffffff" />
  </g>

  <!-- Central Dynamic Waveform / Remote Signal Audio Bar -->
  <g fill="url(#cyanNeon)" opacity="0.95">
    <rect x="210" y="306" width="6" height="14" rx="3" />
    <rect x="222" y="300" width="6" height="26" rx="3" />
    <rect x="234" y="304" width="6" height="18" rx="3" />
    <rect x="246" y="295" width="6" height="36" rx="3" fill="#ffffff" filter="url(#softGlow)" />
    <rect x="258" y="297" width="6" height="32" rx="3" fill="#ffffff" filter="url(#softGlow)" />
    <rect x="270" y="304" width="6" height="18" rx="3" />
    <rect x="282" y="300" width="6" height="26" rx="3" />
    <rect x="294" y="306" width="6" height="14" rx="3" />
  </g>

  <!-- Central Core Emblem / Remote Control Signal Power Diamond (Bottom) -->
  <g filter="url(#neonGlow)">
    <polygon points="256,368 276,388 256,408 236,388" fill="url(#borderGrad)" />
    <polygon points="256,376 268,388 256,400 244,388" fill="#ffffff" />
  </g>

  <!-- Specular Lens Flare / Glass Reflection -->
  <path d="M 160 216 Q 256 226 352 216 L 340 236 Q 256 244 172 236 Z" fill="#ffffff" opacity="0.12" />
</svg>`;

// 2. Maskable icon SVG (with safe zone margin ~15%)
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGradM" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050814" />
      <stop offset="40%" stop-color="#0b1329" />
      <stop offset="100%" stop-color="#151b3b" />
    </linearGradient>

    <linearGradient id="borderGradM" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="45%" stop-color="#6366f1" />
      <stop offset="100%" stop-color="#a855f7" />
    </linearGradient>

    <linearGradient id="chassisGradM" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>

    <linearGradient id="cyanNeonM" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00f2fe" />
      <stop offset="100%" stop-color="#4facfe" />
    </linearGradient>

    <filter id="neonGlowM" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <filter id="softGlowM" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <rect width="512" height="512" fill="url(#bgGradM)" />

  <g transform="translate(46, 46) scale(0.82)">
    <g opacity="0.08" stroke="#38bdf8" stroke-width="1.5">
      <line x1="64" y1="0" x2="64" y2="512" />
      <line x1="128" y1="0" x2="128" y2="512" />
      <line x1="384" y1="0" x2="384" y2="512" />
      <line x1="448" y1="0" x2="448" y2="512" />
      <line x1="0" y1="128" x2="512" y2="128" />
      <line x1="0" y1="384" x2="512" y2="384" />
    </g>

    <g filter="url(#softGlowM)" stroke-linecap="round">
      <path d="M 180 82 A 90 90 0 0 1 332 82" fill="none" stroke="url(#cyanNeonM)" stroke-width="5" opacity="0.4" />
      <path d="M 204 104 A 62 62 0 0 1 308 104" fill="none" stroke="url(#cyanNeonM)" stroke-width="6" opacity="0.75" />
      <path d="M 228 126 A 34 34 0 0 1 284 126" fill="none" stroke="#38bdf8" stroke-width="6" />
      <line x1="256" y1="134" x2="256" y2="174" stroke="url(#cyanNeonM)" stroke-width="8" />
      <circle cx="256" cy="132" r="10" fill="#38bdf8" filter="url(#neonGlowM)" />
      <circle cx="256" cy="132" r="4" fill="#ffffff" />
    </g>

    <g stroke="url(#borderGradM)" stroke-width="3" opacity="0.7" stroke-linecap="round">
      <path d="M 174 195 L 126 195 L 102 225" fill="none" />
      <circle cx="102" cy="225" r="5" fill="#38bdf8" />
      <path d="M 338 195 L 386 195 L 410 225" fill="none" />
      <circle cx="410" cy="225" r="5" fill="#818cf8" />
      <path d="M 145 370 L 115 395 L 90 395" fill="none" />
      <circle cx="90" cy="395" r="5" fill="#38bdf8" />
      <path d="M 367 370 L 397 395 L 422 395" fill="none" />
      <circle cx="422" cy="395" r="5" fill="#c084fc" />
    </g>

    <polygon points="256,160 380,210 380,360 256,430 132,360 132,210" 
             fill="url(#chassisGradM)" 
             stroke="url(#borderGradM)" 
             stroke-width="5" />

    <rect x="156" y="215" width="200" height="135" rx="36" fill="#040714" stroke="#1e293b" stroke-width="4" />

    <path d="M 170 240 L 170 230 L 180 230" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" />
    <path d="M 342 240 L 342 230 L 332 230" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" />
    <path d="M 170 325 L 170 335 L 180 335" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" />
    <path d="M 342 325 L 342 335 L 332 335" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" />

    <g filter="url(#neonGlowM)">
      <rect x="188" y="250" width="42" height="32" rx="10" fill="#00f2fe" opacity="0.9" />
      <rect x="194" y="256" width="30" height="20" rx="6" fill="#ffffff" />
    </g>
    <g filter="url(#neonGlowM)">
      <rect x="282" y="250" width="42" height="32" rx="10" fill="#00f2fe" opacity="0.9" />
      <rect x="288" y="256" width="30" height="20" rx="6" fill="#ffffff" />
    </g>

    <g fill="url(#cyanNeonM)" opacity="0.95">
      <rect x="210" y="306" width="6" height="14" rx="3" />
      <rect x="222" y="300" width="6" height="26" rx="3" />
      <rect x="234" y="304" width="6" height="18" rx="3" />
      <rect x="246" y="295" width="6" height="36" rx="3" fill="#ffffff" filter="url(#softGlowM)" />
      <rect x="258" y="297" width="6" height="32" rx="3" fill="#ffffff" filter="url(#softGlowM)" />
      <rect x="270" y="304" width="6" height="18" rx="3" />
      <rect x="282" y="300" width="6" height="26" rx="3" />
      <rect x="294" y="306" width="6" height="14" rx="3" />
    </g>

    <g filter="url(#neonGlowM)">
      <polygon points="256,368 276,388 256,408 236,388" fill="url(#borderGradM)" />
      <polygon points="256,376 268,388 256,400 244,388" fill="#ffffff" />
    </g>
  </g>
</svg>`;

async function main() {
  // Write the SVG files
  fs.writeFileSync(path.resolve('public/icon.svg'), standardSvg);
  console.log('Saved public/icon.svg');

  const standardBuffer = Buffer.from(standardSvg);
  const maskableBuffer = Buffer.from(maskableSvg);

  // Render PNGs using sharp
  await sharp(standardBuffer).resize(512, 512).png().toFile('public/pwa-512x512.png');
  console.log('Generated public/pwa-512x512.png');

  await sharp(standardBuffer).resize(192, 192).png().toFile('public/pwa-192x192.png');
  console.log('Generated public/pwa-192x192.png');

  await sharp(standardBuffer).resize(180, 180).png().toFile('public/apple-touch-icon.png');
  console.log('Generated public/apple-touch-icon.png');

  await sharp(maskableBuffer).resize(512, 512).png().toFile('public/pwa-maskable-512x512.png');
  console.log('Generated public/pwa-maskable-512x512.png');

  // Favicon (48x48 png saved as favicon.ico or favicon.png)
  await sharp(standardBuffer).resize(48, 48).png().toFile('public/favicon.ico');
  console.log('Generated public/favicon.ico');

  // Generate Android mipmap icons
  const androidMipmaps = [
    { size: 48, folder: 'android/app/src/main/res/mipmap-mdpi' },
    { size: 72, folder: 'android/app/src/main/res/mipmap-hdpi' },
    { size: 96, folder: 'android/app/src/main/res/mipmap-xhdpi' },
    { size: 144, folder: 'android/app/src/main/res/mipmap-xxhdpi' },
    { size: 192, folder: 'android/app/src/main/res/mipmap-xxxhdpi' },
  ];

  for (const m of androidMipmaps) {
    fs.mkdirSync(path.resolve(m.folder), { recursive: true });
    await sharp(standardBuffer).resize(m.size, m.size).png().toFile(`${m.folder}/ic_launcher.png`);
    await sharp(maskableBuffer).resize(m.size, m.size).png().toFile(`${m.folder}/ic_launcher_round.png`);
    console.log(`Generated Android icons for ${m.folder} (${m.size}px)`);
  }

  console.log('All icons successfully created with sharp!');
}

main().catch((err) => {
  console.error('Fatal error generating icons:', err);
  process.exit(1);
});

