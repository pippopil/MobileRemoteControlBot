export type BotChannel = 'telegram' | 'whatsapp' | 'max' | 'vk' | 'web';
export type BotStatus = 'active' | 'paused' | 'setup' | 'warning';
export type BotPlan = 'starter' | 'pro' | 'enterprise';

export interface BotServiceItem {
  id?: string;
  name: string;
  price: number;
  duration?: string;
}

export interface BotFaqItem {
  q: string;
  a: string;
}

export interface ClientBot {
  id: string;
  orgName: string;
  niche: string;
  phone: string;
  contactPerson: string;
  channels: BotChannel[];
  status: BotStatus;
  plan: BotPlan;
  monthlyFee: number;
  setupFeePaid: number;
  dialogsTotal: number;
  dialogsToday: number;
  leadsCaptured: number;
  conversionRate: number;
  avgResponseTimeSec: number;
  hoursSavedEst: number;
  systemPrompt: string;
  greetingMessage: string;
  botUsername?: string;
  tokenConfigured: boolean;
  webhookUrl?: string;
  services: BotServiceItem[];
  faq: BotFaqItem[];
  nextBillingDate: string;
  createdAt: string;
  lastActive: string;
}

export interface AgencyAssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
}
