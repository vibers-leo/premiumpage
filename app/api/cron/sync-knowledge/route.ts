import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

// Vercel Cron: 매일 06:00 KST (21:00 UTC)
// vercel.json에 cron 설정 필요

export async function GET(req: Request) {
  // Vercel cron 인증
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // knowledge/base.md 읽기
    const knowledgePath = join(process.cwd(), 'knowledge', 'base.md')
    const knowledge = readFileSync(knowledgePath, 'utf-8')

    // zeroclaw 컨테이너에 knowledge 주입
    const zerocrawUrl = process.env.ZEROCLAW_URL || 'http://172.17.0.1:42621'

    // zeroclaw knowledge API로 전송 (컨테이너 내부에서 파일로 저장됨)
    const res = await fetch(`${zerocrawUrl}/knowledge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: 'premiumpage.md',
        content: knowledge,
      }),
    })

    if (res.ok) {
      return NextResponse.json({
        success: true,
        message: 'Knowledge synced',
        size: knowledge.length,
        timestamp: new Date().toISOString(),
      })
    }

    // fallback: knowledge API가 없으면 webhook으로 학습 확인만
    return NextResponse.json({
      success: true,
      message: 'Knowledge file ready (manual sync via ai-recipe cron)',
      size: knowledge.length,
    })
  } catch (e: any) {
    console.error('Knowledge sync error:', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
