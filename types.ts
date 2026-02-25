
export type SubscriptionTier = 'FREE' | 'PRO_EXECUTIVE' | 'TITAN_ELITE';
export type UserIntent = 'Personal_Curiosity' | 'Company_Employee' | 'Workshop_Owner' | 'Fleet_Manager';
export type Language = 'es' | 'en' | 'de' | 'zh' | 'fr' | 'ja';
export type Platform = 'autosocio' | 'connectx' | 'ecosystem';

/**
 * ECONOMIC OS TYPES (Capa 1 & 2)
 */
export interface NicheField {
  name: string;
  label: string;
  type: 'string' | 'number' | 'boolean' | 'geo' | 'date' | 'select';
  required: boolean;
  searchable: boolean;
  options?: string[]; // For select type
}

export interface NicheSchema {
  niche_id: string;
  fields: NicheField[];
}

export interface Niche {
  id: string;
  name: string;
  description: string;
  active: boolean;
  icon: string;
  color: string;
  createdAt: string;
}

export interface NicheEntity {
  id: string;
  niche_id: string;
  data: Record<string, any>;
  timestamp: string;
}

export interface EconomicLayer {
  level: number;
  name: string;
  description: string;
  status: 'ACTIVE' | 'INITIALIZING' | 'STANDBY';
}

export type AuditScenario = 'EDUCATION' | 'MONETIZATION' | 'CREATOR_API';

export type FunnelPhase = 'ATTRACTION' | 'DIAGNOSTIC' | 'STRATEGY' | 'CLOSING';

export type View = 'home' | 'academy' | 'consulting' | 'marketplace' | 'fleet' | 'dashboard' | 'admin' | 'mystery_shop' | 'foundations' | 'optimization' | 'wisdom_vault' | 'vision_analysis' | 'cx_protocol' | 'cx_dashboard';

export interface FoundationalLevel {
  level: number;
  name: string;
  subtitle: string;
  description: string;
  status: 'LOCKED' | 'ACTIVE' | 'COMPLETED';
  metrics: {
    label: string;
    value: string;
  }[];
  checkpoints: string[];
}

export interface MysteryShopFinding {
  id: string;
  category: 'UX' | 'TECHNICAL' | 'ECONOMIC' | 'INCONSISTENCY';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  location: string; // Component or View name
  suggestedFix: string;
  status: 'OPEN' | 'FIXED' | 'IGNORED';
  timestamp: string;
}

export interface MysteryShopReport {
  overallScore: number; // 0-100
  summary: string;
  findings: MysteryShopFinding[];
  lastAudit: string;
}

export interface PsychMetrics {
  confidence: number; 
  pressure: number;   
  dominance: number;  
  manipulationRisk: 'low' | 'medium' | 'high';
  activeModules: string[];
}

export interface AgentResponse {
  text: string;
  metrics: PsychMetrics;
  phase: FunnelPhase;
  visualPrompt?: string;
  visualImageUrl?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  residence: string;
  intent: UserIntent;
  tier: SubscriptionTier;
  avatar: string;
  joinedDate: string;
  trialExpiresAt: string; 
  isTrialActive: boolean;
  language: Language;
  stats: {
    errorsAvoided: number;
    sessionsCompleted: number;
    roiGenerated: number;
  };
}

export interface DiagnosticGuide {
  title: string;
  locationDescription: string;
  locationImageUrl?: string;
  failureAnalysis: string;
  symptoms: string[]; 
  diagnosticSteps: string[];
  toolsRequired: string[];
  recommendedPartKeywords: string[];
  scenario?: AuditScenario;
  nutriTaquita?: {
    calories: string;
    technicalFiber: string;
    purity: string;
    roiVitamin: string;
  };
}

export interface Agent {
  id: number;
  name: string;
  title: string;
  description: string;
  indication: string;
  prompt: string;
  avatar: string;
  expertise: string[];
  testimonial?: {
    text: string;
    author: string;
  };
  communitySize: number;
  reputation: {
    rating: number; 
    reviewCount: number;
    successRate: number; 
    status: string;
  };
}

export interface Part {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  affiliateUrl: string;
  loyaltyCommissionRate: number;
  salesCommissionRate: number;
  keywords: string[];
  compatibility: string[];
  price: number;
  stock: number;
  platform?: string; 
}

/**
 * Added missing type for User Intent Processing
 */
export interface IntentObject {
  intent_id: string;
  user_id: string;
  timestamp: string;
  raw_input: string;
  problem_type: string;
  sector: 'AUTOMOTIVE' | 'COMMERCE' | 'INDUSTRIAL' | 'EXPLORATION';
  technical_need: string;
  urgency_level: number;
  economic_value: number;
  decision_probability: number;
  complexity_level: number;
  recommended_vertical: 'autosocio' | 'connectx' | 'ecosystem';
  niche_id?: string;
  extracted_data?: Record<string, any>;
  strategy?: {
    title: string;
    steps: string[];
    roi_impact: string;
  };
  technical_audit?: {
    integrity_check: string;
    data_density: number;
    validation_status: string;
  };
  confidence_score: number;
}

/**
 * Added missing type for Academy Courses
 */
export interface AcademyCourse {
  id: number;
  title: string;
  category: string;
  image: string;
  duration: string;
  level: string;
  rating: number;
  enrolled: number;
  agentId: number;
  roiEstimate: string;
  isHighTicket: boolean;
}

/**
 * Added missing type for Enriched Marketplace Recommendations
 */
export interface EnrichedPartRecommendation {
  part: Part;
  partId: string;
  recommendation: string;
  viabilityScore: number;
  isMostRecommended: boolean;
}

/**
 * Added missing type for Admin Audit Results
 */
export interface AuditResult {
  score: number;
  findings: {
    type: string;
    severity: string;
    description: string;
    fixAction: string;
  }[];
  summary: string;
  commercialViability: string;
}
