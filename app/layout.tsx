import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Premium Page",
  description: "Digital catalog solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  )
}
