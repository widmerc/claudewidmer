import FadeInOnScroll from '@/app/_components/FadeInOnScroll';
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
   
    ...components,
  }
}
