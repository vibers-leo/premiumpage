import React from "react";
import Image from "next/image";

interface ParkingControlProps {
    lang?: string;
}

export const ParkingControl = ({ lang = 'en' }: ParkingControlProps) => {
    const isKo = lang === 'ko';

    const content = {
        title: isKo ? "주차관제시스템" : "Parking Control System",
        subtitle: isKo
            ? "최소의 관리 인원으로도 효율적인 관리가 될 수 있도록 주차관리 시스템 환경 구축"
            : "Parking management system environment construction for effective management even with the minimum managing staff",
        desc: isKo ? [
            "정보보안에 관한 관심이 나날이 높아지고 있는 가운데 기업에서 관리, 운영되고 있는 설비 및 자산을 여러 위험요소부터 보호하는 것을 목적으로 합니다.",
            "젠탑㈜의 주차관제시스템은 주변 주차 환경에 따라 최적화된 시스템을 구축하여 입·출차 시 차량의 원활한 소통을 가능하게 하며 최소의 관리 인원으로도 효율적으로 관리될 수 있도록 주차관리 시스템 환경을 구축하여 제공합니다.",
            "또한 총괄 관리자는 월별 및 연간 보고서 자료를 열람 및 출력할 수 있어 수익성 검토와 같은 통계 자료나 필요한 정보를 분석하여 볼 수 있도록 경영 활동에 도움을 줍니다."
        ] : [
            "In the midst of heightened interest in information security day by day, we aim to protect the corporation’s equipment and properties that are managed and operated by various risk factors.",
            "The parking control system of GENTOP Inc. constructs a system optimized based on the surrounding parking environment, enabling smooth communication of vehicles when entering and exiting, while managing effectively with minimum personnel.",
            "The general manager and each person in charge can read and print the monthly/annual report by analyzing the statistics of various stored data, which can be useful as support data for profitability review and business activities."
        ],
        diagramTitle: isKo ? "시스템 구성도" : "System Diagram",
        featuresTitle: isKo ? "특장점" : "Features",
        features: isKo ? [
            "차량의 전면 번호판의 문자 및 숫자를 자동으로 인식하여 요금 계산 장치 및 본부 서버로 영상을 전송, 효율적으로 주차를 관리합니다.",
            "차량 진입 시 번호판 촬영 후 자동으로 차단기가 Open 됩니다.",
            "번호판을 인식하여 시스템을 관리하므로 소모품(카드, 주차권 등) 비용이 발생하지 않습니다.",
            "입차된 차량 영상 검색이 가능하여 정기권 도용 등을 사전에 차단할 수 있습니다."
        ] : [
            "Automatically recognizes letters and numbers of the front license plate, then transmits fee calculation and video to the headquarters server.",
            "As the vehicle enters, after taking a photograph of the license plate, the barrier will be opened automatically.",
            "Because the system manages by recognizing the license plate, there is no expense of consumables (card, ticket, etc.).",
            "Advanced video search of entered vehicles is possible, and illegal use of commutation tickets can be prevented in advance."
        ],
        subjectTitle: isKo ? "사업대상" : "Business Subject",
        subjects: isKo ? [
            "아파트", "관공서", "학교", "조합", "병원", "일반빌딩"
        ] : [
            "Apartments", "Public Offices", "Schools", "Associations", "Hospitals", "General Buildings"
        ]
    };

    return (
        <div className="w-full">
            {/* Banner Image */}
            {/* Banner Image */}
            <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-16 border border-white/10">
                <Image
                    src="/images/business/access-parking/bus_img04_1.jpg"
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

            {/* System Diagram (Flow Chart) */}
            <div className="mb-20">
                <h3 className="text-2xl font-bold mb-10 text-white border-l-4 border-gentop-green pl-6 flex items-center gap-3">
                    {content.diagramTitle}
                    <span className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></span>
                </h3>
                <div className="relative w-full aspect-[4/3] bg-white rounded-2xl overflow-hidden border border-white/10 p-4">
                    <Image
                        src="/images/business/access-parking/business_img003.jpg"
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
                    {content.subjects.map((item, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-xl text-center hover:bg-gentop-green/10 hover:border-gentop-green/50 transition-all duration-300 group">
                            <span className="text-lg font-semibold text-gray-300 group-hover:text-white">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
