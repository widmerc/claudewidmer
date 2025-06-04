import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm"; // für Listen, Tabellen, etc.
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import matter from "gray-matter";

export default async function parseMarkdown(markdown: string) {
  const { content, data } = matter(markdown);

  const result = await remark()
    .use(remarkFrontmatter, ["yaml"])
    .use(remarkGfm) // ✅ für Aufzählungen, Checkboxen, Tabellen usw.
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return {
    html: result.toString(),
    metadata: data,
  };
}
