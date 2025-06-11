import fs from 'node:fs/promises'
import path from 'node:path'
import type { Metadata } from 'next/types'

export type BlogPostMetadata = Metadata & {
  title: string
  excerpt?: string
  description?: string
  coverImage?: string
  date: string | Date
  author?: {
    name: string
    picture?: string
  }
  ogImage?: {
    url: string
  }
  tags?: string[]
  [key: string]: any // Für weitere optionale Felder
}

export type BlogPostData = {
  slug: string
  metadata: BlogPostMetadata
  component: React.FC
}

export const getBlogPost = async (slug: string): Promise<BlogPostData> => {
  const post = await import(`@/blogs/${slug}.mdx`)
  const data = post.metadata

  if (!data.title) {
    throw new Error(`Missing required metadata field 'title' in: ${slug}`)
  }

  const metadata: BlogPostMetadata = {
    ...data,
    date: data.date ? new Date(data.date) : undefined,
    updatedDate: data.updatedDate ? new Date(data.updatedDate) : undefined,
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

  return Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, '')
      const { metadata } = await getBlogPost(slug)
      return {
        slug,
        metadata,
      }
    }),
  )
}
