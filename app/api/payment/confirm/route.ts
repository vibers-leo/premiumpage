import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const SECRET_KEY = process.env.TOSS_SECRET_KEY!;

export async function POST(req: Request) {
  try {
    const { paymentKey, orderId, amount, paymentLinkToken, paymentLinkId, orderName, customerName, customerEmail } = await req.json();

    const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${SECRET_KEY}:`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    // 결제 완료 후 PmPaymentLink 상태 업데이트
    if (paymentLinkId || paymentLinkToken) {
      try {
        const where = paymentLinkId ? { id: paymentLinkId } : { token: paymentLinkToken };
        await prisma.pmPaymentLink.update({
          where,
          data: {
            status: 'paid',
            tossOrderId: orderId,
            tossPaymentKey: paymentKey,
            paidAt: new Date(),
          },
        });
      } catch (dbErr) {
        console.error('[payment/confirm] DB update failed:', dbErr);
        // DB 실패해도 결제 자체는 성공 처리
      }
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: '결제 확인 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
