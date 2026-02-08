/**
 * Google OAuth Callback Endpoint
 * 
 * Handles the OAuth redirect from Google Sign-In.
 * 
 * Setup:
 * 1. Create a Google Cloud project at https://console.cloud.google.com
 * 2. Enable Google OAuth 2.0 API
 * 3. Create OAuth credentials with redirect URI: /api/auth/google/callback
 * 4. Set environment variables:
 *    - GOOGLE_CLIENT_ID
 *    - GOOGLE_CLIENT_SECRET
 *    - PUBLIC_BASE_URL (your app's base URL)
 */

import { json, redirect, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/**
 * GET /api/auth/google
 * 
 * Redirects user to Google OAuth authorization page.
 * Call this endpoint to start the Google Sign-In flow.
 */
export const GET: RequestHandler = async ({ url }) => {
    const clientId = env.GOOGLE_CLIENT_ID;
    const redirectUri = `${env.PUBLIC_BASE_URL || url.origin}/api/auth/google/callback`;

    if (!clientId) {
        return json({ error: 'Google OAuth not configured' }, { status: 500 });
    }

    // Generate random state for CSRF protection
    const state = crypto.randomUUID();

    // Build Google OAuth URL
    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: 'openid email profile',
        state: state,
        access_type: 'offline',
        prompt: 'consent',
    });

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

    // Redirect to Google
    throw redirect(302, authUrl);
};
