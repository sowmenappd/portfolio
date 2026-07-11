import clsx from "clsx"
import React from "react"

/** Direction 1a — Aside on tokens (slate/rose-200 → surface-overlay/border/ink). */
export const Aside = ({
  children,
  position = "left",
  styled = false,
  title,
}: {
  children: React.ReactNode
  position?: "left" | "right"
  styled?: boolean
  title?: string
}) => {
  return (
    <div
      className={clsx("relative", {
        "xl:!col-start-2": position === "left",
        "xl:!col-start-4": position === "right",
      })}
    >
      <div
        className={clsx("relative xl:absolute xl:top-0 xl:left-0 xl:right-0", {
          "z-10 rounded-xl border-l-2 border-border/[0.06] bg-surface-overlay/70 p-4 shadow-[0_0_30px_20px] shadow-surface-base/40 xl:border-t-2 xl:border-l-0 xl:py-6":
            styled,
        })}
      >
        {title ? (
          <div className="mb-2 text-body italic text-ink-primary">{title}</div>
        ) : null}
        <div
          className={clsx({
            "text-meta italic text-ink-muted [&>span[data-rehype-pretty-code-fragment]]:!text-[11px]":
              styled,
          })}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
