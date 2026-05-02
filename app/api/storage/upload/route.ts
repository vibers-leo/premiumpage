import { NextRequest, NextResponse } from 'next/server';
import { uploadBuffer } from '@/lib/ncp-storage';

const MAX_SIZE = 50 * 1024 * 1024; // 50MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'PDF 파일만 업로드할 수 있습니다.' }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: '파일 크기는 50MB 이하여야 합니다.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const timestamp = Date.now();
    const random = Math.random().toString(36).slice(2, 8);
    const key = `premiumpage/pdfs/${timestamp}-${random}.pdf`;

    const publicUrl = await uploadBuffer(buffer, key, 'application/pdf');

    return NextResponse.json({ publicUrl, key });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Upload error:', msg);
    return NextResponse.json({ error: '업로드 실패', detail: msg }, { status: 500 });
  }
}
