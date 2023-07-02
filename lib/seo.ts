import { createOgImage } from "@/lib/createOgImage"
import type { DefaultSeoProps } from "next-seo"

const title = `Sowmen`
const description = `Welcome to my space! I generally share articles about my backend adventures, alongside learning about new backend technologies and shipping products with scalability built-in.`
const domain = `sowmenrahman.com`
const twitter = `@SowmenR`
const meta = `Backend Engineer`

export const seo: DefaultSeoProps = {
  title: title + " | " + meta,
  description,
  openGraph: {
    title,
    type: "website",
    url: `https://${domain}`,
    site_name: title,
    images: [
      {
        url: createOgImage({ title, meta }),
        width: 1600,
        height: 836,
        alt: title,
      },
    ],
  },
  twitter: {
    handle: twitter,
    cardType: "summary_large_image",
  },
}
