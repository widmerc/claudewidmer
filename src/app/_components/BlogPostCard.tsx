import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '../interfaces/post';

export default function BlogPostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blogs/${post.slug}`} className="block h-full w-full">
      <div className="flex flex-col h-full bg-white border-2 border-gray-300 rounded-2xl overflow-hidden hover:border-accent-1 shadow hover:shadow-lg transition-all duration-300">
        {post.coverImage && (
          <div className="relative w-full h-64 overflow-hidden flex-shrink-0">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex flex-col min-h-32 overflow-hidden flex-shrink-0">
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
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
