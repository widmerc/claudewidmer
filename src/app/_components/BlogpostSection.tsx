import { getAllPosts } from "@/lib/api";
import PostList from "@/app/_components//PostList";
import PageWrapper from "@/app/_components/PageWrapper";

export default async function BlogpostSection() {
  const posts = await getAllPosts();

  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Blogposts
      </h1>
      <p className="text-base text-center mb-6 text-gray-800 dark:text-white">
        Hier findest du eine Übersicht meiner Blogposts:
      </p>
      <PostList posts={posts} />
    </PageWrapper>
  );
}
