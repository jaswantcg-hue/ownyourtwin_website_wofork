export const prerender = process.env.BUILD_TARGET === 'github-pages';
export const trailingSlash = process.env.BUILD_TARGET === 'github-pages' ? 'always' : 'never';
