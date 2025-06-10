import { Post } from "@/interfaces/post";
import { promises as fs } from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export async function getPostSlugs(): Promise<string[]> {
  return await fs.readdir(postsDirectory);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = await fs.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return {
    ...data,
    slug: realSlug,
    content,
    readingTime,
  } as Post;
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

  return posts.sort((b, a) =>
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
    return (post.tags ?? []).some((tag) => currentTags.has(tag));
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
