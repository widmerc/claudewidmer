'use client';

import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

import Link from 'next/link';
import Image from 'next/image';

type Post = {
  title: string;
  date: string;
  slug: string;
  coverImage?: string;
  excerpt?: string;
};

type Props = {
  posts: Post[];
};

export default function PostList({ posts }: Props) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      // @ts-ignore
      swiperInstance.params.navigation.prevEl = prevRef.current;
      // @ts-ignore
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <div className="relative">
      <div className="absolute -left-5 top-1/2 z-10">
        <button
          ref={prevRef}
          className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white border rounded-full w-10 h-10 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          ‹
        </button>
      </div>
      <div className="absolute -right-5 top-1/2 z-10">
        <button
          ref={nextRef}
          className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white border rounded-full w-10 h-10 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          ›
        </button>
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true}}
        spaceBetween={30}
        speed = {1000}
        slidesPerView={2}
        loop
        onSwiper={setSwiperInstance}
      >
        {posts.map((post) => (
          <SwiperSlide key={post.slug}>
            <Link href={`/posts/${post.slug}`} className="block h-full">
            <div className="bg-white dark:bg-gray-800 border-4 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-accent-1 shadow hover:shadow-lg transition-all duration-300 h-full">
                {post.coverImage && (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={800}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{post.date}</p>
                  {post.excerpt && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
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
