// import { unified } from "unified";
// import remarkParse from "remark-parse";
// import remarkGfm from "remark-gfm";
// import remarkFrontmatter from "remark-frontmatter";
// import remarkRehype from "remark-rehype";
// import rehypeRaw from "rehype-raw";
// import rehypeStringify from "rehype-stringify";
// import { rehypePrettyCode } from "rehype-pretty-code";
// import { transformerCopyButton } from "@rehype-pretty/transformers";
// import matter from "gray-matter";

// type ParsedMarkdown = {
//   html: string;
//   metadata: Record<string, unknown>;
// };

// export default async function parseMarkdown(markdown: string): Promise<ParsedMarkdown> {
//   const { content, data } = matter(markdown);

//   const processor = unified()
//     .use(remarkParse)
//     .use(remarkFrontmatter, ["yaml"])
//     .use(remarkGfm)
//     .use(remarkRehype, { allowDangerousHtml: true })
//     .use(rehypeRaw)
//     .use(rehypePrettyCode, {
//       theme: undefined, // Wichtig: verhindert Einbindung des Theme-CSS
//       keepBackground: false,
//       transformers: [
//         transformerCopyButton({
//           visibility: "always",
//           feedbackDuration: 2000,
//         }),
//       ],
//     })
//     .use(rehypeStringify);

//   const html = (await processor.process(content)).toString();

//   return {
//     html,
//     metadata: data,
//   };
// }
