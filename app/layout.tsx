import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { GlobalHeader } from "@/components/GlobalHeader";

export const metadata: Metadata = {
  title: "Premium Page — 전자카탈로그 에이전시",
  description: "기업 홈페이지를 인터랙티브 전자카탈로그로 변환하는 전문 에이전시",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <GlobalHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
