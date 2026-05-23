import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    // Login functionality is currently disabled
    throw redirect(302, '/');
};
