import { NextResponse } from 'next/server'

const ZEROCLAW_URL = process.env.ZEROCLAW_URL || 'https://zeroclaw-pp.premiumpage.kr'
const ZEROCLAW_TOKEN = process.env.ZEROCLAW_TOKEN || ''

const SYSTEM_PROMPT = `당신은 Premium Page의 AI 비서입니다.
- 프리미엄페이지는 수출 기업을 위한 인터랙티브 전자카탈로그 에이전시입니다.
- 친절하고 전문적으로 답변하되, 짧고 핵심적으로 답변하세요.
- 가격, 서비스, 제작 과정 등에 대한 질문에 정확히 답변하세요.
- 모르는 내용은 "담당자에게 연결해드릴까요?"라고 안내하세요.
- 항상 한국어로 답변하세요.`

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json()

    if (!message?.trim()) {
      return NextResponse.json({ error: '메시지를 입력해주세요.' }, { status: 400 })
    }

    // 대화 컨텍스트 구성
    let context = ''
    if (history?.length) {
      const recent = history.slice(-4) // 최근 4개 메시지
      context = recent.map((m: any) => `[${m.role === 'user' ? '사용자' : 'AI'}] ${m.content}`).join('\n')
      context = `\n\n[이전 대화]\n${context}\n`
    }

    const payload = {
      message: `[SYSTEM INSTRUCTION] ${SYSTEM_PROMPT}${context}\n\n[USER] ${message}`,
    }

    const res = await fetch(`${ZEROCLAW_URL}/webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(ZEROCLAW_TOKEN ? { Authorization: `Bearer ${ZEROCLAW_TOKEN}` } : {}),
      },
      body: JSON.stringify(payload),
    })

    const text = await res.text()
    console.log('Zeroclaw response:', res.status, text.slice(0, 200))

    if (!res.ok) {
      return NextResponse.json({
        response: '죄송합니다. 잠시 후 다시 시도해주세요. 급한 문의는 vibers.leo@gmail.com으로 연락주세요.',
        _status: res.status,
        _body: text.slice(0, 200),
        _url: `${ZEROCLAW_URL}/webhook`,
        _hasToken: !!ZEROCLAW_TOKEN,
      })
    }

    const data = JSON.parse(text)
    return NextResponse.json({ response: data.response || data.reply || '답변을 생성하지 못했습니다.' })
  } catch (e: any) {
    console.error('Chat API error:', e?.message || e)
    return NextResponse.json({
      response: '연결에 문제가 있어요. vibers.leo@gmail.com 또는 010-4866-5805로 문의해주세요.',
      _debug: e?.message,
      _url: ZEROCLAW_URL,
    })
  }
}
