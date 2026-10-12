import { getPosts } from '$lib/server/posts';

/** @type {import('./$types').PageServerLoad} */
export function load() {
    const posts = getPosts();
    return {
        posts
    };
}

export const prerender = process.env.BUILD_TARGET === 'github-pages';
export const trailingSlash = process.env.BUILD_TARGET === 'github-pages' ? 'always' : 'never';
