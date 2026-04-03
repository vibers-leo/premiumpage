import { NextRequest, NextResponse } from 'next/server';
import { getPresignedUploadUrl } from '@/lib/ncp-storage';

const ALLOWED_TYPES = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/zip',
];

export async function POST(request: NextRequest) {
  try {
    const { filename, contentType, folder = 'premiumpage' } = await request.json();

    if (!filename || !contentType) {
      return NextResponse.json({ error: 'filename, contentType 필수' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(contentType)) {
      return NextResponse.json({ error: '허용되지 않는 파일 형식입니다.' }, { status: 400 });
    }

    const timestamp = Date.now();
    const random = Math.random().toString(36).slice(2, 8);
    const ext = filename.split('.').pop();
    const key = `${folder}/${timestamp}-${random}.${ext}`;

    const { uploadUrl, publicUrl } = await getPresignedUploadUrl(key, contentType);

    return NextResponse.json({ uploadUrl, publicUrl, key });
  } catch (error) {
    console.error('Presign error:', error);
    return NextResponse.json({ error: 'URL 생성 실패' }, { status: 500 });
  }
}
