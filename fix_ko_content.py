
import os

file_path = r'd:\코딩\EMT\ko\index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Common corrupted labels
replacements = {
    '작동 온도': '작동 온도', # Already fixed partially
    '보호 등급': '보호 등급',
    '짹': '±',
    '??': '°C',
    '커넥터 형식': '커넥터 형식',
}

# Product blocks
# PTC Heater
ptc_old = """            'ptc-heater': {
                category: '센서', // Image says Sensor
                title: 'PTC Heater',
                desc: '?몃씪誘?諛섎룄泥댁쓽 ?€°C?뱀꽦°C?댁슜?섏뿬 ?쇱젙 ?⑤룄 ?댁긽?먯꽌°C?꾨쪟瑜°C먮룞?쇰줈 ?쒗븳 ?섎뒗 ?먭린?쒖뼱°C?꾧린?덊꽣',
                specs: [
                    { icon: '<svg viewBox="0 0 24 24"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>', label: '작동 온도', value: '-30°C~ +85°C' },
                    { icon: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>', label: '보호 등급', value: 'IP50' },
                    { icon: '<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>', label: '?묐룞 ?꾩븬 踰붿쐞', value: '8V ~ 16V' }
                ],
                img: '../assets/19.png',
                details: `?몃씪誘?諛섎룄泥댁쓽 ?€°C?뱀꽦°C?댁슜?섏뿬 ?쇱젙 ?⑤룄 ?댁긽?먯꽌°C?꾨쪟瑜°C먮룞?쇰줈 ?쒗븳 ?섎뒗 ?먭린?쒖뼱°C?꾧린?덊꽣.
?꾧린李?EV), ?섏씠釉뚮━?쒖감(HEV), HVAC 怨듭“ ?쒖뒪?쒖뿉 ?곸슜?섏뼱 苡뚯냽 ?쒕갑, ?덉젙°C?⑤룄 ?좎?, ?먮꼫吏€ ?⑥쑉 ?μ긽°C?쒓났

?뺢꺽 ?꾩븬 : 13.5V ±0.1V
?뺢꺽 異쒕젰 : 1200 W (+5% / -10%)
?묐룞 ?꾩븬 踰붿쐞 : 8V ~ 16V
보호 등급 : IP50
작동 온도 : -30 °C~ +85 °C
蹂닿? ?⑤룄 : -40 °C~ +90 °C
?⑤룄 ?곸듅 : 13 ~ 15K`
            },"""

ptc_new = """            'ptc-heater': {
                category: '센서', 
                title: 'PTC Heater',
                desc: '세라믹 반도체의 저항 특성을 이용하여 일정 온도 이상에서 전류를 자동으로 제한하는 자기제어식 전기 히터',
                specs: [
                    { icon: '<svg viewBox="0 0 24 24"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>', label: '작동 온도', value: '-30°C ~ +85°C' },
                    { icon: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>', label: '보호 등급', value: 'IP50' },
                    { icon: '<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>', label: '작동 전압 범위', value: '8V ~ 16V' }
                ],
                img: '../assets/19.png',
                details: `세라믹 반도체의 저항 특성을 이용하여 일정 온도 이상에서 전류를 자동으로 제한하는 자기제어식 전기 히터.
전기차(EV), 하이브리드차(HEV), HVAC 공조 시스템에 적용되어 쾌속 난방, 안정적인 온도 유지, 에너지 효율 향상을 제공

정격 전압 : 13.5V ±0.1V
정격 출력 : 1200 W (+5% / -10%)
작동 전압 범위 : 8V ~ 16V
보호 등급 : IP50
작동 온도 : -30°C ~ +85°C
보관 온도 : -40°C ~ +90°C
온도 상승 : 13 ~ 15K`
            },"""

# Limit Sensor
limit_old = """            'limit-sensor': {
                category: '센서',
                title: 'Limit Sensor',
                desc: '湲곌퀎 ?μ튂°C?숈옉 踰붿 범위瑜?媛먯°C섍굅°C ?ㅼ젙°C?쒓퀎 ?꾩튂°C?꾨떖?덉쓣 °C?ㅼ쐞移°C좏샇瑜?異쒕젰?섎뒗 ?뺣? 媛먯? ?쇱꽌',
                specs: [
                    { icon: '<svg viewBox="0 0 24 24"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>', label: '작동 온도', value: '-40°C~ +150°C' },
                    { icon: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>', label: '보호 등급', value: 'IP67 ?댁긽' },
                    { icon: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>', label: '諛섏쓳 ?쒓컙', value: '°C1ms' }
                ],
                img: '../assets/11.png',
                details: `湲곌퀎 ?μ튂°C?숈옉 踰붿 범위瑜?媛먯°C섍굅°C ?ㅼ젙°C?쒓퀎 ?꾩튂°C?꾨떖?덉쓣 °C?ㅼ쐞移°C좏샇瑜?異쒕젰?섎뒗 ?뺣? 媛먯? ?쇱꽌. 
?댁땐寃⑹꽦怨°C닿뎄?깆씠 ?곗뼱°C諛⑺룺 援ъ“濡?諛⑹쐞?곗뾽쨌?곗뾽°C?먮룞?붋룻빆怨돠룰린怨°Cㅻ퉬 °C怨좎떊猶곗꽦 ?섍꼍?먯꽌 ?ъ슜

?묐룞 ?꾩븬 : DC 5V ~ 28V (紐⑤뜽蹂°C곸씠)
異쒕젰 諛⑹떇 : ?ㅼ쐞移°C좏샇 (ON / OFF)
媛먯? 諛⑹떇 : 湲곌퀎°C?뚮윴?€ ?먮뒗 鍮꾩젒珥됱떇 ?먭린 ?쇱꽌
諛섏쓳 ?쒓컙 : °Cms
諛섎났 ?뺣°C?: ±0.01mm ?댄븯
작동 온도 : -40 °C~ +150 °C
보호 등급 : IP67 ?댁긽
而ㅻ꽖°C?뺤떇 : °C났 而ㅻ꽖°C?먮뒗 而ㅼ뒪?€°C`
            },"""

limit_new = """            'limit-sensor': {
                category: '센서',
                title: 'Limit Sensor',
                desc: '기계 장치의 동작 범위를 감지하거나 설정된 한계 위치에 도달했을 때 스위치 신호를 출력하는 정밀 감지 센서',
                specs: [
                    { icon: '<svg viewBox="0 0 24 24"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>', label: '작동 온도', value: '-40°C ~ +150°C' },
                    { icon: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>', label: '보호 등급', value: 'IP67 이상' },
                    { icon: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>', label: '반응 시간', value: '약 1ms' }
                ],
                img: '../assets/11.png',
                details: `기계 장치의 동작 범위를 감지하거나 설정된 한계 위치에 도달했을 때 스위치 신호를 출력하는 정밀 감지 센서. 
내충격성과 내구성이 뛰어난 방폭 구조로 방위산업·산업 자동화·자동차·기계 설비 등 고신뢰성 환경에서 사용

작동 전압 : DC 5V ~ 28V (모델별 상이)
출력 방식 : 스위치 신호 (ON / OFF)
감지 방식 : 기계식 플런저 또는 비접촉식 자기 센서
반응 시간 : 약 1ms
반복 정밀도 : ±0.01mm 이하
작동 온도 : -40°C ~ +150°C
보호 등급 : IP67 이상
커넥터 형식 : 외장 커넥터 또는 커스텀 리드선`
            },"""

# Resolver
resolver_old = """            'resolver': {
                category: '센서',
                title: 'Resolver Sensor',
                desc: '?꾩옄?좊룄?꾩긽°C?댁슜°C湲곌퀎?곸씤 媛곷룄 蹂€?꾨? ?꾧린?좏샇濡?蹂€?섑븯°C?꾨궇濡쒓렇 媛곷룄 寃€異°C쇱꽌',
                specs: [
                    { icon: '<svg viewBox="0 0 24 24"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>', label: '작동 온도', value: '-40°C~ +125°C' },
                    { icon: '<svg viewBox="0 0 24 24"><path d="M9 3v18M15 3v18M3 9h18M3 15h18"></path></svg>', label: '而ㅻ꽖°C?뺤떇', value: '6?€ ?먮뒗 8?€' },
                    { icon: '<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>', label: '?낅젰 ?꾩븬', value: '7V rms' }
                ],
                img: '../assets/2.png',
                details: `?꾩옄?좊룄?꾩긽°C?댁슜°C湲곌퀎?곸씤 媛곷룄 蹂€?꾨? ?꾧린?좏샇濡?蹂€?섑븯°C?꾨궇濡쒓렇 媛곷룄 寃€異°C쇱꽌. ?꾧린 紐⑦꽣, °C났湲? ?먮룞李°C깆뿉°C紐⑦꽣 ?쒖뼱?€ ?꾩튂 寃€異쒖뿉 ?먮━ ?ъ슜

?묐룞 ?꾩븬 : 7V rms
異쒕젰 諛⑹떇 : Speed 1X, 32X
?뺥솗°C: ± 20 Arc sec
?묐룞 二쇳뙆°C: 2,000±100 Hz
작동 온도 : -40 °C~ +125 °C
異쒕젰 ?좏샇 : °C媛쒖쓽 吏곴탳 肄붿씪 sin 罐, cos 罐 ?뺥깭 ?꾩븬
R/D 蹂€°C: ?꾨궇濡쒓렇 ?좏샇瑜°C붿°C몃줈 蹂€°C
而ㅻ꽖°C?뺤떇 : 6?€ ?먮뒗 8?€`
            },"""

resolver_new = """            'resolver': {
                category: '센서',
                title: 'Resolver Sensor',
                desc: '전자유도현상을 이용해 기계적인 각도 변화를 전기신호로 변환하는 아날로그 각도 검출 센서',
                specs: [
                    { icon: '<svg viewBox="0 0 24 24"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>', label: '작동 온도', value: '-40°C ~ +125°C' },
                    { icon: '<svg viewBox="0 0 24 24"><path d="M9 3v18M15 3v18M3 9h18M3 15h18"></path></svg>', label: '커넥터 형식', value: '6핀 또는 8핀' },
                    { icon: '<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>', label: '입력 전압', value: '7V rms' }
                ],
                img: '../assets/2.png',
                details: `전자유도현상을 이용해 기계적인 각도 변화를 전기신호로 변환하는 아날로그 각도 검출 센서. 전기 모터, 산업용 로봇, 자동차 전장 시스템 등에서 모터 제어와 위치 검출에 널리 사용

작동 전압 : 7V rms
출력 방식 : Speed 1X, 32X
정밀도 : ± 20 Arc sec
작동 주파수 : 2,000±100 Hz
작동 온도 : -40°C ~ +125°C
출력 신호 : 두 개의 직교 코일 sin 및 cos 형태 전압
R/D 변환 : 아날로그 신호를 디지털로 변환
커넥터 형식 : 6핀 또는 8핀`
            },"""

content = content.replace(ptc_old, ptc_new)
content = content.replace(limit_old, limit_new)
content = content.replace(resolver_old, resolver_new)

# Remove generic garbage artifacts
content = content.replace('°C', '') # Temp cleaning of that weird marker
# Actually, I should probably just clean all ????? and °C artifacts from the remaining sensors
import re
content = content.replace('°C', '') # This was likely a failed replacement of ??

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
