/**
 * Mock Messages Data
 * Synthetic chat messages and conversations for development
 */

import type { ChatMessage, Conversation, QuickInsight, TwinSuggestion } from '$lib/types';

// Sample conversations
export const mockConversations: Conversation[] = [
  {
    id: 'conv_morning_1',
    userId: 'user_demo_123',
    title: 'Morning Reflection',
    createdAt: new Date('2024-01-20T08:30:00'),
    lastMessageAt: new Date('2024-01-20T09:15:00'),
    messageCount: 12,
    summary: 'Discussed morning routine and productivity goals for the week',
    tags: ['productivity', 'goals', 'morning-routine'],
    mood: 'optimistic',
    isArchived: false,
  },
  {
    id: 'conv_career_1',
    userId: 'user_demo_123',
    title: 'Career Thoughts',
    createdAt: new Date('2024-01-19T14:00:00'),
    lastMessageAt: new Date('2024-01-19T15:30:00'),
    messageCount: 18,
    summary: 'Explored feelings about career direction and upcoming decisions',
    tags: ['career', 'decisions', 'growth'],
    mood: 'contemplative',
    isArchived: false,
  },
  {
    id: 'conv_evening_1',
    userId: 'user_demo_123',
    title: 'Evening Wind-down',
    createdAt: new Date('2024-01-18T20:00:00'),
    lastMessageAt: new Date('2024-01-18T20:45:00'),
    messageCount: 8,
    summary: 'Reflected on the day and practiced gratitude',
    tags: ['gratitude', 'reflection', 'evening'],
    mood: 'peaceful',
    isArchived: false,
  },
  {
    id: 'conv_creative_1',
    userId: 'user_demo_123',
    title: 'Creative Block',
    createdAt: new Date('2024-01-17T16:00:00'),
    lastMessageAt: new Date('2024-01-17T17:00:00'),
    messageCount: 14,
    summary: 'Worked through a creative block using reframing techniques',
    tags: ['creativity', 'challenges', 'reframing'],
    mood: 'determined',
    isArchived: false,
  },
  {
    id: 'conv_wellness_1',
    userId: 'user_demo_123',
    title: 'Wellness Check-in',
    createdAt: new Date('2024-01-16T12:00:00'),
    lastMessageAt: new Date('2024-01-16T12:30:00'),
    messageCount: 6,
    summary: 'Quick midday check-in about energy levels and stress',
    tags: ['wellness', 'stress', 'self-care'],
    mood: 'neutral',
    isArchived: false,
  },
];

// Sample messages for a conversation
export const mockMessages: ChatMessage[] = [
  {
    id: 'msg_1',
    conversationId: 'conv_morning_1',
    role: 'twin',
    content: "Good morning! How are you feeling as you start your day today?",
    contentType: 'prompt',
    timestamp: new Date('2024-01-20T08:30:00'),
    metadata: { promptType: 'daily_check_in' },
  },
  {
    id: 'msg_2',
    conversationId: 'conv_morning_1',
    role: 'user',
    content: "I woke up feeling pretty energized today. Had a good night's sleep for once, and I'm actually looking forward to tackling my project list.",
    contentType: 'text',
    timestamp: new Date('2024-01-20T08:32:00'),
    metadata: {
      sentiment: 0.75,
      emotions: ['energized', 'optimistic', 'motivated'],
      topics: ['sleep', 'productivity', 'projects'],
      isJournalEntry: true,
    },
  },
  {
    id: 'msg_3',
    conversationId: 'conv_morning_1',
    role: 'twin',
    content: "That's wonderful to hear! Quality sleep makes such a difference. I notice you mentioned being 'energized' - that's a pattern I've seen when you have restful nights. What's at the top of your project list today?",
    contentType: 'insight',
    timestamp: new Date('2024-01-20T08:33:00'),
  },
  {
    id: 'msg_4',
    conversationId: 'conv_morning_1',
    role: 'user',
    content: "I need to finish the design mockups for the new feature. It's been hanging over me for a few days. I think I was procrastinating because I wasn't sure about the direction.",
    contentType: 'text',
    timestamp: new Date('2024-01-20T08:35:00'),
    metadata: {
      sentiment: 0.3,
      emotions: ['uncertain', 'pressured', 'thoughtful'],
      topics: ['work', 'design', 'procrastination'],
      isJournalEntry: true,
    },
  },
  {
    id: 'msg_5',
    conversationId: 'conv_morning_1',
    role: 'twin',
    content: "It sounds like the uncertainty was creating resistance. That's really insightful self-awareness! Now that you've named it, what would help you feel more confident about the direction?",
    contentType: 'text',
    timestamp: new Date('2024-01-20T08:36:00'),
  },
  {
    id: 'msg_6',
    conversationId: 'conv_morning_1',
    role: 'user',
    content: "I think I need to just start with rough sketches and not worry about making it perfect. Sometimes I get stuck trying to have everything figured out before I begin.",
    contentType: 'text',
    timestamp: new Date('2024-01-20T08:38:00'),
    metadata: {
      sentiment: 0.6,
      emotions: ['determined', 'accepting', 'realistic'],
      topics: ['perfectionism', 'process', 'mindset'],
      isJournalEntry: true,
    },
  },
  {
    id: 'msg_7',
    conversationId: 'conv_morning_1',
    role: 'twin',
    content: "That's a powerful reframe! 'Progress over perfection' seems to align with your value of Growth that we've identified. Would you like to set an intention for today's work session?",
    contentType: 'text',
    timestamp: new Date('2024-01-20T08:39:00'),
  },
];

// Quick insights that appear during chat
export const mockInsights: QuickInsight[] = [
  {
    id: 'insight_1',
    type: 'pattern',
    title: 'Sleep Quality Pattern',
    description: 'Your energy levels correlate strongly with sleep quality over the past 2 weeks.',
    timestamp: new Date('2024-01-20T08:33:00'),
    relatedMessageIds: ['msg_2'],
  },
  {
    id: 'insight_2',
    type: 'emotion',
    title: 'Positive Trend',
    description: 'Your morning entries have been increasingly optimistic this week.',
    timestamp: new Date('2024-01-20T08:35:00'),
    relatedMessageIds: ['msg_2', 'msg_4'],
  },
  {
    id: 'insight_3',
    type: 'suggestion',
    title: 'Reframing Opportunity',
    description: 'Consider exploring the connection between uncertainty and procrastination.',
    timestamp: new Date('2024-01-20T08:36:00'),
    relatedMessageIds: ['msg_4'],
  },
  {
    id: 'insight_4',
    type: 'milestone',
    title: 'Self-Awareness Growth',
    description: 'You identified your own resistance pattern - a sign of increasing self-awareness!',
    timestamp: new Date('2024-01-20T08:38:00'),
    relatedMessageIds: ['msg_6'],
  },
];

// Suggested prompts/questions from the twin
export const mockSuggestions: TwinSuggestion[] = [
  {
    id: 'sug_1',
    type: 'question',
    text: 'What brought you the most joy this week?',
    context: 'Weekly reflection prompt',
    priority: 1,
  },
  {
    id: 'sug_2',
    type: 'prompt',
    text: 'Describe a challenge you overcame recently',
    context: 'Growth reflection',
    priority: 2,
  },
  {
    id: 'sug_3',
    type: 'activity',
    text: 'Try a 5-minute gratitude exercise',
    context: 'Wellness activity',
    priority: 3,
  },
  {
    id: 'sug_4',
    type: 'question',
    text: 'What would you tell your past self from a year ago?',
    context: 'Deep reflection',
    priority: 4,
  },
  {
    id: 'sug_5',
    type: 'resource',
    text: 'Read about cognitive reframing techniques',
    context: 'Learning resource',
    priority: 5,
  },
];

// Twin greeting messages
export const twinGreetings = [
  "Good morning! How are you feeling today?",
  "Hello! What's on your mind?",
  "Welcome back! I'm here to listen.",
  "Hi there! Ready for some reflection time?",
  "Good to see you! What would you like to explore today?",
  "Hey! How's your day going so far?",
  "Welcome! What thoughts are you carrying with you?",
];

// Get random greeting
export function getRandomGreeting(): string {
  return twinGreetings[Math.floor(Math.random() * twinGreetings.length)];
}
