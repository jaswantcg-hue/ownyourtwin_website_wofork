/**
 * Mock Insights Data
 * Synthetic behavioral insights and analytics data
 */

import type {
  ChartDataPoint,
  TimeSeriesData,
  TopicInterest,
  EmotionalPattern,
  ValueScore,
} from '$lib/types';

// Personality traits radar chart data
export const personalityTraitsData: ChartDataPoint[] = [
  { label: 'Openness', value: 75, color: '#8b5cf6' },
  { label: 'Conscientiousness', value: 82, color: '#14b8a6' },
  { label: 'Extraversion', value: 45, color: '#3b82f6' },
  { label: 'Agreeableness', value: 68, color: '#f59e0b' },
  { label: 'Neuroticism', value: 35, color: '#ef4444' },
];

// Writing style analysis data
export const writingStyleData: ChartDataPoint[] = [
  { label: 'Formality', value: 65, color: '#8b5cf6' },
  { label: 'Complexity', value: 70, color: '#14b8a6' },
  { label: 'Emotionality', value: 55, color: '#f59e0b' },
  { label: 'Assertiveness', value: 60, color: '#3b82f6' },
];

// Emotion trend over time (last 30 days)
export const emotionTrendData: TimeSeriesData[] = [
  { timestamp: new Date('2024-01-01'), value: 6.5, label: 'Content' },
  { timestamp: new Date('2024-01-03'), value: 5.2, label: 'Thoughtful' },
  { timestamp: new Date('2024-01-05'), value: 7.8, label: 'Excited' },
  { timestamp: new Date('2024-01-07'), value: 4.5, label: 'Stressed' },
  { timestamp: new Date('2024-01-09'), value: 6.0, label: 'Calm' },
  { timestamp: new Date('2024-01-11'), value: 7.2, label: 'Optimistic' },
  { timestamp: new Date('2024-01-13'), value: 5.8, label: 'Reflective' },
  { timestamp: new Date('2024-01-15'), value: 8.0, label: 'Happy' },
  { timestamp: new Date('2024-01-17'), value: 6.5, label: 'Peaceful' },
  { timestamp: new Date('2024-01-19'), value: 7.5, label: 'Motivated' },
  { timestamp: new Date('2024-01-21'), value: 6.8, label: 'Grateful' },
];

// Topic interests with engagement scores
export const topicInterests: TopicInterest[] = [
  {
    topic: 'Technology & AI',
    category: 'tech',
    engagementScore: 92,
    frequency: 45,
    sentiment: 0.85,
    lastMentioned: new Date('2024-01-20'),
  },
  {
    topic: 'Personal Growth',
    category: 'self-improvement',
    engagementScore: 88,
    frequency: 38,
    sentiment: 0.78,
    lastMentioned: new Date('2024-01-20'),
  },
  {
    topic: 'Psychology',
    category: 'science',
    engagementScore: 85,
    frequency: 32,
    sentiment: 0.72,
    lastMentioned: new Date('2024-01-19'),
  },
  {
    topic: 'Music & Arts',
    category: 'arts',
    engagementScore: 78,
    frequency: 28,
    sentiment: 0.90,
    lastMentioned: new Date('2024-01-18'),
  },
  {
    topic: 'Health & Wellness',
    category: 'health',
    engagementScore: 72,
    frequency: 22,
    sentiment: 0.65,
    lastMentioned: new Date('2024-01-17'),
  },
  {
    topic: 'Career & Work',
    category: 'professional',
    engagementScore: 68,
    frequency: 35,
    sentiment: 0.55,
    lastMentioned: new Date('2024-01-20'),
  },
];

// Emotional patterns by day of week
export const emotionalPatterns: EmotionalPattern[] = [
  {
    date: new Date('2024-01-15'),
    emotions: [
      { emotion: 'Happy', score: 0.7, confidence: 0.85 },
      { emotion: 'Calm', score: 0.6, confidence: 0.80 },
      { emotion: 'Motivated', score: 0.8, confidence: 0.90 },
    ],
    dominantEmotion: 'Motivated',
    overallSentiment: 0.72,
  },
  {
    date: new Date('2024-01-16'),
    emotions: [
      { emotion: 'Focused', score: 0.75, confidence: 0.88 },
      { emotion: 'Stressed', score: 0.4, confidence: 0.75 },
      { emotion: 'Determined', score: 0.65, confidence: 0.82 },
    ],
    dominantEmotion: 'Focused',
    overallSentiment: 0.58,
  },
  {
    date: new Date('2024-01-17'),
    emotions: [
      { emotion: 'Reflective', score: 0.8, confidence: 0.90 },
      { emotion: 'Peaceful', score: 0.7, confidence: 0.85 },
      { emotion: 'Grateful', score: 0.75, confidence: 0.88 },
    ],
    dominantEmotion: 'Reflective',
    overallSentiment: 0.78,
  },
];

// Core values with importance scores
export const coreValues: ValueScore[] = [
  { value: 'Growth', importance: 95, consistency: 88 },
  { value: 'Authenticity', importance: 90, consistency: 85 },
  { value: 'Connection', importance: 85, consistency: 80 },
  { value: 'Creativity', importance: 82, consistency: 78 },
  { value: 'Balance', importance: 78, consistency: 72 },
  { value: 'Impact', importance: 75, consistency: 82 },
  { value: 'Freedom', importance: 72, consistency: 75 },
  { value: 'Learning', importance: 88, consistency: 90 },
];

// Monthly insight summary
export const monthlySummary = {
  totalEntries: 45,
  avgMood: 7.2,
  topEmotion: 'Optimistic',
  growthAreas: ['Self-awareness', 'Emotional regulation', 'Goal setting'],
  strengths: ['Reflective thinking', 'Curiosity', 'Adaptability'],
  recommendations: [
    'Continue morning journaling routine',
    'Explore meditation for stress management',
    'Set weekly creative time blocks',
  ],
};

// Word cloud data
export const wordCloudData = [
  { word: 'growth', weight: 45 },
  { word: 'learning', weight: 42 },
  { word: 'creative', weight: 38 },
  { word: 'balance', weight: 35 },
  { word: 'mindful', weight: 32 },
  { word: 'grateful', weight: 30 },
  { word: 'curious', weight: 28 },
  { word: 'focused', weight: 26 },
  { word: 'peaceful', weight: 24 },
  { word: 'inspired', weight: 22 },
  { word: 'connected', weight: 20 },
  { word: 'evolving', weight: 18 },
];
