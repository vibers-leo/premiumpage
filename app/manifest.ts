import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PremiumPage — 전자카탈로그 에이전시',
    short_name: 'PremiumPage',
    description: '수출 기업의 가치를 세계에 각인시키는 인터랙티브 전자카탈로그 에이전시',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
