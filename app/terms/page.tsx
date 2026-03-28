import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '이용약관 | Premium Page',
  description: 'Premium Page 이용약관',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          이용약관
        </h1>
        <p className="text-sm text-gray-500 mb-12">
          시행일자: 2026년 3월 28일
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">제1조 (목적)</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            본 약관은 주식회사 디랩(이하 &ldquo;회사&rdquo;)이 운영하는 프리미엄페이지 웹사이트(이하 &ldquo;사이트&rdquo;)에서 제공하는 웹페이지 제작 서비스(이하 &ldquo;서비스&rdquo;)를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">제2조 (정의)</h2>
          <div className="space-y-3 text-base text-gray-700 leading-relaxed">
            <ul className="list-decimal list-inside space-y-2 ml-4">
              <li>&ldquo;서비스&rdquo;라 함은 회사가 제공하는 웹페이지 제작, 전자카탈로그 제작, 디지털 콘텐츠 제작 등 제반 서비스를 의미합니다.</li>
              <li>&ldquo;이용자&rdquo;라 함은 사이트에 접속하여 본 약관에 따라 회사가 제공하는 서비스를 이용하는 고객을 말합니다.</li>
              <li>&ldquo;개인정보&rdquo;라 함은 생존하는 개인에 관한 정보로서 개인을 식별할 수 있는 정보를 말합니다.</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">제3조 (약관의 게시와 개정)</h2>
          <div className="space-y-3 text-base text-gray-700 leading-relaxed">
            <p>① 회사는 본 약관의 내용을 이용자가 쉽게 알 수 있도록 사이트 내에 게시합니다.</p>
            <p>② 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.</p>
            <p>③ 회사가 약관을 개정할 경우 적용일자 7일 전부터 공지합니다.</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">제4조 (서비스의 제공 및 변경)</h2>
          <div className="space-y-3 text-base text-gray-700 leading-relaxed">
            <p>① 회사는 다음과 같은 서비스를 제공합니다.</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>인터랙티브 전자카탈로그 제작 서비스</li>
              <li>웹페이지 디자인 및 개발 서비스</li>
              <li>디지털 콘텐츠 제작 서비스</li>
              <li>기타 회사가 추가 개발하거나 제휴를 통해 제공하는 서비스</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">제5조 (서비스의 중단)</h2>
          <div className="space-y-3 text-base text-gray-700 leading-relaxed">
            <p>① 회사는 정보통신설비의 보수점검, 교체 및 고장 등의 사유가 발생한 경우 서비스 제공을 일시 중단할 수 있습니다.</p>
            <p>② 불가항력으로 인한 서비스 중단에 대해서는 배상하지 아니합니다.</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">제6조 (이용자의 의무)</h2>
          <div className="space-y-3 text-base text-gray-700 leading-relaxed">
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>허위 내용의 등록 금지</li>
              <li>타인의 정보 도용 금지</li>
              <li>회사의 지적재산권 침해 금지</li>
              <li>회사 및 제3자의 명예 훼손 금지</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">제7조 (저작권의 귀속)</h2>
          <div className="space-y-3 text-base text-gray-700 leading-relaxed">
            <p>① 회사가 작성한 저작물에 대한 저작권은 회사에 귀속합니다.</p>
            <p>② 제작된 카탈로그·웹페이지의 콘텐츠 저작권은 고객에게 있으며, 회사는 포트폴리오 목적으로만 사용합니다.</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">제8조 (재판권 및 준거법)</h2>
          <div className="space-y-3 text-base text-gray-700 leading-relaxed">
            <p>① 회사와 이용자 간에 발생한 분쟁에 대하여는 대한민국 법을 적용합니다.</p>
            <p>② 분쟁에 관한 소송은 민사소송법상의 관할법원에 제기합니다.</p>
          </div>
        </section>

        <section className="mb-10 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">부칙</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            본 약관은 2026년 3월 28일부터 시행됩니다.
          </p>
        </section>

        <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
          <h3 className="text-lg font-bold text-gray-900 mb-3">이용약관 관련 문의</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>이메일: support@premiumpage.kr</p>
            <p>사업자: 주식회사 디랩 (대표 이준호, 사업자등록번호 617-86-11575)</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">← 홈으로 돌아가기</Link>
        </div>
      </div>
    </div>
  );
}
