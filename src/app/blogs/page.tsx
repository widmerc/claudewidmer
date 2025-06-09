import { getAllPosts } from "@/lib/api";
import PageWrapper from "@/app/_components/PageWrapper";
import BlogSearchAndList from "../blogs/BlogSearchAndList";

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
      <BlogSearchAndList
        allTags={sortedTags}
        tagMap={tagMap}
        featuredPosts={featuredPosts}
        featuredTag={featuredTag}
      />
    </PageWrapper>
  );
}
