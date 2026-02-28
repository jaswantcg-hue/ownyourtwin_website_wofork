import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const { email, password } = await request.json();

    const allowedEmail = env.ALLOWED_EMAIL;
    const allowedPassword = env.ALLOWED_PASSWORD;

    if (!allowedEmail || !allowedPassword) {
        console.error('Server configuration error: ALLOWED_EMAIL or ALLOWED_PASSWORD not set');
        throw error(500, 'Server configuration error');
    }

    if (email === allowedEmail && password === allowedPassword) {
        return json({ success: true });
    }

    return json({ success: false, message: 'Invalid email or password' }, { status: 401 });
}
