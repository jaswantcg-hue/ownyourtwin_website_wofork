import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  try {
    const { type = 'general' } = await request.json();

    // Database removed — log interest type for debugging
    console.log('Interest logged:', type);

    return json({ success: true });
  } catch (error) {
    console.error('Error logging interest:', error);
    return json({ success: false, error: 'Failed to log interest' }, { status: 500 });
  }
}
