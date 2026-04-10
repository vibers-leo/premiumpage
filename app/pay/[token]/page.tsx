'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader2, CheckCircle2, XCircle, CreditCard, Lock, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface PaymentLink {
  id: string
  token: string
  amount: number
  orderName: string
  customerName: string | null
  customerEmail: string | null
  status: string
  expiresAt: string | null
}

export default function PayPage() {
  const { token } = useParams<{ token: string }>()
  const router = useRouter()

  const [link, setLink] = useState<PaymentLink | null>(null)
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/pay/${token}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) setError(data.error)
        else setLink(data)
      })
      .catch(() => setError('결제 링크를 불러오는 데 실패했습니다.'))
      .finally(() => setLoading(false))
  }, [token])

  const handlePay = async () => {
    if (!link) return
    setPaying(true)

    try {
      const { loadTossPayments } = await import('@tosspayments/tosspayments-sdk')
      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;
      const tossPayments = await loadTossPayments(clientKey)

      const customerKey = link.customerEmail
        ? `PP_${link.customerEmail.replace(/[@.]/g, '_')}`
        : `PP_${link.token.slice(0, 12)}`

      const payment = tossPayments.payment({ customerKey })

      const orderId = `PP-${link.token.slice(0, 8)}-${Date.now()}`

      sessionStorage.setItem('pendingPayment', JSON.stringify({
        token: link.token,
        linkId: link.id,
        orderId,
        orderName: link.orderName,
        amount: link.amount,
        customerName: link.customerName,
        customerEmail: link.customerEmail,
      }))

      await payment.requestPayment({
        method: 'CARD',
        amount: { currency: 'KRW', value: link.amount },
        orderId,
        orderName: link.orderName,
        successUrl: `${window.location.origin}/pay/${token}/success`,
        failUrl: `${window.location.origin}/pay/${token}/fail`,
        ...(link.customerName && { customerName: link.customerName }),
        ...(link.customerEmail && { customerEmail: link.customerEmail }),
      })
    } catch (err) {
      console.error(err)
      setPaying(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !link) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-red-500/30">
          <CardContent className="p-8 text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">유효하지 않은 링크</h2>
            <p className="text-muted-foreground text-sm">{error || '링크가 만료되었거나 이미 사용된 결제 링크입니다.'}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (link.status === 'paid') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-green-500/30">
          <CardContent className="p-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">이미 결제 완료된 링크입니다</h2>
            <p className="text-muted-foreground text-sm">문의사항이 있으시면 담당자에게 연락해주세요.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-border shadow-xl">
          <CardContent className="p-8">
            {/* 헤더 */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-2xl font-black mb-1">결제하기</h1>
              <p className="text-muted-foreground text-sm">프리미엄페이지 · PremiumPage</p>
            </div>

            {/* 주문 정보 */}
            <div className="bg-muted/30 rounded-xl p-5 mb-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">서비스</span>
                <span className="font-semibold">{link.orderName}</span>
              </div>
              {link.customerName && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">고객명</span>
                  <span className="font-medium">{link.customerName}</span>
                </div>
              )}
              <div className="border-t border-border pt-3 flex justify-between items-center">
                <span className="text-muted-foreground text-sm">결제 금액</span>
                <span className="text-2xl font-black text-primary">
                  {link.amount.toLocaleString()}원
                </span>
              </div>
            </div>

            {/* 결제 버튼 */}
            <Button
              onClick={handlePay}
              disabled={paying}
              className="w-full h-14 rounded-xl font-bold text-base bg-primary hover:bg-primary/90"
            >
              {paying
                ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> 처리 중...</>
                : <>{link.amount.toLocaleString()}원 카드 결제 <ArrowRight className="w-5 h-5 ml-2" /></>
              }
            </Button>

            {/* 동의 문구 */}
            <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
              결제 진행 시{' '}
              <a href="/terms" className="underline hover:text-foreground">이용약관</a>,{' '}
              <a href="/privacy" className="underline hover:text-foreground">개인정보처리방침</a> 및{' '}
              <a href="/refund" className="underline hover:text-foreground">환불정책</a>에 동의합니다.
            </p>

            {/* 보안 표시 */}
            <div className="flex items-center justify-center gap-2 mt-5 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              토스페이먼츠 보안 결제
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
