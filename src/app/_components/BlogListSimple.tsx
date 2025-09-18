"use client";

import React from "react";
import HorizontalPostSlider from "@/app/_components/HorizontalPostSlider";

export type Post = {
  title: string;
  date: string;
  slug: string;
  coverImage: string;
  excerpt: string;
  tags: string[];
  readingTime?: string | number;
};

type BlogListSimpleProps = {
  posts: Post[];
  tag?: string;
};

export default function BlogListSimple({ posts, tag = "default" }: BlogListSimpleProps) {
  // Falls keine Posts
  if (!posts || posts.length === 0) {
    return <p className="text-gray-500 text-center">Keine Blogbeiträge gefunden.</p>;
  }

  // Posts passend aufbereiten
  const formattedPosts = posts.map((post) => ({
    title: post.title || "",
    date: post.date || "",
    slug: post.slug || "",
    // some posts may provide ogImage object or string; try to normalise
    coverImage: typeof post.coverImage === "string" ? post.coverImage : "",
    excerpt: post.excerpt || "",
    tags: Array.isArray(post.tags) ? post.tags : [],
    readingTime: typeof post.readingTime === "number" ? post.readingTime : undefined,
  }));

  return (
    <div className="max-w-3xl mx-auto px-4">
      <HorizontalPostSlider posts={formattedPosts} tag={tag} />
    </div>
  );
}
