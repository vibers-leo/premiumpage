export const metadata = { title: '이용약관 | Premium Page' };

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-black mb-4">이용약관</h1>
        <p className="text-sm text-muted-foreground mb-12">시행일자: 2026년 4월 9일</p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">제1조 (목적)</h2>
          <p className="text-muted-foreground leading-relaxed">
            본 약관은 위로(이하 "회사")가 운영하는 프리미엄페이지(Premium Page, 이하 "서비스")를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">제2조 (정의)</h2>
          <ul className="list-decimal list-inside space-y-2 ml-4 text-muted-foreground leading-relaxed">
            <li>"서비스"란 회사가 제공하는 전자카탈로그 기획·디자인·개발·호스팅 및 관련 부가 서비스를 의미합니다.</li>
            <li>"이용자"란 본 약관에 따라 서비스를 이용하는 개인 및 법인을 말합니다.</li>
            <li>"콘텐츠"란 서비스 내에서 이용자가 제공하거나 회사가 제작한 텍스트, 이미지, 영상 등 모든 정보를 의미합니다.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">제3조 (약관의 게시와 개정)</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>① 회사는 본 약관을 서비스 초기화면에 게시합니다.</p>
            <p>② 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 약관을 개정할 수 있습니다.</p>
            <p>③ 약관 개정 시 적용일자 7일 전부터 공지합니다.</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">제4조 (서비스의 제공 및 변경)</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>① 회사는 다음과 같은 서비스를 제공합니다.</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>전자카탈로그 기획·디자인·개발 (Basic / Pro / Master)</li>
              <li>반응형 웹 및 다국어 지원</li>
              <li>전용 서브도메인 및 QR코드 제공</li>
              <li>인터랙티브 애니메이션 및 3D 모델링 (플랜별 상이)</li>
              <li>카탈로그 호스팅 및 유지보수</li>
            </ul>
            <p>② 회사는 운영상·기술상 필요에 따라 서비스를 변경할 수 있으며, 변경 시 7일 전 공지합니다.</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">제5조 (서비스의 중단)</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>① 회사는 설비 보수, 장애, 천재지변 등으로 서비스를 일시 중단할 수 있습니다.</p>
            <p>② 서비스 중단으로 인한 손해는 배상하지 않습니다. 단, 회사의 고의 또는 중과실이 있는 경우는 예외입니다.</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">제6조 (이용자의 의무)</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
            <li>허위 정보 등록 금지</li>
            <li>타인의 정보 도용 금지</li>
            <li>회사 및 제3자의 지적재산권 침해 금지</li>
            <li>서비스의 정상적 운영을 방해하는 행위 금지</li>
            <li>불법·유해 콘텐츠 요청 금지</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">제7조 (저작권의 귀속 및 이용제한)</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>① 회사가 제작한 카탈로그 템플릿·디자인 요소의 저작권은 회사에 귀속됩니다.</p>
            <p>② 이용자가 제공한 콘텐츠(텍스트, 이미지, 로고 등)의 저작권은 이용자에게 귀속됩니다.</p>
            <p>③ 납품 완료된 결과물의 이용권은 이용자에게 부여됩니다.</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">제8조 (분쟁해결)</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>① 회사는 이용자의 불만사항을 우선적으로 처리합니다.</p>
            <p>② 분쟁은 대한민국 법을 적용하며, 관할 법원은 민사소송법에 따릅니다.</p>
          </div>
        </section>

        <section className="mb-10 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold mb-4">부칙</h2>
          <p className="text-muted-foreground">본 약관은 2026년 4월 9일부터 시행됩니다.</p>
        </section>

        <div className="mt-12 p-6 bg-muted/30 rounded-2xl border border-border">
          <h3 className="text-lg font-bold mb-3">이용약관 관련 문의</h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>상호명: 위로 | 사업자등록번호: 545-16-01046</p>
            <p>대표: 김정원 | 연락처: 010-4866-5805</p>
            <p>이메일: juuuno@naver.com</p>
          </div>
        </div>
      </div>
    </main>
  );
}
