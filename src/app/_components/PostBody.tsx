// app/_components/post-body.tsx

type Props = {
  content: string;
};

export default function PostBody({ content }: Props) {
  return (
  <div
  className="markdown-body prose prose-base sm:prose-lg max-w-none"
    dangerouslySetInnerHTML={{ __html: content }}
  />
  );
}
