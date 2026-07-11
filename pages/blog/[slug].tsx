import { getPartialPost } from "@/lib/contentlayer"
import { createOgImage } from "@/lib/createOgImage"
import { FormattedTweet, getTweets } from "@/lib/twitter"
import { Layout } from "@/ui/Layout"
import { LikeButton } from "@/ui/LikeButton"
import { components } from "@/ui/MdxComponents"
import { CommentSection } from "@/ui/CommentSection"
import { PostMetrics } from "@/ui/PostMetrics"
import { PostSeries } from "@/ui/PostSeries"
import { Tweet } from "@/ui/Tweet"
import clsx from "clsx"
import { allPosts } from "contentlayer/generated"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useMDXComponent } from "next-contentlayer/hooks"
import { NextSeo } from "next-seo"
import { useRouter } from "next/router"

export const getStaticPaths = () => {
  return {
    paths: allPosts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
  post: ReturnType<typeof getPartialPost>
  tweets: FormattedTweet[]
}> = async ({ params }) => {
  const post = allPosts.find((post) => post.slug === params?.slug)

  if (!post) {
    return { notFound: true }
  }

  return {
    props: {
      post: getPartialPost(post, allPosts),
      tweets: await getTweets(post.tweetIds),
    },
  }
}

// Direction 1a — shared sidebar link style (TOC / hosted-at / github)
const SIDEBAR_LINK =
  "block text-ink-muted underline-offset-2 transition-colors duration-fast hover:text-ink-primary hover:underline hover:decoration-accent-cool/60"
const SIDEBAR_LABEL = "uppercase font-mono text-ink-muted"

export default function PostPage({
  post,
  tweets,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const MDXContent = useMDXComponent(post.body.code)
  const router = useRouter()

  const StaticTweet = ({
    id,
    showAttachments,
  }: {
    id: string
    showAttachments?: boolean
  }) => {
    const tweet = tweets.find((tweet) => tweet.id === id)
    if (!tweet) {
      return null
    }
    return <Tweet showAttachments={showAttachments} {...tweet} />
  }

  const path = `/blog/${post.slug}`

  const url = `https://sowmenrahman.com${path}`
  const title = `${post.title} | sowmenrahman.com`
  const ogImage = createOgImage({
    title: post.title,
    meta: "sowmenrahman.com · " + post.publishedAtFormatted,
  })

  return (
    <>
      <NextSeo
        title={title}
        description={post.description ?? undefined}
        canonical={url}
        openGraph={{
          url,
          title,
          description: post.description ?? undefined,
          images: [{ url: ogImage, width: 1600, height: 836, alt: post.title }],
        }}
      />

      <Layout>
        <div className="xl:!col-end-5">
          <h1 className="font-display text-h2 text-ink-primary sm:text-h1">
            {post.title}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-x-2 font-mono text-meta text-ink-muted">
            <div>{post.publishedAtFormatted}</div>
            <div className="text-ink-muted">&middot;</div>
            <PostMetrics slug={post.slug} />
          </div>
        </div>

        <div className="sticky top-6 hidden h-0 xl:!col-start-4 xl:row-start-2 xl:block">
          <div className="space-y-6">
            {post.headings ? (
              <div className="space-y-2 font-mono text-meta">
                <div className={SIDEBAR_LABEL}>On this page</div>

                {post.headings.map((heading) => {
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
              <LikeButton slug={post.slug} />
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

        {post.series && post.series.posts.length > 1 ? (
          <PostSeries data={post.series} isInteractive={true} />
        ) : null}

        <MDXContent components={{ ...components, StaticTweet }} />

        <div className="mt-16">
          <LikeButton slug={post.slug} />
          <CommentSection slug={post.slug} />
        </div>
        {post.series && post.series.posts.length > 1 ? (
          <div className="mt-16">
            <PostSeries data={post.series} />
          </div>
        ) : null}
      </Layout>
    </>
  )
}
