import { getAllPosts } from "@/lib/api";
import PageWrapper from "@/app/_components/PageWrapper";
import BlogSearchAndList from "../blogs/BlogSearchAndList";
import { SectionSeparator } from "@/app/_components/section-separator";
import FadeInOnScroll from "@/app/_components/FadeInOnScroll";

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
      <SectionSeparator text={`Alle Blogs`} />

      <FadeInOnScroll>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
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
