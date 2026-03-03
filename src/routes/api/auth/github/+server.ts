/**
 * GitHub OAuth Endpoint
 * 
 * Initiates and handles GitHub OAuth flow.
 * 
 * Setup:
 * 1. Create app at https://github.com/settings/applications/new
 * 2. Get Client ID and Client Secret
 * 3. Add callback URL: /api/auth/github/callback
 * 4. Set environment variables:
 *    - GITHUB_CLIENT_ID
 *    - GITHUB_CLIENT_SECRET
 */

import { json, redirect, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/**
 * GET /api/auth/github
 * 
 * Redirects user to GitHub authorization page.
 */
export const GET: RequestHandler = async ({ url, cookies }) => {
    const clientId = env.GITHUB_CLIENT_ID;
    const redirectUri = `${env.PUBLIC_BASE_URL || url.origin}/api/auth/github/callback`;

    if (!clientId) {
        return json({ error: 'GitHub OAuth not configured' }, { status: 500 });
    }

    // Generate and store state for CSRF protection
    const state = crypto.randomUUID();
    cookies.set('github_oauth_state', state, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 10, // 10 minutes
    });

    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        state: state,
        scope: 'read:user user:email',
    });

    const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;

    throw redirect(302, authUrl);
};
