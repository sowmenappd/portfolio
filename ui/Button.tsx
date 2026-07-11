import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import cx from "clsx"
import Link from "next/link"
import React from "react"

/**
 * Direction 1a — the single Button primitive.
 * Replaces every bespoke clickable surface (and both old LikeButtons'
 * chrome). Renders as <button>, or as a Next <Link>/<a> when `href` is set.
 *
 *   <Button variant="primary">Save</Button>
 *   <Button variant="secondary" href="/projects">Projects</Button>
 *   <Button variant="ghost" size="sm">Cancel</Button>
 */

type Variant = "primary" | "secondary" | "ghost" | "link"
type Size = "sm" | "md"

const BASE =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-all duration-fast disabled:opacity-50 disabled:pointer-events-none"

const SIZES: Record<Size, string> = {
  sm: "text-meta px-3 py-1.5",
  md: "text-body px-[18px] py-[9px]",
}

const VARIANTS: Record<Variant, string> = {
  // warm accent = primary action; ink flips per-theme via the token
  primary:
    "bg-accent-warm text-surface-base hover:brightness-110 active:translate-y-px",
  secondary:
    "bg-border/[0.06] text-ink-primary border border-border/[0.12] hover:bg-border/[0.10]",
  ghost:
    "bg-transparent text-ink-secondary hover:text-ink-primary hover:bg-border/[0.06]",
  // cool accent = link voice
  link:
    "bg-transparent text-accent-cool underline decoration-accent-cool/40 underline-offset-[3px] hover:decoration-accent-cool px-0 py-0",
}

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

type LinkProps = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export function Button(props: ButtonProps | LinkProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props

  const classes = cx(
    BASE,
    SIZES[size],
    VARIANTS[variant],
    FOCUS_VISIBLE_OUTLINE,
    className,
  )

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as LinkProps
    const external = href.startsWith("http")
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noreferrer"
          {...(anchorRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} {...(anchorRest as any)}>
        {children}
      </Link>
    )
  }

  return (
    <button
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  )
}
