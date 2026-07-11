import { getPartialProject } from "@/lib/contentlayer"
import { createOgImage } from "@/lib/createOgImage"
import { Layout } from "@/ui/Layout"
import { LikeButton } from "@/ui/LikeButton"
import { components } from "@/ui/MdxComponents"
import { PostMetrics } from "@/ui/PostMetrics"
import clsx from "clsx"
import { allProjects } from "contentlayer/generated"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useMDXComponent } from "next-contentlayer/hooks"
import { NextSeo } from "next-seo"
import { useRouter } from "next/router"

export const getStaticPaths = () => {
  return {
    paths: allProjects.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
  project: ReturnType<typeof getPartialProject>
}> = async ({ params }) => {
  const project = allProjects.find((post) => post.slug === params?.slug)

  if (!project) {
    return { notFound: true }
  }

  return {
    props: {
      project: getPartialProject(project),
    },
  }
}

// Direction 1a — shared sidebar styles
const SIDEBAR_LINK =
  "block text-ink-muted underline-offset-2 transition-colors duration-fast hover:text-ink-primary hover:underline hover:decoration-accent-cool/60"
const SIDEBAR_LABEL = "uppercase font-mono text-ink-muted"

export default function ProjectPage({
  project,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const MDXContent = useMDXComponent(project.body.code)
  const router = useRouter()

  const path = `/projects/${project.slug}`

  const url = `https://sowmenrahman.com${path}`
  const title = `${project.title} | sowmenrahman.com`
  const ogImage = createOgImage({
    title: project.title,
    meta: "sowmenrahman.com · " + (project.publishedAtFormatted || ""),
  })

  return (
    <>
      <NextSeo
        title={title}
        description={project.description ?? undefined}
        canonical={url}
        openGraph={{
          url,
          title,
          description: project.description ?? undefined,
          images: [{ url: ogImage, width: 1600, height: 836, alt: project.title }],
        }}
      />

      <Layout>
        <div className="xl:!col-end-5">
          <h1 className="font-display text-h2 text-ink-primary sm:text-h1">
            {project.title}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-x-2 font-mono text-meta text-ink-muted">
            <div>{project.publishedAtFormatted}</div>
            <div className="text-ink-muted">&middot;</div>
            <PostMetrics slug={project.slug!} />
          </div>
        </div>

        <div className="sticky top-6 hidden h-0 xl:!col-start-4 xl:row-start-2 xl:block">
          <div className="space-y-6">
            {project.url ? (
              <>
                <div className="space-y-2 font-mono text-meta">
                  <div className={SIDEBAR_LABEL}>Hosted at</div>
                  <div className={SIDEBAR_LINK}>
                    <a target="_blank" rel="noreferrer" href={`https://${project.url}`}>
                      {project.url}
                    </a>
                  </div>
                  {project.github && (
                    <>
                      <div style={{ paddingTop: "20px" }} className={SIDEBAR_LABEL}>
                        GitHub
                      </div>
                      <div className={SIDEBAR_LINK}>
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={`https://github.com/${project.github}`}
                        >
                          {project.github}
                        </a>
                      </div>
                    </>
                  )}
                </div>
                <div className="border-t border-border/[0.08]"></div>
              </>
            ) : null}

            {project.tech ? (
              <>
                <div className="space-y-2 font-mono text-meta">
                  <div className={SIDEBAR_LABEL}>Tech stack</div>
                  <div className="flex flex-row flex-wrap gap-1">
                    {project.tech.map((t: string) => (
                      <div
                        key={t}
                        className="rounded-xl bg-border/[0.06] border border-border/[0.06] px-2 py-1 text-ink-secondary transition-colors duration-fast hover:bg-accent-cool/15 hover:text-ink-primary"
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border/[0.08]"></div>
              </>
            ) : null}

            {project.headings ? (
              <div className="space-y-2 font-mono text-meta">
                <div className={SIDEBAR_LABEL}>On this page</div>

                {project.headings.map((heading) => {
                  return (
                    <div key={heading.slug}>
                      <a
                        href={`#${heading.slug}`}
                        className={clsx(SIDEBAR_LINK, {
                          "pl-2": heading.heading === 2,
                          "pl-4": heading.heading === 3,
                        })}
                      >
                        {heading.text}
                      </a>
                    </div>
                  )
                })}
              </div>
            ) : null}

            <div className="border-t border-border/[0.08]"></div>

            <div className="flex items-center justify-between">
              <LikeButton slug={project.slug!} />
              <button
                className="font-mono text-meta text-ink-muted transition-colors duration-fast hover:text-ink-secondary"
                onClick={() => {
                  window.scrollTo({ top: 0 })
                  router.push(path, undefined, { shallow: true })
                }}
              >
                Back to top
              </button>
            </div>
          </div>
        </div>

        <MDXContent components={{ ...components }} />

        <div className="mt-16">
          <LikeButton slug={project.slug!} />
        </div>
      </Layout>
    </>
  )
}
