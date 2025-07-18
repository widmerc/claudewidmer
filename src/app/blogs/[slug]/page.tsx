import { Metadata } from 'next/types'

import { getBlogPost, listBlogPosts } from '@/lib/mdx'
import PageWrapper from '@/app/_components/PageWrapper'
import Container from '@/app/_components/container'
import CoverImage from '@/app/_components/cover-image'
import MdxLayout from '@/app/_components/mdx-layout'
import FadeInOnScroll from '@/app/_components/FadeInOnScroll';
import Favicon from '@/app/_components/Favicon';



type BlogPageProps = {
  params: Promise<{ slug: string }>
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params
  const { metadata, component: MDXContent } = await getBlogPost(slug)

  const title = metadata.title
  const date = new Date(metadata.date)
  const tags = metadata.tags ?? []
  const author = metadata.author ?? "Unbekannt"
  const authorName = typeof author === "string" ? author : author?.name ?? "Unbekannt"

  const blogPosts = await listBlogPosts()
  const currentIndex = blogPosts.findIndex((post) => post.slug === slug)

  // Find next/prev post with at least one tag in common
  function hasCommonTag(post: typeof blogPosts[number]): boolean {
    if (!post.metadata?.tags || !tags.length) return false;
    return post.metadata.tags.some((tag: string) => tags.includes(tag));
  }
  let prev = null;
  let next = null;
  for (let i = currentIndex - 1; i >= 0; i--) {
    if (hasCommonTag(blogPosts[i])) {
      prev = blogPosts[i];
      break;
    }
  }
  for (let i = currentIndex + 1; i < blogPosts.length; i++) {
    if (hasCommonTag(blogPosts[i])) {
      next = blogPosts[i];
      break;
    }
  }
  // If no prev/next with common tag, show first post from a different hashtag
  function hasDifferentTag(post: typeof blogPosts[number]): boolean {
    if (!post.metadata?.tags) return false;
    return post.metadata.tags.some((tag: string) => !tags.includes(tag));
  }
  if (!prev) {
    prev = blogPosts.find((post) =>
      post.slug !== slug && hasDifferentTag(post)
    ) || null;
  }
  if (!next) {
    next = blogPosts.find((post) =>
      post.slug !== slug && hasDifferentTag(post)
    ) || null;
  }

  return (
    <>
      <Favicon name={title} />
      <main>
        <Container>
          <PageWrapper className="text-left">
            <FadeInOnScroll>
              <h1 className="text-3xl font-bold mb-4 text-gray-800 mt-8">
                {title}
              </h1>
            </FadeInOnScroll>
            <FadeInOnScroll>
              <p className="text-sm text-gray-600 mb-6">
                {new Date(date).toLocaleDateString("de-CH", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })} {" "}
                · von {authorName}
              </p>
            </FadeInOnScroll>
            {metadata.coverImage && (
              <FadeInOnScroll>
                <div className="flex justify-center mb-8">
                  <CoverImage
                    src={metadata.coverImage}
                    title={title}
                    slug={slug}
                  />
                </div>
              </FadeInOnScroll>
            )}
          </PageWrapper>
          <PageWrapper className="text-left">
            <article className='prose prose-base sm:prose-lg max-w-none'>
              <FadeInOnScroll>
                <MdxLayout>
                  <MDXContent />
                </MdxLayout>
              </FadeInOnScroll>
              <FadeInOnScroll>
                <div className="mt-16">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    {prev && prev.slug !== slug ? (
                      <a
                        href={`/blogs/${prev.slug}`}
                        className="group flex-1 sm:flex-none sm:w-1/2 p-4 border rounded-2xl shadow hover:shadow-md transition bg-white border-accent-3 hover:bg-accent-3/10  no-underline"
                      >
                        <span className="block font-semibold text-accent-3 mb-2">← {prev.metadata.title}</span>
                      </a>
                    ) : (
                      <div className="hidden sm:block sm:w-1/2" />
                    )}
                    {next && next.slug !== slug ? (
                      <a
                        href={`/blogs/${next.slug}`}
                        className="group flex-1 sm:flex-none sm:w-1/2 p-4 border rounded-2xl shadow hover:shadow-md transition bg-white border-accent-3 hover:bg-accent-3/10 text-right no-underline"
                      >
                        <span className="block font-semibold text-accent-3 mb-2">{next.metadata.title} →</span>
                      </a>
                    ) : (
                      <div className="hidden sm:block sm:w-1/2" />
                    )}
                  </div>
                </div>
              </FadeInOnScroll>
            </article>
          </PageWrapper>
        </Container>
      </main>
    </>
  )
}

export async function generateStaticParams() {
  const blogPosts = await listBlogPosts()
  const blogStaticParams = blogPosts.map((post) => ({
    slug: post.slug,
  }))
  return blogStaticParams
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params
  const { metadata } = await getBlogPost(slug)

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.tags,
  }
}
