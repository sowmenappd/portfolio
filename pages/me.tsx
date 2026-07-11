import { Layout } from "@/ui/Layout"
import type { InferGetStaticPropsType } from "next"
import React from "react"

export const getStaticProps = async () => {
  return { props: {} }
}

/** Direction 1a — /me on tokens + display/mono type. */
export default function AboutMePage(
  {}: InferGetStaticPropsType<typeof getStaticProps>,
) {
  return (
    <Layout>
      <div>
        <div>
          <h1 className="font-display text-h1 text-ink-primary">About me</h1>
          <div className="mt-2 font-mono text-meta text-ink-muted">
            Tweets that capture a sentiment I&apos;d like to remember
          </div>
        </div>

        <div className="mt-16 space-y-14">
          {/* tweets */}
        </div>
      </div>
    </Layout>
  )
}
