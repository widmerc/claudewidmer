'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { useState, useEffect } from 'react';
import BlogPostCard from '@/app/_components/BlogPostCard';
import { AnimatePresence, motion } from 'framer-motion';

// Define the Author type here or import it from its correct location
type Author = {
  name: string;
  picture?: string;
};

type Post = {
  title: string;
  date: string;
  slug: string;
  coverImage?: string;
  excerpt?: string;
  tags?: string[];
  readingTime?: number;
  author: Author;
  ogImage: string;
  content: string;
};

type Props = {
  posts: Post[];
  showTagFilter?: boolean;
};

export default function PostList({ posts, showTagFilter = true }: Props) {
//  const swiperRef = useRef<SwiperType | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  // SSR-sicher: uniqueId erst auf dem Client generieren
  const [uniqueId, setUniqueId] = useState('');
  useEffect(() => {
    setUniqueId(window.crypto?.randomUUID?.() || Math.random().toString(36).substring(2, 10));
  }, []);

  // Nach Tag und Datum sortieren (Datum aufsteigend)
  const sortedPosts = [...posts].sort((a, b) => {
    // Zuerst nach erstem Tag alphabetisch
    const tagA = (a.tags?.[0] || '').toLowerCase();
    const tagB = (b.tags?.[0] || '').toLowerCase();
    if (tagA < tagB) return -1;
    if (tagA > tagB) return 1;
    // Dann nach Datum aufsteigend
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const allTags = Array.from(new Set(sortedPosts.flatMap((p) => p.tags ?? [])));

  const filteredPosts =
    showTagFilter && selectedTag
      ? sortedPosts.filter((p) => p.tags?.includes(selectedTag))
      : sortedPosts;

  return (
    <div className="relative">
      {/* Tag-Filter */}
      {showTagFilter && allTags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          <i>Filtern: </i>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-3 py-1 rounded-full text-sm transition ${
                selectedTag === tag
                  ? 'bg-accent-3 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="absolute left-4 top-1/2 z-10">
        <button
          className={`swiper-prev bg-white text-gray-700 border rounded-full w-12 h-12 shadow hover:bg-gray-100 hover:border-accent-3 hover:font-bold border-2 text-2xl font-semibold transition flex items-center justify-center`}
          id={uniqueId ? `swiper-prev-${uniqueId}` : undefined}
          disabled={!uniqueId}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
      <div className="absolute right-4 top-1/2 z-10">
        <button
          className={`swiper-prev bg-white text-gray-700 border rounded-full w-12 h-12 shadow hover:bg-gray-100 hover:border-accent-3 hover:font-bold border-2 text-2xl font-semibold transition flex items-center justify-center`}
          id={uniqueId ? `swiper-next-${uniqueId}` : undefined}
          disabled={!uniqueId}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Swiper */}
      <AnimatePresence mode="wait">
        {uniqueId && (
          <motion.div
            key={selectedTag ?? 'all'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Swiper
              key={selectedTag ?? 'all'}
              modules={[Navigation]}
              navigation={{
                prevEl: `#swiper-prev-${uniqueId}`,
                nextEl: `#swiper-next-${uniqueId}`,
              }}
              loop={false}
              spaceBetween={30}
              speed={800}
              pagination={{ clickable: true }} // Enable bullet pagination
              breakpoints={{
                0: { slidesPerView: 1.5, spaceBetween: 10 }, // Reduced space for smaller screens
                640: { slidesPerView: 1.5, spaceBetween: 15 },
                768: { slidesPerView: 3.5, spaceBetween: 20 },
                1024: { slidesPerView: 3.5, spaceBetween: 30 },
                1280: { slidesPerView: 4.5, spaceBetween: 20 },
              }}
            >
              {filteredPosts.map((post) => (
                <SwiperSlide key={post.slug} className="h-[420px] flex">
                  <BlogPostCard post={{
                    ...post,
                    coverImage: post.coverImage ?? '',
                    excerpt: post.excerpt ?? '',
                    author: {
                      ...post.author,
                      picture: post.author.picture ?? ''
                    },
                    ogImage: typeof post.ogImage === 'string' ? { url: post.ogImage } : post.ogImage
                  }} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}
      </AnimatePresence>

     
    </div>
  );
}
