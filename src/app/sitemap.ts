import type { MetadataRoute } from 'next'
import { listBlogPosts } from '@/lib/mdx'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
		const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.claudewidmer.ch'

	const blogPosts = await listBlogPosts()
		const blogEntries: MetadataRoute.Sitemap = blogPosts.map(post => {
			const baseDate = post.metadata.updatedDate || post.metadata.date
			return {
				url: `${siteUrl}/blogs/${post.slug}`,
				lastModified: baseDate ? new Date(baseDate as Date) : new Date(),
				changeFrequency: 'monthly',
				priority: 0.7,
			}
		})

		const staticEntries: MetadataRoute.Sitemap = [
			{ path: '', freq: 'weekly', priority: 1.0 },
			{ path: '/about', freq: 'monthly', priority: 0.6 },
			{ path: '/blog_overview', freq: 'daily', priority: 0.8 },
		].map(item => ({
			url: `${siteUrl}${item.path || '/'}`,
			lastModified: new Date(),
			changeFrequency: item.freq as MetadataRoute.Sitemap[number]['changeFrequency'],
			priority: item.priority,
		}))

	return [...staticEntries, ...blogEntries]
}
