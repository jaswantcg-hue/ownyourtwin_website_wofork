/**
 * Authentication Store
 * Manages user authentication state and related operations
 */

import { writable, derived, type Readable } from 'svelte/store';
import type { User, AuthStatus, LoginCredentials, RegistrationData } from '$lib/types';

// -------------------------------------------------------------------
// Types
// -------------------------------------------------------------------

interface AuthState {
  user: User | null;
  status: AuthStatus;
  error: string | null;
  isInitialized: boolean;
}

interface AuthStore extends Readable<AuthState> {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegistrationData) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  updateUser: (updates: Partial<User>) => void;
}

// -------------------------------------------------------------------
// Initial State
// -------------------------------------------------------------------

const initialState: AuthState = {
  user: null,
  status: 'unauthenticated',
  error: null,
  isInitialized: false,
};

// -------------------------------------------------------------------
// Store Implementation
// -------------------------------------------------------------------

function createAuthStore(): AuthStore {
  const { subscribe, set, update } = writable<AuthState>(initialState);

  return {
    subscribe,

    /**
     * Authenticate user with email and password
     */
    async login(credentials: LoginCredentials): Promise<boolean> {
      update(state => ({ ...state, status: 'loading', error: null }));

      try {
        // Send credentials to the server for verification
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!response.ok) {
          const result = await response.json().catch(() => ({}));
          throw new Error(result.message || 'Invalid email or password');
        }

        // Mock successful login - In a real app, the server would return a token
        const mockUser: User = {
          id: 'user_123',
          email: credentials.email,
          name: credentials.email.split('@')[0],
          createdAt: new Date(),
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
          connectedAccounts: [],
        };

        // Store auth token and user data in localStorage
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('aura_auth_token', 'mock_token_' + Date.now());
          localStorage.setItem('aura_user', JSON.stringify(mockUser));
        }

        update(state => ({
          ...state,
          user: mockUser,
          status: 'authenticated',
          isInitialized: true,
        }));

        return true;
      } catch (error) {
        update(state => ({
          ...state,
          status: 'unauthenticated',
          error: error instanceof Error ? error.message : 'Login failed',
        }));
        return false;
      }
    },

    /**
     * Register a new user account
     */
    async register(data: RegistrationData): Promise<boolean> {
      update(state => ({ ...state, status: 'loading', error: null }));

      try {
        // Restriction: Only allow registration for the special ID
        if (data.email !== 'temp@temp.com') {
          throw new Error('Registration is currently restricted to authorized users only.');
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        const mockUser: User = {
          id: 'user_' + Date.now(),
          email: data.email,
          name: data.name,
          createdAt: new Date(),
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
          connectedAccounts: [],
        };

        // Store auth token and user data in localStorage
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('aura_auth_token', 'mock_token_' + Date.now());
          localStorage.setItem('aura_user', JSON.stringify(mockUser));
        }

        update(state => ({
          ...state,
          user: mockUser,
          status: 'authenticated',
          isInitialized: true,
        }));

        return true;
      } catch (error) {
        update(state => ({
          ...state,
          status: 'unauthenticated',
          error: error instanceof Error ? error.message : 'Registration failed',
        }));
        return false;
      }
    },

    /**
     * Log out the current user
     */
    async logout(): Promise<void> {
      update(state => ({ ...state, status: 'loading' }));

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        // Clear localStorage
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('aura_auth_token');
          localStorage.removeItem('aura_user');
        }

        set({ ...initialState, isInitialized: true });
      } catch (error) {
        console.error('Logout error:', error);
        set({ ...initialState, isInitialized: true });
      }
    },

    /**
     * Check current authentication status
     */
    async checkAuth(): Promise<void> {
      update(state => ({ ...state, status: 'loading' }));

      try {
        // Simulate checking stored token
        await new Promise(resolve => setTimeout(resolve, 500));

        // For demo, check if there's a stored auth token
        const storedAuth = typeof localStorage !== 'undefined'
          ? localStorage.getItem('aura_auth_token')
          : null;

        if (storedAuth) {
          // Restore user session from localStorage
          const storedUser = typeof localStorage !== 'undefined'
            ? localStorage.getItem('aura_user')
            : null;

          if (storedUser) {
            const user = JSON.parse(storedUser);
            // Convert date strings back to Date objects
            user.createdAt = new Date(user.createdAt);
            user.lastLogin = new Date(user.lastLogin);

            update(state => ({
              ...state,
              user,
              status: 'authenticated',
              isInitialized: true,
            }));
          } else {
            update(state => ({
              ...state,
              status: 'authenticated',
              isInitialized: true,
            }));
          }
        } else {
          update(state => ({
            ...state,
            status: 'unauthenticated',
            isInitialized: true,
          }));
        }
      } catch {
        update(state => ({
          ...state,
          status: 'unauthenticated',
          isInitialized: true,
        }));
      }
    },

    /**
     * Clear any authentication errors
     */
    clearError(): void {
      update(state => ({ ...state, error: null }));
    },

    /**
     * Update user profile data
     */
    updateUser(updates: Partial<User>): void {
      update(state => ({
        ...state,
        user: state.user ? { ...state.user, ...updates } : null,
      }));
    },
  };
}

// -------------------------------------------------------------------
// Exports
// -------------------------------------------------------------------

export const authStore = createAuthStore();

// Derived stores for common use cases
export const isAuthenticated = derived(
  authStore,
  $auth => $auth.status === 'authenticated'
);

export const currentUser = derived(
  authStore,
  $auth => $auth.user
);

export const authLoading = derived(
  authStore,
  $auth => $auth.status === 'loading'
);

export const authError = derived(
  authStore,
  $auth => $auth.error
);
