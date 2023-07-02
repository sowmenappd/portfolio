import { useEnabledOnFirstIntersection } from "@/lib/useEnabledOnFirstIntersection"
import { useVideoMetrics } from "@/lib/useVideoMetrics"
import { ContentLink } from "@/ui/ContentLink"
import { InlineMetric } from "@/ui/InlineMetric"
import { LoadingDots } from "@/ui/LoadingDots"
import { Project } from "contentlayer/generated"
import React from "react"
import OpenLinkIcon from "./OpenLinkIcon"

const Metrics = ({
  id,
  fallbackData,
}: {
  id: string
  fallbackData: { views: number; likes: number }
}) => {
  const { likes, views, isLoading, isError } = useVideoMetrics(id, {
    fallbackData,
  })

  return (
    <>
      <div className="text-rose-100/30">&middot;</div>

      <div>
        {isError || isLoading ? (
          <LoadingDots />
        ) : (
          <InlineMetric key={views} stat={views} />
        )}{" "}
        views
      </div>

      <div className="text-rose-100/30">&middot;</div>

      <div>
        {isError || isLoading ? (
          <LoadingDots />
        ) : (
          <InlineMetric key={likes} stat={likes} />
        )}{" "}
        likes
      </div>
    </>
  )
}

export const ProjectPostPreview = (
  post: Pick<Project, "slug" | "title" | "description" | "tags" | "url">,
) => {
  const { intersectionRef } = useEnabledOnFirstIntersection()

  return (
    <div ref={intersectionRef}>
      <ContentLink href={`/projects/${post.slug}`}>
        <div className="flex justify-between pointer-events-none">
          <ContentLink.Title>{post.title}</ContentLink.Title>
          <ContentLink.Icon icon={
            () => <OpenLinkIcon 
              className="pointer-events-auto hover:text-sky-400 w-[22px] transform text-rose-100 transition delay-100 duration-500 ease-out group-hover:scale-110" 
              onClick={(e) => { 
                e.preventDefault(); 
                window.open(`https://${post.url}`, "_blank"); 
              }}
            />
          } />
        </div>

        <ContentLink.Meta>          
          {post.tags && post.tags.length > 0 ? (
            post.tags.slice(0, 3).map((tag: { title: string }) => 
            (<>
              <div>{`# ${tag.title.toLowerCase()} `}</div>
            </>)
            )
          ) : null}
        </ContentLink.Meta>

        <ContentLink.Text>{post.description}</ContentLink.Text>
      </ContentLink>
    </div>
  )
}
