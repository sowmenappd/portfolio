import { FOCUS_VISIBLE_OUTLINE, LINK_SUBTLE_STYLES } from "@/lib/constants"
import cx from "clsx"
import Link from "next/link"

export const Footer = () => {
  return (
    <div className="mt-36 pb-36 text-base">
      <div className="text-gray-500">
        <div className="flex flex-col justify-between font-medium lg:flex-row">
          <div className="flex space-x-5">
            <div>
              <Link
                href="/projects"
                className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
              >
                Projects
              </Link>
            </div>

            <div>
              <Link
                href="/blog"
                className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
              >
                Blog
              </Link>
            </div>

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

      <p className="mt-8 text-gray-600">
        Built with{" "}
        <a
          href="https://nextjs.org"
          className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
        >
          Next.js
        </a>
        ,{" "}
        <a
          href="https://mdxjs.com"
          className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
        >
          MDX
        </a>
        ,{" "}
        <a
          href="https://tailwindcss.com"
          className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
        >
          Tailwind
        </a>{" "}
        and{" "}
        <a
          href="https://vercel.com"
          className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
        >
          Vercel
        </a>
      </p>
    </div>
  )
}
