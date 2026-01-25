/**
 * Digital Twin Store
 * Manages the digital twin state, creation progress, and related data
 */

import { writable, derived, type Readable } from 'svelte/store';
import type {
  DigitalTwin,
  TwinStatus,
  TwinActivity,
  TwinEarnings,
  TwinCreationProgress,
  ConnectedAccount,
  SocialPlatform,
} from '$lib/types';

// -------------------------------------------------------------------
// Types
// -------------------------------------------------------------------

interface TwinState {
  twin: DigitalTwin | null;
  activities: TwinActivity[];
  earnings: TwinEarnings | null;
  creationProgress: TwinCreationProgress | null;
  connectedAccounts: ConnectedAccount[];
  isLoading: boolean;
  error: string | null;
}

interface TwinStore extends Readable<TwinState> {
  loadTwin: () => Promise<void>;
  startCreation: () => void;
  updateCreationProgress: (progress: Partial<TwinCreationProgress>) => void;
  completeCreation: (twin: DigitalTwin) => void;
  connectAccount: (platform: SocialPlatform) => Promise<boolean>;
  disconnectAccount: (accountId: string) => Promise<boolean>;
  togglePrivacy: (isPublic: boolean) => Promise<void>;
  loadActivities: () => Promise<void>;
  loadEarnings: () => Promise<void>;
  reset: () => void;
}

// -------------------------------------------------------------------
// Initial State
// -------------------------------------------------------------------

const initialState: TwinState = {
  twin: null,
  activities: [],
  earnings: null,
  creationProgress: null,
  connectedAccounts: [],
  isLoading: false,
  error: null,
};

// -------------------------------------------------------------------
// Store Implementation
// -------------------------------------------------------------------

function createTwinStore(): TwinStore {
  const { subscribe, set, update } = writable<TwinState>(initialState);

  return {
    subscribe,

    /**
     * Load the user's digital twin data
     */
    async loadTwin(): Promise<void> {
      update(state => ({ ...state, isLoading: true, error: null }));

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock twin data - will be replaced with API
        const mockTwin: DigitalTwin = {
          id: 'twin_123',
          userId: 'user_123',
          name: 'My Digital Twin',
          createdAt: new Date('2024-01-15'),
          lastUpdated: new Date(),
          completionScore: 78,
          status: 'ready',
          traits: {
            openness: 75,
            conscientiousness: 82,
            extraversion: 45,
            agreeableness: 68,
            neuroticism: 35,
            creativity: 80,
            analyticalThinking: 85,
            empathy: 72,
            riskTolerance: 55,
            optimism: 70,
          },
          insights: {
            writingStyle: {
              formality: 65,
              complexity: 70,
              emotionality: 55,
              assertiveness: 60,
              wordFrequency: [
                { word: 'think', count: 45, category: 'action' },
                { word: 'interesting', count: 38, category: 'descriptor' },
                { word: 'excited', count: 25, category: 'emotion' },
              ],
              averageSentenceLength: 18,
              vocabularyRichness: 72,
            },
            emotionalPatterns: [],
            topicInterests: [
              { topic: 'Technology', category: 'tech', engagementScore: 92, frequency: 45, sentiment: 0.8, lastMentioned: new Date() },
              { topic: 'Psychology', category: 'science', engagementScore: 85, frequency: 32, sentiment: 0.7, lastMentioned: new Date() },
              { topic: 'Music', category: 'arts', engagementScore: 78, frequency: 28, sentiment: 0.9, lastMentioned: new Date() },
            ],
            decisionPatterns: [
              { category: 'career', style: 'analytical', riskLevel: 'moderate', influencingFactors: ['data', 'long-term impact'] },
            ],
            valueSystem: [
              { value: 'Growth', importance: 95, consistency: 88 },
              { value: 'Authenticity', importance: 90, consistency: 85 },
              { value: 'Connection', importance: 85, consistency: 80 },
            ],
            communicationStyle: {
              directness: 70,
              empathy: 75,
              humor: 60,
              formality: 55,
              preferredChannels: ['text', 'email'],
            },
          },
          preferences: {
            isPublic: true,
            allowMarketResearch: true,
            allowSurveys: true,
            minimumCompensation: 10,
            excludedCategories: [],
          },
        };

        update(state => ({
          ...state,
          twin: mockTwin,
          isLoading: false,
        }));
      } catch (error) {
        update(state => ({
          ...state,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to load twin',
        }));
      }
    },

    /**
     * Start the twin creation process
     */
    startCreation(): void {
      update(state => ({
        ...state,
        creationProgress: {
          currentStep: 1,
          totalSteps: 4,
          stepName: 'Connecting accounts',
          progress: 0,
          message: 'Ready to begin',
          startedAt: new Date(),
        },
      }));
    },

    /**
     * Update the creation progress
     */
    updateCreationProgress(progress: Partial<TwinCreationProgress>): void {
      update(state => ({
        ...state,
        creationProgress: state.creationProgress
          ? { ...state.creationProgress, ...progress }
          : null,
      }));
    },

    /**
     * Complete the twin creation process
     */
    completeCreation(twin: DigitalTwin): void {
      update(state => ({
        ...state,
        twin,
        creationProgress: null,
      }));
    },

    /**
     * Connect a social media account
     */
    async connectAccount(platform: SocialPlatform): Promise<boolean> {
      update(state => ({ ...state, isLoading: true }));

      try {
        // Simulate OAuth flow and data import
        await new Promise(resolve => setTimeout(resolve, 2000));

        const newAccount: ConnectedAccount = {
          id: `acc_${platform}_${Date.now()}`,
          platform,
          username: `user_${platform}`,
          connectedAt: new Date(),
          lastSync: new Date(),
          status: 'connected',
          dataImported: true,
        };

        update(state => ({
          ...state,
          connectedAccounts: [...state.connectedAccounts, newAccount],
          isLoading: false,
        }));

        return true;
      } catch (error) {
        update(state => ({
          ...state,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to connect account',
        }));
        return false;
      }
    },

    /**
     * Disconnect a connected account
     */
    async disconnectAccount(accountId: string): Promise<boolean> {
      update(state => ({ ...state, isLoading: true }));

      try {
        await new Promise(resolve => setTimeout(resolve, 500));

        update(state => ({
          ...state,
          connectedAccounts: state.connectedAccounts.filter(a => a.id !== accountId),
          isLoading: false,
        }));

        return true;
      } catch (error) {
        update(state => ({
          ...state,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to disconnect account',
        }));
        return false;
      }
    },

    /**
     * Toggle twin privacy settings
     */
    async togglePrivacy(isPublic: boolean): Promise<void> {
      if (!this) return;

      update(state => {
        if (!state.twin) return state;

        return {
          ...state,
          twin: {
            ...state.twin,
            preferences: {
              ...state.twin.preferences,
              isPublic,
              allowMarketResearch: isPublic,
              allowSurveys: isPublic,
            },
          },
        };
      });
    },

    /**
     * Load twin activities
     */
    async loadActivities(): Promise<void> {
      update(state => ({ ...state, isLoading: true }));

      try {
        await new Promise(resolve => setTimeout(resolve, 800));

        const mockActivities: TwinActivity[] = [
          {
            id: 'act_1',
            type: 'market_research',
            title: 'Consumer Preferences Survey',
            description: 'Participated in a study about shopping habits',
            timestamp: new Date('2024-01-20'),
            compensation: 25,
            company: 'RetailCo',
            category: 'Consumer Goods',
            status: 'completed',
          },
          {
            id: 'act_2',
            type: 'simulation',
            title: 'Product Feedback Session',
            description: 'Provided feedback on new app interface',
            timestamp: new Date('2024-01-18'),
            compensation: 15,
            company: 'TechStartup',
            category: 'Technology',
            status: 'completed',
          },
          {
            id: 'act_3',
            type: 'survey',
            title: 'Wellness App Research',
            description: 'Shared preferences for meditation features',
            timestamp: new Date('2024-01-15'),
            compensation: 20,
            company: 'WellnessInc',
            category: 'Health',
            status: 'pending',
          },
        ];

        update(state => ({
          ...state,
          activities: mockActivities,
          isLoading: false,
        }));
      } catch (error) {
        update(state => ({
          ...state,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to load activities',
        }));
      }
    },

    /**
     * Load earnings data
     */
    async loadEarnings(): Promise<void> {
      update(state => ({ ...state, isLoading: true }));

      try {
        await new Promise(resolve => setTimeout(resolve, 600));

        const mockEarnings: TwinEarnings = {
          totalEarned: 245.50,
          availableBalance: 180.00,
          pendingBalance: 65.50,
          lifetimeParticipations: 23,
          monthlyEarnings: [
            { month: 'January', year: 2024, amount: 85, participations: 5 },
            { month: 'December', year: 2023, amount: 72, participations: 4 },
            { month: 'November', year: 2023, amount: 88.50, participations: 6 },
          ],
        };

        update(state => ({
          ...state,
          earnings: mockEarnings,
          isLoading: false,
        }));
      } catch (error) {
        update(state => ({
          ...state,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to load earnings',
        }));
      }
    },

    /**
     * Reset the twin store
     */
    reset(): void {
      set(initialState);
    },
  };
}

// -------------------------------------------------------------------
// Exports
// -------------------------------------------------------------------

export const twinStore = createTwinStore();

// Derived stores for common use cases
export const hasTwin = derived(
  twinStore,
  $twin => $twin.twin !== null
);

export const twinStatus = derived(
  twinStore,
  $twin => $twin.twin?.status ?? null
);

export const twinCompletionScore = derived(
  twinStore,
  $twin => $twin.twin?.completionScore ?? 0
);

export const twinIsPublic = derived(
  twinStore,
  $twin => $twin.twin?.preferences.isPublic ?? false
);

export const connectedAccountsCount = derived(
  twinStore,
  $twin => $twin.connectedAccounts.length
);
