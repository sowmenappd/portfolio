import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import { CurrentFilters } from "@/lib/types"
import { Footer } from "@/ui/Footer"
import { Navigation } from "@/ui/Navigation"
import { ProfileImage } from "@/ui/ProfileImage"
import { Transition } from "@headlessui/react"
import cx from "clsx"
import Link from "next/link"
import React from "react"

/**
 * Direction 1a — Layout on tokens.
 * The page background + ambient gradient now live in styles/globals.css
 * (body + body::before), so the hotlinked Cloudinary GradientBackground is
 * gone. The grain overlay is kept as an identity texture.
 */
export const Layout = ({
  children,
  showNav = true,
  currentFilters,
}: {
  children: React.ReactNode
  showNav?: boolean
  currentFilters?: CurrentFilters
}) => {
  return (
    <>
      <svg
        className="pointer-events-none fixed isolate z-50 opacity-60 mix-blend-soft-light"
        width="100%"
        height="100%"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.80"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)"></rect>
      </svg>

      <div className="pointer-events-none fixed top-6 z-30 grid w-full grid-cols-[1fr,min(640px,100%),1fr] px-4">
        <Transition
          className="pointer-events-auto col-start-2 -mx-px rounded-2xl border border-border/[0.07] bg-surface-overlay/80 px-4 py-2.5 shadow-surface-glass backdrop-blur will-change-transform [@supports(backdrop-filter:blur(0px))]:bg-border/[0.04]"
          show={showNav}
          enter="transition duration-fast ease-in-out"
          enterFrom="opacity-0 scale-90"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in-out"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link
                href="/"
                title="View home page"
                className={cx("rounded-full", FOCUS_VISIBLE_OUTLINE)}
              >
                <ProfileImage size="small" isInteractive src="https://github.com/sowmenappd.png" />
              </Link>
            </div>
            <Navigation currentFilters={currentFilters} />
          </div>
        </Transition>
      </div>

      <div className="relative z-10 grid grid-cols-[1fr,min(640px,100%),1fr] gap-y-8 px-4 pt-48 font-sans text-body text-ink-primary xl:grid-cols-[1fr,minmax(auto,240px),min(640px,100%),minmax(auto,240px),1fr] xl:gap-x-9 xl:px-0 [&>*]:col-start-2 xl:[&>*]:col-start-3">
        {children}

        <Footer />
      </div>
    </>
  )
}
