export const EMT_MENU_EN = [
    {
        id: 'about',
        label: 'About us',
        subs: [
            { id: 'overview', label: 'Overview', slide: 1 },
            { id: 'vision', label: 'Vision & Mission', slide: 2 },
            { id: 'partners', label: 'Partners', slide: 3 },
            { id: 'solutions', label: 'Solutions & Industry', slide: 4 },
            { id: 'esg', label: 'ESG Management', slide: 5 },
        ]
    },
    {
        id: 'products',
        label: 'Products',
        subs: [
            { id: 'p_overview', label: 'Overview', slide: 6 },
            { id: 'sensors', label: 'SENSORS', slide: 7 },
            { id: 'actuators', label: 'ACTUATORS', slide: 11 },
            { id: 'controllers', label: 'CONTROLLERS', slide: 12 },
        ]
    },
    {
        id: 'support',
        label: 'Support',
        subs: [
            { id: 'directions', label: 'Directions', slide: 13 },
        ]
    }
]

export const EMT_PRODUCTS_EN = [
    {
        id: 'ptc-heater',
        category: 'Sensors',
        title: 'PTC Heater',
        image: '/emt/assets/19.png',
        desc: 'A self regulating electric heater that uses the resistance characteristics of a ceramic semiconductor to automatically limit current above a certain temperature',
        details: 'Supply voltage: DC 12V / 24V\nHeat output: 100W to 200W\nOperating temperature: -40°C to +85°C\nProtection rating: IP67\nReliability: Supports over 100,000 cycles'
    },
    {
        id: 'limit-sensor',
        category: 'Sensors',
        title: 'Limit Sensor',
        image: '/emt/assets/11.png',
        desc: 'A precision detection sensor that senses the operating range of a mechanical device or outputs a switching signal when the preset limit position is reached',
        details: 'Contact type: Non-contact magnetic sensor\nOutput signal: Digital HIGH/LOW\nOperating voltage: DC 5V ± 0.5V\nResponse time: ≤ 1ms\nDurability: Semi-permanent lifecycle (non-contact)'
    },
    {
        id: 'resolver',
        category: 'Sensors',
        title: 'Resolver Sensor',
        image: '/emt/assets/2.png',
        desc: 'An analog angle-detection sensor that converts mechanical angular displacement into electrical signals using electromagnetic induction',
        details: 'Excitation voltage: 7Vrms, 10kHz\nTransformation ratio: 0.5 ± 0.05\nAccuracy: ≤ ±10 arc-min\nOperating speed: Up to 20,000 RPM\nOperating temperature: -40°C to +150°C'
    },
    {
        id: 'pos-indicator',
        category: 'Sensors',
        title: 'Position Indicator Switch',
        image: '/emt/assets/5.png',
        desc: 'A sensor switch mounted on the transfer case that detects the current drive mode such as 2H 4H or 4L and sends the signal to the ECU',
        details: 'Contact resistance: ≤ 100mΩ\nInsulation resistance: ≥ 100MΩ\nLeakage current: ≤ 0.1mA\nSwitching logic: 2-bit or 3-bit Gray code\nDurability: Over 500,000 operations'
    },
    {
        id: 'trans-position',
        category: 'Sensors',
        title: 'Transmission Position Sensor',
        image: '/emt/assets/17.png',
        desc: 'Sensors to detect gear lever positions (P, R, N, D, etc.) in the electric vehicle transmission system and to the ECU and instrument cluster',
        details: 'Output signal: Analog voltage or PWM\nSupply voltage: DC 5V\nDetection angle: 0° to 90°\nHysteresis: ≤ 0.5°\nOperating temperature: -40°C to +125°C'
    },
    {
        id: 'pressure-sensor',
        category: 'Sensors',
        title: 'Pressure Sensor',
        image: '/emt/assets/1.png',
        desc: 'A sensor that uses piezoelectric effects to convert pressure into electrical signals',
        details: 'Measurement range: 0 to 100 bar (customizable)\nAccuracy: ±1.0% FS\nResponse time: ≤ 2ms\nOperating voltage: DC 5V\nMedia compatibility: Oil, Coolant, Air'
    },
    {
        id: 'tpms-sensor',
        category: 'Sensors',
        title: 'TPMS Sensor',
        image: '/emt/assets/16.png',
        desc: 'A sensor that detects tire pressure and temperature in real time and sends the information to the driver',
        details: 'Pressure range: 0 to 8 bar\nTemperature accuracy: ±2°C\nFrequency: 433.92 MHz\nBattery life: 5-7 years\nSleep mode current: ≤ 0.5μA'
    },
    {
        id: 'aps-sensor',
        category: 'Sensors',
        title: 'Accelerator Pedal Sensor',
        image: '/emt/assets/3.png',
        desc: 'A device that converts the pedal depression depth angle into an electrical signal and delivers it to the ECU to control vehicle speed',
        details: 'Output type: Dual independent signals (redundancy)\nLinearity: ≤ ±1.5% FS\nSynchronicity: Dual signals within 1% offset\nDurability: 5 million cycles\nOperating force: 20N to 45N'
    },
    {
        id: 'speed-sensor',
        category: 'Sensors',
        title: 'Speed Sensor',
        image: '/emt/assets/18.png',
        desc: 'A sensor that measures vehicle driving speed and sends the information to the ECU and instrument cluster',
        details: 'Frequency range: 1Hz to 5kHz\nAir gap: 0.5mm to 1.5mm\nOutput type: Hall effect (square wave)\nSignal amplitude: ≥ 4.5V (at 5V supply)\nReverse polarity protection: Integrated'
    },
    {
        id: 'transfer-case',
        category: 'Sensors',
        title: 'Transfer Case Sensor',
        image: '/emt/assets/4.png',
        desc: 'A key component that switches between two-wheel drive and four-wheel drive according to driving conditions and detects and controls the distribution of power',
        details: 'Communication: CAN 2.0B / LIN\nOperating voltage: DC 9V to 16V\nDiagnostic functions: Open/Short circuit detection\nProtection: Overvoltage, ESD suppression\nIP rating: IP6k9k'
    }
]
