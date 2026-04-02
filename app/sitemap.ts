import type { MetadataRoute } from "next";

const BASE_URL = "https://premiumpage.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/quote`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/register`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // 운영 중인 카탈로그 템플릿 페이지
  const catalogRoutes: MetadataRoute.Sitemap = [
    "hs-tech",
    "hs-tech-kr",
    "hangseong",
    "gentop",
    "emt",
  ].map((slug) => ({
    url: `${BASE_URL}/templates/${slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // 포트폴리오 페이지
  const portfolioRoutes: MetadataRoute.Sitemap = [
    "nexus-industrial",
    "precision-gear",
    "k-beauty",
  ].map((slug) => ({
    url: `${BASE_URL}/portfolio/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...catalogRoutes, ...portfolioRoutes];
}
