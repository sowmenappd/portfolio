import {
  allTagSlugs,
  formatPostPreview,
  formatProjectPreview,
} from "@/lib/contentlayer"
import { seo } from "@/lib/seo"
import { CurrentFilters } from "@/lib/types"
import { BlogPostPreview } from "@/ui/BlogPostPreview"
import { Layout } from "@/ui/Layout"
import { Navigation } from "@/ui/Navigation"
import { ProfileImage } from "@/ui/ProfileImage"
import { ProjectPostPreview } from "@/ui/ProjectPostPreview"
import cx from "clsx"
import { allPosts, allProjects, Tag } from "contentlayer/generated"
import type { GetStaticProps, InferGetStaticPropsType } from "next"
import { NextSeo } from "next-seo"
import React from "react"
import { useIntersection } from "react-use"

export const getStaticPaths = () => {
  const paths = [
    // /
    { params: { filter: [] } },
    // /projects
    { params: { filter: ["projects"] } },
    // /blog
    { params: { filter: ["blog"] } },
    // /me
    { params: { filter: ["me"] } },
    // /tag/:tag
    ...allTagSlugs.map((tag) => ({ params: { filter: ["tag", tag] } })),
    // /videos/tag/:tag
    ...allTagSlugs.map((tag) => ({
      params: { filter: ["projects", "tag", tag] },
    })),
    // /blog/tag/:tag
    ...allTagSlugs.map((tag) => ({ params: { filter: ["blog", "tag", tag] } })),
  ]

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
  currentFilters: CurrentFilters
  posts: (
    | ReturnType<typeof formatProjectPreview>
    | ReturnType<typeof formatPostPreview>
  )[]
}> = async ({ params }) => {
  let posts = [
    ...allProjects.map(formatProjectPreview),
    ...allPosts.filter((p) => p.status === "published").map(formatPostPreview),
  ].sort(
    (a, b) => Number(new Date(b.publishedAt!)) - Number(new Date(a.publishedAt!)),
  )

  let currentFilters: CurrentFilters = null

  if (params?.filter && Array.isArray(params.filter)) {
    currentFilters = {}

    let tag: Tag["slug"] | undefined

    if (params.filter[0] === "projects") {
      posts = posts.filter((p) => p.type === "Project")

      currentFilters.type = "project"

      if (params.filter[1] === "tag" && params.filter[2]) {
        tag = params.filter[2] as Tag["slug"]
      }
    } else if (params.filter[0] === "blog") {
      posts = posts.filter((p) => p.type === "Post")

      currentFilters.type = "blog"
      if (params.filter[1] === "tag" && params.filter[2]) {
        tag = params.filter[2] as Tag["slug"]
      }
    } else if (params.filter[0] === "tag" && params.filter[1]) {
      tag = params.filter[1] as Tag["slug"]
    }

    if (tag) {
      currentFilters.tag = tag
      posts = posts.filter((p) => p.tags.find((x: any) => x.slug === tag))
    }
  }

  return { props: { posts, currentFilters } }
}

export default function Home({
  posts,
  currentFilters,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const intersectionRef = React.useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "-100px",
  })

  let showNav = false
  if (currentFilters || (intersection && !intersection.isIntersecting)) {
    showNav = true
  }

  return (
    <>
      {currentFilters ? <NextSeo noindex={true} /> : null}
      <Layout showNav={showNav} currentFilters={currentFilters}>
        <div className="-mt-8 sm:mt-0">
          <div ref={intersectionRef}>
            {!currentFilters ? (
              <div
                className={cx("transition duration-300", {
                  "opacity-0": showNav,
                  "opacity-100": !showNav,
                })}
              >
                <div className="flex items-center space-x-6">
                  <ProfileImage size="large" src="https://github.com/sowmenappd.png" />

                  <div>
                    <h1 className="text-3xl font-medium text-rose-100/80 sm:text-4xl">
                      Sowmen Rahman
                    </h1>
                    <h2 className="align-middle text-lg leading-6 text-rose-100/50">
                      <span className="hidden sm:inline">
                        Engineering
                      </span>
                      <span
                        className="inline sm:hidden"
                        title="Senior Software Engineer"
                      >
                        RnD
                      </span>{" "}
                      at{" "}
                      <span className="font-medium text-rose-100/70">
                        <a target="_blank" href="https://elmosoftware.com.au/">ELMO Software</a>
                      </span>
                    </h2>
                  </div>
                </div>

                <p className="mt-7 text-xl text-rose-100/90 sm:mt-9">
                  {seo.description}
                </p>

                <div className="mt-8 sm:mt-12">
                  <Navigation />
                </div>
              </div>
            ) : null}
          </div>

          <div
            className={cx(
              "space-y-10",
              currentFilters ? "mt-8" : "mt-20 sm:mt-32",
            )}
          >
            {currentFilters ? (
              <>
                <div className="flex space-x-2">
                  {currentFilters.tag ? (
                    <div className="rounded-full border border-rose-100/5 py-0.5 px-2 text-rose-100/90">
                      {currentFilters.tag}
                    </div>
                  ) : null}
                </div>
              </>
            ) : null}

            {posts.map((post) => {
              if (post.type === "Project") {
                return <ProjectPostPreview key={post.title} {...post} />
              }

              if (post.type === "Post") {
                return <BlogPostPreview key={post.slug} {...post} />
              }
            })}
          </div>
        </div>
      </Layout>
    </>
  )
}
