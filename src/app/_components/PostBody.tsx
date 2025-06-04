// app/_components/post-body.tsx

type Props = {
  content: string;
};

export default function PostBody({ content }: Props) {
  return (
  <div
    className="prose prose-lg max-w-none dark:prose-invert"
    dangerouslySetInnerHTML={{ __html: content }}
  />
  );
}
