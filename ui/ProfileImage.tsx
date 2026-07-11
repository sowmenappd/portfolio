import cx from "clsx"
import Image from "next/image"

/**
 * Direction 1a — ProfileImage refactored onto tokens.
 * Old: from-purple-700/60 to-rose-400/60 ring, ring-purple-500/10.
 * New: accent.cool → accent.warm gradient ring (the identity pair),
 *      surface.raised inner, ink-tinted hover glow.
 */
export const ProfileImage = ({
  size = "large",
  src = "",
  isInteractive,
}: {
  size: "small" | "large"
  src: string | undefined
  isInteractive?: boolean
}) => {
  return (
    <div
      className={cx(
        "rounded-full bg-gradient-to-tl from-accent-cool to-accent-warm shadow-lg",
        {
          "p-[2px]": size === "small",
          "p-[3px]": size === "large",
          "group transform transition duration-base ease-out hover:scale-105 hover:shadow-accent-warm/25 active:translate-y-px":
            isInteractive,
          "ring-[5px] ring-accent-cool/10": !isInteractive,
        },
      )}
    >
      <div
        className={cx("rounded-full bg-surface-raised p-px", {
          "h-[36px] w-[36px]": size === "small",
          "h-[64px] w-[64px]": size === "large",
          "transition duration-base group-hover:scale-105": isInteractive,
        })}
      >
        <Image
          src={src}
          alt="A photo of Sowmen"
          quality={95}
          priority={true}
          className="rounded-full"
          width={size === "small" ? 36 : 64}
          height={size === "small" ? 36 : 64}
        />
      </div>
    </div>
  )
}
