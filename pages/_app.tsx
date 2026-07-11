import { seo } from "@/lib/seo"
import cx from "clsx"
import { DefaultSeo } from "next-seo"
import { ThemeProvider } from "next-themes"
import type { AppProps } from "next/app"
import Head from "next/head"
import "../styles/globals.css"

// Direction 1a — "Aurora" type system.
// Loaded via <link> rather than @next/font/google because this Next
// canary's bundled font manifest predates Bricolage Grotesque.
// The --font-* CSS variables are defined in styles/globals.css.

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <DefaultSeo {...seo} />
      <main className={cx("font-sans")}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  )
}
