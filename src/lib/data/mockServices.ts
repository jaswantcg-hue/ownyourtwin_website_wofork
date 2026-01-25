/**
 * Mock Services Data
 * Synthetic data for Explorer services and features
 */

import type {
  ExplorerService,
  FocusTrack,
  PeerMatch,
  ReframingSession,
  CognitiveDistortion,
} from '$lib/types';

// Explorer services
export const explorerServices: ExplorerService[] = [
  {
    id: 'service_focus_music',
    name: 'Focus Music',
    description: 'Personalized focus and concentration music generated based on your cognitive patterns',
    icon: 'headphones',
    category: 'productivity',
    isAvailable: true,
    isPremium: false,
    features: [
      'AI-generated focus tracks',
      'Personalized to your work patterns',
      'Sleep and meditation modes',
      'Adjustable intensity levels',
    ],
  },
  {
    id: 'service_peer_match',
    name: 'Peer Match',
    description: 'Find like-minded individuals in the virtual world based on shared traits and interests',
    icon: 'users',
    category: 'social',
    isAvailable: true,
    isPremium: false,
    features: [
      'Trait-based matching',
      'Shared interest discovery',
      'Anonymous connections',
      'Value alignment scoring',
    ],
  },
  {
    id: 'service_reframing',
    name: 'Cognitive Reframing',
    description: 'Transform negative thought patterns into constructive perspectives with AI guidance',
    icon: 'refresh-cw',
    category: 'wellness',
    isAvailable: true,
    isPremium: false,
    features: [
      'Identify cognitive distortions',
      'Generate alternative perspectives',
      'Track reframing progress',
      'Evidence-based techniques',
    ],
  },
  {
    id: 'service_content_gen',
    name: 'Content Creator',
    description: 'Generate authentic social and professional content that sounds like you',
    icon: 'edit-3',
    category: 'creativity',
    isAvailable: true,
    isPremium: true,
    features: [
      'LinkedIn post generation',
      'Twitter/X thread creation',
      'Email drafting assistant',
      'Maintains your voice',
    ],
  },
  {
    id: 'service_insight_report',
    name: 'Deep Insights',
    description: 'Comprehensive analysis reports of your behavioral patterns and growth areas',
    icon: 'bar-chart-2',
    category: 'insights',
    isAvailable: true,
    isPremium: true,
    features: [
      'Monthly insight reports',
      'Trend analysis',
      'Growth recommendations',
      'Comparative benchmarks',
    ],
  },
  {
    id: 'service_guided_journal',
    name: 'Guided Journaling',
    description: 'Structured journaling exercises designed to deepen self-understanding',
    icon: 'book-open',
    category: 'wellness',
    isAvailable: true,
    isPremium: false,
    features: [
      'Daily prompts',
      'Themed exercises',
      'Progress tracking',
      'Mood correlation',
    ],
  },
];

// Focus music tracks
export const focusTracks: FocusTrack[] = [
  {
    id: 'track_1',
    title: 'Deep Focus Alpha',
    type: 'focus',
    duration: 3600,
    audioUrl: '/audio/focus-alpha.mp3',
    imageUrl: '/images/focus-1.jpg',
    isPersonalized: true,
    mood: 'focused',
  },
  {
    id: 'track_2',
    title: 'Concentration Flow',
    type: 'concentration',
    duration: 2700,
    audioUrl: '/audio/concentration-flow.mp3',
    imageUrl: '/images/focus-2.jpg',
    isPersonalized: true,
    mood: 'intense',
  },
  {
    id: 'track_3',
    title: 'Calm Sleep Waves',
    type: 'sleep',
    duration: 7200,
    audioUrl: '/audio/sleep-waves.mp3',
    imageUrl: '/images/sleep-1.jpg',
    isPersonalized: true,
    mood: 'peaceful',
  },
  {
    id: 'track_4',
    title: 'Morning Meditation',
    type: 'meditation',
    duration: 1200,
    audioUrl: '/audio/morning-meditation.mp3',
    imageUrl: '/images/meditation-1.jpg',
    isPersonalized: true,
    mood: 'serene',
  },
  {
    id: 'track_5',
    title: 'Creative Flow State',
    type: 'focus',
    duration: 5400,
    audioUrl: '/audio/creative-flow.mp3',
    imageUrl: '/images/focus-3.jpg',
    isPersonalized: true,
    mood: 'creative',
  },
];

// Peer matches
export const peerMatches: PeerMatch[] = [
  {
    id: 'match_1',
    userId: 'peer_anonymous_1',
    matchScore: 92,
    commonTraits: ['High creativity', 'Analytical thinking', 'Introspective'],
    commonInterests: ['Technology', 'Psychology', 'Music'],
    connectionStatus: 'suggested',
    matchedAt: new Date('2024-01-18'),
  },
  {
    id: 'match_2',
    userId: 'peer_anonymous_2',
    matchScore: 88,
    commonTraits: ['Growth mindset', 'Empathetic', 'Curious'],
    commonInterests: ['Personal development', 'Writing', 'Philosophy'],
    connectionStatus: 'suggested',
    matchedAt: new Date('2024-01-17'),
  },
  {
    id: 'match_3',
    userId: 'peer_anonymous_3',
    matchScore: 85,
    commonTraits: ['Detail-oriented', 'Reflective', 'Open-minded'],
    commonInterests: ['Science', 'Art', 'Meditation'],
    connectionStatus: 'pending',
    matchedAt: new Date('2024-01-15'),
  },
  {
    id: 'match_4',
    userId: 'peer_anonymous_4',
    matchScore: 82,
    commonTraits: ['Creative', 'Optimistic', 'Value-driven'],
    commonInterests: ['Design', 'Wellness', 'Innovation'],
    connectionStatus: 'connected',
    matchedAt: new Date('2024-01-10'),
  },
];

// Cognitive distortions for reframing
export const cognitiveDistortions: CognitiveDistortion[] = [
  {
    type: 'All-or-Nothing Thinking',
    description: 'Viewing situations in only two categories instead of on a continuum',
    example: '"If I\'m not perfect, I\'m a failure"',
  },
  {
    type: 'Catastrophizing',
    description: 'Predicting the future negatively without considering other outcomes',
    example: '"This will be a disaster"',
  },
  {
    type: 'Mind Reading',
    description: 'Assuming you know what others are thinking',
    example: '"They think I\'m incompetent"',
  },
  {
    type: 'Emotional Reasoning',
    description: 'Thinking something is true because you feel it strongly',
    example: '"I feel like a failure, so I must be one"',
  },
  {
    type: 'Should Statements',
    description: 'Having a fixed idea of how you or others should behave',
    example: '"I should always be productive"',
  },
  {
    type: 'Overgeneralization',
    description: 'Making broad interpretations from a single event',
    example: '"This always happens to me"',
  },
  {
    type: 'Mental Filter',
    description: 'Focusing only on the negative aspects of a situation',
    example: 'Dwelling on one criticism despite many compliments',
  },
  {
    type: 'Disqualifying the Positive',
    description: 'Dismissing positive experiences as not counting',
    example: '"That success was just luck"',
  },
];

// Sample reframing sessions
export const reframingSessions: ReframingSession[] = [
  {
    id: 'reframe_1',
    originalThought: "I'll never be good enough at my job",
    cognitiveDistortions: [cognitiveDistortions[0], cognitiveDistortions[1]],
    reframedThoughts: [
      "I'm still learning and improving. Competence is a journey, not a destination.",
      "I've received positive feedback before, which shows I have valuable skills.",
      "Not being perfect doesn't mean I'm not good enough. I can continue to grow.",
    ],
    selectedReframe: "I'm still learning and improving. Competence is a journey, not a destination.",
    createdAt: new Date('2024-01-15'),
    effectiveness: 8,
  },
  {
    id: 'reframe_2',
    originalThought: "Everyone must think I'm awkward at social events",
    cognitiveDistortions: [cognitiveDistortions[2], cognitiveDistortions[3]],
    reframedThoughts: [
      "I can't know what others think. Most people are focused on themselves.",
      "Feeling awkward is normal and doesn't mean others see me that way.",
      "Some people probably enjoyed talking to me, even if I felt nervous.",
    ],
    selectedReframe: "I can't know what others think. Most people are focused on themselves.",
    createdAt: new Date('2024-01-12'),
    effectiveness: 7,
  },
];

// Service categories with descriptions
export const serviceCategories = {
  wellness: {
    name: 'Wellness',
    description: 'Tools for mental health and emotional well-being',
    icon: 'heart',
    color: 'from-rose-500 to-pink-500',
  },
  creativity: {
    name: 'Creativity',
    description: 'Express yourself and generate authentic content',
    icon: 'sparkles',
    color: 'from-purple-500 to-violet-500',
  },
  social: {
    name: 'Social',
    description: 'Connect with like-minded individuals',
    icon: 'users',
    color: 'from-blue-500 to-cyan-500',
  },
  productivity: {
    name: 'Productivity',
    description: 'Enhance focus and efficiency',
    icon: 'zap',
    color: 'from-amber-500 to-orange-500',
  },
  insights: {
    name: 'Insights',
    description: 'Deep understanding of your patterns',
    icon: 'lightbulb',
    color: 'from-emerald-500 to-teal-500',
  },
};
