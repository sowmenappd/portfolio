import { FOCUS_VISIBLE_OUTLINE, LINK_STYLES } from "@/lib/constants"
import { Aside } from "@/ui/Aside"
import { BlurImage } from "@/ui/BlurImage"
import { Code } from "@/ui/Code"
import { Files } from "@/ui/Files"
import { FauxTweet } from "@/ui/lab/FauxTweet"
import { LikeButtonDemo } from "@/ui/lab/LikeButtonDemo"
import { LoadingSkeleton } from "@/ui/lab/LoadingSkeleton"
import { LikeButton } from "@/ui/LikeButton"
import { Playground } from "@/ui/Playground"
import cx from "clsx"
import type { ImageProps } from "next/image"
import NextLink from "next/link"
import React from "react"

/**
 * Direction 1a — MDX components on tokens.
 * rose-100/rose-200 opacities → ink-primary / ink-muted / border tokens,
 * ad hoc text-xl/sm:text-3xl → h2/h3 type tokens.
 * Note: demos now reference the consolidated LikeButton (LikeButton2 retired).
 */
export const components = {
  LoadingSkeleton,
  LikeButtonDemo,
  LikeButton,
  Playground,
  Code,
  Files,
  FauxTweet,

  Aside,
  h1: (props: any) => (
    <h2
      className="relative mt-3 border-t-2 border-border/[0.06] pt-9 font-display text-h2 text-ink-primary"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h3
      className="relative mt-3 border-t-2 border-border/[0.06] pt-9 font-display text-h2 text-ink-primary"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h4 className="font-display text-h3 text-ink-primary" {...props} />
  ),
  h4: (props: any) => (
    <h5 className="text-body-lg font-medium text-ink-primary" {...props} />
  ),
  hr: (props: any) => (
    <hr
      className="relative border-t-2 border-border/[0.06] pt-9 sm:pt-10"
      {...props}
    />
  ),
  a: ({ href = "", ...props }) => {
    if (href.startsWith("http")) {
      return (
        <a
          className={cx(LINK_STYLES, FOCUS_VISIBLE_OUTLINE)}
          href={href}
          target="_blank"
          rel="noopener"
          {...props}
        />
      )
    }

    return (
      <NextLink
        href={href}
        className={cx(LINK_STYLES, FOCUS_VISIBLE_OUTLINE)}
        {...props}
      />
    )
  },
  ul: (props: any) => (
    <ul
      className="space-y-3 [li>&]:mt-3 [&>li]:relative [&>li]:pl-7 before:[&>li]:absolute before:[&>li]:left-1 before:[&>li]:top-3 before:[&>li]:h-1.5 before:[&>li]:w-1.5 before:[&>li]:rounded-full before:[&>li]:bg-accent-warm/50"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol className="list-decimal space-y-3 pl-10" {...props} />
  ),
  strong: (props: any) => <strong className="font-semibold" {...props} />,
  Img: ({
    children,
    bleed,
    caption,
    ...props
  }: {
    children: React.ReactNode
    bleed?: boolean
    caption?: string
  } & ImageProps) => {
    return (
      <>
        <div
          className={cx({
            "xl:!col-start-2 xl:!col-end-4": bleed === true,
          })}
        >
          <BlurImage {...props} />
        </div>
        {caption ? (
          <div className="mt-2 font-mono text-meta italic text-ink-muted">
            {caption}
          </div>
        ) : null}
      </>
    )
  },
  blockquote: (props: any) => (
    <blockquote
      className="border-l-2 border-accent-warm/30 pl-4 text-body-lg italic text-ink-secondary xl:!col-start-2 xl:!col-end-3"
      {...props}
    />
  ),
  del: (props: any) => (
    <del className="text-ink-secondary line-through" {...props} />
  ),
}
