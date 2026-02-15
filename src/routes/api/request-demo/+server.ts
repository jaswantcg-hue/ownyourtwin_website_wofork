import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, phone, interests } = data;

    if (!name || !email) {
      return json({ error: 'Name and email are required' }, { status: 400 });
    }

    const demoRequest = await prisma.demoRequest.create({
      data: {
        name,
        email,
        phone,
        interests,
      },
    });

    return json({ success: true, data: demoRequest });
  } catch (error) {
    console.error('Error creating demo request:', error);
    
    // Handle unique constraint violation for email if needed
    // But for now, just return specific or generic error
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
        return json({ error: 'This email has already requested a demo.' }, { status: 409 });
    }

    return json({ error: 'Failed to create request' }, { status: 500 });
  }
};
