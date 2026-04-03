import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const NCP_ENDPOINT = 'https://kr.object.ncloudstorage.com';
const NCP_REGION = 'kr-standard';

function getClient() {
  return new S3Client({
    region: NCP_REGION,
    endpoint: NCP_ENDPOINT,
    credentials: {
      accessKeyId: process.env.NCP_ACCESS_KEY!,
      secretAccessKey: process.env.NCP_SECRET_KEY!,
    },
    forcePathStyle: true,
  });
}

const BUCKET = process.env.NCP_BUCKET_NAME || 'wero-bucket';

/**
 * Presigned URL 발급 (클라이언트가 직접 NCP에 업로드)
 * 유효시간: 15분
 */
export async function getPresignedUploadUrl(key: string, contentType: string) {
  const client = getClient();
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
    ACL: 'public-read',
  });
  const url = await getSignedUrl(client, command, { expiresIn: 900 });
  const publicUrl = `${NCP_ENDPOINT}/${BUCKET}/${key}`;
  return { uploadUrl: url, publicUrl };
}

/**
 * 서버에서 Buffer를 직접 NCP에 업로드
 */
export async function uploadBuffer(
  buffer: Buffer,
  key: string,
  contentType: string
): Promise<string> {
  const client = getClient();
  await client.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType,
    ACL: 'public-read',
  }));
  return `${NCP_ENDPOINT}/${BUCKET}/${key}`;
}

/**
 * NCP에서 파일 삭제
 */
export async function deleteObject(key: string) {
  const client = getClient();
  await client.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
}

/**
 * NCP URL에서 key 추출
 */
export function extractKeyFromUrl(url: string): string | null {
  const prefix = `${NCP_ENDPOINT}/${BUCKET}/`;
  return url.startsWith(prefix) ? url.slice(prefix.length) : null;
}
