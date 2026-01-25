/**
 * Chat and journaling related type definitions
 * Contains all types for the chat-based journaling system
 */

// Chat message interface
export interface ChatMessage {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  contentType: MessageContentType;
  timestamp: Date;
  metadata?: MessageMetadata;
  reactions?: MessageReaction[];
  attachments?: MessageAttachment[];
}

// Message sender role
export type MessageRole = 'user' | 'twin' | 'system';

// Type of content in the message
export type MessageContentType = 'text' | 'audio' | 'image' | 'insight' | 'prompt';

// Additional metadata for messages
export interface MessageMetadata {
  sentiment?: number; // -1 to 1
  emotions?: string[];
  topics?: string[];
  isJournalEntry?: boolean;
  promptType?: PromptType;
  audioUrl?: string;
  audioDuration?: number;
}

// Types of prompts the twin can send
export type PromptType =
  | 'reflection'
  | 'clarification'
  | 'exploration'
  | 'challenge'
  | 'celebration'
  | 'daily_check_in'
  | 'weekly_review';

// User reactions to messages
export interface MessageReaction {
  type: 'helpful' | 'insightful' | 'needs_revision';
  timestamp: Date;
}

// File attachments in messages
export interface MessageAttachment {
  id: string;
  type: 'image' | 'audio' | 'document';
  url: string;
  name: string;
  size: number;
  mimeType: string;
}

// Conversation/chat session
export interface Conversation {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  lastMessageAt: Date;
  messageCount: number;
  summary?: string;
  tags: string[];
  mood?: string;
  isArchived: boolean;
}

// Chat input state
export interface ChatInputState {
  text: string;
  isRecording: boolean;
  isProcessing: boolean;
  attachments: File[];
}

// Quick insights shown during chat
export interface QuickInsight {
  id: string;
  type: 'emotion' | 'pattern' | 'suggestion' | 'milestone';
  title: string;
  description: string;
  timestamp: Date;
  relatedMessageIds: string[];
}

// Journal entry (structured version of chat)
export interface JournalEntry {
  id: string;
  userId: string;
  date: Date;
  title: string;
  content: string;
  mood: MoodScore;
  tags: string[];
  linkedMessages: string[];
  isPrivate: boolean;
}

// Mood tracking
export interface MoodScore {
  value: number; // 1-10
  label: string;
  emoji: string;
  factors?: string[];
}

// Predefined mood options
export const MOOD_OPTIONS: MoodScore[] = [
  { value: 1, label: 'Very Low', emoji: '😢' },
  { value: 2, label: 'Low', emoji: '😔' },
  { value: 3, label: 'Somewhat Low', emoji: '😕' },
  { value: 4, label: 'Below Average', emoji: '😐' },
  { value: 5, label: 'Neutral', emoji: '😶' },
  { value: 6, label: 'Okay', emoji: '🙂' },
  { value: 7, label: 'Good', emoji: '😊' },
  { value: 8, label: 'Very Good', emoji: '😄' },
  { value: 9, label: 'Great', emoji: '😁' },
  { value: 10, label: 'Excellent', emoji: '🤩' },
];

// Twin response suggestion
export interface TwinSuggestion {
  id: string;
  type: 'question' | 'prompt' | 'activity' | 'resource';
  text: string;
  context: string;
  priority: number;
}

// Audio recording state
export interface AudioRecordingState {
  isRecording: boolean;
  isPaused: boolean;
  duration: number;
  audioBlob?: Blob;
  audioUrl?: string;
  waveformData: number[];
}
