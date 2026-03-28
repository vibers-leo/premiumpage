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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Premium Page",
              "url": "https://premiumpage.kr",
              "description": "산업용 전자카탈로그 제작 플랫폼. AI 에이전트 시스템으로 기업별 프리미엄 디지털 카탈로그를 빠르게 제작합니다.",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "creator": {
                "@type": "Organization",
                "name": "계발자들 (Vibers)",
                "url": "https://vibers.co.kr"
              },
              "inLanguage": "ko"
            })
          }}
        />
        {children}
      </body>
    </html>
  )
}
