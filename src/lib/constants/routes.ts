/**
 * Application route constants
 * Centralized route definitions for easy maintenance and type safety
 */

// Public routes (no authentication required)
export const PUBLIC_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  WAITLIST: '/waitlist',
  CREATE_TWIN: '/create-twin',
} as const;

// Protected routes (authentication required)
export const APP_ROUTES = {
  CHAT: '/app/chat',
  DASHBOARD: '/app/dashboard',
  EXPLORER: '/app/explorer',
} as const;

// API routes
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REGISTER: '/api/auth/register',
    REFRESH: '/api/auth/refresh',
    OAUTH: '/api/auth/oauth',
  },
  USER: {
    PROFILE: '/api/user/profile',
    PREFERENCES: '/api/user/preferences',
    CONNECTIONS: '/api/user/connections',
  },
  TWIN: {
    GET: '/api/twin',
    CREATE: '/api/twin/create',
    UPDATE: '/api/twin/update',
    INSIGHTS: '/api/twin/insights',
    ACTIVITIES: '/api/twin/activities',
    EARNINGS: '/api/twin/earnings',
  },
  CHAT: {
    MESSAGES: '/api/chat/messages',
    CONVERSATIONS: '/api/chat/conversations',
    SEND: '/api/chat/send',
  },
  EXPLORER: {
    SERVICES: '/api/explorer/services',
    MUSIC: '/api/explorer/music',
    PEERS: '/api/explorer/peers',
    REFRAME: '/api/explorer/reframe',
  },
} as const;

// External OAuth URLs
export const OAUTH_URLS = {
  LINKEDIN: 'https://www.linkedin.com/oauth/v2/authorization',
  GITHUB: 'https://github.com/login/oauth/authorize',
  GOOGLE: 'https://accounts.google.com/o/oauth2/v2/auth',
} as const;

// Route metadata for navigation
export const ROUTE_META = {
  [PUBLIC_ROUTES.HOME]: {
    title: 'OwnYourTwin - Your Digital Twin',
    description: 'Understand your mind through your digital twin',
  },
  [PUBLIC_ROUTES.LOGIN]: {
    title: 'Login - OwnYourTwin',
    description: 'Sign in to your OwnYourTwin account',
  },
  [PUBLIC_ROUTES.CREATE_TWIN]: {
    title: 'Create Your Twin - OwnYourTwin',
    description: 'Start building your digital twin',
  },
  [APP_ROUTES.CHAT]: {
    title: 'Journal - OwnYourTwin',
    description: 'Chat-based journaling with your digital twin',
  },
  [APP_ROUTES.DASHBOARD]: {
    title: 'Dashboard - OwnYourTwin',
    description: 'View your digital twin insights and activities',
  },
  [APP_ROUTES.EXPLORER]: {
    title: 'Explorer - OwnYourTwin',
    description: 'Explore services powered by your digital twin',
  },
} as const;

// Type helpers for routes
export type PublicRoute = typeof PUBLIC_ROUTES[keyof typeof PUBLIC_ROUTES];
export type AppRoute = typeof APP_ROUTES[keyof typeof APP_ROUTES];
export type AllRoutes = PublicRoute | AppRoute;
