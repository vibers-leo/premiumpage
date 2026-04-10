'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, Loader2 } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paymentKey = searchParams.get('paymentKey');
  const orderId = searchParams.get('orderId');
  const amount = Number(searchParams.get('amount'));

  const [status, setStatus] = useState<'confirming' | 'done' | 'error'>('confirming');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!paymentKey || !orderId || !amount) return;

    fetch('/api/payment/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'DONE') {
          sessionStorage.removeItem('pendingOrder');
          setStatus('done');
        } else {
          setErrorMsg(data.message || '결제 확인에 실패했습니다.');
          setStatus('error');
        }
      })
      .catch(() => {
        setErrorMsg('네트워크 오류가 발생했습니다.');
        setStatus('error');
      });
  }, [paymentKey, orderId, amount]);

  if (status === 'confirming') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">결제를 확인하는 중입니다...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground p-4">
        <div className="w-full max-w-md rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">
          <p className="text-xl font-bold text-red-400 mb-4">결제 확인 실패</p>
          <p className="text-muted-foreground mb-6">{errorMsg}</p>
          <button
            onClick={() => router.push('/checkout')}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold"
          >
            다시 시도하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-muted/20 p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-primary/20 p-4 text-primary">
            <CheckCircle2 className="h-12 w-12" />
          </div>
        </div>
        <h2 className="mb-2 text-2xl font-bold">결제가 완료되었습니다!</h2>
        <p className="mb-8 text-muted-foreground">
          주문번호: <span className="text-foreground font-mono text-sm">{orderId}</span><br />
          담당자가 확인 후 빠르게 연락드리겠습니다.
        </p>
        <div className="mb-6 rounded-xl bg-muted/30 p-4 text-sm text-left space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">결제 금액</span>
            <span className="font-bold text-primary">{amount.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">결제 수단</span>
            <span>신용카드 (토스페이먼츠)</span>
          </div>
        </div>
        <button
          onClick={() => router.push('/')}
          className="w-full rounded-xl bg-primary py-3 font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">로딩 중...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
