export default function AdminSettingsPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-2">설정</h1>
            <p className="text-gray-400 text-sm mb-8">시스템 설정을 관리합니다.</p>

            <div className="grid gap-6 max-w-2xl">
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h2 className="font-semibold mb-1">일반 설정</h2>
                    <p className="text-sm text-gray-500">사이트 이름, 로고, 기본 언어 등 기본 설정을 관리합니다.</p>
                </div>

                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h2 className="font-semibold mb-1">알림 설정</h2>
                    <p className="text-sm text-gray-500">이메일 알림 및 시스템 알림을 관리합니다.</p>
                </div>

                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h2 className="font-semibold mb-1">배포 설정</h2>
                    <p className="text-sm text-gray-500">도메인 연결 및 빌드 설정을 관리합니다.</p>
                </div>
            </div>
        </div>
    )
}
