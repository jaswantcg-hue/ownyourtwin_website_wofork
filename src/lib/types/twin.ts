/**
 * Digital Twin related type definitions
 * Contains all types for the AI-powered digital twin representation
 */

// Digital twin main interface
export interface DigitalTwin {
  id: string;
  userId: string;
  name: string;
  avatar3DUrl?: string;
  createdAt: Date;
  lastUpdated: Date;
  completionScore: number; // 0-100 percentage of twin completeness
  status: TwinStatus;
  traits: PersonalityTraits;
  insights: BehavioralInsights;
  preferences: TwinPreferences;
}

// Twin creation and processing status
export type TwinStatus =
  | 'initializing'
  | 'processing'
  | 'learning'
  | 'ready'
  | 'updating'
  | 'error';

// Personality traits extracted from data
export interface PersonalityTraits {
  // Big Five personality dimensions (0-100 scale)
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
  // Additional traits
  creativity: number;
  analyticalThinking: number;
  empathy: number;
  riskTolerance: number;
  optimism: number;
}

// Behavioral insights derived from user data
export interface BehavioralInsights {
  writingStyle: WritingStyleAnalysis;
  emotionalPatterns: EmotionalPattern[];
  topicInterests: TopicInterest[];
  decisionPatterns: DecisionPattern[];
  valueSystem: ValueScore[];
  communicationStyle: CommunicationStyle;
}

// Writing style analysis
export interface WritingStyleAnalysis {
  formality: number; // 0-100 (informal to formal)
  complexity: number; // 0-100 (simple to complex)
  emotionality: number; // 0-100 (neutral to emotional)
  assertiveness: number; // 0-100 (tentative to assertive)
  wordFrequency: WordFrequencyItem[];
  averageSentenceLength: number;
  vocabularyRichness: number;
}

export interface WordFrequencyItem {
  word: string;
  count: number;
  category: 'emotion' | 'topic' | 'filler' | 'action' | 'descriptor';
}

// Emotional patterns over time
export interface EmotionalPattern {
  date: Date;
  emotions: EmotionScore[];
  dominantEmotion: string;
  overallSentiment: number; // -1 to 1
}

export interface EmotionScore {
  emotion: string;
  score: number; // 0-1
  confidence: number; // 0-1
}

// Topic interests and engagement
export interface TopicInterest {
  topic: string;
  category: string;
  engagementScore: number; // 0-100
  frequency: number;
  sentiment: number; // -1 to 1
  lastMentioned: Date;
}

// Decision-making patterns
export interface DecisionPattern {
  category: string;
  style: 'analytical' | 'intuitive' | 'deliberate' | 'spontaneous';
  riskLevel: 'conservative' | 'moderate' | 'aggressive';
  influencingFactors: string[];
}

// Personal values scoring
export interface ValueScore {
  value: string;
  importance: number; // 0-100
  consistency: number; // 0-100 (how consistently this value appears)
}

// Communication style analysis
export interface CommunicationStyle {
  directness: number; // 0-100
  empathy: number; // 0-100
  humor: number; // 0-100
  formality: number; // 0-100
  preferredChannels: string[];
}

// Twin preferences for external usage
export interface TwinPreferences {
  isPublic: boolean;
  allowMarketResearch: boolean;
  allowSurveys: boolean;
  minimumCompensation: number; // Minimum credits for participation
  excludedCategories: string[]; // Categories to exclude from research
}

// Twin activity log entry
export interface TwinActivity {
  id: string;
  type: TwinActivityType;
  title: string;
  description: string;
  timestamp: Date;
  compensation?: number;
  company?: string;
  category?: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export type TwinActivityType =
  | 'market_research'
  | 'survey'
  | 'simulation'
  | 'feedback_session'
  | 'peer_match'
  | 'insight_generation';

// Twin earnings summary
export interface TwinEarnings {
  totalEarned: number;
  availableBalance: number;
  pendingBalance: number;
  lifetimeParticipations: number;
  monthlyEarnings: MonthlyEarning[];
}

export interface MonthlyEarning {
  month: string;
  year: number;
  amount: number;
  participations: number;
}

// Twin creation progress
export interface TwinCreationProgress {
  currentStep: number;
  totalSteps: number;
  stepName: string;
  progress: number; // 0-100
  message: string;
  startedAt: Date;
  estimatedCompletion?: Date;
}
