import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import { CurrentFilters } from "@/lib/types"
import LinkedInIcon from "@/ui/LinkedInIcon"
import AnnotationIcon from "@heroicons/react/solid/AnnotationIcon"
import CubeIcon from "@heroicons/react/solid/CubeIcon"
import cx from "clsx"
import Link from "next/link"
import React from "react"

/**
 * Direction 1a — nav refactored onto tokens.
 * Old: slate-800→gray-200 gradient pills, one-off blue-100→blue-600 active
 *      state, shadow-purple-500/40 hover. Five color families for one nav.
 * New: surface/border tokens for the resting pill, accent.cool for the active
 *      filter, ink tokens for labels. Motion via duration-fast/base.
 */

// resting icon tile
const TILE_BASE =
  "rounded-md p-1 transition-all duration-base ease-out shadow-surface-elevation-low group-hover:scale-[1.15] group-hover:shadow-accent-cool/30 group-active:translate-y-px"
const TILE_RESTING = "bg-border/[0.08] border border-border/[0.06]"
const TILE_ACTIVE =
  "bg-accent-cool/90 ring-2 ring-accent-cool/40 ring-offset-1 ring-offset-surface-base"

const ICON =
  "w-[18px] text-ink-primary transition duration-base ease-out group-hover:scale-110"

const NavItem = ({
  href,
  label,
  icon: Icon,
  active = false,
  external = false,
  iconWidth = "w-[18px]",
}: {
  href: string
  label: string
  icon: React.ElementType
  active?: boolean
  external?: boolean
  iconWidth?: string
}) => {
  const inner = (
    <div className="sm:flex sm:items-center sm:space-x-2">
      <div className="mb-1.5 flex justify-center sm:mb-0 sm:block">
        <div className={cx(TILE_BASE, active ? TILE_ACTIVE : TILE_RESTING)}>
          <Icon className={cx(ICON, iconWidth)} />
        </div>
      </div>
      <div>{label}</div>
    </div>
  )

  const className = cx("group", FOCUS_VISIBLE_OUTLINE)

  return external ? (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} className={className}>
      {inner}
    </Link>
  )
}

export const Navigation = ({
  currentFilters,
}: {
  currentFilters?: CurrentFilters
}) => {
  return (
    <div className="flex items-center space-x-7 text-body font-semibold leading-none text-ink-primary">
      <NavItem
        href="/projects"
        label="Projects"
        icon={CubeIcon}
        active={currentFilters?.type === "project"}
      />
      <NavItem
        href="/blog"
        label="Posts"
        icon={AnnotationIcon}
        active={currentFilters?.type === "blog"}
      />
      <NavItem
        href="https://linkedin.com/in/sowmen-rahman-01/"
        label="LinkedIn"
        icon={LinkedInIcon}
        external
        iconWidth="w-[22px]"
      />
    </div>
  )
}
