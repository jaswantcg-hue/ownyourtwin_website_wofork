import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { ADMIN_PASSWORD, ADMIN_SECRET } from '$env/static/private';

export const load: PageServerLoad = async ({ cookies }) => {
  // Already logged in → go straight to dashboard
  if (cookies.get('admin_session') === ADMIN_SECRET) {
    redirect(302, '/admin/signups');
  }
  return {};
};

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const password = data.get('password')?.toString() ?? '';

    if (password !== ADMIN_PASSWORD) {
      return fail(401, { error: 'Invalid password' });
    }

    cookies.set('admin_session', ADMIN_SECRET, {
      path: '/admin',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 hours
    });

    redirect(302, '/admin/signups');
  },

  logout: async ({ cookies }) => {
    cookies.delete('admin_session', { path: '/admin' });
    redirect(302, '/admin');
  },
};
