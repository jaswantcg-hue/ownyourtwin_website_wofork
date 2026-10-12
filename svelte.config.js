import adapterNode from '@sveltejs/adapter-node';
import adapterStatic from '@sveltejs/adapter-static';

const isGitHubPages = process.env.BUILD_TARGET === 'github-pages';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: isGitHubPages ? adapterStatic({ fallback: '404.html' }) : adapterNode(),
		paths: {
			base: process.env.BASE_PATH ?? '',
			relative: isGitHubPages ? false : undefined
		},
		...(isGitHubPages
			? {
					prerender: {
						crawl: false,
						entries: ['/', '/forBusiness', '/blog']
					}
				}
			: {})
	}
};

export default config;
