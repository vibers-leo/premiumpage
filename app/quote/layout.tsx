import type { Metadata } from "next"
import { Inter, Outfit } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { MainLayout } from "@/components/MainLayout"
import '../(main)/globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' })
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' })

export const metadata: Metadata = {
  title: "무료 견적 상담 | Premium Page",
  description: "전자카탈로그 제작 견적을 무료로 받아보세요.",
}

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${inter.variable} ${outfit.variable} font-sans min-h-screen bg-background text-foreground transition-colors duration-300`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster position="top-center" richColors />
        <MainLayout>
          {children}
        </MainLayout>
      </ThemeProvider>
    </div>
  )
}
