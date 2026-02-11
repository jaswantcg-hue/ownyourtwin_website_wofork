/**
 * LinkedIn OAuth Endpoint
 * 
 * Initiates and handles LinkedIn OAuth flow.
 * 
 * Setup:
 * 1. Create app at https://www.linkedin.com/developers/apps
 * 2. Get Client ID and Client Secret
 * 3. Add redirect URI: /api/social/linkedin/callback
 * 4. Set environment variables:
 *    - LINKEDIN_CLIENT_ID
 *    - LINKEDIN_CLIENT_SECRET
 */

import { json, redirect, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { getLinkedInAuthUrl } from '$lib/services/social';

/**
 * GET /api/social/linkedin
 * 
 * Redirects user to LinkedIn authorization page.
 */
export const GET: RequestHandler = async ({ url, cookies }) => {
    const clientId = env.LINKEDIN_CLIENT_ID;
    const redirectUri = `${env.PUBLIC_BASE_URL || url.origin}/api/social/linkedin/callback`;

    if (!clientId) {
        return json({ error: 'LinkedIn OAuth not configured' }, { status: 500 });
    }

    // Generate and store state for CSRF protection
    const state = crypto.randomUUID();
    cookies.set('linkedin_oauth_state', state, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 10, // 10 minutes
    });

    const authUrl = getLinkedInAuthUrl(clientId, redirectUri, state);

    throw redirect(302, authUrl);
};
