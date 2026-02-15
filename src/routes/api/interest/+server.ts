import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export async function POST({ request }) {
  try {
    const { type = 'general' } = await request.json();

    await prisma.interestLog.create({
      data: {
        type,
      },
    });

    return json({ success: true });
  } catch (error) {
    console.error('Error logging interest:', error);
    return json({ success: false, error: 'Failed to log interest' }, { status: 500 });
  }
}
