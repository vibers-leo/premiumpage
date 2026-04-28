import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

const ZEROCLAW_URL = process.env.ZEROCLAW_URL || 'https://zeroclaw-pp.premiumpage.kr'
const ZEROCLAW_TOKEN = process.env.ZEROCLAW_TOKEN || ''

// knowledge/base.md를 빌드 시 읽어서 system prompt에 포함
let knowledgeBase = ''
try {
  knowledgeBase = readFileSync(join(process.cwd(), 'knowledge', 'base.md'), 'utf-8')
} catch { /* knowledge 파일 없으면 무시 */ }

const SYSTEM_PROMPT = `당신은 Premium Page의 AI 비서입니다.

## 규칙
- 아래 [서비스 정보]를 기반으로 정확하게 답변하세요.
- 친절하고 전문적으로 답변하되, 짧고 핵심적으로 답변하세요.
- 도구(tool_code, file_read 등)를 사용하지 마세요. 아래 정보만으로 답변하세요.
- 모르는 내용은 "담당자에게 연결해드릴까요? vibers.leo@gmail.com"이라고 안내하세요.
- 항상 한국어로 답변하세요.
- 마크다운 문법을 사용하지 마세요. 일반 텍스트로 답변하세요.

## 서비스 정보
${knowledgeBase}`

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json()

    if (!message?.trim()) {
      return NextResponse.json({ error: '메시지를 입력해주세요.' }, { status: 400 })
    }

    let context = ''
    if (history?.length) {
      const recent = history.slice(-4)
      context = recent.map((m: any) => `[${m.role === 'user' ? '사용자' : 'AI'}] ${m.content}`).join('\n')
      context = `\n\n[이전 대화]\n${context}\n`
    }

    const res = await fetch(`${ZEROCLAW_URL}/webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(ZEROCLAW_TOKEN ? { Authorization: `Bearer ${ZEROCLAW_TOKEN}` } : {}),
      },
      body: JSON.stringify({
        message: `[SYSTEM INSTRUCTION] ${SYSTEM_PROMPT}${context}\n\n[USER] ${message}`,
      }),
    })

    if (!res.ok) {
      console.error('Zeroclaw error:', res.status)
      return NextResponse.json({
        response: '죄송합니다. 잠시 후 다시 시도해주세요. 급한 문의는 vibers.leo@gmail.com으로 연락주세요.',
      })
    }

    const data = await res.json()
    let reply = data.response || data.reply || '답변을 생성하지 못했습니다.'
    // tool_code 응답 필터링
    if (reply.includes('tool_code') || reply.includes('file_read')) {
      reply = '죄송합니다, 다시 질문해주시겠어요?'
    }
    return NextResponse.json({ response: reply })
  } catch (e) {
    console.error('Chat API error:', e)
    return NextResponse.json({
      response: '연결에 문제가 있어요. vibers.leo@gmail.com 또는 010-4866-5805로 문의해주세요.',
    })
  }
}
