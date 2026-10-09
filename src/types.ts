export interface Blueprint {
  id: string;
  title: string;
  tagline: string;
  category: 'b2b-bot' | 'marketplace' | 'fintech-ops' | 'local-services' | 'lead-gen';
  categoryLabel: string;
  budgetMin: number;
  budgetMax: number;
  timeToFirstDollarDays: number;
  expectedMonthlyPotential: string;
  upfrontSetupFee: string;
  monthlyRetainer: string;
  difficulty: 'Легко (No-code / готовый код)' | 'Средне (Базовый JS/Python)' | 'Продвинутый';
  corePain: string;
  mechanism: string;
  techStack: string[];
  targetClients: string[];
  pricingTiers: {
    tier: string;
    price: string;
    description: string;
  }[];
  whyItPaysFast: string;
  dayByDayPlan: {
    day: string;
    task: string;
    deliverable: string;
  }[];
  salesPitch: string;
}

export interface ValidationResult {
  viabilityScore: number;
  verdict: string;
  timeToFirstDollarDays: number;
  recommendedModel: string;
  targetAudiencePains: string[];
  monetizationBlueprint: {
    pricingTiers: {
      name: string;
      price: string;
      features: string;
    }[];
    first10ClientsMethod: string;
    salesPitchColdScript: string;
  };
  fastMvpStack: string[];
  keyRisksAndMitigation: {
    risk: string;
    solution: string;
  }[];
  actionPlan7Days: {
    day: string;
    title: string;
    actions: string;
  }[];
}

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
