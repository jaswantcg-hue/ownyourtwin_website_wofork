/**
 * API related type definitions
 * Contains types for API requests, responses, and error handling
 */

// Generic API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  metadata?: ResponseMetadata;
}

// API error structure
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Date;
}

// Response metadata
export interface ResponseMetadata {
  requestId: string;
  processingTime: number;
  pagination?: PaginationInfo;
}

// Pagination information
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Request options
export interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
  signal?: AbortSignal;
}

// Authentication tokens
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  tokenType: 'Bearer';
}

// OAuth callback data
export interface OAuthCallbackData {
  provider: string;
  code: string;
  state: string;
  error?: string;
}

// File upload response
export interface FileUploadResponse {
  id: string;
  url: string;
  name: string;
  size: number;
  mimeType: string;
  uploadedAt: Date;
}

// Webhook event types
export type WebhookEventType =
  | 'twin.created'
  | 'twin.updated'
  | 'insight.generated'
  | 'activity.completed'
  | 'earnings.received'
  | 'connection.synced';

// Webhook payload
export interface WebhookPayload {
  event: WebhookEventType;
  timestamp: Date;
  data: Record<string, unknown>;
}

// Rate limit information
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  resetAt: Date;
}

// Health check response
export interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  version: string;
  timestamp: Date;
  services: ServiceHealth[];
}

export interface ServiceHealth {
  name: string;
  status: 'up' | 'down' | 'degraded';
  latency?: number;
}
