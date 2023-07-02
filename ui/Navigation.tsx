import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import { CurrentFilters } from "@/lib/types"
import LinkedInIcon from "@/ui/LinkedInIcon"
import AnnotationIcon from "@heroicons/react/solid/AnnotationIcon"
import CubeIcon from "@heroicons/react/solid/CubeIcon"
import cx from "clsx"
import Link from "next/link"
import React from "react"

export const Navigation = ({
  currentFilters,
}: {
  currentFilters?: CurrentFilters
}) => {
  return (
    <div className="flex items-center space-x-7 text-base font-semibold leading-none text-rose-100/90">
      <Link href="/projects" className={cx("group", FOCUS_VISIBLE_OUTLINE)}>
        <div className="sm:flex sm:items-center sm:space-x-2">
          <div className="mb-1.5 flex justify-center sm:mb-0 sm:block">
            <div
              className={cx(
                "rounded-lg p-1 shadow-lg transition-all duration-300 ease-out group-hover:scale-[1.2] group-hover:rounded-[10px] group-hover:shadow-purple-500/40 group-active:translate-y-1",
                {
                  "ring-[2px] ring-white-500/60 ring-offset-1 ring-offset-black/5 bg-gradient-to-tl from-blue-100/60 to-blue-600/90":
                    currentFilters?.type === "project", // bg-[#1da1f2]
                },
                {
                  "bg-gradient-to-tl from-slate-800/80 to-gray-200/80" :
                    currentFilters?.type !== "project",
                }
              )}
            >
              <CubeIcon className="w-[18px] transform text-rose-100 transition delay-100 duration-500 ease-out group-hover:scale-110" />
            </div>
          </div>
          <div>Projects</div>
        </div>
      </Link>

      <Link href="/blog" className={cx("group", FOCUS_VISIBLE_OUTLINE)}>
        <div className="sm:flex sm:items-center sm:space-x-2">
          <div className="mb-1.5 flex justify-center sm:mb-0 sm:block">
            <div
              className={cx(
                "rounded-lg p-1 shadow-lg transition-all duration-300 ease-out group-hover:scale-[1.2] group-hover:rounded-[10px] group-hover:shadow-purple-500/40 group-active:translate-y-1",
                {
                  "ring-[2px] ring-white-500/60 ring-offset-1 ring-offset-black/5 bg-gradient-to-tl from-blue-100/60 to-blue-600/90":
                    currentFilters?.type === "blog",
                },
                {
                  "bg-gradient-to-tl from-slate-800/80 to-gray-200/80": 
                    currentFilters?.type !== "blog",
                }
              )}
            >
              <AnnotationIcon className="w-[18px] transform text-rose-100 transition delay-100 duration-500 ease-out group-hover:scale-110" />
            </div>
          </div>
          <div>Posts</div>
        </div>
      </Link>

      <a
        className={cx("group", FOCUS_VISIBLE_OUTLINE)}
        href="https://linkedin.com/in/sowmen-rahman-01/"
        target="_blank"
      >
        <div className="sm:flex sm:items-center sm:space-x-2">
          <div className="mb-1.5 flex justify-center sm:mb-0 sm:block">
            <div className="rounded-lg bg-gradient-to-tl from-slate-800/80 to-gray-200/80 p-0.5 shadow-lg transition-all duration-300 ease-out group-hover:scale-[1.2] group-hover:rounded-[10px] group-hover:shadow-purple-500/40 group-active:translate-y-1">
              <LinkedInIcon className="w-[22px] transform text-rose-100 transition delay-100 duration-500 ease-out group-hover:scale-110" />
            </div>
          </div>
          <div>LinkedIn</div>
        </div>
      </a>
    </div>
  )
}
