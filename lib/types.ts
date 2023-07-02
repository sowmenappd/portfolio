import { Tag } from "contentlayer/generated"

export type CurrentFilters = {
  type?: "project" | "blog"
  tag?: Tag["slug"]
} | null
