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
<div className="mt-16">
  <div className="flex flex-col sm:flex-row justify-between gap-4">
    {next ? (
      <a
        href={`/blog/${next.slug}`}
        className="group flex-1 sm:flex-none sm:w-1/2 p-4 border rounded-2xl shadow hover:shadow-md transition bg-white dark:bg-zinc-900 border-accent-3 hover:bg-accent-3/10 dark:hover:bg-accent-3/20"
      >
        <span className="block text-sm text-zinc-500 dark:text-zinc-400 mb-1">Vorheriger Beitrag</span>
        <span className="block font-semibold text-accent-3 dark:text-accent-3 mb-2">← {next.title}</span>
      </a>
    ) : (
      <div className="hidden sm:block sm:w-1/2" />
    )}

    {prev ? (
      <a
        href={`/blog/${prev.slug}`}
        className="group flex-1 sm:flex-none sm:w-1/2 p-4 border rounded-2xl shadow hover:shadow-md transition bg-white dark:bg-zinc-900 border-accent-3 hover:bg-accent-3/10 dark:hover:bg-accent-3/20 text-right"

      >
        <span className="block text-sm text-zinc-500 dark:text-zinc-400 mb-1">Nächster Beitrag</span>
        <span className="block font-semibold text-accent-3 dark:text-accent-3 mb-2">{prev.title} →</span>
      </a>
    ) : (
      <div className="hidden sm:block sm:w-1/2" />
    )}
  </div>
</div>


        </PageWrapper>
      </Container>
    </main>
  );
}
