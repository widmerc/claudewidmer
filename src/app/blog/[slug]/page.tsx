// app/blog/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getPostBySlug, getAdjacentPosts } from "@/lib/api";
import parseMarkdown from "@/lib/parseMarkdown";
import Container from "@/app/_components/container";
import PageWrapper from "@/app/_components/PageWrapper";
import PostBody from "@/app/_components/PostBody";
import Navbar from "@/app/_components/Navbar";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  const { html, metadata } = await parseMarkdown(post.content || "");

  const title = metadata.title ?? post.title ?? "Ohne Titel";
  const date = metadata.date ?? post.date ?? new Date().toISOString();
  const author = metadata.author?.name ?? post.author?.name ?? "Unbekannt";
  const coverImage = metadata.coverImage ?? post.coverImage ?? null;

  const { prev, next } = await getAdjacentPosts(slug);

  return (
    <main>


      <Container>
              <Navbar />
        <PageWrapper>
          <h1 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white">
            {title}
          </h1>
          <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-6">
            {new Date(date).toLocaleDateString("de-CH", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}{" "}
            · von {author}
          </p>
          {coverImage && (
            <div className="flex justify-center mb-8">
              <img
                src={coverImage}
                alt={title}
                className="rounded-lg shadow-lg max-h-[400px] w-full object-cover max-w-3xl"
              />
            </div>
          )}
        </PageWrapper>

        <PageWrapper>
          <PostBody content={html} />
          <div className="mt-16 flex justify-between gap-4 flex-wrap">
            {next ? (
              <a
                href={`/blog/${next.slug}`}
                className="p-4 rounded-lg shadow-md transition border-2 cursor-pointer border-accent-2 hover:bg-green-50 dark:border-green-600 dark:hover:bg-green-800 font-bold dark:text-green-300 w-full sm:w-auto"
              >
                ← {next.title}
              </a>
            ) : (
              <div className="w-full sm:w-auto" />
            )}

            {prev ? (
              <a
                href={`/blog/${prev.slug}`}
                className="p-4 rounded-lg shadow-md transition border-2 cursor-pointer border-accent-1 hover:bg-green-50 dark:border-green-600 dark:hover:bg-green-800 dark:text-green-300 font-bold w-full sm:w-auto text-right"
              >
                {prev.title} →
              </a>
            ) : (
              <div className="w-full sm:w-auto" />
            )}
          </div>
        </PageWrapper>
      </Container>
    </main>
  );
}
