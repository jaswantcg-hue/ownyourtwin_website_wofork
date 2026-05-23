import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/server/prisma';
import { sendAcknowledgementEmail } from '$lib/server/email';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, phone, interests } = data;

    if (!name || !email) {
      return json({ error: 'Name and email are required' }, { status: 400 });
    }

    const existing = await prisma.demoRequest.findUnique({ where: { email: String(email) } });
    if (existing) {
      return json({ error: 'Email already registered', field: 'email' }, { status: 409 });
    }

    await prisma.demoRequest.create({
      data: {
        name: String(name),
        email: String(email),
        phone: phone ? String(phone) : null,
        interests: interests ? String(interests) : null,
      },
    });

    // Send acknowledgement email (non-blocking — don't fail the request if email fails)
    sendAcknowledgementEmail(String(email), String(name)).catch((err) =>
      console.error('Failed to send acknowledgement email:', err)
    );

    return json({ success: true, message: 'Request received' });
  } catch (error) {
    console.error('Error processing demo request:', error);
    return json({ error: 'Failed to process request' }, { status: 500 });
  }
};
