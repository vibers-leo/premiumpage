import type { Metadata } from "next"
import { Inter, Outfit } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { MainLayout } from "@/components/MainLayout"
import '../(main)/globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' })
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' })

export const metadata: Metadata = {
  title: "포트폴리오 | Premium Page",
  description: "프리미엄 페이지가 제작한 전자카탈로그 납품 사례를 확인하세요.",
}

export default function PortfolioLayout({
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
        <MainLayout>
          {children}
        </MainLayout>
      </ThemeProvider>
    </div>
  )
}
