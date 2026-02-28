/**
 * Google OAuth Callback Handler
 * 
 * Handles the callback from Google after user authorizes.
 * Exchanges the authorization code for tokens and creates user session.
 */

import { redirect, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/**
 * GET /api/auth/google/callback
 * 
 * Receives OAuth callback from Google with authorization code.
 * Exchanges code for access token, fetches user info, creates session.
 */
export const GET: RequestHandler = async ({ url }) => {
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');

    // Handle OAuth errors
    if (error) {
        console.error('Google OAuth error:', error);
        throw redirect(302, '/create-twin?error=google_auth_failed');
    }

    if (!code) {
        throw redirect(302, '/create-twin?error=no_code');
    }

    const clientId = env.GOOGLE_CLIENT_ID;
    const clientSecret = env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${env.PUBLIC_BASE_URL || url.origin}/api/auth/google/callback`;

    if (!clientId || !clientSecret) {
        console.error('Google OAuth not fully configured');
        throw redirect(302, '/create-twin?error=config_error');
    }

    try {
        // Exchange code for tokens
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
            }),
        });

        if (!tokenResponse.ok) {
            console.error('Token exchange failed:', await tokenResponse.text());
            throw redirect(302, '/create-twin?error=token_error');
        }

        const tokens = await tokenResponse.json();

        // Fetch user info
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${tokens.access_token}`,
            },
        });

        if (!userInfoResponse.ok) {
            throw redirect(302, '/create-twin?error=userinfo_error');
        }

        const userInfo = await userInfoResponse.json();

        // TODO: Create user session, save to database
        // For now, redirect to create-twin with success indicator
        // The frontend will handle the mock user creation

        const allowedEmail = env.ALLOWED_EMAIL;

        // Check for specific restriction
        if (!allowedEmail || userInfo.email !== allowedEmail) {
            console.warn(`Unauthorized login attempt from Google: ${userInfo.email}`);
            throw redirect(302, '/login?error=unauthorized');
        }

        const params = new URLSearchParams({
            google_auth: 'success',
            email: userInfo.email,
            name: userInfo.name,
        });

        throw redirect(302, `/create-twin?${params.toString()}`);

    } catch (err) {
        // If it's a redirect, rethrow it
        if (err instanceof Response || (err as { status?: number })?.status === 302) {
            throw err;
        }

        console.error('Google OAuth callback error:', err);
        throw redirect(302, '/create-twin?error=unknown');
    }
};
