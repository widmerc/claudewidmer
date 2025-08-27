import type { MetadataRoute } from 'next'
import { listBlogPosts } from '@/lib/mdx'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
		const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.claudewidmer.ch'

	const blogPosts = await listBlogPosts()
	const blogEntries: MetadataRoute.Sitemap = blogPosts.map(post => ({
		url: `${siteUrl}/blogs/${post.slug}`,
		lastModified: post.metadata.date ? new Date(post.metadata.date) : new Date(),
		changeFrequency: 'monthly',
		priority: 0.6,
	}))

	const staticEntries: MetadataRoute.Sitemap = [
		'',
		'/about',
		'/blog_overview',
	].map(path => ({
		url: `${siteUrl}${path.startsWith('/') ? path : '/' + path}`,
		lastModified: new Date(),
		changeFrequency: 'weekly',
		priority: path === '' ? 1.0 : 0.7,
	}))

	return [...staticEntries, ...blogEntries]
}
