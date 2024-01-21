import type { Metadata } from 'next'
import './globals.css'
import "prismjs/themes/prism.css"
import { Source_Code_Pro } from 'next/font/google'

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro',
})

const title = "Functionaizer"
const description = 'Generate custom Open AI functions that return JSON'

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: "website",
    url: "https://functionaizer.vercel.app/",
    title,
    description,
    siteName: title,
    images: [{
      url: "https://functionaizer.vercel.app/screenshot.jpg",
    }],
  },
  twitter: {
    card: "summary_large_image", 
    creator: "@johnpolacek", 
    images: "https://functionaizer.vercel.app/screenshot.jpg",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sourceCodePro.variable}`}>
      <body>{children}</body>
    </html>
  )
}
