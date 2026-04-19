import { NextResponse } from 'next/server'
import { getGoogleAuthUrl, getNaverAuthUrl, getKakaoAuthUrl } from '@/lib/oauth'

export async function GET() {
  return NextResponse.json({
    google: process.env.GOOGLE_CLIENT_ID ? getGoogleAuthUrl() : null,
    naver: process.env.NAVER_CLIENT_ID ? getNaverAuthUrl() : null,
    kakao: process.env.KAKAO_CLIENT_ID ? getKakaoAuthUrl() : null,
  })
}
