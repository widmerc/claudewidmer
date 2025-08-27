import { getAllPosts } from "@/lib/api";
import PageWrapper from "@/app/_components/PageWrapper";
import BlogSearchAndList from "@/app/blog_overview/BlogSearchAndList";
import { SectionSeparator } from "@/app/_components/section-separator";
import FadeInOnScroll from "@/app/_components/FadeInOnScroll";
import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.claudewidmer.ch';

export const metadata: Metadata = {
  title: 'Blog Übersicht',
  description: 'Alle Blogbeiträge von Claude Widmer – Themen: Geoinformatik, QGIS, Data Science, Web-GIS & mehr.',
  alternates: { canonical: `${siteUrl}/blog_overview` },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/blog_overview`,
    title: 'Blog Übersicht – Claude Widmer',
    description: 'Alle Blogbeiträge zu Geoinformatik, QGIS, Data Science & Web-GIS.',
  },
  twitter: {
    card: 'summary',
    title: 'Blog Übersicht – Claude Widmer',
    description: 'Alle Blogbeiträge zu Geoinformatik, QGIS, Data Science & Web-GIS.'
  }
};

export default async function BlogByTagPage() {
  const posts = await getAllPosts();

  // Tags gruppieren
  const tagMap: Record<string, typeof posts> = {};
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      if (!tagMap[tag]) tagMap[tag] = [];
      tagMap[tag].push(post);
    });
  });
  const sortedTags = Object.keys(tagMap).sort();
  const featuredTag = "Masterarbeit";
  const featuredPosts = tagMap[featuredTag] || [];

  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'Blogs', item: `${siteUrl}/blog_overview` }
            ]
          })
        }}
      />
      <SectionSeparator text={`Alle Blogs`} />

      <FadeInOnScroll>
        <p className="text-lg text-gray-700 mb-6">
          In meiner Freizeit verfasse ich gerne Blogs zu Themen rund um GIS, Daten,
          Programmierung und Webtechnologien. Unten seht ihr eine Übersicht aller Blogbeiträge, die ich bisher veröffentlicht habe.
        </p>
      </FadeInOnScroll>
      <BlogSearchAndList
        allTags={sortedTags}
        tagMap={tagMap}
        featuredPosts={featuredPosts}
        featuredTag={featuredTag}
      />
    </PageWrapper>
  );
}
