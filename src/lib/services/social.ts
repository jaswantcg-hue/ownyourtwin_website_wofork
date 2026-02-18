/**
 * Social Media Service
 * 
 * Utilities for connecting and retrieving data from social platforms.
 * This module provides the structure for OAuth flows and data fetching.
 * 
 * Supported platforms:
 * - LinkedIn: Professional profile, connections, skills
 * - Instagram: Posts, followers (requires Facebook Business API)
 * - Reddit: Posts, comments, subreddits
 * - Facebook: Profile, posts (requires Business API)
 * 
 * Note: Each platform requires separate OAuth app registration.
 * See individual function documentation for setup instructions.
 */

// -----------------------------------------------------------------
// Types
// -----------------------------------------------------------------

/**
 * Supported social platforms
 */
export type SocialPlatform = 'linkedin' | 'instagram' | 'reddit' | 'facebook' | 'twitter' | 'github';

/**
 * OAuth token response from social platforms
 */
export interface OAuthTokenResponse {
    accessToken: string;
    refreshToken?: string;
    expiresIn: number;
    tokenType: string;
}

/**
 * LinkedIn profile data structure
 */
export interface LinkedInProfile {
    id: string;
    firstName: string;
    lastName: string;
    headline?: string;
    profilePicture?: string;
    email?: string;
    connections?: number;
    skills?: string[];
    positions?: Array<{
        title: string;
        company: string;
        startDate?: string;
        endDate?: string;
        description?: string;
    }>;
}

/**
 * Generic social profile for consistent interface
 */
export interface SocialProfile {
    platform: SocialPlatform;
    platformUserId: string;
    displayName: string;
    username?: string;
    profileUrl?: string;
    avatarUrl?: string;
    bio?: string;
    followersCount?: number;
    rawData?: Record<string, unknown>;
}

/**
 * Connection result
 */
export interface ConnectionResult {
    success: boolean;
    profile?: SocialProfile;
    error?: string;
}

// -----------------------------------------------------------------
// LinkedIn Integration
// -----------------------------------------------------------------

/**
 * Generate LinkedIn OAuth authorization URL
 * 
 * Use this to redirect users to LinkedIn for authorization.
 * 
 * Setup instructions:
 * 1. Go to https://www.linkedin.com/developers/apps
 * 2. Create a new app and get Client ID and Client Secret
 * 3. Set redirect URI to your callback URL (e.g., /api/social/linkedin/callback)
 * 4. Add environment variables: LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET
 * 
 * @param clientId - LinkedIn application client ID
 * @param redirectUri - Callback URL for OAuth response
 * @param state - Random state parameter for CSRF protection
 * @returns Authorization URL to redirect users to
 */
export function getLinkedInAuthUrl(
    clientId: string,
    redirectUri: string,
    state: string
): string {
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        redirect_uri: redirectUri,
        state: state,
        scope: 'openid profile email',
    });

    return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
}

/**
 * Exchange LinkedIn authorization code for access token
 * 
 * Call this in your OAuth callback handler after user authorizes.
 * 
 * @param code - Authorization code from LinkedIn callback
 * @param clientId - LinkedIn application client ID
 * @param clientSecret - LinkedIn application client secret
 * @param redirectUri - Same redirect URI used in authorization
 * @returns Promise resolving to OAuth token response
 * @throws Error if token exchange fails
 */
export async function exchangeLinkedInCode(
    code: string,
    clientId: string,
    clientSecret: string,
    redirectUri: string
): Promise<OAuthTokenResponse> {
    const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
        }),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(`LinkedIn token exchange failed: ${error.error_description || response.statusText}`);
    }

    const data = await response.json();

    return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in,
        tokenType: data.token_type,
    };
}

/**
 * Fetch LinkedIn user profile
 * 
 * Retrieves the authenticated user's profile information.
 * Requires a valid access token from the OAuth flow.
 * 
 * @param accessToken - LinkedIn access token
 * @returns Promise resolving to LinkedIn profile data
 * @throws Error if profile fetch fails
 */
export async function fetchLinkedInProfile(accessToken: string): Promise<LinkedInProfile> {
    // Fetch basic profile using OpenID Connect userinfo endpoint
    const response = await fetch('https://api.linkedin.com/v2/userinfo', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error(`LinkedIn profile fetch failed: ${response.statusText}`);
    }

    const data = await response.json();

    return {
        id: data.sub,
        firstName: data.given_name || '',
        lastName: data.family_name || '',
        email: data.email,
        profilePicture: data.picture,
    };
}

/**
 * Convert LinkedIn profile to generic SocialProfile
 * 
 * @param linkedInProfile - LinkedIn-specific profile data
 * @returns Generic SocialProfile object
 */
export function linkedInToSocialProfile(linkedInProfile: LinkedInProfile): SocialProfile {
    return {
        platform: 'linkedin',
        platformUserId: linkedInProfile.id,
        displayName: `${linkedInProfile.firstName} ${linkedInProfile.lastName}`,
        avatarUrl: linkedInProfile.profilePicture,
        bio: linkedInProfile.headline,
        rawData: linkedInProfile as unknown as Record<string, unknown>,
    };
}

// -----------------------------------------------------------------
// Instagram Integration (via Facebook Graph API)
// -----------------------------------------------------------------

/**
 * Generate Instagram OAuth authorization URL
 * 
 * Instagram uses the Facebook Graph API for authentication.
 * 
 * Setup instructions:
 * 1. Go to https://developers.facebook.com/apps
 * 2. Create a Facebook app and add Instagram Basic Display product
 * 3. Get client ID and secret
 * 4. Set environment variables: INSTAGRAM_CLIENT_ID, INSTAGRAM_CLIENT_SECRET
 * 
 * @param clientId - Instagram/Facebook app client ID
 * @param redirectUri - Callback URL
 * @param state - CSRF state parameter
 * @returns Authorization URL
 */
export function getInstagramAuthUrl(
    clientId: string,
    redirectUri: string,
    state: string
): string {
    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: 'user_profile,user_media',
        response_type: 'code',
        state: state,
    });

    return `https://api.instagram.com/oauth/authorize?${params.toString()}`;
}

// -----------------------------------------------------------------
// Reddit Integration
// -----------------------------------------------------------------

/**
 * Generate Reddit OAuth authorization URL
 * 
 * Setup instructions:
 * 1. Go to https://www.reddit.com/prefs/apps
 * 2. Create a new app (choose "web app")
 * 3. Get client ID and secret
 * 4. Set environment variables: REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET
 * 
 * @param clientId - Reddit app client ID
 * @param redirectUri - Callback URL
 * @param state - CSRF state parameter
 * @returns Authorization URL
 */
export function getRedditAuthUrl(
    clientId: string,
    redirectUri: string,
    state: string
): string {
    const params = new URLSearchParams({
        client_id: clientId,
        response_type: 'code',
        state: state,
        redirect_uri: redirectUri,
        duration: 'permanent',
        scope: 'identity read mysubreddits',
    });

    return `https://www.reddit.com/api/v1/authorize?${params.toString()}`;
}

// -----------------------------------------------------------------
// Mock Data for Development
// -----------------------------------------------------------------

/**
 * Generate mock profile data for development/testing
 * 
 * Use this when actual OAuth is not configured.
 * Simulates a successful connection with realistic data.
 * 
 * @param platform - Platform to generate mock data for
 * @returns Mock SocialProfile
 */
export function getMockProfile(platform: SocialPlatform): SocialProfile {
    const mockProfiles: Record<SocialPlatform, SocialProfile> = {
        linkedin: {
            platform: 'linkedin',
            platformUserId: 'mock_linkedin_123',
            displayName: 'John Smith',
            username: 'john-smith',
            profileUrl: 'https://linkedin.com/in/john-smith',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=linkedin',
            bio: 'Senior Software Engineer at Tech Company',
            followersCount: 500,
        },
        instagram: {
            platform: 'instagram',
            platformUserId: 'mock_instagram_456',
            displayName: 'John Smith',
            username: 'johnsmith',
            profileUrl: 'https://instagram.com/johnsmith',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=instagram',
            bio: 'Photography enthusiast | Tech lover',
            followersCount: 1200,
        },
        reddit: {
            platform: 'reddit',
            platformUserId: 'mock_reddit_789',
            displayName: 'u/johnsmith',
            username: 'johnsmith',
            profileUrl: 'https://reddit.com/u/johnsmith',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=reddit',
            bio: 'Redditor since 2020',
        },
        facebook: {
            platform: 'facebook',
            platformUserId: 'mock_facebook_101',
            displayName: 'John Smith',
            username: 'johnsmith',
            profileUrl: 'https://facebook.com/johnsmith',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=facebook',
        },
        twitter: {
            platform: 'twitter',
            platformUserId: 'mock_twitter_102',
            displayName: 'John Smith',
            username: 'johnsmith',
            profileUrl: 'https://twitter.com/johnsmith',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=twitter',
            bio: 'Tweeting about tech and life',
            followersCount: 850,
        },
        github: {
            platform: 'github',
            platformUserId: 'mock_github_103',
            displayName: 'John Smith',
            username: 'johnsmith',
            profileUrl: 'https://github.com/johnsmith',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=github',
            bio: 'Open source enthusiast',
            followersCount: 200,
        },
    };

    return mockProfiles[platform];
}

/**
 * Simulate connecting to a social platform (for development)
 * 
 * @param platform - Platform to connect
 * @returns Promise resolving to connection result with mock data
 */
export async function mockConnectPlatform(platform: SocialPlatform): Promise<ConnectionResult> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    // 95% success rate for realistic testing
    if (Math.random() > 0.95) {
        return {
            success: false,
            error: 'Connection timed out. Please try again.',
        };
    }

    return {
        success: true,
        profile: getMockProfile(platform),
    };
}
