// Stripe 결제 유틸리티

export interface PaymentIntent {
    amount: number
    currency: string
    description: string
    metadata?: Record<string, string>
}

export interface CreatePaymentResponse {
    clientSecret: string
    paymentIntentId: string
}

// 결제 금액 계산
export function calculateTotalAmount(
    developmentPlanId: string,
    maintenancePlanId: string,
    developmentPlans: any[],
    maintenancePlans: any[]
): number {
    const devPlan = developmentPlans.find(p => p.id === developmentPlanId)
    const maintPlan = maintenancePlans.find(p => p.id === maintenancePlanId)

    const devPrice = devPlan?.price || 0
    const maintPrice = maintPlan?.price || 0

    return devPrice + (maintPrice * 12) // 1년치 유지보수 비용
}

// 결제 정보 포맷팅
export function formatPaymentAmount(amount: number): string {
    return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW'
    }).format(amount)
}

// 결제 상태 확인
export function getPaymentStatus(status: string): {
    label: string
    color: string
} {
    const statusMap: Record<string, { label: string; color: string }> = {
        pending: { label: '대기중', color: 'yellow' },
        processing: { label: '처리중', color: 'blue' },
        succeeded: { label: '완료', color: 'green' },
        failed: { label: '실패', color: 'red' },
        canceled: { label: '취소', color: 'gray' }
    }

    return statusMap[status] || { label: '알 수 없음', color: 'gray' }
}

// Mock 결제 처리 (실제 Stripe 연동 전)
export async function createMockPayment(data: PaymentIntent): Promise<CreatePaymentResponse> {
    // 실제 환경에서는 Stripe API를 호출
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    // const paymentIntent = await stripe.paymentIntents.create(...)

    return {
        clientSecret: `mock_secret_${Date.now()}`,
        paymentIntentId: `mock_pi_${Date.now()}`
    }
}
