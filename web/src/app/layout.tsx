import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Grafista — Grafický designér & webový vývojář",
  description:
    "Kreativní portfolio. Tvořím digitální zážitky na rozhraní estetiky a funkce.",
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
