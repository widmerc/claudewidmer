import fs from 'node:fs/promises'
import path from 'node:path'
import type { Metadata } from 'next/types'

export type BlogPostMetadata = Metadata & {
  title: string
  excerpt?: string
  description?: string
  coverImage?: string
  date: string | Date
  updatedDate?: string | Date
  author?: {
    name: string
    picture?: string
  }
  ogImage?: {
    url: string
  }
  tags?: string[]
  wordCount?: number
  [key: string]: unknown 
}

export type BlogPostData = {
  slug: string
  metadata: BlogPostMetadata
  component: React.FC
}

export const getBlogPost = async (slug: string): Promise<BlogPostData> => {
  const post = await import(`@/blogs/${slug}.mdx`)
  const data = post.metadata
  // Rohinhalt für wordCount einlesen
  let wordCount: number | undefined = undefined
  try {
    const fullPath = path.join(process.cwd(), 'src', 'blogs', `${slug}.mdx`)
    const raw = await fs.readFile(fullPath, 'utf8')
    const cleaned = raw.replace(/export const metadata = {[\s\S]*?}\s*/, '')
    const words = cleaned
      .replace(/<!--.*?-->/g, ' ')
      .replace(/`{1,3}[\s\S]*?`{1,3}/g, ' ') // Code inline & fenced
      .replace(/<[^>]+>/g, ' ') // rudimentär HTML entfernen
      .match(/\b\w+\b/g)
    wordCount = words ? words.length : 0
  } catch {}

  if (!data.title) {
    throw new Error(`Missing required metadata field 'title' in: ${slug}`)
  }

  const metadata: BlogPostMetadata = {
    ...data,
    date: data.date ? new Date(data.date) : undefined,
    updatedDate: data.updatedDate ? new Date(data.updatedDate) : undefined,
  wordCount,
  }

  return {
    slug,
    metadata,
    component: post.default,
  }
}

export const getBlogPostMetadata = async (
  slug: string,
): Promise<BlogPostMetadata> => {
  const post = await getBlogPost(slug)
  return post.metadata
}

export const listBlogPosts = async (): Promise<
  Omit<BlogPostData, 'component'>[]
> => {
  const files = await fs.readdir(path.join(process.cwd(), 'src/blogs'))

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, '')
      const { metadata } = await getBlogPost(slug)
      return {
        slug,
        metadata,
      }
    }),
  )

  // Sortierung: zuerst nach erstem Tag (Hashtag), dann nach Datum (absteigend)
  return posts.sort((a, b) => {
    const tagA = (a.metadata.tags?.[0] || '').toLowerCase()
    const tagB = (b.metadata.tags?.[0] || '').toLowerCase()
    if (tagA < tagB) return -1
    if (tagA > tagB) return 1
    // Falls Tag gleich, nach Datum absteigend (neueste zuerst)
    const dateA = new Date(a.metadata.date).getTime()
    const dateB = new Date(b.metadata.date).getTime()
    return  dateA - dateB
  })
}
