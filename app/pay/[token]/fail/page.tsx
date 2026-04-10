'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { XCircle, Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function FailContent() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const message = searchParams.get('message')

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-red-500/30">
        <CardContent className="p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-black mb-2">결제 실패</h2>
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
            {message || '결제 처리 중 오류가 발생했습니다.'}
          </p>
          {code && (
            <p className="text-xs text-muted-foreground mb-6">오류 코드: {code}</p>
          )}
          <Button
            onClick={() => window.history.back()}
            className="w-full h-12 rounded-xl font-bold"
          >
            다시 시도하기
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default function PayFailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
      <FailContent />
    </Suspense>
  )
}
