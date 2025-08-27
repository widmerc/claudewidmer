import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <Image
      src={src}
      alt={title}
      className={cn("cover-image shadow-sm w-full h-auto", {
        "hover:shadow-lg transition-shadow duration-200": slug,
      })}
      width={1300}
      height={630}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
      // Next.js liefert automatisch moderne Formate wie WebP/AVIF
      loading={slug ? 'lazy' : undefined}
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/blogs/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
