import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Functionaizer',
  description: 'Generate custom Open AI functions that return JSON',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
