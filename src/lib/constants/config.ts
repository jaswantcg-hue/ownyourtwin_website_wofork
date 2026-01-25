/**
 * Application configuration constants
 * Contains all static configuration values used throughout the app
 */

// Application metadata
export const APP_CONFIG = {
  name: 'AuraAI',
  tagline: 'Understand Your Mind via Digital Twin',
  description: 'A personal space for reflection and feedback through your AI-powered digital twin',
  version: '1.0.0',
  supportEmail: 'support@auraai.com',
} as const;

// Social platforms available for connection
export const SOCIAL_PLATFORMS = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'linkedin',
    description: 'Professional profile and career insights',
    dataTypes: ['professional_experience', 'skills', 'connections'],
    color: '#0A66C2',
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: 'github',
    description: 'Coding patterns and project interests',
    dataTypes: ['repositories', 'contributions', 'interests'],
    color: '#181717',
  },
  {
    id: 'notion',
    name: 'Notion',
    icon: 'file-text',
    description: 'Notes, thoughts, and organization style',
    dataTypes: ['notes', 'databases', 'writing_style'],
    color: '#000000',
  },
  {
    id: 'obsidian',
    name: 'Obsidian',
    icon: 'diamond',
    description: 'Knowledge graphs and thinking patterns',
    dataTypes: ['notes', 'links', 'knowledge_graph'],
    color: '#7C3AED',
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    icon: 'twitter',
    description: 'Public opinions and interests',
    dataTypes: ['tweets', 'likes', 'interests'],
    color: '#1DA1F2',
  },
  {
    id: 'spotify',
    name: 'Spotify',
    icon: 'music',
    description: 'Music preferences and mood patterns',
    dataTypes: ['listening_history', 'playlists', 'preferences'],
    color: '#1DB954',
  },
] as const;

// Twin creation steps
export const TWIN_CREATION_STEPS = [
  {
    id: 1,
    name: 'Connect',
    description: 'Link your accounts to gather data',
    icon: 'link',
  },
  {
    id: 2,
    name: 'Process',
    description: 'AI analyzes your behavioral patterns',
    icon: 'cpu',
  },
  {
    id: 3,
    name: 'Learn',
    description: 'Building your unique digital twin',
    icon: 'brain',
  },
  {
    id: 4,
    name: 'Consent',
    description: 'Review and accept data governance',
    icon: 'shield',
  },
] as const;

// How it works steps for landing page
export const HOW_IT_WORKS = [
  {
    id: 'reflect',
    title: 'Reflect',
    description: 'Share your thoughts, experiences, and emotions through natural conversation',
    icon: 'message-circle',
    color: 'from-cosmic-500 to-cosmic-600',
  },
  {
    id: 'replicate',
    title: 'Replicate',
    description: 'AI builds a dynamic digital twin that evolves with your behaviors and values',
    icon: 'users',
    color: 'from-ethereal-500 to-ethereal-600',
  },
  {
    id: 'earn',
    title: 'Earn',
    description: 'Monetize your twin by participating in ethical research and feedback sessions',
    icon: 'coins',
    color: 'from-aura-500 to-aura-600',
  },
] as const;

// Explorer service categories
export const SERVICE_CATEGORIES = {
  wellness: {
    name: 'Wellness',
    description: 'Mental health and well-being tools',
    icon: 'heart',
  },
  creativity: {
    name: 'Creativity',
    description: 'Creative expression and content tools',
    icon: 'sparkles',
  },
  social: {
    name: 'Social',
    description: 'Connection and community features',
    icon: 'users',
  },
  productivity: {
    name: 'Productivity',
    description: 'Focus and efficiency tools',
    icon: 'zap',
  },
  insights: {
    name: 'Insights',
    description: 'Self-understanding and analytics',
    icon: 'lightbulb',
  },
} as const;

// Chat/journal prompt templates
export const JOURNAL_PROMPTS = [
  "What's on your mind today?",
  "How are you feeling right now?",
  "What made you smile today?",
  "What challenged you recently?",
  "What are you grateful for?",
  "What would make today great?",
  "What's something you learned recently?",
  "How would you describe your energy level?",
] as const;

// Emotion labels for tracking
export const EMOTION_LABELS = [
  'Happy', 'Sad', 'Anxious', 'Calm', 'Excited', 'Frustrated',
  'Grateful', 'Hopeful', 'Confused', 'Confident', 'Overwhelmed', 'Peaceful',
] as const;

// Twin completion milestones
export const COMPLETION_MILESTONES = [
  { threshold: 25, label: 'Getting Started', badge: 'seedling' },
  { threshold: 50, label: 'Taking Shape', badge: 'sprout' },
  { threshold: 75, label: 'Almost There', badge: 'tree' },
  { threshold: 100, label: 'Complete', badge: 'star' },
] as const;

// Animation durations (in ms)
export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 1000,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'aura_auth_token',
  USER_PREFERENCES: 'aura_user_prefs',
  THEME: 'aura_theme',
  ONBOARDING_COMPLETE: 'aura_onboarding',
  DRAFT_MESSAGE: 'aura_draft_message',
} as const;
