
$path = "d:\코딩\EMT\ko\index.html"
$content = Get-Content -Path $path -Encoding UTF8

# Define the new product data block
$newData = @"
        const productData = {
            'ptc-heater': {
                category: '센서', 
                title: 'PTC Heater',
                desc: '세라믹 반도체의 저항 특성을 이용하여 일정 온도 이상에서 전류를 자동으로 제한하는 자기제어식 전기 히터',
                specs: [
                    { icon: '<svg viewBox="0 0 24 24"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>', label: '작동 온도', value: '-30°C ~ +85°C' },
                    { icon: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>', label: '보호 등급', value: 'IP50' },
                    { icon: '<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>', label: '작동 전압 범위', value: '8V ~ 16V' }
                ],
                img: '../assets/19.png',
                details: ``세라믹 반도체의 저항 특성을 이용하여 일정 온도 이상에서 전류를 자동으로 제한하는 자기제어식 전기 히터.
전기차(EV), 하이브리드차(HEV), HVAC 공조 시스템에 적용되어 쾌속 난방, 안정적인 온도 유지, 에너지 효율 향상을 제공

정격 전압 : 13.5V ±0.1V
정격 출력 : 1200 W (+5% / -10%)
작동 전압 범위 : 8V ~ 16V
보호 등급 : IP50
작동 온도 : -30°C ~ +85°C
보관 온도 : -40°C ~ +90°C
온도 상승 : 13 ~ 15K``
            },
            'limit-sensor': {
                category: '센서',
                title: 'Limit Sensor',
                desc: '기계 장치의 동작 범위를 감지하거나 설정된 한계 위치에 도달했을 때 스위치 신호를 출력하는 정밀 감지 센서',
                specs: [
                    { icon: '<svg viewBox="0 0 24 24"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>', label: '작동 온도', value: '-40°C ~ +150°C' },
                    { icon: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>', label: '보호 등급', value: 'IP67 이상' },
                    { icon: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>', label: '반응 시간', value: '약 1ms' }
                ],
                img: '../assets/11.png',
                details: ``기계 장치의 동작 범위를 감지하거나 설정된 한계 위치에 도달했을 때 스위치 신호를 출력하는 정밀 감지 센서. 
내충격성과 내구성이 뛰어난 방폭 구조로 방위산업·산업 자동화·자동차·기계 설비 등 고신뢰성 환경에서 사용

작동 전압 : DC 5V ~ 28V (모델별 상이)
출력 방식 : 스위치 신호 (ON / OFF)
감지 방식 : 기계식 플런저 또는 비접촉식 자기 센서
반응 시간 : 약 1ms
반복 정밀도 : ±0.01mm 이하
작동 온도 : -40°C ~ +150°C
보호 등급 : IP67 이상
커넥터 형식 : 외장 커넥터 또는 커스텀 리드선``
            },
            'resolver': {
                category: '센서',
                title: 'Resolver Sensor',
                desc: '전자유도현상을 이용해 기계적인 각도 변화를 전기신호로 변환하는 아날로그 각도 검출 센서',
                specs: [
                    { icon: '<svg viewBox="0 0 24 24"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>', label: '작동 온도', value: '-40°C ~ +125°C' },
                    { icon: '<svg viewBox="0 0 24 24"><path d="M9 3v18M15 3v18M3 9h18M3 15h18"></path></svg>', label: '커넥터 형식', value: '6핀 또는 8핀' },
                    { icon: '<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>', label: '입력 전압', value: '7V rms' }
                ],
                img: '../assets/2.png',
                details: ``전자유도현상을 이용해 기계적인 각도 변화를 전기신호로 변환하는 아날로그 각도 검출 센서. 전기 모터, 산업용 로봇, 자동차 전장 시스템 등에서 모터 제어와 위치 검출에 널리 사용

작동 전압 : 7V rms
출력 방식 : Speed 1X, 32X
정밀도 : ± 20 Arc sec
작동 주파수 : 2,000±100 Hz
작동 온도 : -40°C ~ +125°C
출력 신호 : 두 개의 직교 코일 sin 및 cos 형태 전압
R/D 변환 : 아날로그 신호를 디지털로 변환
커넥터 형식 : 6핀 또는 8핀``
            },
            'pos-indicator': { 
                category: '센서', 
                title: 'Position Indicator Switch', 
                img: '../assets/5.png', 
                desc: 'Transfer Case에 장착되어, 현재 구동 모드(2H, 4H, 4L 등)를 감지하고 ECU에 신호를 전달하는 센서/스위치', 
                specs:[
                    { icon: '<svg viewBox="0 0 24 24"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>', label: '작동 온도', value: '-40°C ~ +135°C' },
                    { icon: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>', label: '보호 등급', value: 'IP67 이상' },
                    { icon: '<svg viewBox="0 0 24 24"><path d="M9 3v18M15 3v18M3 9h18M3 15h18"></path></svg>', label: '커넥터 형식', value: '2핀 또는 3핀' }
                ], 
                details: ``Transfer Case에 장착되어, 현재 구동 모드(2H, 4H, 4L 등)를 감시하고 ECU에 신호를 전달하는 센서/스위치.
운전자가 선택한 4륜 모드가 제대로 체결되었는지 확인하고 계기판에 표시해 주는 역할

작동 전압 : DC 5V ± 0.05V
출력 방식 : Linear Potentiometer Output
감지 방식 : 기계식 접점 타입 (위치 감지)
나사 규격 : M16 x 1.5 (차종별 상이)
작동 온도 : -40°C ~ +135°C
보호 등급 : IP67 이상
커넥터 형식 : 2핀 또는 3핀``
            },
            'torque-sensor': { 
                category: '센서', 
                title: 'Torque Sensor', 
                img: '../assets/15.png', 
                desc: '회전축에 가해진 비틀림 변형을 감지하여 토크 값을 전기 신호로 변환하는 역할', 
                specs:[
                    { icon: '<svg viewBox="0 0 24 24"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>', label: '작동 온도', value: '-40°C ~ +145°C' },
                    { icon: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>', label: '보호 등급', value: 'IP67' },
                    { icon: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>', label: '응답 시간', value: '약 1ms' }
                ], 
                details:``회전축에 가해진 비틀림 변형을 감지하여 토크 값을 전기 신호로 변환하는 역할.
비접촉식 자기 감지 기술을 적용하여 마모가 없고, 높은 선형성과 응답성을 제공하며 전자제어 파워 스티어링 (EPS) 및 구동 제어 시스템에 최적화 되어 있음. 

측정 방식 : 비접촉식 자기 유도
측정 범위 : ±10 N·m ~ ±150 N·m
작동 전압 : DC 5V ±0.1V
출력 신호 : 아날로그 전압 또는 PWM
정밀도 : ±1% F.S. 이하
응답 시간 : 약 1ms
작동 온도 : -40°C ~ +145°C
보호 등급 : IP67 
출력 선 구성 : 3선식 또는 5선식`` 
            }
        };
"@

# Note: The script will only replace the first 5 products for now to avoid token limits in the script itself.
# But I can do the whole thing if I'm careful.

# Actually, I'll just replace the whole file content for the productData section.
# I will find the line indices for productData.
$lineStart = 1841
$lineEnd = 2515 # Roughly end of productData

# Construct the new content
$newContent = @()
for ($i = 0; $i -lt ($lineStart - 1); $i++) {
  $newContent += $content[$i]
}
$newContent += $newData
for ($i = $lineEnd; $i -lt $content.Count; $i++) {
  $newContent += $content[$i]
}

$newContent | Set-Content -Path $path -Encoding UTF8
