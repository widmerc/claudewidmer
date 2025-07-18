import { getAllPosts } from "@/lib/api";
import PostList from "@/app/_components//PostList";
import PageWrapper from "@/app/_components/PageWrapper";

export default async function BlogPostSlider() {
  const posts = await getAllPosts();

  return (
    <section>
      <PageWrapper>
        <p className="text-lg text-gray-700 mb-5 max-w-2xl mx-auto">
          Hier findest du eine Übersicht meiner Beiträge zu GIS, Daten, Programmierung & Webtechnologien.
        </p>
        <PostList
          posts={posts.map(post => ({
            ...post,
            author: typeof post.author === 'object' && post.author !== null
              ? { name: post.author.name, picture: post.author.picture }
              : { name: String(post.author), picture: '' },
            ogImage: typeof post.ogImage === 'object' && post.ogImage !== null
              ? post.ogImage.url
              : String(post.ogImage)
          }))}
          showTagFilter={true}
        />
        <div className="flex justify-center mt-6">
          <a
            href="/blog_overview"
            className="inline-block px-6 py-1 rounded-full border-2 border-accent-3 text-accent-3 font-extrabold text-lg tracking-wide bg-white shadow-md hover:bg-accent-3 hover:text-white hover:shadow-lg transition-all duration-200"
            style={{ fontFamily: 'Montserrat, Inter, Arial, sans-serif' }}
          >
            Alle Blogposts ansehen
          </a>
        </div>
      </PageWrapper>
    </section>
  );
};
