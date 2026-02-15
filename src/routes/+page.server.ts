import { getPosts } from '$lib/server/posts';

/** @type {import('./$types').PageServerLoad} */
export function load() {
  const posts = getPosts();
  // Return the top 4 most recent posts
  return {
    recentPosts: posts.slice(0, 4)
  };
}
