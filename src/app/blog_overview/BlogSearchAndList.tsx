"use client";
import FadeInOnScroll from "@/app/_components/FadeInOnScroll";
import { SectionSeparator } from "@/app/_components/section-separator";
import PostList from "@/app/_components/PostList";
import { useState } from "react";

export default function BlogSearchAndList({ allTags, tagMap, featuredPosts = [], featuredTag = "" }: { allTags: string[]; tagMap: Record<string, any[]>; featuredPosts?: any[]; featuredTag?: string }) {
  const [search, setSearch] = useState("");
  // Filter tags for search, but exclude the featuredTag from the main list
  const filteredTags = allTags.filter(tag => tag.toLowerCase().includes(search.toLowerCase()) && tag !== featuredTag);
  return (
    <>
      {featuredPosts.length > 0 && (
        <FadeInOnScroll>
          <div className="mb-12">
            <SectionSeparator text={`Featured: ${featuredTag}`} />
            <PostList posts={featuredPosts} showTagFilter={false} />
          </div>
        </FadeInOnScroll>
      )}
      <FadeInOnScroll>
        <SectionSeparator text="Alle Blogs" />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <p className="text-center text-gray-700 mb-10">
          Hier findest du alle Blogbeiträge thematisch sortiert nach Hashtags.
        </p>
      </FadeInOnScroll>
      <FadeInOnScroll>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Hashtag suchen..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg w-full max-w-xs text-gray-800 bg-white focus:outline-none transition-colors duration-200 hover:border-accent-1 hover:ring-accent-1"
          />
        </div>
      </FadeInOnScroll>
      <div className="space-y-14">
        {filteredTags.map((tag) => (
          <FadeInOnScroll key={tag}>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                #{tag}
              </h2>
              <PostList posts={tagMap[tag]} showTagFilter={false} />
            </div>
          </FadeInOnScroll>
        ))}
        {filteredTags.length === 0 && (
          <div className="text-center text-gray-500 mt-8">Keine passenden Hashtags gefunden.</div>
        )}
      </div>
    </>
  );
}
