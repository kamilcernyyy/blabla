import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MODULSTAV — Modulární svoboda",
  description:
    "Prémiové modulární dřevostavby s energetickou třídou A a tradiční tesařskou řemeslnou prací.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}
