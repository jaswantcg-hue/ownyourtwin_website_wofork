import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email } = data;

    // Basic validation
    if (!name || !email) {
      return json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Logic removed as per request.
    // Database insertion code deleted.
    console.log('Demo request received (no-op):', { name, email });

    return json({ success: true, message: 'Request received' });
  } catch (error) {
    console.error('Error processing demo request:', error);
    return json({ error: 'Failed to process request' }, { status: 500 });
  }
};
