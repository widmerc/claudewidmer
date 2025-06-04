'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import Link from 'next/link';
import Image from 'next/image';

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
};

export default function PostList({ posts }: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags ?? [])));

  const filteredPosts = selectedTag
    ? posts.filter((p) => p.tags?.includes(selectedTag))
    : posts;

  return (
    <div className="relative">
      {/* Tag-Filter */}
      {allTags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-3 py-1 rounded-full text-sm transition ${selectedTag === tag
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
      <div className="absolute -left-5 top-1/2 z-10">
        <button className="swiper-prev bg-white dark:bg-gray-800 text-gray-800 dark:text-white border rounded-full w-10 h-10 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          ‹
        </button>
      </div>
      <div className="absolute -right-5 top-1/2 z-10">
        <button className="swiper-next bg-white dark:bg-gray-800 text-gray-800 dark:text-white border rounded-full w-10 h-10 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition">
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
            <Link href={`/blog/${post.slug}`} className="block h-full w-full">
              <div className="flex flex-col h-full bg-white dark:bg-gray-800 border-4 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-accent-1 shadow hover:shadow-lg transition-all duration-300">
                {post.coverImage && (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={800}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {new Date(post.date).toLocaleDateString('de-CH', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                    {post.readingTime && ` • Lesezeit: ${post.readingTime} Min.`}
                  </p>
                  {post.excerpt && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
