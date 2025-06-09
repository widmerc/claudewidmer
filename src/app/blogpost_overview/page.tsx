import { getAllPosts } from "@/lib/api";
import PageWrapper from "@/app/_components/PageWrapper";
import HorizontalPostSlider from "@/app/_components/HorizontalPostSlider";
import Navbar from "@/app/_components/Navbar";

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

return (
  <>
    <Navbar />

    <PageWrapper>
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Blogposts nach Thema
      </h1>
      <p className="text-center text-gray-700 dark:text-gray-300 mb-10">
        Hier findest du alle Blogbeiträge thematisch sortiert nach Hashtags.
      </p>

      <div className="space-y-14">
        {sortedTags.map((tag) => (
          <div key={tag}>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              #{tag}
            </h2>
            <HorizontalPostSlider posts={tagMap[tag]} tag={tag} />
          </div>
        ))}
      </div>
    </PageWrapper>
  </>
);

}
