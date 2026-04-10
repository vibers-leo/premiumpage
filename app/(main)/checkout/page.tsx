'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import { developmentPlans } from '@/lib/data';
import { formatPrice } from '@/lib/data-utils';
import { ArrowLeft, Loader2 } from 'lucide-react';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get('plan');

  const plan = developmentPlans.find(p => p.id === planId) || developmentPlans[1];

  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return;

    setLoading(true);

    try {
      const orderId = `PP-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      const orderName = `Premium Page ${plan.name} 플랜`;

      const { loadTossPayments } = await import('@tosspayments/tosspayments-sdk');
      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;
      const tossPayments = await loadTossPayments(clientKey);
      const payment = tossPayments.payment({ customerKey: `PP_${form.email.replace('@', '_').replace('.', '_')}` });

      sessionStorage.setItem('pendingOrder', JSON.stringify({
        orderId, orderName, amount: plan.price,
        planId: plan.id, planName: plan.name,
        customerName: form.name, customerEmail: form.email, customerPhone: form.phone,
        company: form.company,
      }));

      await payment.requestPayment({
        method: 'CARD',
        amount: { currency: 'KRW', value: plan.price },
        orderId,
        orderName,
        successUrl: `${window.location.origin}/checkout/success`,
        failUrl: `${window.location.origin}/checkout/fail`,
        customerEmail: form.email,
        customerName: form.name,
        customerMobilePhone: form.phone.replace(/-/g, ''),
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-20 pb-32">
      <div className="container mx-auto px-6 max-w-2xl">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> 뒤로가기
        </button>

        <h1 className="text-3xl font-black mb-2">결제하기</h1>
        <p className="text-muted-foreground mb-10">선택하신 플랜을 결제합니다.</p>

        {/* Order Summary */}
        <div className="rounded-2xl border border-border bg-muted/20 p-6 mb-8">
          <h2 className="font-bold mb-4">주문 요약</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground">플랜</span>
            <span className="font-bold">Premium Page {plan.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">결제 금액</span>
            <span className="text-2xl font-black text-primary">{formatPrice(plan.price)}</span>
          </div>
        </div>

        {/* Customer Info Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">담당자 성함 *</label>
            <input
              name="name" value={form.name} onChange={handleChange} required
              placeholder="홍길동"
              className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">이메일 *</label>
            <input
              name="email" value={form.email} onChange={handleChange} required type="email"
              placeholder="example@company.com"
              className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">연락처 *</label>
            <input
              name="phone" value={form.phone} onChange={handleChange} required
              placeholder="010-0000-0000"
              className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">회사명</label>
            <input
              name="company" value={form.company} onChange={handleChange}
              placeholder="(주)회사명"
              className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full h-14 rounded-full bg-primary text-primary-foreground font-black text-lg hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> 처리 중...</> : `${formatPrice(plan.price)} 결제하기`}
          </button>

          <p className="text-xs text-muted-foreground text-center">
            결제 진행 시 <a href="/terms" className="underline">이용약관</a> 및 <a href="/privacy" className="underline">개인정보처리방침</a>에 동의하는 것으로 간주합니다.
          </p>
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">로딩 중...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
