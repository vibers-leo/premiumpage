
export interface SubMenuItem {
    id: string;
    label: string;
    href: string;
    subs?: SubMenuItem[];
}

export interface MenuItem {
    id: string;
    label: string;
    href: string;
    subs?: SubMenuItem[];
}

export interface BrandItem {
    brand: string;
    href: string;
    items: MenuItem[];
}

export const ABOUT_IMG = '/hstech/information_files/c391896046650.jpg' // Updated
export const ABOUT_IMG_2 = '/hstech/information_files/054fc84ad679e.jpg' // Updated

// Brand Structure Definition for Top-Level Navigation
export const BRANDS = {
    vaisala: {
        label: 'VAISALA',
        desc: 'World leader in environmental and industrial measurement.',
        categories: ['humidity', 'dewpoint', 'co2', 'oil', 'barometer', 'weather', 'h2o2'],
        logo: '/hstech/new_images/vaisala_banner.png'
    },
    setra: {
        label: 'SETRA',
        desc: 'Premium pressure transducers and current switches.',
        categories: ['setra_products'],
        logo: '/hstech/Knick 트랜스미터_files/8c9ecbadfaf53.png'
    },
    jumo: {
        label: 'JUMO',
        desc: 'Innovative sensors and automation solutions.',
        categories: ['jumo_products'],
        logo: '/hstech/Control & Recording_files/a94c4545e6c72.png'
    },
    knick: {
        label: 'KNICK',
        desc: 'High-quality interface and process analysis.',
        categories: ['knick_products'],
        logo: '/hstech/HS-TECH_files/50e31ebdea359.png' // HS TECH logo as fallback for now
    }
}

// Category Information - Updated with existing images
export const CATEGORY_INFO: Record<string, any> = {
    humidity: { title: "Humidity", desc: "Best-in-class humidity instruments.", images: ['/hstech/HMT330_files/cffbaca7b6b82.jpg'] },
    dewpoint: { title: "Dewpoint", desc: "Reliable dewpoint measurement.", images: ['/hstech/DMT340_files/41afb17e01092.jpg'] },
    co2: { title: "Carbon Dioxide", desc: "Accurate CO2 monitoring.", images: ['/hstech/GMP251_files/a7ce17262895c.png'] },
    oil: { title: "Moisture in Oil", desc: "Transformer oil monitoring.", images: ['/hstech/MHT410_files/c49c396f6025a.png'] },
    barometer: { title: "Barometric Pressure", desc: "Digital barometers.", images: ['/hstech/Barometer_files/0a866df8da84d.png'] },
    weather: { title: "Weather", desc: "Meteorological sensors.", images: ['/hstech/Weather_files/c0bb8f87ce4d3.png'] },
    h2o2: { title: "H2O2", desc: "Bio-decontamination monitoring.", images: ['/hstech/H2O2 sensor_files/387404d86d157.png'] },

    // Brands
    setra_products: { title: "SETRA Systems", desc: "Differential & Industrial Pressure.", images: ['/hstech/HS-TECH_files/2ddb0a75a50e4.jpg'] },
    jumo_products: { title: "JUMO", desc: "Liquid Analysis & Control.", images: ['/hstech/Control & Recording_files/6f9b65b068db1.jpg'] },
    knick_products: { title: "KNICK", desc: "Process Analysis.", images: ['/hstech/Knick 트랜스미터_files/5fa3377dc5c8d.png'] }
}

// Sub-Category Definitions
export const SUB_CATEGORIES: Record<string, any[]> = {
    // === VAISALA ===
    humidity: [
        {
            id: 'handheld', title: 'Hand-held Instrument', desc: 'HM70, Indigo80',
            items: [
                { id: 'indigo80_hmp80', label: 'Indigo80+HMP80' },
                { id: 'hm70', label: 'HM70' },
                { id: 'hm40', label: 'HM40' },
                { id: 'shm40', label: 'SHM40' },
                { id: 'hmk15', label: 'HMK15' }
            ]
        },
        {
            id: 'industrial', title: 'Industrial Transmitter', desc: 'HMT330, HMT310',
            items: [
                { id: 'hmt330', label: 'HMT330' },
                { id: 'hmt310', label: 'HMT310' },
                { id: 'hmt120', label: 'HMT120/130' },
                { id: 'hmt370ex', label: 'HMT370EX' },
                { id: 'hmt360', label: 'HMT360' }
            ]
        },
        {
            id: 'hvac', title: 'HVAC Transmitter', desc: 'HMD60, HMW90',
            items: [
                { id: 'hmd60', label: 'HMD60' },
                { id: 'hmw90', label: 'HMW90' },
                { id: 'hmdw110', label: 'HMDW110' },
                { id: 'hmdw80', label: 'HMDW80' }
            ]
        },
        {
            id: 'probe', title: 'Module/OEM', desc: 'HMP series',
            items: [
                { id: 'hmp1_9', label: 'HMP1-9' },
                { id: 'hmm170', label: 'HMM170' },
                { id: 'hmp155', label: 'HMP155' },
                { id: 'hmp60', label: 'HMP60' }
            ]
        },
        {
            // Typo fix: removed duplicate key logic by ensuring uniqueness in structure
            id: 'dewpoint_handheld', title: 'Portable Instrument', desc: 'DM70',
            items: [
                { id: 'indigo80_dmp80', label: 'Indigo80+DMP80' },
                { id: 'dm70', label: 'DM70' },
                { id: 'dss70a', label: 'DSS70A' }
            ]
        }
    ],
    dewpoint: [
        {
            id: 'portable', title: 'Portable Instrument', desc: 'DM70',
            items: [
                { id: 'indigo80_dmp80', label: 'Indigo80+DMP80' },
                { id: 'dm70', label: 'DM70' },
                { id: 'dss70a', label: 'DSS70A' }
            ]
        },
        {
            id: 'fixed', title: 'Fixed installed type', desc: 'DMT340, DMT345',
            items: [
                { id: 'dmt340', label: 'DMT340' },
                { id: 'dmt345', label: 'DMT345/346' },
                { id: 'dmp1', label: 'DMP1-8' }
            ]
        },
        {
            id: 'module', title: 'Module/OEM', desc: 'DMT143, DMT152',
            items: [
                { id: 'dmt152', label: 'DMT152' },
                { id: 'dmt143', label: 'DMT143' },
                { id: 'dmt143l', label: 'DMT143L' },
                { id: 'dpt146', label: 'DPT146' },
                { id: 'dpt145', label: 'DPT145' }
            ]
        }
    ],
    co2: [
        {
            id: 'transmitter', title: 'Transmitter', desc: 'GMW90, GMD110',
            items: [
                { id: 'gmw90', label: 'GMW90' },
                { id: 'gmw80', label: 'GMW80' },
                { id: 'gmd110', label: 'GMD110' }
            ]
        },
        {
            id: 'probe', title: 'Probe', desc: 'GMP series',
            items: [
                { id: 'gmp343', label: 'GMP343' },
                { id: 'gmp251', label: 'GMP251' },
                { id: 'gmp231', label: 'GMP231' },
            ]
        },
        {
            id: 'handheld', title: 'Hand-held Meter', desc: 'GMP252',
            items: [
                { id: 'indigo80_gmp252', label: 'Indigo80+GMP252' }
            ]
        }
    ],
    oil: [
        {
            id: 'transformer', title: 'Transformer Monitor', desc: 'MHT410',
            items: [
                { id: 'mht410', label: 'MHT410' }
            ]
        },
        {
            id: 'fixed', title: 'Oil Moisture Transmitter', desc: 'MMT330',
            items: [
                { id: 'mmt330', label: 'MMT330' },
                { id: 'mmt310', label: 'MMT310' }
            ]
        },
        {
            id: 'handheld', title: 'Hand-held measurement', desc: 'MM70',
            items: [
                { id: 'mm70', label: 'MM70' }
            ]
        }
    ],
    barometer: [
        {
            id: 'barometer', title: 'Digital Barometer', desc: 'PTB series',
            items: [
                { id: 'ptb330', label: 'PTB330' },
                { id: 'ptb210', label: 'PTB210' },
                { id: 'ptb110', label: 'PTB110' },
                { id: 'ptu300', label: 'PTU300 (Combined)' }
            ]
        }
    ],
    weather: [
        {
            id: 'trans', title: 'Weather Transmitter', desc: 'WXT530',
            items: [
                { id: 'wxt530', label: 'WXT530' },
                { id: 'hmp155_w', label: 'HMP155' }
            ]
        }
    ],
    h2o2: [
        {
            id: 'sensor', title: 'H2O2 Sensor', desc: 'HPP series',
            items: [
                { id: 'hpp271', label: 'HPP271/272' }
            ]
        }
    ],

    // === SETRA ===
    setra_products: [
        {
            id: 'diff_ind', title: 'Differential Pressure (Visual)', desc: 'Setra Lite',
            items: [
                { id: 'setra_lite', label: 'Setra Lite' },
                { id: 'setra_flex', label: 'Setra Flex' }
            ]
        },
        {
            id: 'diff_sen', title: 'Differential Pressure (Sensor)', desc: 'HVAC & Filter monitoring',
            items: [
                { id: 'model_mrc', label: 'Model MRC' },
                { id: 'model_mrg', label: 'Model MRG' },
                { id: 'model_264', label: 'Model 264' },
                { id: 'pdt101', label: 'PDT101' }
            ]
        },
        {
            id: 'industrial', title: 'Industrial Pressure', desc: 'High performance transducers',
            items: [
                { id: 'model_axd', label: 'Model AXD' },
                { id: 'model_206', label: 'Model 206' },
                { id: 'model_209', label: 'Model 209' }
            ]
        }
    ],

    // === JUMO ===
    jumo_products: [
        {
            id: 'liquid', title: 'Liquid Analysis', desc: 'pH, Conductivity',
            items: [
                { id: 'ph_sensor', label: 'tecline pH' },
                { id: 'ph_trans', label: 'ecoTRANS pH 03' },
                { id: 'dtrans_ph02', label: 'dTRANS pH 02' },
                { id: 'cond_trans', label: 'ecoTRANS Lf 03' }
            ]
        },
        {
            id: 'control', title: 'Control & Recording', desc: 'Recorders, Controllers',
            items: [
                { id: 'recording', label: 'LOGOSCREEN 600' },
                { id: 'dtron_300', label: 'dTRON 300' }
            ]
        }
    ],

    // === KNICK ===
    knick_products: [
        {
            id: 'analysis', title: 'Process Analysis', desc: 'High-end interface',
            items: [
                { id: 'stratos', label: 'Stratos Pro' }
            ]
        }
    ]
}

// Product Database - Mapped to Real Scraped Images
export const DB: Record<string, any[]> = {
    // VAISALA
    humidity: [
        { id: 'hmp1_9', title: 'HMP1-9 Series', subtitle: 'Smart Probes', category: 'probe', image: '/templates/hs-tech/images/products/hmp1_9_v1.png', gallery: ["/templates/hs-tech/images/products/hmp1_9_v1.png"], desc: 'Vaisala INDIGO compatible.', specs: [{ label: 'Acc', value: '±0.8 %RH' }], datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMP1-9-Datasheet-B211706EN.pdf' },
        { id: 'hmm170', title: 'HMM170', subtitle: 'High Temp', category: 'probe', image: '/templates/hs-tech/images/products/hmm170_v1.png', gallery: ["/templates/hs-tech/images/products/hmm170_v1.png"], desc: 'For high temperature.', specs: [{ label: 'Temp', value: '180C' }], datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMM170-Datasheet-B211698EN.pdf' },
        { id: 'hmp155', title: 'HMP155', subtitle: 'Weather', category: 'probe', image: '/templates/hs-tech/images/products/hmp155_v1.png', gallery: ["/templates/hs-tech/images/products/hmp155_v1.png"], desc: 'Meteorological probe.', specs: [{ label: 'Sensor', value: 'HUMICAP 180R' }], datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMP155-Datasheet-B210993EN.pdf' },
        { id: 'hmp60', title: 'HMP60', subtitle: 'Miniature', category: 'probe', image: '/templates/hs-tech/images/products/hmp60_v1.png', gallery: ["/templates/hs-tech/images/products/hmp60_v1.png"], desc: 'Miniature probe.', specs: [{ label: 'Size', value: 'Compact' }], datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMP60-Datasheet-B210973EN.pdf' },
        { id: 'hmt370ex', title: 'HMT370EX', subtitle: 'Ex-Proof', category: 'industrial', image: '/templates/hs-tech/images/products/hmt370ex_v1.png', gallery: ["/templates/hs-tech/images/products/hmt370ex_v1.png"], desc: 'Explosion proof.', specs: [{ label: 'RH range', value: `0…100% RHTemperature range -40...+60°C(-40...+140°F)Probe diameter 12 mm` }, { label: 'Accuracy', value: `Accuracy` }, { label: 'Output', value: `± 0.1℃ @ 23℃ PT1000Output` }, { label: '2', value: `Wire Current (4…20mA)IP rating` }, { label: 'IP', value: `IP66(NEMA4)Operating Environment` }, { label: 'Storage temperature', value: `40…+70°CClassification` }, { label: 'Zone', value: '0' }], datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMT370EX-Datasheet-B211738EN.pdf' },
        { id: 'hmt360', title: 'HMT360', subtitle: 'Ex-Proof', category: 'industrial', image: '/templates/hs-tech/images/products/hmt360_v1.png', gallery: ["/templates/hs-tech/images/products/hmt360_v1.png"], desc: 'Intrinsically safe.', specs: [{ label: 'RH range', value: `0…100% RHTemperature range -40...+60°C(-40...+140°F)Probe diameter 12 mm` }, { label: 'Accuracy', value: `Accuracy` }, { label: 'Output', value: `± 0.2ºC @ 20ºC PT1000Output` }, { label: '2', value: `Wire Current` }, { label: 'IP', value: `(4…20mA)IP rating` }, { label: 'Temp', value: `Storage temperature` }, { label: 'Zone', value: '0' }], datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMT360-Datasheet-B211737EN.pdf' },
        { id: 'hmd60', title: 'HMD60', subtitle: 'Duct Mount', category: 'hvac', image: '/templates/hs-tech/images/products/hmd60_v1.png', gallery: ["/templates/hs-tech/images/products/hmd60_v1.png"], desc: 'Duct mount HVAC.', specs: [{ label: 'Probe length', value: `250mm (HMD60/TMD60 can select 100mm short probe)` }, { label: 'IP', value: `IP66(NEMA 4X)` }, { label: 'Measurement range', value: `RH & T` }, { label: 'RH range', value: `0…100%` }, { label: 'Temp', value: `Temperature` }, { label: 'range', value: `-20..+80°C (-4...+176°F)Accuracy` }, { label: 'Acc', value: '1.5%' }], datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMD60-Datasheet-B211704EN.pdf' },
        { id: 'hmw90', title: 'HMW90', subtitle: 'Wall Mount', category: 'hvac', image: '/templates/hs-tech/images/products/hmw90_v1.png', gallery: ["/templates/hs-tech/images/products/hmw90_v1.png"], desc: 'Wall mount HVAC.', specs: [{ label: 'On', value: `site calibration` }, { label: 'Housing', value: `IP30` }, { label: 'range', value: `T only` }, { label: 'Temperature range', value: `-5...+55°C (-23...+131 °F)Accuracy` }, { label: 'RH range', value: `0…100% RH` }, { label: 'Temp', value: `Temperature` }, { label: 'Use', value: 'Indoor' }], datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMW90-Datasheet-B211703EN.pdf' },
        { id: 'hmdw110', title: 'HMDW110', subtitle: 'IP65', category: 'hvac', image: '/templates/hs-tech/images/products/hmdw110_v1.png', gallery: ["/templates/hs-tech/images/products/hmdw110_v1.png"], desc: 'IP65 transmitter.', specs: [{ label: 'Measurement range', value: `RH & T` }, { label: 'RH range', value: `0…100% RH` }, { label: 'Temp', value: `Temperature` }, { label: 'range', value: `-40..+60°CCalculated Parameters` }, { label: 'Enthalpy', value: `40 ...` }, { label: 'Accuracy', value: `460 kJ/kgAccuracy` }, { label: 'IP', value: '65' }], datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMDW110-Datasheet-B211705EN.pdf' },
        { id: 'hmdw80', title: 'HMDW80', subtitle: 'Handheld', category: 'hvac', image: '/templates/hs-tech/images/products/hmdw80_v1.png', gallery: ["/templates/hs-tech/images/products/hmdw80_v1.png"], desc: 'Handheld meter.', specs: [{ label: 'Type', value: 'Handheld' }] },
        { id: 'indigo80_hmp80', title: 'Indigo80', subtitle: 'HMP80', category: 'handheld', image: '/templates/hs-tech/images/products/indigo80_hmp80_v1.jpg', gallery: ["/templates/hs-tech/images/products/indigo80_hmp80_v1.jpg"], desc: 'High-end handheld.', specs: [{ label: 'Display', value: 'Color' }], datasheet: 'https://www.vaisala.com/sites/default/files/documents/Indigo80-Datasheet-B211699EN.pdf' },
        { id: 'hm70', title: 'HM70', subtitle: 'Handheld', category: 'handheld', image: '/templates/hs-tech/images/products/hm70_v1.jpg', gallery: ["/templates/hs-tech/images/products/hm70_v1.jpg"], desc: 'Professional handheld.', specs: [{ label: 'Measurement range', value: `- RH range: 0…100%- Temperature range: -20…+60℃` }, { label: 'Accuracy', value: `- RH ±1%RH(0…90%RH)- T  ±0.2℃at 20℃` }, { label: 'Acc', value: 'High' }], datasheet: 'https://www.vaisala.com/sites/default/files/documents/HM70-Datasheet-B210974EN.pdf' },
        { id: 'hm40', title: 'HM40', subtitle: 'Compact', category: 'handheld', image: '/templates/hs-tech/images/products/hm40_v1.png', gallery: ["/templates/hs-tech/images/products/hm40_v1.png"], desc: 'Compact handheld.', specs: [{ label: 'Measurement range', value: `- RH range: 0…100%- Temperature range: -10…+60℃` }, { label: 'Accuracy', value: `- RH ±1.5%RH(0…90%RH)- T  ±0.2℃at 20℃` }, { label: 'Size', value: 'Small' }], datasheet: 'https://www.vaisala.com/sites/default/files/documents/HM40-Datasheet-B210975EN.pdf' },
        { id: 'shm40', title: 'SHM40', subtitle: 'Concrete', category: 'handheld', image: '/templates/hs-tech/images/products/shm40_v1.jpg', gallery: ["/templates/hs-tech/images/products/shm40_v1.jpg"], desc: 'Concrete moisture.', specs: [{ label: 'Measurement range', value: `RH range: 0…100% / Temperature range: -40…+80℃` }, { label: 'Accuracy', value: `RH±1.5%RH(0…90%RH)` }, { label: 'IP', value: `Housing IP65` }, { label: 'App', value: 'Flooring' }] },
        { id: 'hmk15', title: 'HMK15', subtitle: 'Calibrator', category: 'handheld', image: '/templates/hs-tech/images/products/hmk15_v1.png', gallery: ["/templates/hs-tech/images/products/hmk15_v1.png"], desc: 'Salt calibrator.', specs: [{ label: 'Type', value: 'Salts' }] },
        { id: 'hmt330', title: 'HMT330', subtitle: 'Flagship', category: 'industrial', image: '/templates/hs-tech/images/products/hmt330_v1.jpg', gallery: ["/templates/hs-tech/images/products/hmt330_v1.jpg"], desc: 'Top industrial transmitter.', specs: [{ label: 'RH range', value: `0…100% RHTemperature range:  -40...+60°C` }, { label: '(', value: `40...+140°F)` }, { label: 'Variables(Model', value: `Dependent)Dew point temperature, mixing ratio, absolute` }, { label: 'Accuracy', value: `humidity, wet bulb temperature, enthalpy, water vapor pressureAccuracy` }, { label: 'Output', value: `100 ... 240 VAC,  50/60 HZOutput` }, { label: 'Voltage outputs', value: `0…` }, { label: 'Acc', value: '1%' }], datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMT330-Datasheet-B211735EN.pdf' },
        { id: 'hmt310', title: 'HMT310', subtitle: 'Compact', category: 'industrial', image: '/templates/hs-tech/images/products/hmt310_v1.jpg', gallery: ["/templates/hs-tech/images/products/hmt310_v1.jpg"], desc: 'Compact transmitter.', specs: [{ label: 'RH range', value: `0…100% RHTemperature range:  -40...+60°C` }, { label: '(', value: `40...+140°F)` }, { label: 'Accuracy', value: `Accuracy` }, { label: 'Output', value: `± 0.2ºC @ 20ºC PT1000Operating voltage12...28V (with serial port 15...28V)Output` }, { label: 'RS', value: `232 in one M12/8 pin connectorIP rating` }, { label: 'IP', value: `IP65 with local` }, { label: 'Size', value: 'Small' }], datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMT310-Datasheet-B211734EN.pdf' },
        { id: 'hmt120', title: 'HMT120', subtitle: 'Standard', category: 'industrial', image: '/templates/hs-tech/images/products/hmt120_v1.jpg', gallery: ["/templates/hs-tech/images/products/hmt120_v1.jpg"], desc: 'Standard transmitter.', specs: [{ label: 'Range', value: `Measurement range` }, { label: 'RH range', value: `0…100%` }, { label: 'Temp', value: `Temperature` }, { label: 'range', value: `-40..+80°C (-40...+176°F)Other Variables(Optional)Dew point/frost point, mixing ratio, absolute humidity, wet bulb` }, { label: 'Accuracy', value: `temperature, enthalpy, vapor pressure, saturation vapor pressureAccuracy` }, { label: 'IP', value: `± 0.2ºC @ 20ºC PT1000IP rating` }, { label: 'Probe', value: 'Interchangeable' }], datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMT120-Datasheet-B211733EN.pdf' }
    ],
    dewpoint: [
        { id: 'dmp1', title: 'DMP1', subtitle: 'Probe', category: 'fixed', image: '/hstech/Fixed installed type_files/8d82c9181b510.png', gallery: ["/hstech/Fixed installed type_files/8d82c9181b510.png", "/hstech/Fixed installed type_files/1cf31d9cedd49.png", "/hstech/Fixed installed type_files/59c0762fc592a.jpg", "/hstech/Fixed installed type_files/fac6fcd73a683.png"], desc: 'Dewpoint probe.', specs: [{ label: 'Range', value: '-60...+60' }] },
        { id: 'dmt340', title: 'DMT340', subtitle: 'Condensation', category: 'fixed', image: '/hstech/DMT340_files/d00a6a6b07790.jpg', gallery: ["/hstech/DMT340_files/d00a6a6b07790.jpg", "/hstech/DMT340_files/41afb17e01092.jpg"], desc: 'For condensation.', specs: [{ label: 'Heat', value: 'Yes' }] },
        { id: 'dmt345', title: 'DMT345', subtitle: 'High Temp', category: 'fixed', image: '/hstech/DMT345_346_files/ae969438460ed.png', gallery: ["/hstech/DMT345_346_files/ae969438460ed.png", "/hstech/DMT345_346_files/10441c47a09dd.png"], desc: 'High temp.', specs: [{ label: 'Outputs', value: `0/4...20mA, 0...1/5/10V(2 Analog outputs, 3rd` }, { label: 'body', value: `-40…+60℃(with Display: 0…+60℃)` }, { label: 'T', value: '180C' }] },
        { id: 'dmt152', title: 'DMT152', subtitle: 'Low Dewpoint', category: 'module', image: '/hstech/DMT152_files/0f35966bd5477.jpg', gallery: ["/hstech/DMT152_files/0f35966bd5477.jpg", "/hstech/DMT152_files/de0a57ad75f01.jpg"], desc: 'Low dewpoint.', specs: [{ label: '-80…', value: `40℃)` }, { label: 'Outputs', value: `0/4...20mA, 0...5/10V(2 Analog outputs): RS485(option)Operation Environment: T -40…+70℃: RH 0…100%RH: Pressure 0…50bar` }, { label: 'Range', value: '-80' }] },
        { id: 'dmt143', title: 'DMT143', subtitle: 'OEM', category: 'module', image: '/hstech/DMT143_files/ab716f1764e30.jpg', gallery: ["/hstech/DMT143_files/ab716f1764e30.jpg", "/hstech/DMT143_files/c34db2bf240d5.jpg"], desc: 'OEM module.', specs: [{ label: 'Outputs', value: `4...20mA, 0…1/5/10V: RS485 or Modbus RTUOperation Environment: T -40…+60℃: RH 0…100%RH: Pressure 0…50bar` }, { label: 'Size', value: 'Small' }] },
        { id: 'dmt143l', title: 'DMT143L', subtitle: 'Long Probe', category: 'module', image: '/hstech/DMT143L_files/ab716f1764e30.jpg', gallery: ["/hstech/DMT143L_files/ab716f1764e30.jpg", "/hstech/DMT143L_files/c34db2bf240d5.jpg"], desc: 'Long probe.', specs: [{ label: 'Outputs', value: `4...20mA(3 wire): RS485 or Modbus RTUOperation Environment: T -40…+60℃: RH 0…100%RH: Pressure 0…50bar` }, { label: 'Probe', value: 'Long' }] },
        { id: 'dpt146', title: 'DPT146', subtitle: 'Td + P', category: 'module', image: '/hstech/DPT146_files/05f58fd7c537f.jpg', gallery: ["/hstech/DPT146_files/05f58fd7c537f.jpg", "/hstech/DPT146_files/5a4a0bfe8938d.jpg"], desc: 'Dewpoint and Pressure.', specs: [{ label: 'Pressure', value: `Simultaneous Measurement Dew point and Process Pressure` }, { label: 'Digital Output RS', value: `485 with Modbus` }, { label: 'Outputs', value: `0/4…20mA, 0…5/10V: RS-485, Modbus RTU, Vaisala protocolOperation Environment: T -40…+60℃: RH 0…100%RH: Pressure 0…50bar` }, { label: 'Dual', value: 'Yes' }] },
        { id: 'dpt145', title: 'DPT145', subtitle: 'SF6', category: 'module', image: '/hstech/DPT145_files/bf2d78586f3ab.png', gallery: ["/hstech/DPT145_files/bf2d78586f3ab.png", "/hstech/DPT145_files/be4cdd8761747.png"], desc: 'SF6 monitoring.', specs: [{ label: 'Outputs', value: `RS-485, Modbus RTUOperation Environment: T -40…+60℃: RH 0…100%RH: Pressure 0…50bar` }, { label: 'Gas', value: 'SF6' }] },
        { id: 'indigo80_dmp80', title: 'Indigo80', subtitle: 'DMP80', category: 'portable', image: '/hstech/Indigo80+HMP80_files/00483e18767ab.png', gallery: ["/hstech/Indigo80+HMP80_files/00483e18767ab.png", "/hstech/Indigo80+HMP80_files/c1358d36f4818.jpg", "/hstech/Indigo80+HMP80_files/05563b2ff0eab.jpg", "/hstech/Indigo80+HMP80_files/2a7da2aa2c468.jpg"], desc: 'Portable set.', specs: [{ label: 'New', value: 'Yes' }] },
        { id: 'dm70', title: 'DM70', subtitle: 'Handheld', category: 'portable', image: '/hstech/DM70_files/8b02981cef6e7.png', gallery: ["/hstech/DM70_files/8b02981cef6e7.png", "/hstech/DM70_files/dd502ed8d2267.png"], desc: 'Standard handheld.', specs: [{ label: 'Acc', value: '2C' }] },
        { id: 'dss70a', title: 'DSS70A', subtitle: 'Sampling', category: 'portable', image: '/hstech/DSS70A_files/55d32f1efd620.png', gallery: ["/hstech/DSS70A_files/55d32f1efd620.png", "/hstech/DSS70A_files/45afe13a54723.png"], desc: 'Sampling cell.', specs: [{ label: 'use', value: 'DM70' }] }
    ],
    co2: [
        { id: 'gmw90', title: 'GMW90', subtitle: 'Wall', category: 'transmitter', image: '/hstech/GMW90_files/578bd0532de82.png', gallery: ["/hstech/GMW90_files/578bd0532de82.png", "/hstech/GMW90_files/39d53e2ee7d40.png"], desc: 'CO2+T+RH.', specs: [{ label: 'Range', value: `on each model measurement and output optionMeasurement range` }, { label: 'Temperature', value: `5…+55℃` }, { label: 'Accuracy', value: `RH 0…95%Accuracy` }, { label: 'Temp', value: `Temperature ±0.5℃(@+20..+30℃)` }, { label: 'Storage Temperature', value: `-30…+60℃` }, { label: 'Operating Humidity', value: `0...95%RH(Dewpoint <+30℃)` }, { label: 'Param', value: '3' }] },
        { id: 'gmw80', title: 'GMW80', subtitle: 'Standard', category: 'transmitter', image: '/hstech/GMW80_files/44a4824984296.png', gallery: ["/hstech/GMW80_files/44a4824984296.png", "/hstech/GMW80_files/28fdc25e3be6c.png"], desc: 'CO2 only.', specs: [{ label: 'Output', value: `to the specifications below, depending on each model measurement and output` }, { label: 'Range', value: `optionMeasurement range` }, { label: 'Temp', value: `Temperature 0…+50℃` }, { label: 'Accuracy', value: `RH 0…95%Accuracy` }, { label: 'Cost', value: 'Low' }] },
        { id: 'gmd110', title: 'GMD110', subtitle: 'Duct', category: 'transmitter', image: '/hstech/GMD110_files/3b7a3de8bace1.png', gallery: ["/hstech/GMD110_files/3b7a3de8bace1.png", "/hstech/GMD110_files/69e2511f64be7.jpg", "/hstech/GMD110_files/706edef97b7d7.jpg"], desc: 'Duct mount.', specs: [{ label: 'Easy one-to', value: `one replacement` }, { label: 'Excellent long', value: `term stability` }, { label: 'Install', value: 'Duct' }] },
        { id: 'gmp343', title: 'GMP343', subtitle: 'Eco', category: 'probe', image: '/hstech/GMP343_files/258b7fda6de74.png', gallery: ["/hstech/GMP343_files/258b7fda6de74.png", "/hstech/GMP343_files/f5a82cfb2e232.png"], desc: 'Flow through.', specs: [{ label: 'Range', value: `Measurement range` }, { label: 'Accuracy', value: `0...1000/2000/3000/4000/5000ppm, 0…2%Accuracy` }, { label: 'IP', value: `±(3ppm+1% of reading) at 1000ppmIP rating` }, { label: 'Output', value: `PTFE)Outputs` }, { label: 'RS', value: `485, RS232` }, { label: 'Flow', value: 'Yes' }] },
        { id: 'gmp251', title: 'GMP251', subtitle: 'High range', category: 'probe', image: '/hstech/GMP251_files/a7ce17262895c.png', gallery: ["/hstech/GMP251_files/a7ce17262895c.png", "/hstech/GMP251_files/3581001bd127c.png"], desc: '% level.', specs: [{ label: 'Measurement Range', value: `0…20%(Accuracy: ±0.1%CO2 @ 5% CO2)` }, { label: 'IP', value: `IP65 classified housing` }, { label: 'Humidity 0…100%', value: `Pressure 500…1100hPaOutputs: Digital outputModbus / Vaisala industrial` }, { label: 'Protocol', value: `Analog output 0…5/10V, 0/4…20mA` }, { label: 'Measurement range', value: `0…10,000ppmCO2(Accuracy: ±40%CO2 @ 0…3000ppmCO2)` }, { label: 'Temperature of use', value: `-40...+60°C /Display Model: -20...+60℃` }, { label: 'Range', value: '%' }] },
        { id: 'gmp231', title: 'GMP231', subtitle: 'Incubator', category: 'probe', image: '/hstech/GMP231_files/44a2e51ae782c.png', gallery: ["/hstech/GMP231_files/44a2e51ae782c.png", "/hstech/GMP231_files/bb1e49a2e2992.png"], desc: 'Incubators.', specs: [{ label: 'Range', value: `Measurement range` }, { label: 'Accuracy', value: `0…20% CO2Accuracy` }, { label: 'Output', value: `±0.1%CO2(@ 5%CO2)Outputs` }, { label: '5 V, RS-485(2', value: `wire with Vaisalaindustrial protocol)` }, { label: 'Heat', value: '180' }] },
        { id: 'indigo80_gmp252', title: 'Indigo80', subtitle: 'GMP252', category: 'handheld', image: '/hstech/Indigo80+HMP80_files/00483e18767ab.png', gallery: ["/hstech/Indigo80+HMP80_files/00483e18767ab.png", "/hstech/Indigo80+HMP80_files/c1358d36f4818.jpg", "/hstech/Indigo80+HMP80_files/05563b2ff0eab.jpg", "/hstech/Indigo80+HMP80_files/2a7da2aa2c468.jpg"], desc: 'Portable CO2.', specs: [{ label: 'ppm', value: 'Yes' }] }
    ],
    oil: [
        { id: 'mht410', title: 'MHT410', subtitle: 'Transformer', category: 'transformer', image: '/hstech/MHT410_files/c49c396f6025a.png', gallery: ["/hstech/MHT410_files/c49c396f6025a.png", "/hstech/MHT410_files/bfac7e7723aaa.png"], desc: 'H2+H2O.', specs: [{ label: 'Temp', value: `Moisture, Hydrogen, Temperature Measurement` }, { label: '±25ppmv)', value: `Moisture in oil0...100%RS / aw 0...1(±2%RS / aw` }, { label: 'half-duplex/ RS', value: `485(Service port,` }, { label: 'H2', value: 'Yes' }] },
        { id: 'mmt330', title: 'MMT330', subtitle: 'Online', category: 'fixed', image: '/hstech/MMT330_files/ccc57b9af50bd.png', gallery: ["/hstech/MMT330_files/ccc57b9af50bd.png", "/hstech/MMT330_files/5a125cc0f1c5c.png"], desc: 'Online oil moisture.', specs: [{ label: 'IP', value: `IP66(without display)` }, { label: 'Field', value: `checking available with MM70` }, { label: 'Measurement range', value: `- Water Activity aw 0…1- Temperature -40…+180℃Outputs:2 Analog outputs(3rd optional)- 0/4...20mA, 0…1/5/10VDigital outputs- RS-232, RS-485(optional)Operation Environment: EMC compliance EN61326-1: Operating temperature- Probe for each temperature range-` }, { label: 'Oil', value: 'All' }] },
        { id: 'mmt310', title: 'MMT310', subtitle: 'Compact', category: 'fixed', image: '/hstech/MMT310_files/432206a80e9bc.png', gallery: ["/hstech/MMT310_files/432206a80e9bc.png", "/hstech/MMT310_files/ec172bcd0e98b.png"], desc: 'Compact oil.', specs: [{ label: 'max. cable length', value: `10m` }, { label: 'Measurement range', value: `- Water Activity aw 0…1(0…100%RS)- Temperature -40…+180℃Outputs:2 Analog outputs(3rd optional)- 0/4...20mA, 0…1/5/10VSerial output- RS-232C` }, { label: 'Size', value: 'Small' }] },
        { id: 'mm70', title: 'MM70', subtitle: 'Handheld', category: 'handheld', image: '/hstech/MM70_files/fc768c014c897.png', gallery: ["/hstech/MM70_files/fc768c014c897.png", "/hstech/MM70_files/7935687cb906c.png", "/hstech/MM70_files/4c5fadfc80ddb.png"], desc: 'Spot check.', specs: [{ label: 'Spot', value: 'Yes' }] }
    ],
    barometer: [
        { id: 'ptb330', title: 'PTB330', subtitle: 'Class A', category: 'barometer', image: '/hstech/Barometer_files/3c357ce18ac04.jpg', gallery: ["/hstech/Barometer_files/3c357ce18ac04.jpg", "/hstech/Barometer_files/0a866df8da84d.png", "/hstech/Barometer_files/c30d3af67b366.png", "/hstech/Barometer_files/58fc71d7c2be5.png"], desc: 'Class A barometer.', specs: [{ label: 'Class', value: 'A' }] },
        { id: 'ptb210', title: 'PTB210', subtitle: 'Class B', category: 'barometer', image: '/hstech/Barometer_files/3c357ce18ac04.jpg', gallery: ["/hstech/Barometer_files/3c357ce18ac04.jpg", "/hstech/Barometer_files/0a866df8da84d.png", "/hstech/Barometer_files/c30d3af67b366.png", "/hstech/Barometer_files/58fc71d7c2be5.png"], desc: 'Class B barometer.', specs: [{ label: 'Class', value: 'B' }] },
        { id: 'ptb110', title: 'PTB110', subtitle: 'Analog', category: 'barometer', image: '/hstech/Barometer_files/3c357ce18ac04.jpg', gallery: ["/hstech/Barometer_files/3c357ce18ac04.jpg", "/hstech/Barometer_files/0a866df8da84d.png", "/hstech/Barometer_files/c30d3af67b366.png", "/hstech/Barometer_files/58fc71d7c2be5.png"], desc: 'Analog output.', specs: [{ label: 'Out', value: 'V' }] },
        { id: 'ptu300', title: 'PTU300', subtitle: 'Combined', category: 'barometer', image: '/hstech/Combined Transmitter_files/7eaf1b6002b98.jpg', gallery: ["/hstech/Combined Transmitter_files/7eaf1b6002b98.jpg", "/hstech/Combined Transmitter_files/9a8123d37ddcc.jpg", "/hstech/Combined Transmitter_files/fade6e3a0a1b0.png"], desc: 'P, T, RH.', specs: [{ label: 'All', value: 'Yes' }] }
    ],
    weather: [
        { id: 'wxt530', title: 'WXT530', subtitle: 'Multiparameter', category: 'trans', image: '/hstech/Weather_files/c0bb8f87ce4d3.png', gallery: ["/hstech/Weather_files/c0bb8f87ce4d3.png"], desc: 'Weather station.', specs: [{ label: 'All', value: 'Yes' }] },
        { id: 'hmp155_w', title: 'HMP155', subtitle: 'Probe', category: 'trans', image: '/hstech/Weather_files/c0bb8f87ce4d3.png', gallery: ["/hstech/Weather_files/c0bb8f87ce4d3.png"], desc: 'Weather probe.', specs: [{ label: 'Acc', value: 'High' }] }
    ],
    h2o2: [
        { id: 'hpp271', title: 'HPP271', subtitle: 'Probe', category: 'sensor', image: '/hstech/H2O2 sensor_files/144c294c268ca.png', gallery: ["/hstech/H2O2 sensor_files/144c294c268ca.png", "/hstech/H2O2 sensor_files/387404d86d157.png", "/hstech/H2O2 sensor_files/287b582ba2d0a.jpg"], desc: 'Vaporized H2O2.', specs: [{ label: 'Gas', value: 'H2O2' }] }
    ],

    // SETRA
    setra_products: [
        { id: 'setra_lite', title: 'Setra Lite', subtitle: 'Visual', category: 'diff_ind', image: '/hstech/Differential Pressure Transmitter_files/5700cc7e29087.png', gallery: ["/hstech/Differential Pressure Transmitter_files/5700cc7e29087.png", "/hstech/Differential Pressure Transmitter_files/2621dcf1a7753.png", "/hstech/Differential Pressure Transmitter_files/34b14a9205705.png", "/hstech/Differential Pressure Transmitter_files/33ee2e1a7bf7f.png"], desc: 'Visual pressure.', specs: [{ label: 'Light', value: 'LED' }] },
        { id: 'setra_flex', title: 'Setra Flex', subtitle: 'Monitor', category: 'diff_ind', image: '/hstech/Differential Pressure Transmitter_files/5700cc7e29087.png', gallery: ["/hstech/Differential Pressure Transmitter_files/5700cc7e29087.png", "/hstech/Differential Pressure Transmitter_files/2621dcf1a7753.png", "/hstech/Differential Pressure Transmitter_files/34b14a9205705.png", "/hstech/Differential Pressure Transmitter_files/33ee2e1a7bf7f.png"], desc: 'Room monitor.', specs: [{ label: 'Touch', value: 'Yes' }] },
        { id: 'model_mrc', title: 'Model MRC', subtitle: 'Multi-range', category: 'diff_sen', image: '/hstech/HVAC_files/0173971661ad2.png', gallery: ["/hstech/HVAC_files/0173971661ad2.png", "/hstech/HVAC_files/0b98ec3d71c52.png", "/hstech/HVAC_files/866d1ed724ffa.png", "/hstech/HVAC_files/ba117fd1862c9.png", "/hstech/HVAC_files/20542e1ba6c31.png"], desc: 'Multi range.', specs: [{ label: 'Range', value: 'Adj' }] },
        { id: 'model_mrg', title: 'Model MRG', subtitle: 'General', category: 'diff_sen', image: '/hstech/HVAC_files/0173971661ad2.png', gallery: ["/hstech/HVAC_files/0173971661ad2.png", "/hstech/HVAC_files/0b98ec3d71c52.png", "/hstech/HVAC_files/866d1ed724ffa.png", "/hstech/HVAC_files/ba117fd1862c9.png", "/hstech/HVAC_files/20542e1ba6c31.png"], desc: 'General purpose.', specs: [{ label: 'Cost', value: 'Low' }] },
        { id: 'model_264', title: 'Model 264', subtitle: 'HVAC', category: 'diff_sen', image: '/hstech/HVAC_files/0173971661ad2.png', gallery: ["/hstech/HVAC_files/0173971661ad2.png", "/hstech/HVAC_files/0b98ec3d71c52.png", "/hstech/HVAC_files/866d1ed724ffa.png", "/hstech/HVAC_files/ba117fd1862c9.png", "/hstech/HVAC_files/20542e1ba6c31.png"], desc: 'Standard HVAC.', specs: [{ label: 'Std', value: 'Yes' }] },
        { id: 'pdt101', title: 'PDT101', subtitle: 'Filter', category: 'diff_sen', image: '/hstech/HVAC_files/0173971661ad2.png', gallery: ["/hstech/HVAC_files/0173971661ad2.png", "/hstech/HVAC_files/0b98ec3d71c52.png", "/hstech/HVAC_files/866d1ed724ffa.png", "/hstech/HVAC_files/ba117fd1862c9.png", "/hstech/HVAC_files/20542e1ba6c31.png"], desc: 'Filter monitor.', specs: [{ label: 'OEM', value: 'Yes' }] },
        { id: 'model_axd', title: 'Model AXD', subtitle: 'High Perf', category: 'industrial', image: '/hstech/Transmitter_files/a4e6b2a1d6fae.png', gallery: ["/hstech/Transmitter_files/a4e6b2a1d6fae.png", "/hstech/Transmitter_files/f89e8d9c59420.png", "/hstech/Transmitter_files/9b1c1d008fa6f.png", "/hstech/Transmitter_files/14e752cebbd26.png", "/hstech/Transmitter_files/95eb308cc5c30.jpg"], desc: 'Industrial pressure.', specs: [{ label: 'Acc', value: 'High' }] },
        { id: 'model_206', title: 'Model 206', subtitle: 'Rugged', category: 'industrial', image: '/hstech/Transmitter_files/a4e6b2a1d6fae.png', gallery: ["/hstech/Transmitter_files/a4e6b2a1d6fae.png", "/hstech/Transmitter_files/f89e8d9c59420.png", "/hstech/Transmitter_files/9b1c1d008fa6f.png", "/hstech/Transmitter_files/14e752cebbd26.png", "/hstech/Transmitter_files/95eb308cc5c30.jpg"], desc: 'Rugged transducer.', specs: [{ label: 'Case', value: 'Steel' }] },
        { id: 'model_209', title: 'Model 209', subtitle: 'OEM', category: 'industrial', image: '/hstech/Transmitter_files/a4e6b2a1d6fae.png', gallery: ["/hstech/Transmitter_files/a4e6b2a1d6fae.png", "/hstech/Transmitter_files/f89e8d9c59420.png", "/hstech/Transmitter_files/9b1c1d008fa6f.png", "/hstech/Transmitter_files/14e752cebbd26.png", "/hstech/Transmitter_files/95eb308cc5c30.jpg"], desc: 'OEM sensor.', specs: [{ label: 'Cost', value: 'Low' }] }
    ],

    // JUMO
    jumo_products: [
        { id: 'ph_sensor', title: 'tecline pH', subtitle: 'Sensor', category: 'liquid', image: '/hstech/pH Combination Electrodes_files/753bf8377c185.jpg', gallery: ["/hstech/pH Combination Electrodes_files/753bf8377c185.jpg", "/hstech/pH Combination Electrodes_files/ef7bd18cf5385.jpg", "/hstech/pH Combination Electrodes_files/eafd8e806719f.jpg"], desc: 'pH electrode.', specs: [{ label: 'Mat', value: 'Glass' }] },
        { id: 'ph_trans', title: 'ecoTRANS pH 03', subtitle: 'Transmitter', category: 'liquid', image: '/hstech/pH Transmitter_files/aa865065122f5.jpg', gallery: ["/hstech/pH Transmitter_files/aa865065122f5.jpg", "/hstech/pH Transmitter_files/a060ea13cbbba.jpg", "/hstech/pH Transmitter_files/146d68f730ab5.jpg"], desc: 'pH transmitter.', specs: [{ label: 'Rail', value: 'DIN' }] },
        { id: 'dtrans_ph02', title: 'dTRANS pH 02', subtitle: 'Transmitter', category: 'liquid', image: '/hstech/pH Transmitter_files/aa865065122f5.jpg', gallery: ["/hstech/pH Transmitter_files/aa865065122f5.jpg", "/hstech/pH Transmitter_files/a060ea13cbbba.jpg", "/hstech/pH Transmitter_files/146d68f730ab5.jpg"], desc: 'pH controller.', specs: [{ label: 'IP', value: '65' }] },
        { id: 'cond_trans', title: 'ecoTRANS Lf 03', subtitle: 'Conductivity', category: 'liquid', image: '/hstech/Conductivity Transmitter_files/5077fcd34a51e.jpg', gallery: ["/hstech/Conductivity Transmitter_files/5077fcd34a51e.jpg", "/hstech/Conductivity Transmitter_files/443324204fa2e.jpg", "/hstech/Conductivity Transmitter_files/9fb9479ee58d9.jpg"], desc: 'Conductivity.', specs: [{ label: 'Out', value: 'mA' }] },
        { id: 'recording', title: 'LOGOSCREEN', subtitle: 'Recorder', category: 'control', image: '/hstech/Control & Recording_files/6f9b65b068db1.jpg', gallery: ["/hstech/Control & Recording_files/6f9b65b068db1.jpg", "/hstech/Control & Recording_files/ef7d890a33431.jpg", "/hstech/Control & Recording_files/fc36ca7fd150f.jpg"], desc: 'Data recorder.', specs: [{ label: 'LCD', value: 'Touch' }] },
        { id: 'dtron_300', title: 'dTRON 300', subtitle: 'Controller', category: 'control', image: '/hstech/Control & Recording_files/6f9b65b068db1.jpg', gallery: ["/hstech/Control & Recording_files/6f9b65b068db1.jpg", "/hstech/Control & Recording_files/ef7d890a33431.jpg", "/hstech/Control & Recording_files/fc36ca7fd150f.jpg"], desc: 'PID Controller.', specs: [{ label: 'PID', value: 'Yes' }] }
    ],

    // KNICK
    knick_products: [
        { id: 'stratos', title: 'Stratos Pro', subtitle: 'Analysis', category: 'analysis', image: '/hstech/Knick 트랜스미터_files/5fa3377dc5c8d.png', desc: 'Process analyzer.', specs: [{ label: 'Ex', value: 'Zone 1' }] }
    ]
}
