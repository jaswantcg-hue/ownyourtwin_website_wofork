import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ADMIN_SECRET } from '$env/static/private';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ cookies }) => {
  if (cookies.get('admin_session') !== ADMIN_SECRET) {
    redirect(302, '/admin');
  }

  const signups = await prisma.demoRequest.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return { signups };
};
