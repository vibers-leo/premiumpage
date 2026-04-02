import type { Metadata } from "next";
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { Toaster } from "sonner"
import Link from 'next/link'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' })
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' })

export const metadata: Metadata = {
  title: "Premium Page | Digital Identity & E-Catalog Agency",
  description: "Beyond PDF. The Art of Interactive Digital Experience for Global Brands.",
}

import { MainLayout } from "@/components/MainLayout"

// ... imports

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans min-h-screen bg-background text-foreground transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="top-center" richColors />
          <MainLayout>
            {children}
          </MainLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}

