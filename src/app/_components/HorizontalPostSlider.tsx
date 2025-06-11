'use client';

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
  tag: string; // ← wir brauchen den Tag für eindeutige IDs
};

export default function HorizontalPostSlider({ posts, tag }: Props) {
  const prevId = `#prev-${tag}`;
  const nextId = `#next-${tag}`;

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <div className="absolute -left-5 top-1/2 z-10">
        <button
          id={`prev-${tag}`}
          className="bg-white text-gray-800 border rounded-full w-10 h-10 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          ‹
        </button>
      </div>
      <div className="absolute -right-5 top-1/2 z-10">
        <button
          id={`next-${tag}`}
          className="bg-white text-gray-800 border rounded-full w-10 h-10 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          ›
        </button>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevId,
          nextEl: nextId,
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
        {posts.map((post) => (
          <SwiperSlide key={post.slug} className="h-[420px] flex">
            <Link href={`/blog/${post.slug}`} className="block h-full w-full">
              <div className="flex flex-col h-full bg-white border-4 border-gray-200 rounded-xl overflow-hidden hover:border-accent-1 shadow hover:shadow-lg transition-all duration-300">
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
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(post.date).toLocaleDateString('de-CH', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                    {post.readingTime && ` • Lesezeit: ${post.readingTime} Min.`}
                  </p>
                  {post.excerpt && (
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {post.excerpt}
                    </p>
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
