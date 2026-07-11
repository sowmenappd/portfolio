import { FOCUS_VISIBLE_OUTLINE, LINK_SUBTLE_STYLES } from "@/lib/constants"
import cx from "clsx"
import Link from "next/link"

/** Direction 1a — Footer on tokens (gray/stone → ink-muted). */
export const Footer = () => {
  return (
    <div className="mt-36 pb-36 text-body">
      <div className="text-ink-muted">
        <div className="flex flex-col justify-between font-medium lg:flex-row">
          <div className="flex space-x-5">
            <Link
              href="/projects"
              className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
            >
              Projects
            </Link>
            <Link
              href="/blog"
              className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
            >
              Blog
            </Link>
            <a
              href="https://github.com/sowmenappd"
              className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
            >
              GitHub
            </a>
            <a
              href="https://twitter.com/SowmenR"
              className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
            >
              Twitter
            </a>
          </div>
        </div>
      </div>

      <p className="mt-8 font-mono text-meta text-ink-muted">
        Built with{" "}
        <a href="https://nextjs.org" className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}>
          Next.js
        </a>
        ,{" "}
        <a href="https://mdxjs.com" className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}>
          MDX
        </a>
        ,{" "}
        <a href="https://tailwindcss.com" className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}>
          Tailwind
        </a>{" "}
        and{" "}
        <a href="https://vercel.com" className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}>
          Vercel
        </a>
      </p>
    </div>
  )
}
