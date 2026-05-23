import { getPosts } from '$lib/server/posts';

/** @type {import('./$types').PageServerLoad} */
export function load() {
    const posts = getPosts();
    return {
        posts
    };
}
