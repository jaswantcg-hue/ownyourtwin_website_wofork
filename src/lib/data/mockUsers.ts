/**
 * Mock User Data
 * Synthetic user data for development and testing
 */

import type { User, WaitlistEntry } from '$lib/types';

// Mock authenticated user
export const mockUser: User = {
  id: 'user_demo_123',
  email: 'demo@auraai.com',
  name: 'Alex Rivera',
  avatar: '/avatars/demo-user.jpg',
  createdAt: new Date('2023-12-01'),
  lastLogin: new Date(),
  preferences: {
    theme: 'dark',
    notifications: {
      email: true,
      push: true,
      insightAlerts: true,
      earningsAlerts: true,
      weeklyDigest: true,
    },
    privacy: {
      twinPublic: true,
      shareInsights: true,
      allowPeerMatching: true,
    },
    language: 'en',
  },
  connectedAccounts: [
    {
      id: 'conn_linkedin_1',
      platform: 'linkedin',
      username: 'alexrivera',
      connectedAt: new Date('2023-12-05'),
      lastSync: new Date('2024-01-20'),
      status: 'connected',
      dataImported: true,
    },
    {
      id: 'conn_github_1',
      platform: 'github',
      username: 'arivera-dev',
      connectedAt: new Date('2023-12-05'),
      lastSync: new Date('2024-01-20'),
      status: 'connected',
      dataImported: true,
    },
  ],
};

// Mock user stories for landing page
export const userStories = [
  {
    id: 'story_1',
    name: 'Sarah Chen',
    role: 'Product Designer',
    avatar: '/avatars/sarah.jpg',
    quote: "AuraAI helped me understand patterns in my creative process I never noticed before. My digital twin has become my most honest mirror.",
    rating: 5,
    earnings: 320,
  },
  {
    id: 'story_2',
    name: 'Marcus Johnson',
    role: 'Software Engineer',
    avatar: '/avatars/marcus.jpg',
    quote: "The journaling experience feels like talking to a wise friend who truly understands me. Plus, I've earned over $400 sharing my insights ethically.",
    rating: 5,
    earnings: 425,
  },
  {
    id: 'story_3',
    name: 'Elena Rodriguez',
    role: 'Therapist',
    avatar: '/avatars/elena.jpg',
    quote: "As a mental health professional, I appreciate how AuraAI approaches self-reflection. It's a beautiful blend of technology and introspection.",
    rating: 5,
    earnings: 275,
  },
  {
    id: 'story_4',
    name: 'David Kim',
    role: 'Entrepreneur',
    avatar: '/avatars/david.jpg',
    quote: "My twin helped me identify decision-making patterns that were holding me back. The cognitive reframing tool is incredibly powerful.",
    rating: 5,
    earnings: 580,
  },
];

// Mock waitlist entries
export const mockWaitlistEntries: WaitlistEntry[] = [
  {
    email: 'early@adopter.com',
    name: 'Early Adopter',
    reason: 'Interested in understanding myself better through AI',
    referralSource: 'twitter',
    createdAt: new Date('2024-01-10'),
  },
  {
    email: 'curious@mind.com',
    name: 'Curious Mind',
    reason: 'Want to monetize my data ethically',
    referralSource: 'friend',
    createdAt: new Date('2024-01-12'),
  },
];

// Landing page statistics
export const landingStats = {
  usersCount: '12,500+',
  insightsGenerated: '1.2M+',
  earningsDistributed: '$850K+',
  avgCompletionScore: '87%',
};
