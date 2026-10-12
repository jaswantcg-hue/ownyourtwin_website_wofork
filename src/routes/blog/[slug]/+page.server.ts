import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { getPosts } from '$lib/server/posts';

export const prerender = process.env.BUILD_TARGET === 'github-pages';
export const trailingSlash = process.env.BUILD_TARGET === 'github-pages' ? 'always' : 'never';

export function entries() {
  return getPosts().map(({ slug }) => ({ slug }));
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'src', 'posts', `${slug}.md`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const htmlContent = marked(content);

    return {
      title: data.title || 'Blog Article',
      date: data.date,
      readTime: data.readTime,
      category: data.category,
      content: htmlContent,
      slug
    };
  } catch (err) {
    throw error(404, 'Article not found');
  }
}
