import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://premiumpage.kr"),
  title: "PremiumPage — 전자카탈로그 에이전시",
  description: "기업 홈페이지를 인터랙티브 전자카탈로그로 변환하는 전문 에이전시. 브로슈어, 제품 카탈로그를 디지털 경험으로.",
  openGraph: {
    title: "PremiumPage — 전자카탈로그 에이전시",
    description: "기업 홈페이지를 인터랙티브 전자카탈로그로 변환하는 전문 에이전시.",
    url: "https://premiumpage.kr",
    siteName: "PremiumPage",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "PremiumPage" }],
    locale: "ko_KR",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "PremiumPage",
              "description": "기업 홈페이지를 인터랙티브 전자카탈로그로 변환하는 전문 에이전시",
              "url": "https://premiumpage.kr",
              "publisher": { "@type": "Organization", "name": "계발자들 (Vibers)", "url": "https://vibers.co.kr" }
            }),
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
