import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://premiumpage.kr"),
  title: {
    default: "PremiumPage — 전자카탈로그 에이전시",
    template: "%s | PremiumPage",
  },
  description: "수출 기업의 가치를 세계에 각인시키는 인터랙티브 전자카탈로그 에이전시. PDF를 넘어, 해외 바이어를 매료시키는 디지털 경험을 설계합니다.",
  keywords: ["전자카탈로그", "인터랙티브 카탈로그", "수출 기업", "디지털 카탈로그", "브로슈어", "제안서", "PPT", "리플렛", "premiumpage"],
  authors: [{ name: "위로 (Vibers)", url: "https://vibers.co.kr" }],
  creator: "PremiumPage",
  openGraph: {
    title: "PremiumPage — 전자카탈로그 에이전시",
    description: "수출 기업의 가치를 세계에 각인시키는 인터랙티브 전자카탈로그 에이전시.",
    url: "https://premiumpage.kr",
    siteName: "PremiumPage",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PremiumPage — 전자카탈로그 에이전시",
    description: "수출 기업의 가치를 세계에 각인시키는 인터랙티브 전자카탈로그 에이전시.",
  },
  robots: {
    index: true,
    follow: true,
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
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Freesentation/paperlogy@main/Paperlogy.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PremiumPage",
              "url": "https://premiumpage.kr",
              "description": "수출 기업의 가치를 세계에 각인시키는 인터랙티브 전자카탈로그 에이전시",
              "founder": { "@type": "Organization", "name": "위로 (Vibers)", "url": "https://vibers.co.kr" },
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "vibers.leo@gmail.com",
                "telephone": "+82-10-4866-5805",
                "contactType": "sales",
              },
              "sameAs": ["https://vibers.co.kr"],
            }),
          }}
        />
      </head>
      <body className="font-sans min-h-screen">
        {children}
      </body>
    </html>
  )
}
