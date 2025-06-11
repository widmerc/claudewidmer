import { Post } from "../app/interfaces/post";
import { promises as fs } from "fs";
import { join } from "path";

const postsDirectory = join(process.cwd(), "src/blogs");

export async function getPostSlugs(): Promise<string[]> {
  return await fs.readdir(postsDirectory);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const realSlug = slug.replace(/\.mdx$/, '');
  // Korrigierter Import-Pfad für Next.js/MDX
  const postModule = await import(`@/blogs/${realSlug}.mdx`);
  const data = postModule.metadata || {};
  const content = ''; // Optional: Du kannst das MDX-File als Komponente rendern, aber "content" ist für Vorschau meist leer

  // Lesezeit grob schätzen (optional, da kein reiner Markdown-Text)
  const wordCount = data.excerpt ? data.excerpt.trim().split(/\s+/).length : 0;
  const readingTime = wordCount ? Math.ceil(wordCount / 200) : 1;

  return {
    slug: realSlug,
    title: data.title || realSlug,
    date: data.date || '',
    coverImage: data.coverImage || '',
    author: data.author || { name: '', picture: '' },
    excerpt: data.excerpt || '',
    ogImage: data.ogImage || { url: '' },
    content,
    preview: data.preview || false,
    tags: data.tags || [],
    readingTime,
  } as Post;
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

  return posts.sort((b: Post, a: Post) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}


export async function getAdjacentPosts(slug: string): Promise<{
  prev: Post | null;
  next: Post | null;
}> {
  const posts = await getAllPosts();
  const currentIndex = posts.findIndex((p) => p.slug === slug);
  if (currentIndex === -1) return { prev: null, next: null };

  const currentPost = posts[currentIndex];
  const currentTags = new Set(currentPost.tags ?? []);

  function hasCommonTag(post: Post): boolean {
    return (post.tags ?? []).some((tag: string) => currentTags.has(tag));
  }

  let prev: Post | null = null;
  let next: Post | null = null;

  // Suche nach vorherigem passenden Post
  for (let i = currentIndex + 1; i < posts.length; i++) {
    if (hasCommonTag(posts[i])) {
      prev = posts[i];
      break;
    }
  }

  // Suche nach nächstem passenden Post
  for (let i = currentIndex - 1; i >= 0; i--) {
    if (hasCommonTag(posts[i])) {
      next = posts[i];
      break;
    }
  }

  return { prev, next };
}
