import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en" className="scroll-p-24">
      <Head>
        <link rel="icon" type="image/png" href="/assets/favicon.png?v=1" />
        {/* matches surface.base (dark default) */}
        <meta name="theme-color" content="#0E0B14" />
      </Head>

      {/* background + selection now come from styles/globals.css tokens.
          The old bg-gradient-to-r from-indigo-900 to-indigo-800 and the
          Cloudinary preload have been removed. */}
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
