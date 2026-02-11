/**
 * LinkedIn OAuth Callback Handler
 * 
 * Handles LinkedIn OAuth callback, exchanges code for token,
 * and fetches user profile data.
 */

import { redirect, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { exchangeLinkedInCode, fetchLinkedInProfile, linkedInToSocialProfile } from '$lib/services/social';

/**
 * GET /api/social/linkedin/callback
 * 
 * Handles OAuth callback from LinkedIn.
 */
export const GET: RequestHandler = async ({ url, cookies }) => {
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');

    // Verify state for CSRF protection
    const storedState = cookies.get('linkedin_oauth_state');
    cookies.delete('linkedin_oauth_state', { path: '/' });

    if (error) {
        console.error('LinkedIn OAuth error:', error);
        throw redirect(302, '/create-twin?error=linkedin_denied&step=2');
    }

    if (!code) {
        throw redirect(302, '/create-twin?error=no_code&step=2');
    }

    if (state !== storedState) {
        console.error('LinkedIn state mismatch');
        throw redirect(302, '/create-twin?error=invalid_state&step=2');
    }

    const clientId = env.LINKEDIN_CLIENT_ID;
    const clientSecret = env.LINKEDIN_CLIENT_SECRET;
    const redirectUri = `${env.PUBLIC_BASE_URL || url.origin}/api/social/linkedin/callback`;

    if (!clientId || !clientSecret) {
        throw redirect(302, '/create-twin?error=config_error&step=2');
    }

    try {
        // Exchange code for access token
        const tokens = await exchangeLinkedInCode(code, clientId, clientSecret, redirectUri);

        // Fetch user profile
        const linkedInProfile = await fetchLinkedInProfile(tokens.accessToken);
        const profile = linkedInToSocialProfile(linkedInProfile);

        // Store profile in session (for now, just indicate success)
        // In production, save to database and create/update user record

        const params = new URLSearchParams({
            linkedin: 'connected',
            step: '2',
        });

        throw redirect(302, `/create-twin?${params.toString()}`);

    } catch (err) {
        // If it's a redirect, rethrow it
        if (err instanceof Response || (err as { status?: number })?.status === 302) {
            throw err;
        }

        console.error('LinkedIn OAuth callback error:', err);
        throw redirect(302, '/create-twin?error=linkedin_failed&step=2');
    }
};
