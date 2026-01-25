/**
 * User-related type definitions
 * Contains all types for user authentication, profile, and preferences
 */

// User authentication status
export type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';

// User profile interface
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  lastLogin: Date;
  preferences: UserPreferences;
  connectedAccounts: ConnectedAccount[];
}

// User preferences for app settings
export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  language: string;
}

// Notification preferences
export interface NotificationSettings {
  email: boolean;
  push: boolean;
  insightAlerts: boolean;
  earningsAlerts: boolean;
  weeklyDigest: boolean;
}

// Privacy settings for data sharing
export interface PrivacySettings {
  twinPublic: boolean; // Allow twin to be used in market research
  shareInsights: boolean; // Share aggregated insights
  allowPeerMatching: boolean; // Allow peer matching feature
}

// Social media and external account connections
export interface ConnectedAccount {
  id: string;
  platform: SocialPlatform;
  username: string;
  connectedAt: Date;
  lastSync: Date;
  status: ConnectionStatus;
  dataImported: boolean;
}

// Supported social platforms for data import
export type SocialPlatform =
  | 'linkedin'
  | 'github'
  | 'notion'
  | 'obsidian'
  | 'twitter'
  | 'instagram'
  | 'spotify'
  | 'medium';

// Connection status for external accounts
export type ConnectionStatus = 'connected' | 'pending' | 'disconnected' | 'error';

// Waitlist entry for interested users
export interface WaitlistEntry {
  email: string;
  name: string;
  reason?: string;
  referralSource?: string;
  createdAt: Date;
}

// Login credentials
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Registration data
export interface RegistrationData {
  email: string;
  password: string;
  name: string;
  acceptTerms: boolean;
  acceptDataConsent: boolean;
}
