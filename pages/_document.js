import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en" className="scroll-p-24">
      <Head>
        <link rel="icon" type="image/png" href="/assets/favicon.png?v=1" />
        <meta name="theme-color" content="#1c1917" />
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/dpttbgftr/image/upload/v1687949338/gradient.jpg"
        />
      </Head>

      <body className="bg-gradient-to-r from-indigo-900 to-indigo-800 antialiased selection:bg-purple-500/90 selection:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
