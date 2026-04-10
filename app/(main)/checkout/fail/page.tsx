'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { XCircle } from 'lucide-react';
import { Suspense } from 'react';

function FailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const errorCode = searchParams.get('code');
  const errorMessage = searchParams.get('message') || '결제가 취소되었습니다.';

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground p-4">
      <div className="w-full max-w-md rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-500/20 p-4 text-red-400">
            <XCircle className="h-12 w-12" />
          </div>
        </div>
        <h2 className="mb-2 text-2xl font-bold">결제에 실패했습니다</h2>
        <p className="mb-2 text-muted-foreground">{errorMessage}</p>
        {errorCode && (
          <p className="mb-8 text-xs text-muted-foreground/60">오류 코드: {errorCode}</p>
        )}
        <button
          onClick={() => router.push('/checkout')}
          className="w-full rounded-xl bg-primary py-3 font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          다시 시도하기
        </button>
      </div>
    </div>
  );
}

export default function FailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">로딩 중...</div>}>
      <FailContent />
    </Suspense>
  );
}
