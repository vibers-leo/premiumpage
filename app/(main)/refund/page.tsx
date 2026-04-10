export const metadata = { title: '취소 및 환불 정책 | Premium Page' };

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-black mb-4">취소 및 환불 정책</h1>
        <p className="text-sm text-muted-foreground mb-12">시행일자: 2026년 4월 9일</p>

        <div className="mb-10 p-6 bg-primary/10 border border-primary/30 rounded-2xl">
          <p className="text-base leading-relaxed font-medium">
            프리미엄페이지는 전자카탈로그 제작 용역 서비스입니다. 주문 후 작업이 착수되므로 아래 정책을 꼭 확인하신 후 구매해주세요.
          </p>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">제1조 (취소 가능 기간 및 환불 기준)</h2>
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-xl border border-border">
              <h3 className="font-bold mb-2">✅ 전액 환불</h3>
              <p className="text-muted-foreground text-sm">결제 완료 후 작업 착수 전 취소 요청 시 전액 환불</p>
              <p className="text-xs text-muted-foreground mt-1">※ 통상 결제 후 1영업일 이내 작업 착수</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-xl border border-border">
              <h3 className="font-bold mb-2">⚠️ 부분 환불</h3>
              <p className="text-muted-foreground text-sm mb-2">작업 착수 후 취소 요청 시 진행률에 따라 환불</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-muted-foreground">
                <li>기획·구성 단계 (30% 진행): 결제금액의 70% 환불</li>
                <li>디자인 단계 (60% 진행): 결제금액의 40% 환불</li>
                <li>개발·완료 단계 (100% 진행): 환불 불가</li>
              </ul>
            </div>
            <div className="p-4 bg-red-950/30 rounded-xl border border-red-900/30">
              <h3 className="font-bold text-red-400 mb-2">❌ 환불 불가</h3>
              <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-muted-foreground">
                <li>작업 100% 완료 후 납품된 경우</li>
                <li>이용자 귀책 사유로 인한 작업 지연·중단</li>
                <li>이용자 제공 자료의 오류로 인한 재작업</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">제2조 (유지보수 월 구독 취소)</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>• 월 유지보수 구독은 다음 결제일 <strong>7일 전</strong>까지 해지 요청 시 다음 달부터 청구되지 않습니다.</p>
            <p>• 이미 결제된 월 구독료는 환불되지 않습니다.</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">제3조 (환불 처리 방법)</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>① 환불 요청은 이메일 또는 연락처로 접수해주세요.</p>
            <p>② 환불 결정 후 영업일 기준 <strong>3~5일</strong> 이내 처리됩니다.</p>
            <p>③ 카드 결제의 경우 카드사 정책에 따라 반영 시점이 다를 수 있습니다.</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">제4조 (소비자 분쟁 해결)</h2>
          <p className="text-muted-foreground leading-relaxed">
            본 정책에 명시되지 않은 사항은 「전자상거래 등에서의 소비자보호에 관한 법률」 및 공정거래위원회 고시 소비자분쟁해결기준에 따릅니다.
          </p>
        </section>

        <div className="mt-12 p-6 bg-muted/30 rounded-2xl border border-border">
          <h3 className="text-lg font-bold mb-3">취소·환불 문의</h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>상호명: 위로 | 사업자등록번호: 545-16-01046</p>
            <p>대표: 김성원 | 연락처: 010-9249-3872</p>
            <p>이메일: juuuno@naver.com</p>
            <p>운영시간: 평일 10:00 - 18:00</p>
          </div>
        </div>
      </div>
    </main>
  );
}
