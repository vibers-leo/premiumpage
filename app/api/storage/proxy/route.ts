import { NextRequest, NextResponse } from 'next/server'

const NCP_ENDPOINT = 'https://kr.object.ncloudstorage.com'
const BUCKET = process.env.NCP_BUCKET_NAME || 'wero-bucket'

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get('k')
  if (!key) {
    return new NextResponse('Missing key', { status: 400 })
  }

  // key에 경로 순회 방지
  const safeKey = key.replace(/\.\.\//g, '').replace(/^\//, '')
  const ncpUrl = `${NCP_ENDPOINT}/${BUCKET}/${safeKey}`

  try {
    const res = await fetch(ncpUrl)
    if (!res.ok) {
      return new NextResponse('File not found', { status: 404 })
    }

    const contentType = res.headers.get('Content-Type') || 'application/pdf'
    return new NextResponse(res.body, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (e) {
    return new NextResponse('Proxy error', { status: 500 })
  }
}
