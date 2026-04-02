import React from "react";
import Image from "next/image";

interface AccessControlProps {
    lang?: string;
}

export const AccessControl = ({ lang = 'en' }: AccessControlProps) => {
    const isKo = lang === 'ko';

    const content = {
        title: isKo ? "출입통제시스템" : "Access Control System",
        subtitle: isKo
            ? "단순 방문객부터 등록된 사원들의 권한 부여관리 및 출입기록 관리까지 체계적인 모니터링 시스템 제공"
            : "Granting of authorization from simple visitors to registered employees and access record management through systematic monitoring system",
        desc: isKo ? [
            "정보보안에 관한 관심이 나날이 높아지고 있는 가운데 기업에서 관리, 운영되고 있는 설비 및 자산을 여러 위험요소부터 보호하는 것을 목적으로 합니다.",
            "중요정보는 각종 위험요소 발생 시 치명적인 손실을 초래할 수 있기에 출입통제는 필수사항이 되었습니다.",
            "젠탑(주)의 출입통제 관리 솔루션은 RS232, RS485, TCP/IP 등으로 네트워크를 구성하여 대량의 단말기 제어가 가능하며 공간적 제한이 없는 시스템입니다.",
            "단순 방문객부터 등록된 사원들의 권한 부여 관리 및 출입 기록 관리까지 체계적인 모니터링이 가능하며 문제 사항 발생 시 담당자에게 즉시 SMS를 통하여 관련 정보를 전송하게 되며 원격 조정을 통하여 빠른 처리가 가능합니다."
        ] : [
            "In the midst of heightened interest in information security day by day, we aim to protect the corporation’s equipment and properties that are managed and operated by various risk factors.",
            "Important information can cause fatal harm when various risk factors occur; thus, access control became essential.",
            "The access control management solution of GENTOP Inc. constitutes the network into RS232, RS485, TCP/IP, etc. so you can control the terminal in a large quantity, and the system has no spatial limitations.",
            "Systematic monitoring is possible from granting authorization to simple visitors and registered employees to access record management, and if any problems occur, the person in charge will get a text message instantly about the related information, and through remote control, quick handling is possible."
        ],
        diagramTitle: isKo ? "시스템 구성도" : "System Diagram",
        featuresTitle: isKo ? "특장점" : "Features",
        features: isKo ? [
            "외부인의 출입 방지",
            "기밀유출 방지",
            "지역·시간별 출입통제",
            "원격 조정 기능"
        ] : [
            "Prevents outsider access",
            "Prevents leaking of secrets",
            "Access control by area and by time",
            "Remote control possible"
        ],
        subjectTitle: isKo ? "사업대상" : "Business Subject",
        subjects: isKo ? [
            "아파트, 관공서, 학교, 조합, 병원, 일반빌딩 등"
        ] : [
            "Apartments, Public Offices, Schools, Associations, Hospitals, General Buildings, etc."
        ],
        appFieldTitle: isKo ? "적용분야" : "Application Field",
        appFields: isKo ? [
            "일반회사 및 빌딩의 중앙집중식 출입통제",
            "은행, 백화점 등 VIP룸 운영",
            "연구소, 전산실 등 중요시설에 대한 출입통제",
            "근태관리, 출입관리, 급식관리 등"
        ] : [
            "Centralized access control of general companies and buildings",
            "VIP room operation at banks, Department stores, etc.",
            "Access control in important facilities like laboratories",
            "Data processing rooms",
            "Diligence and indolence management",
            "Entry and exit management",
            "Meal service management, etc."
        ]
    };

    return (
        <div className="w-full">
            {/* Banner Image */}
            <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-16 border border-white/10">
                <Image
                    src="/images/business/access-parking/bus_img04.jpg"
                    alt={content.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
                    <h2 className="text-3xl md:text-5xl font-bold text-white p-8 md:p-12">
                        {content.title}
                    </h2>
                </div>
            </div>

            {/* Intro Text & Subtitle */}
            <div className="mb-12">
                <h3 className="text-xl md:text-2xl font-bold text-gentop-green mb-6 leading-tight">
                    {content.subtitle}
                </h3>
                <div className="text-lg text-gray-300 leading-relaxed space-y-4">
                    {content.desc.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </div>
            </div>

            {/* System Diagram */}
            <div className="mb-20">
                <h3 className="text-2xl font-bold mb-10 text-white border-l-4 border-gentop-green pl-6 flex items-center gap-3">
                    {content.diagramTitle}
                    <span className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></span>
                </h3>
                <div className="relative w-full aspect-[2/1] bg-white rounded-2xl overflow-hidden border border-white/10 p-4">
                    <Image
                        src="/images/business/access-parking/business_img004.jpg"
                        alt={content.diagramTitle}
                        fill
                        className="object-contain p-4"
                    />
                </div>
            </div>

            {/* Features */}
            <div className="mb-20">
                <h3 className="text-2xl font-bold mb-10 text-white border-l-4 border-gentop-green pl-6 flex items-center gap-3">
                    {content.featuresTitle}
                    <span className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></span>
                </h3>
                <ul className="gentop-list text-gray-300">
                    {content.features.map((f, i) => (
                        <li key={i}>{f}</li>
                    ))}
                </ul>
            </div>

            {/* Business Subject */}
            <div className="mb-20">
                <h3 className="text-2xl font-bold mb-10 text-white border-l-4 border-gentop-green pl-6 flex items-center gap-3">
                    {content.subjectTitle}
                    <span className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(isKo ? ['아파트', '관공서', '학교', '조합', '병원', '일반빌딩'] : ['Apartments', 'Public Offices', 'Schools', 'Associations', 'Hospitals', 'General Buildings']).map((item, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-xl text-center hover:bg-gentop-green/10 hover:border-gentop-green/50 transition-all duration-300 group">
                            <span className="text-lg font-semibold text-gray-300 group-hover:text-white">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Application Field */}
            <div className="mb-20">
                <h3 className="text-2xl font-bold mb-10 text-white border-l-4 border-gentop-green pl-6 flex items-center gap-3">
                    {content.appFieldTitle}
                    <span className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></span>
                </h3>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
                    <table className="w-full border-collapse text-sm md:text-base text-gray-300">
                        <tbody className="divide-y divide-white/5">
                            {content.appFields.map((item, idx) => (
                                <tr key={idx} className="hover:bg-white/5 transition-colors">
                                    <td className="p-5 md:p-6 flex items-center gap-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gentop-green" />
                                        {item}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
