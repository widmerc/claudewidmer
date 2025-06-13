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

  // Lesezeit anhand des gesamten Blogpost-Textes schätzen
  let readingTime = 1;
  try {
    const filePath = join(postsDirectory, `${realSlug}.mdx`);
    let fileContent = await fs.readFile(filePath, 'utf8');
    // Entferne Metadaten-Export und Import-Zeilen
    fileContent = fileContent.replace(/(^|\n)\s*(import|export const metadata)[^\n]*\n([\s\S]*?\n})?;?\n?/g, '\n');
    // Zähle Bilder (Markdown und MDX)
    const imageCount = (fileContent.match(/!\[[^\]]*\]\([^\)]*\)/g) || []).length + (fileContent.match(/<img\s[^>]*>/gi) || []).length;
    // Entferne alle MDX-Komponenten (z.B. <RevealBox ...>...</RevealBox> und <Component ... />)
    fileContent = fileContent.replace(/<([A-Z][A-Za-z0-9_]*)(\s[^>]*)?\/>/g, ''); // self-closing
    fileContent = fileContent.replace(/<([A-Z][A-Za-z0-9_]*)(\s[^>]*)?>[\s\S]*?<\/\1>/g, ''); // block
    // Entferne Kommentare
    fileContent = fileContent.replace(/<!--([\s\S]*?)-->/g, '');
    // Zähle Wörter
    const words = fileContent.trim().split(/\s+/).filter(Boolean);
    // 1/2 Minute pro Bild zusätzlich
    readingTime = words.length ? Math.max(1, Math.ceil(words.length / 200) + Math.ceil(imageCount * 0.5)) : 1;
  } catch {
    // Fallback: excerpt verwenden
    const wordCount = data.excerpt ? data.excerpt.trim().split(/\s+/).length : 0;
    readingTime = wordCount ? Math.ceil(wordCount / 200) : 1;
  }

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

/**
 * Listet alle Bilddateien in einem Ordner unterhalb von public/img/...
 * @param folder z.B. "/img/Blog1_2"
 * @returns Array der Dateinamen (ohne Pfad)
 */
export async function listImagesInFolder(folder: string): Promise<string[]> {
  if (!folder.startsWith('/img/')) return [];
  try {
    const path = join(process.cwd(), 'public', folder);
    const files = await fs.readdir(path);
    // Nach Dateiname sortieren
    return files.filter(f => /\.(jpe?g|png|webp|gif|svg)$/i.test(f)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
  } catch {
    return [];
  }
}
