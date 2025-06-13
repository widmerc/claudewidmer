import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypePrettyCode from 'rehype-pretty-code'

// Use the GitHub theme by name as a string (no import needed)

const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
}

const options = {
  keepBackground: false, // keep GitHub background
  theme: 'one-dark-pro',
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [rehypePrettyCode, options],
      rehypeStringify,
      remarkParse,
      remarkRehype,
    ],
  },
})

// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig)
