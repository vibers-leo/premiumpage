import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'PremiumPage — 전자카탈로그 에이전시'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', width: 32, height: 1, backgroundColor: '#525252' }} />
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.25em', color: '#737373' }}>
            글로벌 성장 파트너
          </span>
        </div>
        <div style={{ display: 'flex', fontSize: 72, fontWeight: 900, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '24px' }}>
          PREMIUM PAGE
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 28, fontWeight: 700, color: '#a3a3a3', lineHeight: 1.5, marginBottom: '48px' }}>
          수출 기업의 가치를 세계에 각인시키는 인터랙티브 전자카탈로그 에이전시
        </div>
        <div style={{ display: 'flex', fontSize: 16, fontWeight: 700, color: '#525252', letterSpacing: '0.05em' }}>
          premiumpage.kr
        </div>
      </div>
    ),
    { ...size }
  )
}
