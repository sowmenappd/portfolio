import { getPartialProject } from "@/lib/contentlayer"
import { createOgImage } from "@/lib/createOgImage"
import { Layout } from "@/ui/Layout"
import { LikeButton2 } from "@/ui/LikeButton2"
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
    return {
      notFound: true,
    }
  }

  return {
    props: {
      project: getPartialProject(project),
      // tweets: await getTweets(post.tweetIds), // TODO: replace with github stars
    },
  }
}

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
          images: [
            {
              url: ogImage,
              width: 1600,
              height: 836,
              alt: project.title,
            },
          ],
        }}
      />

      <Layout>
        <div className="xl:!col-end-5">
          <h1 className="text-2xl font-medium text-rose-100/90 sm:text-3xl">
            {project.title}
          </h1>

          <div className="mt-2 flex space-x-2 text-lg text-rose-100/50">
            <div>{project.publishedAtFormatted}</div>
            <div className="text-rose-100/30">&middot;</div>
            <PostMetrics slug={project.slug!} />
          </div>
        </div>

        <div className="sticky top-6 hidden h-0 xl:!col-start-4 xl:row-start-2 xl:block">
          <div className="space-y-6">
          {project.url ? (
            <>
              <div className="space-y-2 text-sm">
                <div className="uppercase text-rose-100/30">Hosted at</div>
                <div className="block text-rose-100/50 underline-offset-2 transition-all hover:text-rose-100 hover:underline hover:decoration-rose-200/50">
                  <a target="_blank" href={`https://${project.url}`}>{project.url}</a>
                </div>
                {project.github && (<><div style={{ paddingTop: "20px" }} className="uppercase text-rose-100/30">GitHub</div>
                <div className="block text-rose-100/50 underline-offset-2 transition-all hover:text-rose-100 hover:underline hover:decoration-rose-200/50">
                  <a target="_blank" href={`https://github.com/${project.github}`}>{project.github}</a>
                </div></>)}
              </div>
              <div className="border-t border-rose-200/10"></div>
            </>
          ) : null}

          {project.tech ? (
            <>
              <div className="space-y-2 text-sm">
                <div className="uppercase text-rose-100/30">Tech stack</div>
                <div className="flex flex-row flex-wrap text-rose-100/50 underline-offset-2 transition-all">
                  {project.tech.map((t: string) => (
                    <div className="m-0.5 p-1.5 rounded-xl bg-slate-400/10 hover:bg-rose-100/30 hover:underline hover:text-white/90">
                      {t}
                    </div>
                  ))}

                </div>
              </div>
              <div className="border-t border-rose-200/10"></div>
            </>
          ) : null}


            {project.headings ? (
              <div className="space-y-2 text-sm">
                <div className="uppercase text-rose-100/30">On this page</div>

                {project.headings.map((heading) => {
                  return (
                    <div key={heading.slug}>
                      <a
                        href={`#${heading.slug}`}
                        className={clsx(
                          "block text-rose-100/50 underline-offset-2 transition-all hover:text-rose-100 hover:underline hover:decoration-rose-200/50",
                          {
                            "pl-2": heading.heading === 2,
                            "pl-4": heading.heading === 3
                          },
                        )}
                      >
                        {heading.text}
                      </a>
                    </div>
                  )
                })}
              </div>
            ) : null}

            <div className="border-t border-rose-200/10"></div>

            <div className="flex items-center justify-between">
              <LikeButton2 slug={project.slug!} />
              <div className="">
                <button
                  className="text-sm text-rose-100/30 hover:text-rose-100/60"
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
        </div>

        <MDXContent
          components={{
            ...components,
          }}
        />

        <div className="mt-16">
          <LikeButton2 slug={project.slug!} />
        </div>
      </Layout>
    </>
  )
}
