import GithubSlugger from "github-slugger";
import { defineDocumentType } from "contentlayer/source-files"
import { Tag } from "./Tag"

// eventually we will use contentlayer's remote content feature to generate
// this from Youtube's API
export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: "projects/*.mdx",
  contentType: "mdx",
  fields: {
    tags: {
      type: "list",
      of: Tag,
    },
    title: { type: "string", required: true },
    slug: { type: "string" },
    description: { type: "string", required: true },
    publishedAt: { type: "string" },
    url: { type: "string", required: true },
    tech: { type: "string", required: false },
    github: { type: "string", required: false }
  },
  computedFields: {
    headings: {
      type: "json",
      resolve: async (doc) => {
        // use same package as rehypeSlug so toc and sluggified headings match
        // https://github.com/rehypejs/rehype-slug/blob/main/package.json#L36
        const slugger = new GithubSlugger()

        // https://stackoverflow.com/a/70802303
        const regXHeader = /\n\n(?<flag>#{1,6})\s+(?<content>.+)/g

        const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
          ({ groups }) => {
            const flag = groups?.flag
            const content = groups?.content
            return {
              heading: flag?.length,
              text: content,
              slug: content ? slugger.slug(content) : undefined,
            }
          },
        )

        return headings
      },
    },
  }
}))
