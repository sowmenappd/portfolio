import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import cx from "clsx"
import Link from "next/link"
import React, { ElementType } from "react"

/**
 * Direction 1a — ContentLink refactored onto tokens.
 * Old: bg-white/5 → hover bg-white/10, text-rose-100 at /90,/70,/50,/30
 *      (unnamed opacity soup), text-xl / text-lg hardcoded.
 * New: surface.raised card, border token, elevation-low → -medium on hover,
 *      ink.primary/secondary/muted, h3 + body-lg type tokens, mono meta.
 */

export function ContentLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cx(
        "group block overflow-hidden rounded-2xl bg-surface-raised border border-border/[0.06] p-7",
        "shadow-surface-elevation-low transition duration-base",
        "hover:bg-surface-overlay hover:shadow-surface-elevation-medium",
        FOCUS_VISIBLE_OUTLINE,
      )}
    >
      {children}
    </Link>
  )
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-h3 text-ink-primary line-clamp-2">{children}</h3>
  )
}

function Icon(props: { icon: ElementType }) {
  return (
    <div className="mt-1 ml-2 shrink-0">
      <props.icon className="w-5 text-ink-muted transition-colors duration-fast group-hover:text-ink-secondary" />
    </div>
  )
}

function Text({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-body-lg text-ink-secondary line-clamp-3">
      {children}
    </p>
  )
}

function Meta({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-meta text-ink-muted">
      {children}
    </div>
  )
}

ContentLink.Title = Title
ContentLink.Icon = Icon
ContentLink.Text = Text
ContentLink.Meta = Meta
