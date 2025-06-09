import { getAllPosts } from "@/lib/api";
import PostList from "@/app/_components//PostList";
import PageWrapper from "@/app/_components/PageWrapper";

export default async function BlogpostSection() {
  const posts = await getAllPosts();

  return (
    <section>
        <PageWrapper>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Hier findest du eine Übersicht meiner Beiträge zu GIS, Daten, Programmierung & Webtechnologien.
        </p>
        <PostList posts={posts} />
      </PageWrapper>
    </section>
  );
};