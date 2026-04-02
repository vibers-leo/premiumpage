import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@gentop/components/ui/header";
import { Footer } from "@gentop/components/ui/footer";
import { ThemeProvider } from "@gentop/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans", subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GENTOP | Total Solution Provider",
  description: "Construction & Facilities Management Industry Leader",
  openGraph: {
    title: "GENTOP | Total Solution Provider",
    description: "Construction & Facilities Management Industry Leader",
    images: [
      {
        url: "https://gentop.premiumpage.kr/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "GENTOP Total Solution Provider",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
