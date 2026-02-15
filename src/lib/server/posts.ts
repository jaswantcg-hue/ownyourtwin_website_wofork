import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  image: string;
  gradient: string;
  accent: string;
  border: string;
  icon: string;
  link: string;
  borderColor?: string;
  categoryColor?: string;
}

export function getPosts(): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), 'src', 'posts');
  
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        date: data.date || '',
        author: data.author || 'OwnYourTwin',
        category: data.category || 'General',
        readTime: data.readTime || '5 min read',
        image: data.image || '',
        gradient: data.gradient || 'from-cosmic-500/10 to-cosmic-600/5',
        accent: data.accent || 'text-cosmic-400',
        border: data.border || 'group-hover:border-cosmic-500/30',
        borderColor: data.border || 'border-cosmic-500/15', // Fallback or map from border
        categoryColor: data.categoryColor || `${data.accent || 'text-cosmic-400'} ${data.gradient ? data.gradient.replace('from-', 'bg-').replace('/10', '/10').split(' ')[0] : 'bg-cosmic-500/10'}`, // Approximate styling
        icon: data.icon || 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
        link: `/blog/${slug}`,
        ...data,
      } as BlogPost;
    });

  // Sort posts by date
  return posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
