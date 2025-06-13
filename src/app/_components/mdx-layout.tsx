// https://nextjs.org/docs/pages/guides/mdx

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here: The MDX Content will be overridden by the MDX Layout
  // This is useful for setting up a consistent layout for all MDX content
  return (
    <div>
        {children}
    </div>
  )
}