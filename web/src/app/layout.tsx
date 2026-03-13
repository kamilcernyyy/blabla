import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Studio — Graphic Designer & Web Developer",
  description:
    "Creative portfolio. Crafting digital experiences that blend aesthetics with function.",
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
