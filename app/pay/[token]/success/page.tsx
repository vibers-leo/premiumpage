'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

function SuccessContent() {
  const searchParams = useSearchParams()
  const paymentKey = searchParams.get('paymentKey')
  const orderId = searchParams.get('orderId')
  const amount = Number(searchParams.get('amount'))

  const [status, setStatus] = useState<'confirming' | 'done' | 'error'>('confirming')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (!paymentKey || !orderId || !amount) return

    const pending = JSON.parse(sessionStorage.getItem('pendingPayment') || '{}')

    fetch('/api/payment/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount,
        paymentLinkToken: pending.token,
        paymentLinkId: pending.linkId,
        orderName: pending.orderName,
        customerName: pending.customerName,
        customerEmail: pending.customerEmail,
      }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.status === 'DONE') {
          sessionStorage.removeItem('pendingPayment')
          setStatus('done')
        } else {
          setErrorMsg(data.message || '결제 확인에 실패했습니다.')
          setStatus('error')
        }
      })
      .catch(() => {
        setErrorMsg('네트워크 오류가 발생했습니다.')
        setStatus('error')
      })
  }, [paymentKey, orderId, amount])

  if (status === 'confirming') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">결제를 확인하는 중입니다...</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-red-500/30">
          <CardContent className="p-8 text-center">
            <p className="text-xl font-bold text-red-500 mb-3">결제 확인 실패</p>
            <p className="text-muted-foreground text-sm">{errorMsg}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
        <Card className="border-green-500/30 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-black mb-2">결제 완료!</h2>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              결제가 정상적으로 완료되었습니다.<br />
              담당자가 빠르게 연락드리겠습니다.
            </p>
            <div className="bg-muted/30 rounded-xl p-4 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">결제 금액</span>
                <span className="font-bold text-primary">{amount.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">주문번호</span>
                <span className="font-mono text-xs">{orderId}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function PaySuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
      <SuccessContent />
    </Suspense>
  )
}
