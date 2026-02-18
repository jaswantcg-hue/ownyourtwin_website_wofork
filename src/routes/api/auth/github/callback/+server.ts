/**
 * GitHub OAuth Callback Handler
 * 
 * Handles GitHub OAuth callback, exchanges code for token,
 * and fetches user profile data.
 */

import { redirect, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/**
 * GET /api/auth/github/callback
 * 
 * Handles OAuth callback from GitHub.
 */
export const GET: RequestHandler = async ({ url, cookies }) => {
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');

    // Verify state for CSRF protection
    const storedState = cookies.get('github_oauth_state');
    cookies.delete('github_oauth_state', { path: '/' });

    if (error) {
        console.error('GitHub OAuth error:', error);
        throw redirect(302, '/create-twin?error=github_denied');
    }

    if (!code) {
        throw redirect(302, '/create-twin?error=no_code');
    }

    if (state !== storedState) {
        console.error('GitHub state mismatch');
        throw redirect(302, '/create-twin?error=invalid_state');
    }

    const clientId = env.GITHUB_CLIENT_ID;
    const clientSecret = env.GITHUB_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        console.error('GitHub OAuth not fully configured');
        throw redirect(302, '/create-twin?error=config_error');
    }

    try {
        // Exchange code for access token
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code,
            }),
        });

        if (!tokenResponse.ok) {
            console.error('Token exchange failed:', await tokenResponse.text());
            throw redirect(302, '/create-twin?error=token_error');
        }

        const tokens = await tokenResponse.json();

        if (tokens.error) {
            console.error('GitHub token error:', tokens.error);
            throw redirect(302, '/create-twin?error=github_token_error');
        }

        // Fetch user profile
        const userResponse = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${tokens.access_token}`,
                'User-Agent': 'OwnYourTwin-App',
            },
        });

        if (!userResponse.ok) {
            throw redirect(302, '/create-twin?error=user_fetch_error');
        }

        const userData = await userResponse.json();

        // Fetch user email if not public
        let email = userData.email;
        if (!email) {
            const emailResponse = await fetch('https://api.github.com/user/emails', {
                headers: {
                    'Authorization': `Bearer ${tokens.access_token}`,
                    'User-Agent': 'OwnYourTwin-App',
                },
            });

            if (emailResponse.ok) {
                const emails = await emailResponse.json();
                const primaryEmail = emails.find((e: any) => e.primary && e.verified);
                if (primaryEmail) {
                    email = primaryEmail.email;
                }
            }
        }

        const params = new URLSearchParams({
            github_auth: 'success',
            email: email || '',
            name: userData.name || userData.login,
        });

        throw redirect(302, `/create-twin?${params.toString()}`);

    } catch (err) {
        // If it's a redirect, rethrow it
        if (err instanceof Response || (err as { status?: number })?.status === 302) {
            throw err;
        }

        console.error('GitHub OAuth callback error:', err);
        throw redirect(302, '/create-twin?error=github_failed');
    }
};
