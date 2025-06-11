'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import BlogPostCard from '@/app/_components/BlogPostCard';

type Post = {
  title: string;
  date: string;
  slug: string;
  coverImage?: string;
  excerpt?: string;
  tags?: string[];
  readingTime?: number;
};

type Props = {
  posts: Post[];
  showTagFilter?: boolean;
};

export default function PostList({ posts, showTagFilter = true }: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags ?? [])));

  const filteredPosts =
    showTagFilter && selectedTag
      ? posts.filter((p) => p.tags?.includes(selectedTag))
      : posts;

  return (
    <div className="relative">
      {/* Tag-Filter */}
      {showTagFilter && allTags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-3 py-1 rounded-full text-sm transition ${
                selectedTag === tag
                  ? 'bg-accent-1 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              #{tag}
            </button>
          ))}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="absolute -left-6 top-1/2 z-10">
          <button className="swiper-prev bg-white dark:bg-gray-800 text-gray-800 dark:text-white border rounded-full w-12 h-12 shadow hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-accent-1 hover:font-bold border-2 text-2xl font-semibold transition flex items-center justify-center">
            ‹
          </button>
        </div>
        <div className="absolute -right-7 top-1/2 z-10">
          <button className="swiper-next bg-white dark:bg-gray-800 text-gray-800 dark:text-white border rounded-full w-12 h-12 shadow hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-accent-1 hover:font-bold border-2 text-2xl font-semibold transition flex items-center justify-center">
            ›
          </button>
        </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: '.swiper-prev',
          nextEl: '.swiper-next',
        }}
        loop={false}
        spaceBetween={30}
        speed={800}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 1.5 },
          1024: { slidesPerView: 2 },
          1280: { slidesPerView: 2.5 },
        }}
      >
        {filteredPosts.map((post) => (
          <SwiperSlide key={post.slug} className="h-[420px] flex">
            <BlogPostCard post={post} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
