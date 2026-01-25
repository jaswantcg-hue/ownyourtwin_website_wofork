/**
 * Chat Store
 * Manages chat/journaling state, messages, and conversations
 */

import { writable, derived, type Readable } from 'svelte/store';
import type {
  ChatMessage,
  Conversation,
  QuickInsight,
  AudioRecordingState,
  TwinSuggestion,
} from '$lib/types';
import { JOURNAL_PROMPTS } from '$lib/constants';

// -------------------------------------------------------------------
// Types
// -------------------------------------------------------------------

interface ChatState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: ChatMessage[];
  suggestions: TwinSuggestion[];
  insights: QuickInsight[];
  isLoading: boolean;
  isSending: boolean;
  isTyping: boolean; // Twin is "typing"
  error: string | null;
  audioState: AudioRecordingState;
}

interface ChatStore extends Readable<ChatState> {
  loadConversations: () => Promise<void>;
  selectConversation: (conversationId: string) => Promise<void>;
  startNewConversation: () => void;
  sendMessage: (content: string, contentType?: 'text' | 'audio') => Promise<void>;
  loadMoreMessages: () => Promise<void>;
  startRecording: () => void;
  stopRecording: () => Promise<Blob | null>;
  toggleTyping: (isTyping: boolean) => void;
  archiveConversation: (conversationId: string) => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

// -------------------------------------------------------------------
// Initial State
// -------------------------------------------------------------------

const initialAudioState: AudioRecordingState = {
  isRecording: false,
  isPaused: false,
  duration: 0,
  waveformData: [],
};

const initialState: ChatState = {
  conversations: [],
  currentConversation: null,
  messages: [],
  suggestions: [],
  insights: [],
  isLoading: false,
  isSending: false,
  isTyping: false,
  error: null,
  audioState: initialAudioState,
};

// -------------------------------------------------------------------
// Helper Functions
// -------------------------------------------------------------------

/**
 * Generate a contextual twin response based on user message
 */
function generateTwinResponse(userMessage: string): string {
  const responses = [
    `That's really insightful. I notice you mentioned "${userMessage.slice(0, 20)}..." - can you tell me more about what prompted that thought?`,
    "I hear you. How does reflecting on this make you feel right now?",
    "Thank you for sharing that with me. What do you think this reveals about what matters to you?",
    "That's interesting. I'm curious - how has your perspective on this evolved over time?",
    "I appreciate you opening up. Would you like to explore this feeling a bit deeper?",
    "I sense there's more to this story. What else comes to mind when you think about it?",
    "That's a valuable observation about yourself. How might you apply this insight?",
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * Generate quick insights from message content
 */
function generateInsight(message: ChatMessage): QuickInsight | null {
  if (message.content.length < 50) return null;

  const insightTypes = ['emotion', 'pattern', 'suggestion', 'milestone'] as const;
  const type = insightTypes[Math.floor(Math.random() * insightTypes.length)];

  const insights: Record<typeof type, { title: string; description: string }> = {
    emotion: {
      title: 'Emotional Awareness',
      description: 'You seem to be expressing thoughtful reflection in this entry.',
    },
    pattern: {
      title: 'Pattern Detected',
      description: 'This topic connects to themes you\'ve explored before.',
    },
    suggestion: {
      title: 'Reflection Prompt',
      description: 'Consider journaling about how this relates to your goals.',
    },
    milestone: {
      title: 'Growth Moment',
      description: 'This entry shows increased self-awareness!',
    },
  };

  return {
    id: `insight_${Date.now()}`,
    type,
    title: insights[type].title,
    description: insights[type].description,
    timestamp: new Date(),
    relatedMessageIds: [message.id],
  };
}

// -------------------------------------------------------------------
// Store Implementation
// -------------------------------------------------------------------

function createChatStore(): ChatStore {
  const { subscribe, set, update } = writable<ChatState>(initialState);

  return {
    subscribe,

    /**
     * Load all conversations for the user
     */
    async loadConversations(): Promise<void> {
      update(state => ({ ...state, isLoading: true, error: null }));

      try {
        await new Promise(resolve => setTimeout(resolve, 800));

        const mockConversations: Conversation[] = [
          {
            id: 'conv_1',
            userId: 'user_123',
            title: 'Morning Reflection',
            createdAt: new Date('2024-01-20T08:30:00'),
            lastMessageAt: new Date('2024-01-20T09:15:00'),
            messageCount: 12,
            summary: 'Discussed morning routine and productivity goals',
            tags: ['productivity', 'goals', 'morning'],
            mood: 'optimistic',
            isArchived: false,
          },
          {
            id: 'conv_2',
            userId: 'user_123',
            title: 'Career Thoughts',
            createdAt: new Date('2024-01-19T14:00:00'),
            lastMessageAt: new Date('2024-01-19T15:30:00'),
            messageCount: 18,
            summary: 'Explored feelings about career direction',
            tags: ['career', 'decisions', 'growth'],
            mood: 'contemplative',
            isArchived: false,
          },
          {
            id: 'conv_3',
            userId: 'user_123',
            title: 'Evening Wind-down',
            createdAt: new Date('2024-01-18T20:00:00'),
            lastMessageAt: new Date('2024-01-18T20:45:00'),
            messageCount: 8,
            summary: 'Reflected on the day and gratitude',
            tags: ['gratitude', 'reflection', 'evening'],
            mood: 'peaceful',
            isArchived: false,
          },
        ];

        update(state => ({
          ...state,
          conversations: mockConversations,
          isLoading: false,
        }));
      } catch (error) {
        update(state => ({
          ...state,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to load conversations',
        }));
      }
    },

    /**
     * Select and load a specific conversation
     */
    async selectConversation(conversationId: string): Promise<void> {
      update(state => ({ ...state, isLoading: true }));

      try {
        await new Promise(resolve => setTimeout(resolve, 500));

        // Find the conversation
        let conversation: Conversation | undefined;
        update(state => {
          conversation = state.conversations.find(c => c.id === conversationId);
          return state;
        });

        if (!conversation) {
          throw new Error('Conversation not found');
        }

        // Mock messages for the conversation
        const mockMessages: ChatMessage[] = [
          {
            id: 'msg_1',
            conversationId,
            role: 'twin',
            content: JOURNAL_PROMPTS[Math.floor(Math.random() * JOURNAL_PROMPTS.length)],
            contentType: 'prompt',
            timestamp: new Date(Date.now() - 3600000),
            metadata: { promptType: 'daily_check_in' },
          },
          {
            id: 'msg_2',
            conversationId,
            role: 'user',
            content: "I've been thinking a lot about my work-life balance lately. It feels like there's never enough time for everything I want to do.",
            contentType: 'text',
            timestamp: new Date(Date.now() - 3500000),
            metadata: { sentiment: -0.2, emotions: ['overwhelmed', 'thoughtful'], topics: ['work', 'balance'] },
          },
          {
            id: 'msg_3',
            conversationId,
            role: 'twin',
            content: "That's a really common feeling, and it shows great self-awareness that you're recognizing it. When you say there's not enough time, what activities feel most squeezed out?",
            contentType: 'text',
            timestamp: new Date(Date.now() - 3400000),
          },
          {
            id: 'msg_4',
            conversationId,
            role: 'user',
            content: "Mostly my creative hobbies - reading, writing, playing music. I miss having that creative outlet.",
            contentType: 'text',
            timestamp: new Date(Date.now() - 3300000),
            metadata: { sentiment: -0.1, emotions: ['nostalgic', 'wistful'], topics: ['hobbies', 'creativity'] },
          },
          {
            id: 'msg_5',
            conversationId,
            role: 'twin',
            content: "Those creative activities often feed our soul in ways that work can't. I notice you mentioned music specifically - that's come up in our conversations before. What role did music play in your life before things got busy?",
            contentType: 'insight',
            timestamp: new Date(Date.now() - 3200000),
          },
        ];

        const mockSuggestions: TwinSuggestion[] = [
          {
            id: 'sug_1',
            type: 'question',
            text: 'Tell me about a recent moment of joy',
            context: 'exploration',
            priority: 1,
          },
          {
            id: 'sug_2',
            type: 'prompt',
            text: 'What would your ideal day look like?',
            context: 'reflection',
            priority: 2,
          },
          {
            id: 'sug_3',
            type: 'activity',
            text: 'Try a 5-minute gratitude exercise',
            context: 'wellness',
            priority: 3,
          },
        ];

        update(state => ({
          ...state,
          currentConversation: conversation!,
          messages: mockMessages,
          suggestions: mockSuggestions,
          isLoading: false,
        }));
      } catch (error) {
        update(state => ({
          ...state,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to load conversation',
        }));
      }
    },

    /**
     * Start a new conversation
     */
    startNewConversation(): void {
      const newConversation: Conversation = {
        id: `conv_${Date.now()}`,
        userId: 'user_123',
        title: 'New Conversation',
        createdAt: new Date(),
        lastMessageAt: new Date(),
        messageCount: 1,
        tags: [],
        isArchived: false,
      };

      const welcomeMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        conversationId: newConversation.id,
        role: 'twin',
        content: JOURNAL_PROMPTS[Math.floor(Math.random() * JOURNAL_PROMPTS.length)],
        contentType: 'prompt',
        timestamp: new Date(),
        metadata: { promptType: 'daily_check_in' },
      };

      update(state => ({
        ...state,
        conversations: [newConversation, ...state.conversations],
        currentConversation: newConversation,
        messages: [welcomeMessage],
        suggestions: [],
        insights: [],
      }));
    },

    /**
     * Send a message in the current conversation
     */
    async sendMessage(content: string, contentType: 'text' | 'audio' = 'text'): Promise<void> {
      update(state => ({ ...state, isSending: true }));

      try {
        // Create user message
        const userMessage: ChatMessage = {
          id: `msg_${Date.now()}`,
          conversationId: 'current',
          role: 'user',
          content,
          contentType,
          timestamp: new Date(),
          metadata: {
            isJournalEntry: content.length > 100,
          },
        };

        // Add user message immediately
        update(state => ({
          ...state,
          messages: [...state.messages, userMessage],
        }));

        // Simulate twin "typing"
        update(state => ({ ...state, isTyping: true }));
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));

        // Generate twin response
        const twinResponse: ChatMessage = {
          id: `msg_${Date.now() + 1}`,
          conversationId: 'current',
          role: 'twin',
          content: generateTwinResponse(content),
          contentType: 'text',
          timestamp: new Date(),
        };

        // Generate potential insight
        const insight = generateInsight(userMessage);

        update(state => ({
          ...state,
          messages: [...state.messages, twinResponse],
          insights: insight ? [...state.insights, insight] : state.insights,
          isTyping: false,
          isSending: false,
        }));
      } catch (error) {
        update(state => ({
          ...state,
          isSending: false,
          isTyping: false,
          error: error instanceof Error ? error.message : 'Failed to send message',
        }));
      }
    },

    /**
     * Load more messages (pagination)
     */
    async loadMoreMessages(): Promise<void> {
      update(state => ({ ...state, isLoading: true }));

      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        // In real implementation, this would fetch older messages
        update(state => ({ ...state, isLoading: false }));
      } catch (error) {
        update(state => ({
          ...state,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to load messages',
        }));
      }
    },

    /**
     * Start audio recording
     */
    startRecording(): void {
      update(state => ({
        ...state,
        audioState: {
          ...state.audioState,
          isRecording: true,
          duration: 0,
          waveformData: [],
        },
      }));
    },

    /**
     * Stop audio recording and return the blob
     */
    async stopRecording(): Promise<Blob | null> {
      // In real implementation, this would stop the media recorder
      update(state => ({
        ...state,
        audioState: {
          ...state.audioState,
          isRecording: false,
        },
      }));

      // Return mock blob
      return null;
    },

    /**
     * Toggle twin typing indicator
     */
    toggleTyping(isTyping: boolean): void {
      update(state => ({ ...state, isTyping }));
    },

    /**
     * Archive a conversation
     */
    async archiveConversation(conversationId: string): Promise<void> {
      update(state => ({
        ...state,
        conversations: state.conversations.map(c =>
          c.id === conversationId ? { ...c, isArchived: true } : c
        ),
      }));
    },

    /**
     * Clear any errors
     */
    clearError(): void {
      update(state => ({ ...state, error: null }));
    },

    /**
     * Reset the chat store
     */
    reset(): void {
      set(initialState);
    },
  };
}

// -------------------------------------------------------------------
// Exports
// -------------------------------------------------------------------

export const chatStore = createChatStore();

// Derived stores
export const currentMessages = derived(
  chatStore,
  $chat => $chat.messages
);

export const chatIsLoading = derived(
  chatStore,
  $chat => $chat.isLoading || $chat.isSending
);

export const twinIsTyping = derived(
  chatStore,
  $chat => $chat.isTyping
);

export const recentInsights = derived(
  chatStore,
  $chat => $chat.insights.slice(-3)
);

export const activeConversations = derived(
  chatStore,
  $chat => $chat.conversations.filter(c => !c.isArchived)
);
