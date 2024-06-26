import clsx from "clsx"
import React from "react"

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
          "z-10 border-l-2 rounded-xl border-rose-200/5 bg-slate-700/40 p-4 shadow-[0_0_30px_20px] shadow-gray-900/40 xl:border-t-2 xl:border-l-0 xl:py-6":
            styled,
        })}
      >
        {title ? (
          <div className="mb-2 text-base italic text-opacity-100">{title}</div>
        ) : null}
        <div
          className={clsx({
            "text-sm italic text-rose-100/60 [&>span[data-rehype-pretty-code-fragment]]:!text-[11px]":
              styled,
          })}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
