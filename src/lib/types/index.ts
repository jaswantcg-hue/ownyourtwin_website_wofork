/**
 * Type definitions index
 * Re-exports all types for convenient importing
 */

export * from './user';
export * from './twin';
export * from './chat';
export * from './api';

// Explorer service types
export interface ExplorerService {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: ServiceCategory;
  isAvailable: boolean;
  isPremium: boolean;
  features: string[];
}

export type ServiceCategory =
  | 'wellness'
  | 'creativity'
  | 'social'
  | 'productivity'
  | 'insights';

// Focus music types
export interface FocusTrack {
  id: string;
  title: string;
  type: 'focus' | 'concentration' | 'sleep' | 'meditation';
  duration: number;
  audioUrl: string;
  imageUrl: string;
  isPersonalized: boolean;
  mood: string;
}

// Peer matching types
export interface PeerMatch {
  id: string;
  userId: string;
  matchScore: number;
  commonTraits: string[];
  commonInterests: string[];
  connectionStatus: 'suggested' | 'pending' | 'connected' | 'declined';
  matchedAt: Date;
}

// Cognitive reframing types
export interface ReframingSession {
  id: string;
  originalThought: string;
  cognitiveDistortions: CognitiveDistortion[];
  reframedThoughts: string[];
  selectedReframe?: string;
  createdAt: Date;
  effectiveness?: number;
}

export interface CognitiveDistortion {
  type: string;
  description: string;
  example: string;
}

// Chart data types for dashboard
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface TimeSeriesData {
  timestamp: Date;
  value: number;
  label?: string;
}

// Navigation types
export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: string | number;
  isActive?: boolean;
}

// Toast notification types
export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  dismissible?: boolean;
}

// Modal state types
export interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: unknown;
  onConfirm?: () => void;
  onCancel?: () => void;
}
