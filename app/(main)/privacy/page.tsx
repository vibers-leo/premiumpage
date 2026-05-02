export const metadata = { title: '개인정보처리방침 | Premium Page' };

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-12">
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-neutral-400 flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-neutral-300 inline-block" />법적 고지
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">개인정보처리방침</h1>
          <p className="text-sm text-neutral-400 mt-3">시행일자: 2026년 4월 9일</p>
        </div>

        <section className="mb-10">
          <p className="text-base leading-relaxed text-neutral-500">
            위로(이하 "회사")는 프리미엄페이지(Premium Page) 서비스를 운영함에 있어 「개인정보 보호법」 및 관계 법령을 준수하여 이용자의 개인정보를 안전하게 관리합니다.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">제1조 (개인정보의 처리 목적)</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-neutral-500">
            <li>전자카탈로그 제작 서비스 제공</li>
            <li>견적 요청 및 계약 체결</li>
            <li>고객 상담 및 문의 응대</li>
            <li>결제 및 정산 처리</li>
            <li>서비스 품질 개선</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">제2조 (개인정보의 처리 및 보유기간)</h2>
          <div className="p-4 bg-neutral-50 border border-neutral-200 space-y-2 text-sm text-neutral-500">
            <div><p className="font-semibold text-neutral-900">• 견적 및 상담 문의 정보</p><p className="ml-4">보유기간: 처리 완료 후 3년</p></div>
            <div><p className="font-semibold text-neutral-900">• 결제 정보</p><p className="ml-4">보유기간: 5년 (전자상거래법)</p></div>
            <div><p className="font-semibold text-neutral-900">• 서비스 이용 기록</p><p className="ml-4">보유기간: 3개월</p></div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">제3조 (처리하는 개인정보의 항목)</h2>
          <div className="space-y-3">
            <div className="p-4 bg-neutral-50 border border-neutral-200">
              <h3 className="font-bold mb-2">1. 견적 요청 및 구매 시</h3>
              <p className="text-sm text-neutral-500">• 필수: 이름, 연락처, 이메일, 회사명</p>
              <p className="text-sm text-neutral-500">• 선택: 프로젝트 상세 내용</p>
            </div>
            <div className="p-4 bg-neutral-50 border border-neutral-200">
              <h3 className="font-bold mb-2">2. 자동 수집 항목</h3>
              <p className="text-sm text-neutral-500">• IP 주소, 쿠키, 서비스 이용 기록, 방문 일시</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">제4조 (개인정보의 제3자 제공)</h2>
          <p className="text-neutral-500">현재 개인정보를 제3자에게 제공하지 않습니다.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">제5조 (정보주체의 권리·의무 및 행사방법)</h2>
          <p className="text-neutral-500">정보주체는 언제든지 개인정보 열람, 정정, 삭제, 처리정지 요구를 이메일·전화로 요청할 수 있으며, 회사는 지체없이 조치합니다.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">제6조 (개인정보의 파기)</h2>
          <ul className="list-disc list-inside space-y-1 ml-4 text-neutral-500">
            <li>전자적 파일: 복구 불가능하도록 안전 삭제</li>
            <li>종이 문서: 분쇄 또는 소각</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">제7조 (개인정보 보호책임자)</h2>
          <div className="p-6 bg-neutral-50 border border-neutral-200 space-y-2 text-sm text-neutral-500">
            <p className="font-bold text-base text-neutral-900 mb-3">개인정보 보호책임자</p>
            <p>• 성명: 김정원</p>
            <p>• 직책: 대표</p>
            <p>• 연락처: 010-4866-5805</p>
            <p>• 이메일: juuuno@naver.com</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">제8조 (권익침해 구제방법)</h2>
          <div className="space-y-3">
            <div className="p-4 bg-neutral-50 border border-neutral-200"><p className="font-semibold">개인정보분쟁조정위원회</p><p className="text-sm text-neutral-500">전화: 1833-6972 | www.kopico.go.kr</p></div>
            <div className="p-4 bg-neutral-50 border border-neutral-200"><p className="font-semibold">개인정보침해신고센터</p><p className="text-sm text-neutral-500">전화: 118 | privacy.kisa.or.kr</p></div>
            <div className="p-4 bg-neutral-50 border border-neutral-200"><p className="font-semibold">대검찰청 사이버범죄수사단</p><p className="text-sm text-neutral-500">전화: 1301 | www.spo.go.kr</p></div>
          </div>
        </section>

        <section className="mb-10 pt-8 border-t border-neutral-200">
          <h2 className="text-2xl font-bold mb-4">제9조 (개인정보 처리방침 변경)</h2>
          <p className="text-neutral-500">이 개인정보 처리방침은 2026년 4월 9일부터 적용됩니다.</p>
        </section>

        <div className="mt-12 p-6 bg-neutral-50 border border-neutral-200">
          <h3 className="text-lg font-bold mb-3">개인정보 처리방침 관련 문의</h3>
          <div className="text-sm text-neutral-500 space-y-1">
            <p>상호명: 위로 | 사업자등록번호: 545-16-01046</p>
            <p>대표: 김정원 | 연락처: 010-4866-5805</p>
            <p>이메일: juuuno@naver.com</p>
            <p>주소: 경남 양산시 고향의봄12길 10, 뉴그린빌 301호</p>
          </div>
        </div>
      </div>
    </main>
  );
}
