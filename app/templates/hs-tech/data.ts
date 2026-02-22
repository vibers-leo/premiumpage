
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

export const ABOUT_IMG = '' // Updated
export const ABOUT_IMG_2 = '' // Updated

// Brand Structure Definition for Top-Level Navigation
export const BRANDS = {
    vaisala: {
        label: 'VAISALA',
        desc: 'World leader in environmental and industrial measurement.',
        categories: ['humidity', 'dewpoint', 'co2', 'oil', 'barometer', 'weather', 'h2o2', 'cms'],
        logo: '/templates/hs-tech/images/brands/vaisala.svg'
    },
    setra: {
        label: 'SETRA',
        desc: 'Premium pressure transducers and current switches.',
        categories: ['setra'],
        logo: '/templates/hs-tech/images/brands/setra.svg'
    },
    jumo: {
        label: 'JUMO',
        desc: 'Innovative sensors and automation solutions.',
        categories: ['jumo'],
        logo: '/templates/hs-tech/images/brands/jumo.svg'
    },
}

// Category Information - Updated with existing images
export const CATEGORY_INFO: Record<string, any> = {
    humidity: { title: "Humidity", desc: "Best-in-class humidity instruments.", images: [] },
    dewpoint: { title: "Dewpoint", desc: "Reliable dewpoint measurement.", images: [] },
    co2: { title: "Carbon Dioxide", desc: "Accurate CO2 monitoring.", images: [] },
    oil: { title: "Moisture in Oil", desc: "Transformer oil monitoring.", images: [] },
    barometer: { title: "PRESSURE", desc: "Barometric and Differential Pressure Measurement.", images: [] },
    weather: { title: "Weather", desc: "Meteorological sensors.", images: [] },
    h2o2: { title: "H2O2", desc: "Bio-decontamination monitoring.", images: [] },

    // Brands
    setra: { title: "SETRA Systems", desc: "Differential & Industrial Pressure.", images: [] },
    jumo: { title: "JUMO", desc: "Liquid Analysis & Control.", images: [] },
    jumo_temp: { title: "Temperature", desc: "PlastoSENS precision temperature sensors for plastics processing.", images: [] },
    jumo_liquid: { title: "Liquid Analysis", desc: "pH, Conductivity, and Water Quality Measurement Solutions.", images: [] },
    cms: { title: "Data Logger / CMS", desc: "Continuous monitoring systems and wireless data loggers.", images: [] }
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
                { id: 'dmt345', label: 'DMT345/346' }
            ]
        },
        {
            id: 'module', title: 'Module/OEM', desc: 'DMT132, DMT143, DMT152',
            items: [
                { id: 'dmt132', label: 'DMT132' },
                { id: 'dmt152', label: 'DMT152' },
                { id: 'dmt143', label: 'DMT143' },
                { id: 'dmt143l', label: 'DMT143L' },
                { id: 'dpt146', label: 'DPT146' },
                { id: 'dpt145', label: 'DPT145' }
            ]
        },
        {
            id: 'industrial', title: 'Demanding Industrial Applications', desc: 'HMT330, HMT120, HMDW110',
            items: [
                { id: 'hmt330_dewpoint', label: 'HMT330 Series' },
                { id: 'hmt120_dewpoint', label: 'HMT120/130 Series' },
                { id: 'hmdw110_dewpoint', label: 'HMDW110' }
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
            id: 'transformer', title: 'Power Transformer', desc: 'MHT410',
            items: [
                { id: 'mht410', label: 'MHT410' }
            ]
        },
        {
            id: 'fixed', title: 'Fixed Installation Type', desc: 'MMT330, MMT310',
            items: [
                { id: 'mmt330', label: 'MMT330' },
                { id: 'mmt310', label: 'MMT310' }
            ]
        },
        {
            id: 'oil_module', title: 'Module/OEM', desc: 'MMT162',
            items: [
                { id: 'mmt162', label: 'MMT162' }
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
            id: 'combined', title: 'Combined Transmitter', desc: 'PTU300',
            items: [
                { id: 'ptu300', label: 'PTU300' }
            ]
        },
        {
            id: 'barometer', title: 'Barometer', desc: 'PTB330, PTB210, PTB110',
            items: [
                { id: 'ptb330', label: 'PTB330' },
                { id: 'ptb210', label: 'PTB210' },
                { id: 'ptb110', label: 'PTB110' }
            ]
        },
        {
            id: 'differential', title: 'Differential Pressure Transmitter', desc: 'PDT102, PDT101',
            items: [
                { id: 'pdt102', label: 'PDT102' },
                { id: 'pdt101', label: 'PDT101' }
            ]
        },
        {
            id: 'transfer_standard', title: 'Barometric Pressure Transfer Standard', desc: 'PTB330TS',
            items: [
                { id: 'ptb330ts', label: 'PTB330TS' }
            ]
        }
    ],
    weather: [],
    h2o2: [
        {
            id: 'sensor', title: 'H2O2 Sensor', desc: 'HPP series',
            items: [
                { id: 'hpp271', label: 'HPP271/272' }
            ]
        }
    ],

    // === SETRA ===
    setra: [
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
                { id: 'pdt101', label: 'PDT101' },
                { id: 'pdt102', label: 'PDT102' }
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
    jumo: [
        {
            id: 'liquid', title: 'Liquid Analysis', desc: 'pH, Conductivity',
            items: [
                { id: 'dtrans_ph02', label: 'dTRANS pH 02' }
            ]
        },
        {
            id: 'control', title: 'Control & Recording', desc: 'Recorders, Controllers',
            items: []
        }
    ],

    // === CMS (Data Logger / Continuous Monitoring System) ===
    cms: [],

    // === JUMO ===
    jumo_liquid: [
        {
            id: 'ph_electrode', title: 'pH Combination Electrodes', desc: 'Industrial pH electrodes',
            items: [
                { id: 'tecline_hd_201021', label: 'tecLine HD (201021)' },
                { id: 'tecline_201020', label: 'tecLine (201020)' },
                { id: 'tecline_cr_gt_202925', label: 'tecLine CR-GT (202925)' }
            ]
        },
        {
            id: 'ph_transmitter', title: 'pH Transmitter', desc: 'pH measurement transmitters',
            items: [
                { id: 'ecotrans_202723', label: 'ecoTRANS pH 03 (202723)' },
                { id: 'dtrans_202551', label: 'dTRANS pH 02 (202551)' },
                { id: 'aquis_500_ph_202560', label: 'AQUIS 500 pH (202560)' }
            ]
        },
        {
            id: 'conductivity', title: 'Conductivity Transmitter', desc: 'Conductivity measurement solutions',
            items: [
                { id: 'cti_500_202755', label: 'CTI-500 (202755)' },
                { id: 'aquis_500_cr_202565', label: 'AQUIS 500 CR (202565)' },
                { id: 'cti_750_202756', label: 'CTI-750 (202756)' }
            ]
        }
    ]
}

// Product Database - Mapped to Real Scraped Images
export const DB: Record<string, any[]> = {
    // VAISALA
    humidity: [
        {
            id: 'hmp1_9',
            title: 'HMP1-9',
            subtitle: 'INDIGO-COMPATIBLE SMART PROBES + TRANSMITTERS',
            category: 'probe',
            image: '/hstech/images/HMP1-9.jpg',
            gallery: [
                "/hstech/images/HMP1-9.jpg"
            ],
            desc: `The HMP1/3/4/5/7/8/9 are part of the Indigo product family and compatible with Indigo 500 / 200 Series Host Devices and free Insight PC Software.

■ PRODUCT

Intelligent, interchangeable probes for the Vaisala Indigo family with various host device options.

▶ HMP1 : Wall-Mounted RH/T Probe
▶ HMP4 : High-Pressure Installation
▶ HMP5 : High-Temperature
▶ HMP7 : High Humidity
▶ HMP8 : Pressurized Processes
▶ HMP9 : Rapidly Changing Environments
▶ INDIGO201 : Plug & Play Transmitter (Analog)
▶ INDIGO202 : Plug & Play Transmitter (RS485)
▶ INDIGO520 : Universal Transmitter (2 probes)`,
            specs: [
                {
                    model: 'HMP1',
                    application: 'Wall-Mounted RH/T Probe',
                    typicalApplication: '• Measurement Range: T -40...+60℃\n• Accuracy: ±1.0%RH / ±0.2℃T',
                    measurementRange: 'RH range: 0...100%\nTemperature range: -70...+180℃ (HMP4/5/7/8)\nTemperature range: -40...+120℃ (HMP9)',
                    spec: 'Accuracy\n• RH ±0.8%RH (0...90%RH)\n• T ±0.1℃ at 23℃\n\nOutput\nModbus RTU over RS-485\n\nSensor purge provides superior chemical resistance'
                },
                {
                    model: 'HMP4',
                    application: 'High-Pressure Installation',
                    typicalApplication: '• Suitable for high pressure installation\n• Operating pressure: 0…10MPa (0...100bar)\n• Example: Compressed air systems in maritime, breathing air, and industrial applications',
                    measurementRange: '',
                    spec: ''
                },
                {
                    model: 'HMP5',
                    application: 'High-Temperature',
                    typicalApplication: '• 250mm (9.84in) probe allows easy process installation through insulation\n• Example: Baking ovens, pasta dryers and industrial drying kilns',
                    measurementRange: '',
                    spec: ''
                },
                {
                    model: 'HMP7',
                    application: 'High Humidity',
                    typicalApplication: '• Suitable for high humidity or rapid changes in humidity\n• Probe and sensor warming functions minimize condensation on probe\n• Example: drying and test chambers, combustion air and other humidifiers and meteorological measurement',
                    measurementRange: '',
                    spec: ''
                },
                {
                    model: 'HMP8',
                    application: 'Pressurized Processes',
                    typicalApplication: '• Suitable for pressurized applications in compressed air systems with valve\n• Example: Pressurized applications in compressed air systems, refrigerant dryers, and other pressurized industrial applications',
                    measurementRange: '',
                    spec: ''
                },
                {
                    model: 'HMP9',
                    application: 'Rapidly Changing Environments',
                    typicalApplication: '• Suitable for rapidly changing environments where fast response time, measurement performance, and chemical tolerance are essential\n• 5mm (0.2in) diameter miniature probe head\n• Example: Dryers, air handling units, data centers, test chambers, and other humidity measurement applications',
                    measurementRange: '',
                    spec: ''
                },
                {
                    model: 'INDIGO201',
                    application: 'Plug & Play Transmitter',
                    typicalApplication: '• CH3, Analog output (V&mA)\n• 2 relays\n• Display (optional)',
                    measurementRange: 'Operating Temperature:\n(without display) -40...+60℃\n(with display) -20...+60℃',
                    spec: 'IP degree: IP65\nPower supply: 24VAC\nWireless interface for configuration\n\nCompatible probes:\nCO2: GMP251/252\nH2O2: HPP271/272\nRH&T: HMP4/5/7/8\nTemp: TMP1'
                },
                {
                    model: 'INDIGO202',
                    application: 'Plug & Play Transmitter',
                    typicalApplication: '• RS485, isolated w/ Modbus RTU\n• 2 relays\n• Display version only',
                    measurementRange: '',
                    spec: ''
                },
                {
                    model: 'INDIGO520',
                    application: 'Universal Transmitter',
                    typicalApplication: '• Supports two probes simultaneously\n• Touchscreen display\n• IP66 and NEMA 4 rated metal enclosure\n• 2 relays',
                    measurementRange: 'Operating Temperature: -20...+55℃',
                    spec: 'IP degree: IP66\n\nCompatible probes:\nHMP 1/3/4/5/7/8/9\nTMP1, DMP5/6/7/8\nGMP251/252, HPP271/272\nMMP8'
                }
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMP1-9-Datasheet-B211706EN.pdf'
        },
        {
            id: 'hmm170',
            title: 'HMM170 / HMM100 / HMM105',
            subtitle: 'PRECISION HUMIDITY MODULES FOR OEM APPLICATIONS',
            category: 'probe',
            image: '/hstech/images/Humidity Sensor HUMICAP®.png',
            gallery: ["/hstech/images/Humidity Sensor HUMICAP®.png"],
            desc: `Probe type precision humidity modules applicable to chambers, glove boxes, and other equipment.

■ PRODUCT

High-performance humidity modules for environmental chambers, incubators, and OEM equipment integration.

▶ HMM170 : RH+T Environmental Chamber Module
▶ HMM100 : RH-only High-Temperature Module
▶ HMM105 : RH-only I2C Module`,
            specs: [
                {
                    model: 'HMM170',
                    application: 'RH+T',
                    typicalApplication: '• Environmental chamber, Incubator, OEM chamber\n• Sensor purge provides superior chemical resistance\n• Probe and sensor warming functions minimize condensation on probe\n• Calculated parameters (Td, a, x, ppm)\n• Sensor options for corrosion tolerance, H2O2 tolerance, and moisture-in-oil measurement',
                    measurementRange: 'RH range: 0...100%\nTemperature range: -70...+180℃',
                    spec: 'Accuracy\n• RH ±1%RH (0...90%RH)\n• T ±0.2℃ at 20℃\n\nOutput\nThree analog outputs or RS-485 serial, Modbus'
                },
                {
                    model: 'HMM100',
                    application: 'RH',
                    typicalApplication: '• High temperature tolerance, also suitable for heat sterilization (Operating T-range: -70…+180℃)\n• Probe types: Stainless Steel Probe, Plastic Probe (400mm-long option)\n• Sensor option for H2O2 tolerance',
                    measurementRange: 'RH range: 0...100%\n(Calculated Parameter) Td -20…+100℃',
                    spec: 'Accuracy\n• RH ±2%RH (0...90%RH)\n• Td ±2℃\n\nOutput\nAnalog Output Types (1 Output Selectable)\n• 2 wire 4...20mA\n• 3 wire 0…1/5/10V/20mA (user configurable by USB)'
                },
                {
                    model: 'HMM105',
                    application: 'RH',
                    typicalApplication: '• Digital I2C communication interface available\n• High temperature tolerance, also suitable for heat sterilization (Operating temperature range: -40…+180℃ / short term peak +200℃)\n• Probe head with M10x1 threads',
                    measurementRange: 'RH range: 0...100%\n(Calculated Parameter) Td -20…+100℃',
                    spec: 'Accuracy\n• RH ±2%RH (0...90%RH)\n\nOutput\nI2C 5V'
                }
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMM170-Datasheet-B211698EN.pdf'
        },
        {
            id: 'hmp155',
            title: 'HMP155',
            subtitle: 'METEOROLOGICAL HUMIDITY AND TEMPERATURE PROBE',
            category: 'probe',
            image: '/hstech/images/HMP155 Series.png',
            gallery: ["/hstech/images/HMP155 Series.png"],
            desc: `Vaisala's HUMICAP® HMP155 is a plug-and-play sensor that has excellent stability and withstands well even in harsh environments. The probe provides reliable humidity and temperature measurement and it is designed specifically for demanding outdoor applications.

■ PRODUCT

Premium humidity and temperature probe for meteorological applications with weather-proof design.

▶ HMP155 : Meteorology, aviation and road weather, instrumentation`,
            specs: [
                {
                    model: 'HMP155',
                    application: 'RH+T',
                    typicalApplication: '• Meteorology, aviation and road weather, instrumentation\n• Weather-proof housing IP66\n• Various Output options: V, RS-485, resistive Pt100\n• Optional warmed humidity probe and chemical purge\n• Plug & Play\n• Using with DTR13 and DTR503 radiation shields and a Stevenson screen for long lifetime (optional)',
                    measurementRange: 'RH range: 0...100%\nTemperature range: -80...+60℃',
                    spec: 'Accuracy\n• RH ±1%RH (0…90%RH)\n\nOutput\n0…1/5/10V, Resistive Pt100 4-wire connection, RS-485'
                }
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMP155-Datasheet-B210993EN.pdf'
        },
        {
            id: 'hmp60',
            title: 'HMP60/63/110/113',
            subtitle: 'COMPACT HUMIDITY AND TEMPERATURE PROBES',
            category: 'probe',
            image: '/hstech/images/HMP60:63:110:113.jpg',
            gallery: ["/hstech/images/HMP60:63:110:113.jpg"],
            desc: `Temperature and humidity probes applicable to chambers, glove boxes, and other equipment.

■ PRODUCT

Miniature and compact probes for OEM and volume applications.

▶ HMP60 : RH+T Stainless Steel Probe (INTERCAP)
▶ HMP63 : RH+T PC/ABS Probe (INTERCAP)
▶ HMP110 : RH+T Stainless Steel Probe (HUMICAP)
▶ HMP113 : RH+T PC/ABS Probe (HUMICAP)`,
            specs: [
                {
                    model: 'HMP60',
                    application: 'RH+T',
                    typicalApplication: '• Chambers, Glove box, Incubator\n• INTERCAP Sensor\n• Housing material: Stainless steel (IP65)',
                    measurementRange: 'RH range: 0...100%\nTemperature range: -40...+60℃',
                    spec: 'Accuracy\n• RH ±3%RH (0…90%RH, 0…+40℃)\n• T ±0.5℃ at 10…30℃'
                },
                {
                    model: 'HMP63',
                    application: 'RH+T',
                    typicalApplication: '• Chambers, Glove box, Incubator\n• INTERCAP Sensor\n• Housing material: PC/ABS blend (IP54)',
                    measurementRange: 'RH range: 0...100%\nTemperature range: -40...+60℃',
                    spec: 'Accuracy\n• RH ±3%RH (0…90%RH, 0…+40℃)\n• T ±0.5℃ at 10…30℃'
                },
                {
                    model: 'HMP110',
                    application: 'RH+T',
                    typicalApplication: '• Chambers, Glove box, Incubator\n• HUMICAP Sensor\n• Housing material: Stainless steel (IP65)',
                    measurementRange: 'RH range: 0...100%\nTemperature range: -40...+80℃',
                    spec: 'Accuracy\n• RH ±1.5%RH (0…90%RH, 0…+40℃)\n• T ±0.2℃ at 0…40℃'
                },
                {
                    model: 'HMP113',
                    application: 'RH+T',
                    typicalApplication: '• Chambers, Glove box, Incubator\n• HUMICAP Sensor\n• Housing material: PC/ABS blend (IP54)',
                    measurementRange: 'RH range: 0...100%\nTemperature range: -40...+60℃',
                    spec: 'Accuracy\n• RH ±1.5%RH (0…90%RH, 0…+40℃)\n• T ±0.2℃ at 0…40℃'
                }
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMP60-Datasheet-B210973EN.pdf'
        },
        {
            id: 'hmt370ex',
            title: 'HMT370EX',
            subtitle: 'EXPLOSION PROOF HUMIDITY AND TEMPERATURE TRANSMITTER',
            category: 'explosion_proof',
            image: '/hstech/images/HMT370EX.png',
            gallery: ['/hstech/images/HMT370EX.png', '/hstech/images/HMT370EX_2.jpeg'],
            desc: `VAISALA HMT370EX series are designed for hazardous areas where explosive gases, vapors, or dust may be present. Ideal for fuel storage, chemicals, pharmaceutical manufacturing, and other demanding environments.

■ PRODUCT

Explosion-proof transmitter with intrinsically safe design certified for Zone 1 and Zone 2 hazardous areas.

▶ HMT371 : Wall Mount
▶ HMT373 : Confined Spaces
▶ HMT374 : Pressurized Spaces
▶ HMT375 : High Temperature
▶ HMT377 : High Humidity
▶ HMT378 : Pressurized Pipelines`,
            specs: [
                {
                    model: 'HMT371',
                    application: 'Wall Mount',
                    typicalApplication: 'ATEX/IECEx zone 1, 2, 22\nKTL / CML / NEPSI\nUL Division 1',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -40...+60°C (-40...+140°F)\nProbe diameter: 12 mm',
                    spec: 'Accuracy\n• ±0.8 %RH (0…90 %RH)\n• ±0.1 ºC @ 23 ºC PT1000\n\nOutput\n2-Wire Current (4…20 mA DC)\n\nIP Rating\nIP66 (NEMA4)\n\nOperating Environment\nElectronics -40…+60°C (-40…+140°F)\nWith display -20…+60°C (-4…+140°F)\nStorage: -40…+70°C (-40…+158°F)\n\nClassification\nKorea (KTL): Ex ia IIC T4 Ga\nGlobal (IECEx): Ex ia IIC T4 Ga\nEU (ATEX): II 1G Ex ia IIC T4 Ga\nJapan (CML): Ex ia IIC T4 Ga\nChina (NEPSI): Ex ia IIC T4 Ga'
                },
                {
                    model: 'HMT373',
                    application: 'Confined Spaces',
                    typicalApplication: 'ATEX/IECEx zone 1, 2, 22\nKTL / CML / NEPSI\nUL Division 1',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range:\n  rubber cable -40...+80°C (-40...+176°F)\n  teflon cable -40...+120°C (-40...+248°F)\nCable length: 2, 5 or 10 m',
                    spec: ''
                },
                {
                    model: 'HMT374',
                    application: 'Pressurized Spaces',
                    typicalApplication: 'ATEX/IECEx zone 1, 2, 22\nKTL / CML / NEPSI\nUL Division 1',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -70...+180°C (-94...+356°F)\nOperating pressure: 0...10 MPa (0...100 bar)',
                    spec: ''
                },
                {
                    model: 'HMT375',
                    application: 'High Temperature',
                    typicalApplication: 'ATEX/IECEx zone 1, 2, 22\nKTL / CML / NEPSI\nUL Division 1',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -70...+180°C (-94...+356°F)',
                    spec: ''
                },
                {
                    model: 'HMT377',
                    application: 'High Humidity',
                    typicalApplication: 'ATEX/IECEx zone 1, 2, 22\nKTL / CML / NEPSI\nUL Division 1',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -70...+180°C (-94...+356°F)',
                    spec: ''
                },
                {
                    model: 'HMT378',
                    application: 'Pressurized Pipelines',
                    typicalApplication: 'ATEX/IECEx zone 1, 2, 22\nKTL / CML / NEPSI\nUL Division 1',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -70...+180°C (-94...+356°F)\nOperating pressure: 0...4 MPa (0...40 bar)',
                    spec: ''
                }
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMT370EX-Datasheet-B211738EN.pdf'
        },
        {
            id: 'hmt360',
            title: 'HMT360 Series',
            subtitle: 'INTRINSICALLY SAFE HUMIDITY AND TEMPERATURE TRANSMITTER',
            category: 'explosion_proof',
            image: '/hstech/images/HMT360.png',
            gallery: ['/hstech/images/HMT360.png', '/hstech/images/HMT360_2.png'],
            desc: `VAISALA HMT360 series are intrinsically safe humidity and temperature transmitters designed for Zone 2 and Zone 22 hazardous areas. Suitable for petrochemical, pharmaceutical, and industrial applications where safety is paramount.

■ PRODUCT

Intrinsically safe transmitter certified for Zone 2 and Zone 22 hazardous areas with KGS approval.

▶ HMT361 : Wall Mount
▶ HMT363 : Duct Type
▶ HMT364 : High Pressure
▶ HMT365 : High Temperature
▶ HMT367 : High Humidity
▶ HMT368 : Pressurized Pipelines`,
            specs: [
                {
                    model: 'HMT361',
                    application: 'Wall Mount',
                    typicalApplication: 'ATEX/IECEx zone 2, 22\nKGS',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -40...+60°C (-40...+140°F)\nProbe diameter: 12 mm',
                    spec: 'Accuracy\n• ±1.7 %RH (0…90 %RH)\n• ±0.2 ºC @ 23 ºC\n\nOutput\n2-Wire Current (4…20 mA DC)\n\nIP Rating\nIP66 (NEMA4)\n\nOperating Environment\nElectronics -40…+60°C (-40…+140°F)\nWith display -20…+60°C (-4…+140°F)\nStorage: -40…+70°C (-40…+158°F)\n\nClassification\nKorea (KGS): Ex ib IIC T4 Gb\nGlobal (IECEx): Ex ib IIC T4 Gb\nEU (ATEX): II 1/2G Ex ib IIC T4 Gb'
                },
                {
                    model: 'HMT363',
                    application: 'Duct Type',
                    typicalApplication: 'ATEX/IECEx zone 2, 22\nKGS',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range:\n  rubber cable -40...+80°C (-40...+176°F)\n  teflon cable -40...+120°C (-40...+248°F)\nCable length: 2, 5 or 10 m',
                    spec: ''
                },
                {
                    model: 'HMT364',
                    application: 'High Pressure',
                    typicalApplication: 'ATEX/IECEx zone 2, 22\nKGS',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -70...+180°C (-94...+356°F)\nOperating pressure: 0...10 MPa (0...100 bar)',
                    spec: ''
                },
                {
                    model: 'HMT365',
                    application: 'High Temperature',
                    typicalApplication: 'ATEX/IECEx zone 2, 22\nKGS',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -70...+180°C (-94...+356°F)',
                    spec: ''
                },
                {
                    model: 'HMT367',
                    application: 'High Humidity',
                    typicalApplication: 'ATEX/IECEx zone 2, 22\nKGS',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -70...+180°C (-94...+356°F)',
                    spec: ''
                },
                {
                    model: 'HMT368',
                    application: 'Pressurized Pipelines',
                    typicalApplication: 'ATEX/IECEx zone 2, 22\nKGS',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -70...+180°C (-94...+356°F)\nOperating pressure: 0...4 MPa (0...40 bar)',
                    spec: ''
                }
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMT360-Datasheet-B211737EN.pdf'
        },
        {
            id: 'hmd60',
            title: 'HMD60',
            subtitle: '±1.5%RH DUCT TRANSMITTER',
            category: 'hvac',
            image: '/hstech/images/Module : Probe .png',
            gallery: ['/hstech/images/Module : Probe .png'],
            desc: `The all-metal body of the transmitter is well suited for use at building sites and industrial settings. HMD60 series provides state-of-the-art stability and environmental resistance thanks to the Vaisala HUMICAP® R2 sensor.

■ PRODUCT

The measurement accuracy is up to ±1.5 %RH and ±0.1 °C (±0.18 °F). All common humidity parameters are available, including RH, dew point, enthalpy, and wet bulb temperature.

▶ HMD62 : Duct type
▶ TMD62 : Duct type (T-only)
▶ HMD65 : Duct type
▶ HMD60 : Duct type
▶ TMD60 : Duct type (T-only)`,
            specs: [
                {
                    model: 'HMD62',
                    application: 'Duct type',
                    typicalApplication: '• HVAC\n• Cleanroom\n• Aluminum body\n• Probe length: 250mm (HMD60/TMD60 can select 100 mm short probe)\n• IP66 (NEMA 4X)',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -20...+80°C (-4...+176°F)',
                    spec: 'Accuracy\n• ±1.5%RH (0…90%)\n• ±0.1°C @ 20°C PT1000\n\nOutput\n• 2 analog outputs: 4…20 mA'
                },
                {
                    model: 'TMD62',
                    application: 'Duct type',
                    typicalApplication: '• HVAC\n• Cleanroom\n• Aluminum body\n• Probe length: 250mm\n• IP66 (NEMA 4X)',
                    measurementRange: 'Temperature range: -20...+80°C (-4...+176°F)',
                    spec: 'Accuracy\n• ±0.1°C @ 20°C PT1000\n\nOutput\n• 1 analog output: 4…20 mA'
                },
                {
                    model: 'HMD65',
                    application: 'Duct type',
                    typicalApplication: '• HVAC\n• Cleanroom\n• Aluminum body\n• Probe length: 250mm\n• IP66 (NEMA 4X)',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -20...+80°C (-4...+176°F)',
                    spec: 'Accuracy\n• ±1.5%RH (0…90%)\n• ±0.1°C @ 20°C PT1000\n\nOutput\n• 2 analog outputs: 0…10 V\n• Digital: BACnet MS/TP, Modbus RTU'
                },
                {
                    model: 'HMD60',
                    application: 'Duct type',
                    typicalApplication: '• HVAC\n• Cleanroom\n• Aluminum body\n• Probe length: 250mm (100 mm short probe option)\n• IP66 (NEMA 4X)',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -20...+80°C (-4...+176°F)',
                    spec: 'Accuracy\n• ±1.5%RH (0…90%)\n• ±0.1°C @ 20°C PT1000\n\nOutput\n• Configurable outputs and scale\n• Short probe option'
                },
                {
                    model: 'TMD60',
                    application: 'Duct type',
                    typicalApplication: '• HVAC\n• Cleanroom\n• Aluminum body\n• Probe length: 250mm (100 mm short probe option)\n• IP66 (NEMA 4X)',
                    measurementRange: 'Temperature range: -20...+80°C (-4...+176°F)',
                    spec: 'Accuracy\n• ±0.1°C @ 20°C PT1000\n\nOutput\n• 1 analog output: 4…20 mA (configurable scale)\n• Short probe option'
                }
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMD60-Datasheet-B211704EN.pdf'
        },
        {
            id: 'hmw90',
            title: 'HMW90 Series',
            subtitle: '±1.7%RH WALL TRANSMITTERS WITH A CERTIFICATE FOR DEMANDING HVAC',
            category: 'hvac',
            image: '/hstech/images/HMW90 Series.png',
            gallery: [],
            desc: `The HMW90 series measures relative humidity and temperature in indoor environments, where high accuracy, stability, and reliable operation are required.

■ PRODUCT

Wall type transmitters with Calibration function Service Port. Optional display versions (D suffix).

▶ TMW92 : T-only
▶ TMW93 : T-only
▶ TMW90 : T-only (Configurable)
▶ HMW92 : RH+T
▶ HMW92D : RH+T (with Display)
▶ HMW93 : RH+T
▶ HMW93D : RH+T (with Display)
▶ HMW90 : RH+T (Configurable)
▶ HMW95 : RH+T (Digital)
▶ HMW95D : RH+T (Digital with Display)`,
            specs: [
                {
                    model: 'TMW92',
                    application: 'T-only',
                    typicalApplication: '• Wall Type Transmitter\n• for HVAC, Cleanroom\n• On-site calibration\n• Housing: IP30',
                    measurementRange: 'Temperature range: -5...+55°C (-23...+131°F)',
                    spec: 'Accuracy\n• ±0.2°C @ 20°C\n\nOutput\n2-Wire Current (4…20mA)'
                },
                {
                    model: 'TMW93',
                    application: 'T-only',
                    typicalApplication: '• Wall Type Transmitter\n• for HVAC, Cleanroom\n• On-site calibration\n• Housing: IP30',
                    measurementRange: 'Temperature range: -5...+55°C (-23...+131°F)',
                    spec: 'Accuracy\n• ±0.2°C @ 20°C\n\nOutput\n3-Wire Voltage (0…5 or 10V)'
                },
                {
                    model: 'TMW90',
                    application: 'T-only',
                    typicalApplication: '• Wall Type Transmitter\n• for HVAC, Cleanroom\n• On-site calibration\n• Housing: IP30',
                    measurementRange: 'Temperature range: -5...+55°C (-23...+131°F)',
                    spec: 'Accuracy\n• ±0.2°C @ 20°C\n\nOutput\nConfigurable analog output'
                },
                {
                    model: 'HMW92',
                    application: 'RH+T',
                    typicalApplication: '• Wall Type Transmitter\n• for HVAC, Cleanroom\n• On-site calibration\n• Housing: IP30',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -5...+55°C (-23...+131°F)',
                    spec: 'Accuracy\n• ±1.7%RH (0…90%RH)\n• ±0.2°C @ 20°C\n\nOutput\n2-Wire Current (4…20mA)'
                },
                {
                    model: 'HMW92D',
                    application: 'RH+T',
                    typicalApplication: '• Wall Type Transmitter\n• for HVAC, Cleanroom\n• With Display\n• On-site calibration\n• Housing: IP30',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -5...+55°C (-23...+131°F)',
                    spec: 'Accuracy\n• ±1.7%RH (0…90%RH)\n• ±0.2°C @ 20°C\n\nOutput\n2-Wire Current (4…20mA)'
                },
                {
                    model: 'HMW93',
                    application: 'RH+T',
                    typicalApplication: '• Wall Type Transmitter\n• for HVAC, Cleanroom\n• On-site calibration\n• Housing: IP30',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -5...+55°C (-23...+131°F)',
                    spec: 'Accuracy\n• ±1.7%RH (0…90%RH)\n• ±0.2°C @ 20°C\n\nOutput\n3-Wire Voltage (0…5 or 10V)'
                },
                {
                    model: 'HMW93D',
                    application: 'RH+T',
                    typicalApplication: '• Wall Type Transmitter\n• for HVAC, Cleanroom\n• With Display\n• On-site calibration\n• Housing: IP30',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -5...+55°C (-23...+131°F)',
                    spec: 'Accuracy\n• ±1.7%RH (0…90%RH)\n• ±0.2°C @ 20°C\n\nOutput\n3-Wire Voltage (0…5 or 10V)'
                },
                {
                    model: 'HMW90',
                    application: 'RH+T',
                    typicalApplication: '• Wall Type Transmitter\n• for HVAC, Cleanroom\n• On-site calibration\n• Housing: IP30',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -5...+55°C (-23...+131°F)',
                    spec: 'Accuracy\n• ±1.7%RH (0…90%RH)\n• ±0.2°C @ 20°C\n\nOutput\nConfigurable analog output'
                },
                {
                    model: 'HMW95',
                    application: 'RH+T',
                    typicalApplication: '• Wall Type Transmitter\n• for HVAC, Cleanroom\n• On-site calibration\n• Housing: IP30',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -5...+55°C (-23...+131°F)',
                    spec: 'Accuracy\n• ±1.7%RH (0…90%RH)\n• ±0.2°C @ 20°C\n\nOutput\nDigital (BACnet, Modbus)'
                },
                {
                    model: 'HMW95D',
                    application: 'RH+T',
                    typicalApplication: '• Wall Type Transmitter\n• for HVAC, Cleanroom\n• With Display\n• On-site calibration\n• Housing: IP30',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -5...+55°C (-23...+131°F)',
                    spec: 'Accuracy\n• ±1.7%RH (0…90%RH)\n• ±0.2°C @ 20°C\n\nOutput\nDigital (BACnet, Modbus)'
                }
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMW90-Datasheet-B211703EN.pdf'
        },
        {
            id: 'hmdw110',
            title: 'HMDW110',
            subtitle: '±2%RH HUMIDITY AND TEMPERATURE TRANSMITTER',
            category: 'hvac',
            image: '/hstech/images/HMDW110 .png',
            gallery: [],
            desc: `VAISALA HUMICAP® Humidity and Temperature Transmitter Series HMDW110 measure relative humidity and temperature in multiple HVAC applications. The series includes transmitters for duct mounting, IP65-classified wall transmitters and outdoor transmitters with integrated radiation shields.

■ PRODUCT

Versatile transmitters for wall, duct, and outdoor mounting with IP65 protection.

▶ HMW110 : Wall type
▶ HMW112 : Wall type
▶ HMD110 : Duct type
▶ HMD112 : Duct type
▶ HMS110 : Outdoor type (Integrated Radiation Shields)
▶ HMS112 : Outdoor type (Integrated Radiation Shields)`,
            specs: [
                {
                    model: 'HMW110',
                    application: 'Wall type',
                    typicalApplication: 'IP65',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -40...+60°C',
                    spec: 'Accuracy\n• ±2%RH (0…90%)\n• ±0.2°C @ 20°C PT1000\n\nOutput\n2-wire current (4…20mA) or Modbus RTU output'
                },
                {
                    model: 'HMW112',
                    application: 'Wall type',
                    typicalApplication: 'IP65',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -40...+60°C',
                    spec: 'Accuracy\n• ±2%RH (0…90%)\n• ±0.2°C @ 20°C PT1000\n\nOutput\n2-wire current output (4…20mA)'
                },
                {
                    model: 'HMD110',
                    application: 'Duct type',
                    typicalApplication: 'IP65',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -40...+60°C',
                    spec: 'Accuracy\n• ±2%RH (0…90%)\n• ±0.2°C @ 20°C PT1000\n\nOutput\n2-wire current (4…20mA) or Modbus RTU output'
                },
                {
                    model: 'HMD112',
                    application: 'Duct type',
                    typicalApplication: 'IP65',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -40...+60°C',
                    spec: 'Accuracy\n• ±2%RH (0…90%)\n• ±0.2°C @ 20°C PT1000\n\nOutput\n2-wire current output (4…20mA)'
                },
                {
                    model: 'HMS110',
                    application: 'Outdoor type (Integrated Radiation Shields)',
                    typicalApplication: 'IP65',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -40...+60°C',
                    spec: 'Accuracy\n• ±2%RH (0…90%)\n• ±0.2°C @ 20°C PT1000\n\nOutput\n2-wire current (4…20mA) or Modbus RTU output'
                },
                {
                    model: 'HMS112',
                    application: 'Outdoor type (Integrated Radiation Shields)',
                    typicalApplication: 'IP65',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -40...+60°C',
                    spec: 'Accuracy\n• ±2%RH (0…90%)\n• ±0.2°C @ 20°C PT1000\n\nOutput\n2-wire current output (4…20mA)'
                }
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMDW110-Datasheet-B211705EN.pdf'
        },
        {
            id: 'hmdw80',
            title: 'HMDW80',
            subtitle: '±3%RH HUMIDITY AND TEMPERATURE TRANSMITTER',
            category: 'hvac',
            image: '/hstech/images/Module:OEM .png',
            gallery: [
                '/hstech/images/Module:OEM .png',
                '/hstech/images/Module:OEM .png'
            ],
            desc: `The HMDW80 series is versatile with transmitters for wall and duct mounting for measuring relative humidity and temperature in various building automation applications.

■ PRODUCT

Available in 20 models for wall, duct, and outdoor mounting with current (4-20mA) or voltage (0-10V) outputs.

▶ TMW82 : T-only Wall type
▶ TMW83 : T-only Wall type
▶ TMW88 : T-only Wall type
▶ TMD82 : T-only Duct type
▶ TMD83 : T-only Duct type
▶ HMW82 : RH+T Wall type
▶ HMW82P100 : RH+T Wall type
▶ HMW83 : RH+T Wall type
▶ HMW88 : RH+T Wall type
▶ HMW88D : RH+T Wall type + Display
▶ HMW89 : RH+T Wall type
▶ HMW89D : RH+T Wall type + Display
▶ HMD82 : RH+T Duct type
▶ HMD82D : RH+T Duct type + Display
▶ HMD83 : RH+T Duct type
▶ HMD83D : RH+T Duct type + Display
▶ HMS82 : RH+T Outdoor type
▶ HMS82C : RH+T Outdoor type + NPT ½" fitting
▶ HMS83 : RH+T Outdoor type
▶ HMS83C : RH+T Outdoor type + NPT ½" fitting`,
            specs: [
                {
                    model: 'TMW82',
                    application: 'Wall type',
                    typicalApplication: 'IP30',
                    measurementRange: 'Temperature range: -5…+55°C',
                    spec: 'Accuracy\n• ±0.5°C @10…30°C\n\nOutput\n2-wire current output (4…20mA)'
                },
                {
                    model: 'TMW83',
                    application: 'Wall type',
                    typicalApplication: 'IP30',
                    measurementRange: 'Temperature range: -5…+55°C',
                    spec: 'Accuracy\n• ±0.5°C @10…30°C\n\nOutput\n3-wire voltage output (0…10V)'
                },
                {
                    model: 'TMW88',
                    application: 'Wall type',
                    typicalApplication: 'IP65',
                    measurementRange: 'Temperature range: -40…+60°C',
                    spec: 'Accuracy\n• ±0.3°C @20°C\n\nOutput\n2-wire current output (4…20mA)'
                },
                {
                    model: 'TMD82',
                    application: 'Duct type',
                    typicalApplication: 'IP30',
                    measurementRange: 'Temperature range: -5…+55°C',
                    spec: 'Accuracy\n• ±0.5°C @10…30°C\n\nOutput\n2-wire current output (4…20mA)'
                },
                {
                    model: 'TMD83',
                    application: 'Duct type',
                    typicalApplication: 'IP30',
                    measurementRange: 'Temperature range: -5…+55°C',
                    spec: 'Accuracy\n• ±0.5°C @10…30°C\n\nOutput\n3-wire voltage output (0…10V)'
                },
                {
                    model: 'HMW82',
                    application: 'Wall type',
                    typicalApplication: 'IP30',
                    measurementRange: 'RH range: 0…100%\nTemperature range: -5…+55°C',
                    spec: 'Accuracy\n• ±3%RH (0…70%RH)\n• ±0.5°C @10…30°C\n\nOutput\n2-wire current output (4…20mA)'
                },
                {
                    model: 'HMW82P100',
                    application: 'Wall type',
                    typicalApplication: 'IP30',
                    measurementRange: 'RH range: 0…100%\nTemperature range: -5…+55°C',
                    spec: 'Accuracy\n• ±3%RH (0…70%RH)\n• ±0.5°C @10…30°C\n\nOutput\n2-wire current output (4…20mA)'
                },
                {
                    model: 'HMW83',
                    application: 'Wall type',
                    typicalApplication: 'IP30',
                    measurementRange: 'RH range: 0…100%\nTemperature range: -5…+55°C',
                    spec: 'Accuracy\n• ±3%RH (0…70%RH)\n• ±0.5°C @10…30°C\n\nOutput\n3-wire voltage output (0…10V)'
                },
                {
                    model: 'HMW88',
                    application: 'Wall type',
                    typicalApplication: 'IP65',
                    measurementRange: 'RH range: 0…100%\nTemperature range: -40…+60°C',
                    spec: 'Accuracy\n• ±3%RH (0…90%RH)\n• ±0.3°C @20°C\n\nCalculated Parameters\nTd -40…+60°C\nEnthalpy -40…460kJ/kg\n\nOutput\n2-wire current output (4…20mA)'
                },
                {
                    model: 'HMW88D',
                    application: 'Wall type+Display',
                    typicalApplication: 'IP65',
                    measurementRange: 'RH range: 0…100%\nTemperature range: -40…+60°C',
                    spec: 'Accuracy\n• ±3%RH (0…90%RH)\n• ±0.3°C @20°C\n\nCalculated Parameters\nTd -40…+60°C\nEnthalpy -40…460kJ/kg\n\nOutput\n2-wire current output (4…20mA)'
                },
                {
                    model: 'HMW89',
                    application: 'Wall type',
                    typicalApplication: 'IP65',
                    measurementRange: 'RH range: 0…100%\nTemperature range: -40…+60°C',
                    spec: 'Accuracy\n• ±3%RH (0…90%RH)\n• ±0.3°C @20°C\n\nCalculated Parameters\nTd -40…+60°C\nEnthalpy -40…460kJ/kg\n\nOutput\n3-wire voltage output (0…10V)'
                },
                {
                    model: 'HMW89D',
                    application: 'Wall type+Display',
                    typicalApplication: 'IP65',
                    measurementRange: 'RH range: 0…100%\nTemperature range: -40…+60°C',
                    spec: 'Accuracy\n• ±3%RH (0…90%RH)\n• ±0.3°C @20°C\n\nCalculated Parameters\nTd -40…+60°C\nEnthalpy -40…460kJ/kg\n\nOutput\n3-wire voltage output (0…10V)'
                },
                {
                    model: 'HMD82',
                    application: 'Duct type',
                    typicalApplication: 'IP65',
                    measurementRange: 'RH range: 0…100%\nTemperature range: -40…+60°C',
                    spec: 'Accuracy\n• ±3%RH (0…90%RH)\n• ±0.3°C @20°C\n\nCalculated Parameters\nTd -40…+60°C\nEnthalpy -40…460kJ/kg\n\nOutput\n2-wire current output (4…20mA)'
                },
                {
                    model: 'HMD82D',
                    application: 'Duct type+Display',
                    typicalApplication: 'IP65',
                    measurementRange: 'RH range: 0…100%\nTemperature range: -40…+60°C',
                    spec: 'Accuracy\n• ±3%RH (0…90%RH)\n• ±0.3°C @20°C\n\nCalculated Parameters\nTd -40…+60°C\nEnthalpy -40…460kJ/kg\n\nOutput\n2-wire current output (4…20mA)'
                },
                {
                    model: 'HMD83',
                    application: 'Duct type',
                    typicalApplication: 'IP65',
                    measurementRange: 'RH range: 0…100%\nTemperature range: -40…+60°C',
                    spec: 'Accuracy\n• ±3%RH (0…90%RH)\n• ±0.3°C @20°C\n\nCalculated Parameters\nTd -40…+60°C\nEnthalpy -40…460kJ/kg\n\nOutput\n3-wire voltage output (0…10V)'
                },
                {
                    model: 'HMD83D',
                    application: 'Duct type+Display',
                    typicalApplication: 'IP65',
                    measurementRange: 'RH range: 0…100%\nTemperature range: -40…+60°C',
                    spec: 'Accuracy\n• ±3%RH (0…90%RH)\n• ±0.3°C @20°C\n\nCalculated Parameters\nTd -40…+60°C\nEnthalpy -40…460kJ/kg\n\nOutput\n3-wire voltage output (0…10V)'
                },
                {
                    model: 'HMS82',
                    application: 'Outdoor type (Integrated Radiation Shields)',
                    typicalApplication: 'IP65',
                    measurementRange: 'RH range: 0…100%\nTemperature range: -40…+60°C',
                    spec: 'Accuracy\n• ±3%RH (0…90%RH)\n• ±0.3°C @20°C\n\nCalculated Parameters\nTd -40…+60°C\nEnthalpy -40…460kJ/kg\n\nOutput\n2-wire current output (4…20mA)'
                },
                {
                    model: 'HMS82C',
                    application: 'Outdoor type + NPT ½" fitting',
                    typicalApplication: 'IP65',
                    measurementRange: 'RH range: 0…100%\nTemperature range: -40…+60°C',
                    spec: 'Accuracy\n• ±3%RH (0…90%RH)\n• ±0.3°C @20°C\n\nCalculated Parameters\nTd -40…+60°C\nEnthalpy -40…460kJ/kg\n\nOutput\n2-wire current output (4…20mA)'
                },
                {
                    model: 'HMS83',
                    application: 'Outdoor type (Integrated Radiation Shields)',
                    typicalApplication: 'IP65',
                    measurementRange: 'RH range: 0…100%\nTemperature range: -40…+60°C',
                    spec: 'Accuracy\n• ±3%RH (0…90%RH)\n• ±0.3°C @20°C\n\nCalculated Parameters\nTd -40…+60°C\nEnthalpy -40…460kJ/kg\n\nOutput\n3-wire voltage output (0…10V)'
                },
                {
                    model: 'HMS83C',
                    application: 'Outdoor type + NPT ½" fitting',
                    typicalApplication: 'IP65',
                    measurementRange: 'RH range: 0…100%\nTemperature range: -40…+60°C',
                    spec: 'Accuracy\n• ±3%RH (0…90%RH)\n• ±0.3°C @20°C\n\nCalculated Parameters\nTd -40…+60°C\nEnthalpy -40…460kJ/kg\n\nOutput\n3-wire voltage output (0…10V)'
                }
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMDW80-Datasheet-B211706EN.pdf'
        },
        {
            id: 'indigo80_hmp80',
            title: 'Indigo80+HMP80',
            subtitle: 'HANDHELD HUMIDITY AND TEMPERATURE METER',
            category: 'handheld',
            image: '/hstech/images/Indigo80+HMP80.jpg',
            gallery: [],
            desc: `VAISALA HUMICAP® Handheld Humidity and Temperature Meter is designed for demanding humidity measurements in spot-checking applications. It is also ideal for field checking and calibration of VAISALA's fixed humidity instruments.

■ PRODUCT

High-end handheld indicator and probe system for professional humidity measurement.`,
            specs: [
                { label: 'MI70 Indicator', value: 'Operating temp: -10…+40°C\nLCD with backlight\nData logging: 2,700 points\nAudible alarm' },
                { label: 'HMP75 Probe (118 mm)', value: 'General purpose\nRH: 0…100% / T: -20…+60°C\nAccuracy: RH ±1 %RH (0…90%) / T ±0.2°C' },
                { label: 'HMP76 Probe (328 mm)', value: 'Long stainless steel, duct spot-checking\nRH: 0…100% / T: -50…+120°C\nAccuracy: RH ±1 %RH (0…90%)' },
                { label: 'HMP77 Probe (5 m cable)', value: 'Small probe for difficult-to-reach areas\nRH: 0…100% / T: -70…+180°C\nAccuracy: RH ±1 %RH (0…90%)' }
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/Indigo80-Datasheet-B211699EN.pdf'
        },
        {
            id: 'hm70',
            title: 'HM70',
            subtitle: 'HANDHELD HUMIDITY AND TEMPERATURE METER',
            category: 'handheld',
            image: '/hstech/images/HM70.png',
            gallery: ["/hstech/images/HM70.png"],
            desc: `VAISALA HUMICAP® Handheld Humidity and Temperature Meter HM70 is designed for demanding humidity measurements in spot-checking applications. It is also ideal for field checking and calibration of VAISALA's fixed humidity instruments.

■ PRODUCT

Professional handheld meter with interchangeable probes for versatile humidity measurement.

▶ MI70 Indicator : LCD display+buttons
▶ HMP75 Probe : General Purpose Probe (118mm)
▶ HMP76 Probe : Long, Stainless steel Probe (328mm)
▶ HMP77 Probe : Small probe+5m cable`,
            specs: [
                {
                    model: 'MI70 Indicator',
                    application: 'LCD display+buttons',
                    typicalApplication: '• Operating temperature: -10…+40°C\n• LCD with Back light\n• Data logging capacity (2,700points)\n• Audible alarm function\n\n• (Option) LINK software with USB cable',
                    measurementRange: '',
                    spec: ''
                },
                {
                    model: 'HMP75 Probe',
                    application: 'General Purpose Probe (118mm)',
                    typicalApplication: '',
                    measurementRange: 'RH range: 0…100%\nTemperature range: -20…+60°C',
                    spec: 'Accuracy\n• RH ±1%RH (0…90%RH)\n• T ±0.2°C at 20°C'
                },
                {
                    model: 'HMP76 Probe',
                    application: 'Long, Stainless steel Probe (328mm)\nDuct Spot checking',
                    typicalApplication: '',
                    measurementRange: 'RH range: 0…100%\nTemperature range: -50…+120°C',
                    spec: 'Accuracy\n• RH ±1%RH (0…90%RH)\n• T ±0.2°C at 20°C'
                },
                {
                    model: 'HMP77 Probe',
                    application: 'Small probe+5m cable\nIdeal for difficult-to-reach areas\nOn-site calibration',
                    typicalApplication: '',
                    measurementRange: 'RH range: 0…100%\nTemperature range: -70…+180°C',
                    spec: 'Accuracy\n• RH ±1%RH (0…90%RH)\n• T ±0.2°C at 20°C'
                }
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/HM70-Datasheet-B210974EN.pdf'
        },
        {
            id: 'hm40',
            title: 'HM40',
            subtitle: 'HANDHELD HUMIDITY AND TEMPERATURE METER',
            category: 'handheld',
            image: '/hstech/images/HM70.png',
            gallery: ["/hstech/images/HM70.png"],
            desc: `VAISALA HUMICAP® Handheld Humidity and Temperature Meter HM40 is a compact, easy-to-use meter designed for everyday humidity and temperature measurement and spot-checking applications. It is a cost-effective solution for industrial, HVAC, and general measurement needs.

■ PRODUCT

Compact and affordable handheld meter for everyday humidity measurement.

▶ HM41 : RH&T meter for general use
▶ HM42 : RH&T meter for tight spaces
▶ HM45 : RH&T meter with remote probe
▶ HM46 : RH&T meter for mechanical durability and extra reach`,
            specs: [
                {
                    model: 'HM41',
                    application: 'RH&T meter for general use',
                    typicalApplication: '• Fixed Probe\n• Sensor one-to-one replaceable',
                    measurementRange: 'RH range: 0…100%\nTemperature range: -10…+60°C',
                    spec: 'Accuracy\n• RH ±1.5%RH (0…90%RH)\n• T ±0.2°C at 20°C'
                },
                {
                    model: 'HM42',
                    application: 'RH&T meter for tight spaces',
                    typicalApplication: '• Thin 4mm diameter probe\n• 150mm cable',
                    measurementRange: 'RH range: 0…100%\nTemperature range: -40…+100°C',
                    spec: 'Accuracy\n• RH ±1.5%RH (0…90%RH)\n• T ±0.2°C at 20°C'
                },
                {
                    model: 'HM45',
                    application: 'RH&T meter with remote probe',
                    typicalApplication: '• Sensor replaceable\n• 120mm cable',
                    measurementRange: 'RH range: 0…100%\nTemperature range: -40…+60°C',
                    spec: 'Accuracy\n• RH ±1.5%RH (0…90%RH)\n• T ±0.2°C at 20°C'
                },
                {
                    model: 'HM46',
                    application: 'RH&T meter for mechanical durability and extra reach',
                    typicalApplication: '• Stainless Steel Probe\n• Brass Filter\n• 150mm Cable',
                    measurementRange: 'RH range: 0…100%\nTemperature range: -40…+100°C',
                    spec: 'Accuracy\n• RH ±1.5%RH (0…90%RH)\n• T ±0.2°C at 20°C'
                }
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/HM40-Datasheet-B210975EN.pdf'
        },
        {
            id: 'shm40',
            title: 'SHM40',
            subtitle: 'HANDHELD HUMIDITY AND TEMPERATURE METER FOR STRUCTURAL HUMIDITY',
            category: 'handheld',
            image: '/hstech/images/SHM40.png',
            gallery: ["/hstech/images/SHM40.png"],
            desc: `VAISALA HUMICAP® Handheld Humidity and Temperature Meter SHM40 is designed for measuring structural humidity in concrete and other building materials. It provides reliable results for construction and building diagnostics applications.

■ PRODUCT

Specialized handheld meter for measuring structural humidity in concrete and building materials.

▶ HM40 Indicator : LCD display with calculated variables
▶ HMP40S Probe : Stainless steel probe for boreholes`,
            specs: [
                {
                    model: 'HM40 Indicator',
                    application: 'LCD display with calculated variables',
                    typicalApplication: '• Alkaline batteries: 2×AA, 1.5V\n• LCD display\n• Calculated variables: Td, Tw, a, x, h\n• IP54',
                    measurementRange: '',
                    spec: ''
                },
                {
                    model: 'HMP40S Probe',
                    application: 'Stainless steel probe for boreholes',
                    typicalApplication: '• TRRS male 3.5mm cable connector\n• Borehole diameter needed: 16mm\n• Stainless steel probe',
                    measurementRange: 'RH range: 0…100%',
                    spec: ''
                }
            ]
        },
        {
            id: 'hmk15',
            title: 'HMK15',
            subtitle: 'HUMIDITY CALIBRATOR',
            category: 'handheld',
            image: '/hstech/images/HMK15.png',
            gallery: ["/hstech/images/HMK15.png"],
            desc: `VAISALA HUMICAP® Humidity Calibrator HMK15 is a saturated salt solution-based calibrator designed for on-site humidity probe calibration. It provides reliable reference humidity values at four different RH levels for field verification and calibration of humidity instruments.

■ PRODUCT

Portable calibrator using saturated salt solutions for on-site humidity probe verification.

▶ Chamber : Calibration chamber with multiple probe size covers
▶ LiCl Solution : 11% RH reference
▶ MgCl₂ Solution : 33% RH reference
▶ NaCl Solution : 75% RH reference
▶ K₂SO₄ Solution : 97% RH reference`,
            specs: [
                {
                    model: 'Chamber',
                    application: 'Calibration chamber with multiple probe size covers',
                    typicalApplication: '• Covers for 12 / 13.5 / 18.5 mm probe diameter\n• Thermometer for temperature monitoring',
                    measurementRange: '',
                    spec: ''
                },
                {
                    model: 'LiCl Solution',
                    application: '11% RH reference',
                    typicalApplication: '',
                    measurementRange: '11 %RH ± 1.3 %RH',
                    spec: ''
                },
                {
                    model: 'MgCl₂ Solution',
                    application: '33% RH reference',
                    typicalApplication: '',
                    measurementRange: '33 %RH ± 1.2 %RH',
                    spec: ''
                },
                {
                    model: 'NaCl Solution',
                    application: '75% RH reference',
                    typicalApplication: '',
                    measurementRange: '75 %RH ± 1.5 %RH',
                    spec: ''
                },
                {
                    model: 'K₂SO₄ Solution',
                    application: '97% RH reference',
                    typicalApplication: '',
                    measurementRange: '97 %RH ± 2.0 %RH',
                    spec: ''
                }
            ]
        },
        {
            id: 'hmt330',
            title: 'HMT330 Series',
            subtitle: 'HUMIDITY AND TEMPERATURE TRANSMITTERS',
            category: 'industrial',
            image: '/hstech/images/HMT330 Series.png',
            gallery: ["/hstech/images/HMT330 Series.png"],
            desc: `VAISALA HMT330 series are designed for demanding industrial applications where stable measurements and extensive customization are essential.

■ PRODUCT

Output: RH+T+Td+Tdf+a+x+Tw+ppm+pw+pws+h+dT

▶ HMT331 : Wall-Mount
▶ HMT333 : Duct
▶ HMT334 : High Pressure
▶ HMT335 : High Temperature
▶ HMT337 : High Humidity
▶ HMT338 : Pressurized Pipeline`,
            specs: [
                {
                    model: 'HMT331',
                    application: 'Wall Mount',
                    typicalApplication: '• cleanrooms\n• pharmaceutical processes\n• swimming halls\n• museums and archives',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -40...+60°C (-40...+140°F)',
                    spec: 'Accuracy\n• ±1%RH (0…90%)\n• ± 0.2°C @ 20ºC PT100 ±20%',
                    image: 'https://cdn.imweb.me/thumbnail/20211020/dbd30a2ca8ba5.png'
                },
                {
                    model: 'HMT333',
                    application: 'Duct Type',
                    typicalApplication: '• cleanrooms\n• Industrial HVAC systems\n• pharmaceutical processes\n• environmental chambers\n• processes with moderate temperature and humidity',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: rubber cable -40...+80°C (-40...+176°F) or teflon cable -40...+120°C (-40...+248°F)',
                    spec: 'Operating Voltage\n10 ... 35 VDC, 24 VAC ±20%\nwith optional power supply module: 100 ... 240 VAC, 50/60 HZ',
                    image: 'https://cdn.imweb.me/thumbnail/20211020/2fe4d5b5e85a9.png'
                },
                {
                    model: 'HMT334',
                    application: 'High Pressure',
                    typicalApplication: '• test chambers\n• high-pressure and vacuum processes',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -70...+180°C (-94...+356°F)\nOperating pressure: 0...10 MPa (0...100 bar)',
                    spec: 'Output\nCurrent outputs: 0...20mA or 4 ... 20mA\nVoltage outputs: 0 ... 1V / 5V / 10V\nDigital outputs: RS232 , RS485(optional)\n(optional) WLAN interface\n(optional) Relay outputs: 0.5A, 250VAC',
                    image: 'https://cdn.imweb.me/thumbnail/20211020/ba1eb4854b71d.png'
                },
                {
                    model: 'HMT335',
                    application: 'High Temperature',
                    typicalApplication: '• hot drying processes\n• food processes e.g. baking ovens',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -70...+180°C (-94...+356°F)',
                    spec: 'IP Rating\nIP66\nIP65 with local display',
                    image: 'https://cdn.imweb.me/thumbnail/20211020/42e6f20395c95.png'
                },
                {
                    model: 'HMT337',
                    application: 'High Humidity',
                    typicalApplication: '• professional  meteorology\n• intake air monitoring of engines and gas turbines\n• timber drying kilns',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -70...+180°C (-94...+356°F)',
                    spec: '',
                    image: 'https://cdn.imweb.me/thumbnail/20211020/1fe6ffcde33eb.png'
                },
                {
                    model: 'HMT338',
                    application: 'Pressurized Pipelines',
                    typicalApplication: '• process lines\n• environmental chambers\n• vacuum-drying processes\n• compressed air lines with refrigerant dryers',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -70...+180°C (-94...+356°F)\nOperating pressure: 0...4 MPa (0…40bar)',
                    spec: '',
                    image: 'https://cdn.imweb.me/thumbnail/20211020/2854f28e7fc38.png'
                }
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMT330-Datasheet-B211735EN.pdf'
        },
        {
            id: 'hmt310',
            title: 'HMT310',
            subtitle: 'HUMIDITY AND TEMPERATURE TRANSMITTER',
            category: 'industrial',
            image: '/hstech/images/HMT310.png',
            gallery: ["/hstech/images/HMT310.png"],
            desc: `HMT310 incorporates the latest generation VAISALA HUMICAP® sensor. The sensor is a capacitive thin-film polymer sensor providing high accuracy, excellent long-term stability and negligible hysteresis.

■ PRODUCT

Output: RH+T+Td+a+Tw+x+h+pws`,
            specs: [
                {
                    model: 'HMT311',
                    application: 'Wall Mount',
                    typicalApplication: '• cleanrooms\n• pharmaceutical processes\n• swimming halls\n• museums and archives',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -40...+60°C (-40...+140°F)',
                    spec: 'Accuracy\n• ±1%RH (0…90%)\n• ± 0.2ºC @ 20ºC PT1000\n\nOperating voltage\n12...28V (with serial port 15...28V)\n\nOutput\n• Operating voltage: 10 ... 35 VDC\n• Two analog outputs, selectable and scalable\n  0 ... 20 mA or 4 ...20 mA\n  1 ...5 V, 0 … 5 V or 0 … 10 V\n• Serial output: RS-232 in one M12/8 pin connector\n\nIP rating\n• IP66\n• IP65 with local display'
                },
                {
                    model: 'HMT313',
                    application: 'Duct Type',
                    typicalApplication: '• cleanrooms\n• Industrial HVAC systems\n• pharmaceutical processes\n• environmental chambers\n• processes with moderate temperature and humidity',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: rubber cable -40...+80°C (-40...+176°F) or teflon cable -40...+120°C (-40...+248°F)',
                    spec: ''
                },
                {
                    model: 'HMT314',
                    application: 'High Pressure',
                    typicalApplication: '• test chambers\n• high-pressure and vacuum processes',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -70 ...+180 °C (-94...+356°F)\nOperating pressure: 0...10 MPa (0...100 bar)',
                    spec: ''
                },
                {
                    model: 'HMT315',
                    application: 'High Temperature',
                    typicalApplication: '• hot drying processes\n• food processes e.g. baking ovens',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -70...+180°C (-94...+356 °F)',
                    spec: ''
                },
                {
                    model: 'HMT317',
                    application: 'High Humidity',
                    typicalApplication: '• professional meteorology\n• intake air monitoring of engines and gas turbines\n• timber drying kilns',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -70...+180°C (-94...+356°F)',
                    spec: ''
                },
                {
                    model: 'HMT318',
                    application: 'Pressurized Pipelines',
                    typicalApplication: '• process lines\n• environmental chambers\n• vacuum-drying processes\n• compressed air lines with refrigerant dryers',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -70...+180°C (-94...+356°F)\nOperating pressure: 0...4 MPa (0…40bar)',
                    spec: ''
                }
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMT310-Datasheet-B211734EN.pdf'
        },
        {
            id: 'hmt120',
            title: 'HMT120 / HMT130 Series',
            subtitle: 'HUMIDITY AND TEMPERATURE TRANSMITTERS',
            category: 'industrial',
            image: '/hstech/images/HMT120:130 Series.png',
            gallery: ["/hstech/images/HMT120:130 Series.png"],
            desc: `±1.5%RH temperature and humidity transmitter
▶ Wall, Duct type

■ PRODUCT

Output: RH+T+Td+Tdf`,
            specs: [
                {
                    model: 'HMT120',
                    application: 'Wall / Duct Type',
                    typicalApplication: '• cleanrooms\n• light industrial applications\n• HVAC systems\n• building automation',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -40...+80°C (-40...+176°F)',
                    spec: 'Accuracy\n• ±1.5%RH (0…90%)\n• ±0.2°C @ 20°C PT1000\n\nOutput\n• 2-Wire Current (4…20 mA)\n• Sensor one-to-one replaceable\n• Display option available\n\nIP Rating\n• IP65'
                },
                {
                    model: 'HMT130',
                    application: 'Wall / Duct Type',
                    typicalApplication: '• cleanrooms\n• industrial processes\n• pharmaceutical facilities\n• controlled environments',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -40...+80°C (-40...+176°F)',
                    spec: 'Output\n• 3-Wire Voltage (0…1 V / 5 V / 10 V)\n• RS485\n• Max cable length 20 m\n• Dewpoint output function\n\nIP Rating\n• IP65'
                }
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/HMT120-Datasheet-B211733EN.pdf'
        },
    ],
    dewpoint: [
        {
            id: 'dmt340', title: 'DMT340', subtitle: 'DEWPOINT TRANSMITTER', category: 'fixed',
            image: '/hstech/images/DMT340.jpg',
            gallery: ['/hstech/images/DMT340.jpg'],
            desc: 'Dewpoint transmitter for condensing environments. The heated sensor head prevents condensation on the sensor, enabling accurate measurement even in 100% RH conditions.',
            specs: [
                { label: 'DMT341 (Wall)', value: 'Td: -70…+80°C (±2°C, up to 20 bar)\nT: 0…+80°C (±0.2°C)\nRH: 0…70% (±0.004 %RH + 20% of reading)\nGraphical LCD monitoring' },
                { label: 'DMT342 (Flange Probe)', value: 'Large equipment or high pressure\nPressure range: 0…50 bar\nMechanical durability: up to 250 bar\n(option) Sampling cell' },
                { label: 'DMT344 (High Pressure)', value: 'High pressure and vacuum (up to 100 bar)\nPressure range: 0…50 bar\nMechanical durability: up to 100 bar' },
                { label: 'DMT347 (Thread Probe)', value: 'Small probe for tight spaces\nPressure range: 0…10 bar\nMechanical durability: up to 10 bar' },
                { label: 'DMT348 (Pipeline)', value: 'Ball valve option for hot-swap\nPressure range: 0…40 bar\nMechanical durability: up to 70 bar\n(option) Ball-valve set or sampling cell' },
                { label: 'Output', value: '0/4...20 mA, 0...1/5/10 V\n(2 analog outputs, 3rd optional)\nRS485 (option)' },
                { label: 'Operating Temperature', value: 'Probe: -40...+80°C\nMechanical durability: up to +180°C\nTransmitter: -40...+60°C\nWith display: 0...+60°C' }
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/DMT340-Datasheet-B211742EN.pdf'
        },
        {
            id: 'dmt345', title: 'DMT345/346', subtitle: 'HIGH TEMPERATURE DEWPOINT', category: 'fixed',
            image: '/hstech/images/ DMT345:346.png',
            gallery: ['/hstech/images/ DMT345:346.png'],
            desc: 'High temperature dewpoint transmitter for process streams up to +180 °C. Ideal for plastic drying, industrial ovens, and compressed air systems with high temperatures.',
            specs: [
                { label: 'DMT345 (High Temp)', value: 'Accurate in hot and dry environments (up to +180°C)\nTd: -40…+100°C (±2°C)\nT: 0…+180°C (±0.4°C @ 100°C)\nRH: 0…100% / Mixing ratio: 0…1000 g/kg' },
                { label: 'DMT346 (Cooling Flange)', value: 'Reliable in very hot processes (up to +350°C)\nTd: -25…+100°C (±2°C)\nMixing ratio: 0…1000 g/kg' },
                { label: 'Output', value: '0/4...20 mA, 0...1/5/10 V\n(2 analog outputs, 3rd optional)\nRS485 (option)' },
                { label: 'Operating Environment', value: 'Mechanical durability: up to +180°C (DMT345)\nMechanical durability: up to +350°C (DMT346)' }
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/DMT345-Datasheet-B211743EN.pdf'
        },
        {
            id: 'dmt132', title: 'DMT132', subtitle: 'DEWPOINT & HUMIDITY MODULE', category: 'module',
            image: '/hstech/images/ DMT132.jpg',
            gallery: ['/hstech/images/ DMT132.jpg'],
            desc: 'OEM dewpoint and humidity module for integration into instruments and systems.',
            specs: [
                { label: 'Features', value: 'For refrigerant dryers\nAuto-calibration\nChemical purging\nOptional LED warning light' },
                { label: 'Measurement Range', value: 'Td: -30…+50°C (±1°C @ -3…+20°C)' },
                { label: 'Output', value: '4...20 mA (2-wire)' },
                { label: 'Operating Voltage', value: '10…28 VDC (low power)' }
            ]
        },
        {
            id: 'dmt152', title: 'DMT152', subtitle: 'LOW DEWPOINT MODULE', category: 'module',
            image: '/hstech/images/DMT152.jpg',
            gallery: ['/hstech/images/DMT152.jpg'],
            desc: 'OEM module for very low dewpoint measurement in dry air and inert gas applications.',
            specs: [
                { label: 'Features', value: 'Auto-calibration\nChemical purging\nCompressed air, dry chambers' },
                { label: 'Measurement Range', value: 'Td: -100…+20°C (±2°C @ -80…-40°C)' },
                { label: 'Output', value: '0/4...20 mA, 0...5/10 V (2 analog outputs)\nRS485 (option)' },
                { label: 'Operating Environment', value: 'T: -40…+70°C / RH: 0…100%' }
            ]
        },
        {
            id: 'dmt143', title: 'DMT143', subtitle: 'COMPACT OEM MODULE', category: 'module',
            image: '/hstech/images/DMT143.jpg',
            gallery: ['/hstech/images/DMT143.jpg'],
            desc: 'Ultra-compact dewpoint transmitter module for OEM and space-limited applications.',
            specs: [
                { label: 'Features', value: 'Auto-calibration\nChemical purging\nLED alarm\nMiniature dewpoint measurement' },
                { label: 'Measurement Range', value: 'Td: -70…+60°C (±2°C)' },
                { label: 'Output', value: '4...20 mA, 0…1/5/10 V\nRS485 or Modbus RTU' },
                { label: 'Operating Environment', value: 'T: -40…+60°C / RH: 0…100%' },
            ]
        },
        {
            id: 'dmt143l', title: 'DMT143L', subtitle: 'EXTENDED PROBE MODULE', category: 'module',
            image: '/hstech/images/DMT143L.jpg',
            gallery: ['/hstech/images/DMT143L.jpg'],
            desc: 'DMT143 module with extended probe for deep installation into pipelines and vessels.',
            specs: [
                { label: 'Probe Length', value: 'Extended (selectable)' },
                { label: 'Dewpoint Range', value: '-70 ... +60 °Ctd' },
                { label: 'Output', value: 'Analog / Digital' },
                { label: 'Application', value: 'Pipelines, Deep installations\nPressure vessels' },
            ]
        },
        {
            id: 'dpt146', title: 'DPT146', subtitle: 'DEWPOINT & PRESSURE TRANSMITTER', category: 'module',
            image: '/hstech/images/DPT146.jpg',
            gallery: ['/hstech/images/DPT146.jpg'],
            desc: 'Combined dewpoint and pressure transmitter for compressed air quality monitoring (ISO 8573 compliance).',
            specs: [
                { label: 'Parameters', value: 'Dewpoint (Td) + Pressure (P)' },
                { label: 'Dewpoint Range', value: '-40 ... +60 °Ctd' },
                { label: 'Pressure Range', value: '0 ... 12 bar (abs)' },
                { label: 'Output', value: '4...20 mA × 2, RS-485' },
                { label: 'Application', value: 'Compressed air systems\nISO 8573 quality monitoring' },
            ]
        },
        {
            id: 'dpt145', title: 'DPT145', subtitle: 'SF6 GAS DEWPOINT MONITOR', category: 'module',
            image: '/hstech/images/ DPT145.png',
            gallery: ['/hstech/images/ DPT145.png'],
            desc: 'Dewpoint measurement in SF6 gas systems for high-voltage switchgear monitoring.',
            specs: [
                { label: 'Features', value: 'For SF6 gas measurement without sampling\nDetects leakage with pressure sensor' },
                { label: 'Measurement Range', value: 'Td: -50…+30°C (±3°C)\nPressure (absolute): 1…12 bar (±0.5% FS)' },
                { label: 'Output', value: 'RS-485, Modbus RTU' },
                { label: 'Operating Environment', value: 'T: -40…+60°C / RH: 0…100%\nPressure: 0…50 bar' }
            ]
        },
        {
            id: 'indigo80_dmp80', title: 'Indigo80 + DMP80', subtitle: 'PORTABLE DEWPOINT SYSTEM', category: 'portable',
            image: '/hstech/images/VAISALA Dew Point Sensor DRYCAP® .png',
            gallery: ['/hstech/images/VAISALA Dew Point Sensor DRYCAP® .png'],
            desc: 'Portable dewpoint measurement system combining the Indigo80 handheld indicator with the DMP80 probe. Color display, data logging, and Bluetooth connectivity.',
            specs: [
                { label: 'System', value: 'Indigo80 indicator + DMP80 probe' },
                { label: 'Dewpoint Range', value: '-60 ... +60 °Ctd' },
                { label: 'Accuracy', value: '±2 °Ctd' },
                { label: 'Display', value: 'Color touchscreen (3.5")' },
                { label: 'Data logging', value: 'Internal memory (5.5M data points)' },
                { label: 'Connectivity', value: 'Bluetooth, USB' },
                { label: 'Application', value: 'Spot-checking, Verification\nField calibration' },
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/Indigo80-Datasheet-B211699EN.pdf'
        },
        {
            id: 'dm70', title: 'DM70', subtitle: 'HANDHELD DEWPOINT METER', category: 'portable',
            image: '/hstech/images/VAISALA Dew Point Sensor DRYCAP® .png',
            gallery: ['/hstech/images/VAISALA Dew Point Sensor DRYCAP® .png'],
            desc: 'Professional handheld dewpoint meter with interchangeable probe. Used for field measurement, calibration verification, and spot-checking in industrial processes.',
            specs: [
                { label: 'MI70 Indicator', value: 'Operating temp: -10…+40°C\nLCD with backlight\nData logging: 2,700 points\nAudible alarm' },
                { label: 'DMP74A Probe (Higher Td)', value: 'Pressure tight probe\nTd: -50…+60°C Td (±2°C Td)\nT: -10…+60°C (±0.2°C @ 20°C)' },
                { label: 'DMP74B Probe (Low Td)', value: 'Pressure tight probe\nTd: -70…+30°C Td (±2°C Td)\nT: -10…+60°C (±0.2°C @ 20°C)' },
                { label: 'DMP74C Probe (SF6 Gas)', value: 'For SF6 gas measurement\nTd: -70…+30°C Td (±2°C Td)\nT: -10…+60°C (±0.2°C @ 20°C)' }
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/DM70-Datasheet-B210978EN.pdf'
        },
        {
            id: 'dss70a', title: 'DSS70A', subtitle: 'SAMPLING SYSTEM FOR DM70', category: 'portable',
            image: '/hstech/images/DSS70A.png',
            gallery: ['/hstech/images/DSS70A.png'],
            desc: 'Sampling cell system for dewpoint measurement in pressurized gas lines.',
            specs: [
                { label: 'DSS70A', value: 'Metal treatment and plastics drying processes\nOperating gases: Air, N₂, and other non-toxic inert gases\nInlet/outlet connections for pressurized gas' },
                { label: 'DSC74 (Sampling cell)', value: 'For pressurized gases\nPressure limit: 1 MPa\nMultiple connection adaptors' },
                { label: 'DSC74B (Two pressure cell)', value: 'Pressure limit: 1 MPa\nSuitable for SF6 gas (with DMP74C)' },
                { label: 'DSC74C', value: 'DSC74B + DMCOIL (cooling/venting coil)\nOptionally applicable to other sampling cells' },
                { label: 'DMT242SC', value: 'Sampling cell, pressure limit: 10 MPa' },
                { label: 'DMT242SC2', value: 'Sampling cell + Swagelok connectors (1/4" pipeline)\nPressure limit: 4 MPa' }
            ]
        },
        {
            id: 'hmt330_dewpoint',
            title: 'HMT330 Series',
            subtitle: '±1%RH HIGH-PRECISION INDUSTRIAL TRANSMITTER',
            category: 'industrial',
            image: '/hstech/images/HMT330 Series.png',
            gallery: [
                '/hstech/images/HMT330 Series.png',
                '/hstech/images/hmt330_6models_grid.jpg'
            ],
            desc: `±1%RH high-precision, VAISALA's flagship industrial model is specifically designed for use in a variety of environments. VAISALA's unique technology provides the most reliable and accurate value.

■ PRODUCT

RH+T+Td+Tdf+a+x+Tw+ppm+pw+pws+h+dT

(337_Td+Tdf+x+pw / RH+T+Td+Tdf+a+x+Tw+ppm+pw+pws+h+dT)

▶ HMT331 : Wall-Mount
▶ HMT334 : High Pressure
▶ HMT337 : High Humidity
▶ HMT333 : Duct
▶ HMT335 : High Temperature
▶ HMT338 : Pressurized Pipeline`,
            specs: [
                {
                    model: 'HMT331',
                    application: 'Wall Mount',
                    typicalApplication: '• cleanrooms\n• pharmaceutical processes\n• swimming halls\n• museums and archives',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -40...+60°C (-40...+140°F)',
                    spec: 'Other Available Variables (Model-Dependent)\nDew point temperature, mixing ratio, absolute humidity, wet bulb temperature, enthalpy, water vapor pressure\n\nAccuracy\n• ±1%RH (0…90%)\n• ±0.2ºC @ 20ºC PT100\n\nOperating voltage\n: 10 ... 35 VDC, 24 VAC ±20%\nwith optional power supply module: 100 ... 240 VAC, 50/60 HZ\n\nOutput\n• Current outputs: 0..20mA or 4…20mA\n• Voltage outputs: 0… 1V / 5V / 10V\n• Digital outputs: RS232, RS485(optional)\n• (optional) WLAN interface\n• (optional) Relay outputs: 0.5A, 250VAC\n\nIP rating\n• IP66\n• IP65 with local display'
                },
                {
                    model: 'HMT333',
                    application: 'Duct Type',
                    typicalApplication: '• cleanrooms\n• Industrial HVAC systems\n• pharmaceutical processes\n• environmental chambers\n• processes with moderate temperature and humidity',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: rubber cable -40...+80°C (-40...+176°F) or teflon cable -40...+120°C (-40...+248°F)',
                    spec: 'Same as HMT331'
                },
                {
                    model: 'HMT334',
                    application: 'High Pressure',
                    typicalApplication: '• test chambers\n• high-pressure and vacuum processes',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -70 ...+180 °C (-94...+356°F)\nOperating pressure: 0...10 MPa (0...100 bar)',
                    spec: 'Same as HMT331'
                },
                {
                    model: 'HMT335',
                    application: 'High Temperature',
                    typicalApplication: '• hot drying processes\n• food processes e.g. baking ovens',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -70...+180°C (-94...+356 °F)',
                    spec: 'Same as HMT331'
                },
                {
                    model: 'HMT337',
                    application: 'High Humidity',
                    typicalApplication: '• professional meteorology\n• intake air monitoring of engines and gas turbines\n• timber drying kilns',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -70...+180°C (-94...+356°F)',
                    spec: 'Same as HMT331'
                },
                {
                    model: 'HMT338',
                    application: 'Pressurized Pipelines',
                    typicalApplication: '• process lines\n• environmental chambers\n• vacuum-drying processes\n• compressed air lines with refrigerant dryers',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -70...+180°C (-94...+356°F)\nOperating pressure: 0...4 MPa (0…40bar)',
                    spec: 'Same as HMT331'
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/hmt330series'
        },
        {
            id: 'hmt120_dewpoint',
            title: 'HMT120/130 Series',
            subtitle: '±1.5%RH PRECISION TRANSMITTER',
            category: 'industrial',
            image: '/hstech/images/HMT120:130 Series.png',
            gallery: ['/hstech/images/HMT120:130 Series.png'],
            desc: `±1.5%RH precision product. Probe can be replaced separately. HMT120 and 130 are entry-level precision products available in a variety of environments.

■ PRODUCT

Output: RH+T+Td+a+Tw+x+h+pws`,
            specs: [
                {
                    model: 'HMT120',
                    application: '• Wall Mount\n• Duct Type\n• Outdoor',
                    typicalApplication: '• Monitoring the temperature of the clean room\n• Sensor one-to-one replacement\n• Display Options\n• Duct Installation Kit Options\n• Dew point output function\n• Cable maximum length 20m\n• For wall mount types, plastic sensors can be selected',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -40..+80°C (-40...+176°F)\n\nOther Variables (Optional)\nDew point/frost point, mixing ratio, absolute humidity, wet bulb temperature, enthalpy, vapor pressure, saturation vapor pressure',
                    spec: 'Accuracy\n• ±1.5%RH (0…90%)\n• ±0.2ºC @ 20ºC PT1000\n\nIP rating\n• IP65\n\nOutput\n• 2-Wire Current (4…20mA)'
                },
                {
                    model: 'HMT130',
                    application: '• Wall Mount\n• Duct Type\n• Outdoor',
                    typicalApplication: 'Same as HMT120',
                    measurementRange: 'Same as HMT120',
                    spec: 'Same accuracy as HMT120\n\nOutput\n• 3-Wire Voltage (0…1V/5V/10V)\n• RS485'
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/hmt120series'
        },
        {
            id: 'hmdw110_dewpoint',
            title: 'HMDW110',
            subtitle: 'HIGH-PERFORMANCE TEMPERATURE SENSOR',
            category: 'industrial',
            image: '/hstech/images/HMDW110 .png',
            gallery: ['/hstech/images/HMDW110 .png'],
            desc: `High-performance temperature sensor with excellent long-term stability and accuracy

■ PRODUCT

Output: RH+T+Td/f+h+Tw`,
            specs: [
                {
                    model: 'HMW110',
                    application: 'Wall type',
                    typicalApplication: 'Wall-mounted humidity and temperature monitoring',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -40..+60°C\n\nCalculated Parameters\n• Td & wet bulb T -40…+60°C\n• Enthalpy -40 ... 460 kJ/kg',
                    spec: 'Accuracy\n• ±2%RH (0…90%)\n• ±0.2ºC @ 20ºC PT1000\n\nOutput\n2-wire current (4…20mA)\nor Modbus RTU output'
                },
                {
                    model: 'HMW112',
                    application: 'Wall type',
                    typicalApplication: 'Wall-mounted humidity and temperature monitoring',
                    measurementRange: 'Same as HMW110',
                    spec: 'Same accuracy as HMW110\n\nOutput\n2-wire current output (4…20mA)'
                },
                {
                    model: 'HMD110',
                    application: 'Duct type',
                    typicalApplication: 'HVAC duct installation',
                    measurementRange: 'Same as HMW110',
                    spec: 'Same accuracy as HMW110\n\nOutput\n2-wire current (4…20mA)\nor Modbus RTU output'
                },
                {
                    model: 'HMD112',
                    application: 'Duct type',
                    typicalApplication: 'HVAC duct installation',
                    measurementRange: 'Same as HMW110',
                    spec: 'Same accuracy as HMW110\n\nOutput\n2-wire current output (4…20mA)'
                },
                {
                    model: 'HMS110',
                    application: 'Outdoor type (RH +T)',
                    typicalApplication: 'Outdoor weather monitoring',
                    measurementRange: 'Same as HMW110',
                    spec: 'Same accuracy as HMW110\n\nOutput\n2-wire current (4…20mA)\nor Modbus RTU output'
                },
                {
                    model: 'HMS112',
                    application: 'Outdoor type (RH +T)',
                    typicalApplication: 'Outdoor weather monitoring',
                    measurementRange: 'Same as HMW110',
                    spec: 'Same accuracy as HMW110\n\nOutput\n2-wire current output (4…20mA)'
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/hmdw110'
        },
    ],
    co2: [
        {
            id: 'gmw90', title: 'GMW90', subtitle: 'WALL-MOUNT CO₂ TRANSMITTER', category: 'transmitter',
            image: '/hstech/images/GMW90.png',
            gallery: ['/hstech/images/GMW90.png'],
            desc: 'Multi-parameter wall transmitter measuring CO2, temperature, and humidity. Features Vaisala CARBOCAP® dual-channel sensor for superior long-term stability — no zero drift.',
            specs: [
                { label: 'GMW93 / GMW93D (Wall)', value: 'CO₂+T measurement\n3-wire voltage output\nDisplay option (D suffix)' },
                { label: 'GMW94 / GMW94D (Wall)', value: 'CO₂+T measurement\n3-wire current output' },
                { label: 'GMW93R / GMW93RD / GMW93RA (Wall)', value: 'CO₂+T+RH measurement\n3-wire voltage output\nRA: Display + LED indicator' },
                { label: 'GMW94R / GMW94RD (Wall)', value: 'CO₂+T+RH measurement\n3-wire current output' },
                { label: 'GMW95 / GMW95D (Wall)', value: 'CO₂+T measurement\nDigital: BACnet / Modbus' },
                { label: 'GMW95R / GMW95RD (Wall)', value: 'CO₂+T+RH measurement\nDigital: BACnet / Modbus' },
                { label: 'GMW90 / GMW90R (Wall)', value: 'Configurable analog/digital output\nR suffix: +RH measurement' }
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/GMW90-Datasheet-B211008EN.pdf'
        },
        {
            id: 'gmw80', title: 'GMW80', subtitle: 'CO₂ TRANSMITTER', category: 'transmitter',
            image: '/hstech/images/GMW80.png',
            gallery: ['/hstech/images/GMW80.png'],
            desc: 'Economical CO2 transmitter for standard indoor air quality monitoring and demand-controlled ventilation.',
            specs: [
                { label: 'Parameter', value: 'CO₂' },
                { label: 'CO₂ Range', value: '0 ... 2000 ppm' },
                { label: 'CO₂ Accuracy', value: '±(40 ppm + 3% of reading)' },
                { label: 'Output', value: '0...10 V, 4...20 mA' },
                { label: 'Application', value: 'Office buildings, Schools\nDemand-controlled ventilation' },
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/GMW80-Datasheet-B211007EN.pdf'
        },
        {
            id: 'gmd110', title: 'GMD110', subtitle: 'DUCT CO₂ TRANSMITTER', category: 'transmitter',
            image: '/hstech/images/GMD110.jpg',
            gallery: ['/hstech/images/GMD110.jpg'],
            desc: 'CO2 transmitter for duct mounting in HVAC air handling units. Measures CO2 directly in the airflow.',
            specs: [
                { label: 'GMD20 (Duct)', value: 'IP65\nDisplay (optional)\nEasy one-to-one replacement\nExcellent long-term stability' },
                { label: 'CO₂ Range / Accuracy', value: '0…2000 ppm (±2% + 2% of reading)' },
                { label: 'Output', value: '0...20 mA, 4...20 mA\n0...10 V\nRelay (option)' }
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/GMD110-Datasheet-B211006EN.pdf'
        },
        {
            id: 'gmp343', title: 'GMP343', subtitle: 'INDUSTRIAL CO₂ PROBE', category: 'probe',
            image: '/hstech/images/GMP343.png',
            gallery: ['/hstech/images/GMP343.png'],
            desc: 'High-accuracy CO2 probe for soil respiration, ambient monitoring, plant growth chambers and OEM applications.',
            specs: [
                { label: 'Features', value: 'Excellent accuracy and stability\nSilicon-based NDIR sensor\nDual wavelength measurement\nDiffusion and flow-through design' },
                { label: 'Measurement Range', value: '0…1000/2000/3000/4000/5000 ppm\n0…2%' },
                { label: 'Accuracy', value: '±(3 ppm + 1% of reading) @ 1000 ppm' },
                { label: 'IP Rating', value: 'IP65' }
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/GMP343-Datasheet-B210879EN.pdf'
        },
        {
            id: 'gmp251', title: 'GMP251', subtitle: 'HIGH-RANGE CO₂ PROBE', category: 'probe',
            image: '/hstech/images/GMP251.png',
            gallery: ['/hstech/images/GMP251.png'],
            desc: 'CO2 probe for life science incubators, cold storages, fruit and vegetable transportation.',
            specs: [
                { label: 'GMP251', value: 'Range: 0…20% (±0.1 %CO₂ @ 5% CO₂)\nIP65 classified housing\nSensor head heated for reliable operation\nOperating temp: -40…+60°C' },
                { label: 'GMP (Agriculture/Refrigeration)', value: 'Range: 0…10,000 ppm (±40 ppm @ 0…3000 ppm)\nIP65 housing\nSensor head heated' },
                { label: 'INDIGO201 Transmitter', value: 'Plug & Play transmitter\nCH3: Analog output (V & mA), 2 relays\nDisplay options\nIP65, 24 V input' },
                { label: 'INDIGO202 Transmitter', value: 'RS485 isolated with Modbus RTU\n2 relays, display version only' },
                { label: 'Output', value: 'Digital output via Indigo transmitter' }
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/GMP251-Datasheet-B210878EN.pdf'
        },
        {
            id: 'gmp231', title: 'GMP231', subtitle: 'INCUBATOR CO₂ PROBE', category: 'probe',
            image: '/hstech/images/GMP231.png',
            gallery: ['/hstech/images/GMP231.png'],
            desc: 'CO2 probe designed for life science incubators. High accuracy and stability at elevated temperatures.',
            specs: [
                { label: 'Features', value: 'Max temperature durability in standby (sensor head only)\nHigh accuracy and stability as temp changes' },
                { label: 'Measurement Range', value: '0…20% CO₂\nAccuracy: ±0.1% CO₂ (@ 5% CO₂)' },
                { label: 'Output', value: 'Digital: I²C 5 V, RS-485 (2-wire w/ Modbus)' }
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/GMP231-Datasheet-B210877EN.pdf'
        },
        {
            id: 'indigo80_gmp252', title: 'Indigo80 + GMP252', subtitle: 'PORTABLE CO₂ METER', category: 'handheld',
            image: '/hstech/images/Indigo80+GMP252.jpg',
            gallery: ['/hstech/images/Indigo80+GMP252.jpg'],
            desc: 'Portable CO2 measurement system combining the Indigo80 handheld indicator with the GMP252 high-range CO2 probe. Ideal for spot-checking and verification.',
            specs: [
                { label: 'System', value: 'Indigo80 indicator + GMP252 probe' },
                { label: 'CO₂ Range', value: '0 ... 30 %vol (ppm range available)' },
                { label: 'Display', value: 'Color touchscreen (3.5")' },
                { label: 'Data logging', value: 'Internal memory (5.5M data points)' },
                { label: 'Connectivity', value: 'Bluetooth, USB' },
                { label: 'Application', value: 'Spot-checking, Calibration verification\nFood storage, Greenhouses' },
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/Indigo80-Datasheet-B211699EN.pdf'
        },
    ],
    oil: [
        {
            id: 'mht410',
            title: 'MHT410',
            subtitle: 'MOISTURE, HYDROGEN AND TEMPERATURE TRANSMITTER FOR TRANSFORMER OIL',
            category: 'transformer',
            image: '/hstech/images/MHT410.png',
            gallery: ['/hstech/images/MHT410.png'],
            desc: `The Vaisala Moisture, Hydrogen and Temperature Transmitter MHT410 for Transformer Oil measures directly from representative transformer oil giving both reliable hydrogen trend as well as fast moisture data.`,
            specs: [
                {
                    model: 'MHT410',
                    application: 'Main_Online type',
                    typicalApplication: '• Measurement of the condition of a real-time transformer\n• Can be installed directly in transformers\n• Installation Depth Adjustable Probe\n• Moisture, Hydrogen, Temperature Measurement\n• IP66\n• 5 years of general warranty',
                    measurementRange: 'Hydrogen in oil: 0...5000ppmv (±20% of reading or ±25ppmv)\nMoisture in oil: 0...100%RS / aw 0...1 (±2%RS / aw ±0...1)\nTemperature: -40...+120℃ (±0.2℃)',
                    spec: 'Inputs and Outputs:\n• Operating voltage: 15...30VDC, 24VAC\n• Analog output (Current): 3 isolated 4...20mA (loop powering)\n• Digital outputs: Isolated RS-485 half-duplex / RS-485 (Service port, non-isolated)\n  Protocols: Modbus RTU, DNP3, serial ASCII\n\n(option) Display_External installation'
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/mht410'
        },
        {
            id: 'mmt330',
            title: 'MMT330',
            subtitle: 'OIL MOISTURE TRANSMITTER FOR DIVERSE APPLICATIONS',
            category: 'fixed',
            image: '/hstech/images/MMT330.png',
            gallery: ['/hstech/images/MMT330.png'],
            desc: `For Diverse Applications and Demanding Conditions. With a wide variety of probes, the transmitter can be used in lubrication systems, hydraulic systems and transformers.`,
            specs: [
                {
                    model: 'MMT332',
                    application: 'Flange type',
                    typicalApplication: '• MAN Diesel & Turbo Two-Stroke Diesel Engine\n• DNV Certified\n• Button options for changing display and settings\n• Maximum cable length: 10m (MMT332), 20m (MMT337, MMT338)\n• IP66 (without display)\n• Field-checking available with MM70',
                    measurementRange: 'Pressure range: 0…250 bar\nTemperature range: -40…+180℃',
                    spec: 'Measurement range:\n• Water Activity aw 0…1\n• Temperature -40…+180℃\n\nOutputs:\n2 Analog outputs (3rd optional)\n• 0/4...20mA, 0…1/5/10V\nDigital outputs\n• RS-232, RS-485 (optional)\n\nOperation Environment:\nEMC compliance EN61326-1\nOperating temperature\n• Probe for each temperature range\n• Transmitter -40...+60℃\n• Transmitter (w/ display) 0...+60℃'
                },
                {
                    model: 'MMT337',
                    application: 'Swagelok Connector type',
                    typicalApplication: 'Same as MMT332',
                    measurementRange: 'Pressure range: 0…10 bar\nTemperature range: -40…+180℃\nFitting body: R 3/8" ISO, 1/2" ISO or NPT1/2"',
                    spec: 'Same as MMT332'
                },
                {
                    model: 'MMT338',
                    application: 'Ball valve connector type',
                    typicalApplication: 'Same as MMT332',
                    measurementRange: 'Pressure range: 0…10 bar\nTemperature range: -40…+180℃\nFitting body: R1/2" ISO or NPT1/2"\nBall-valve set\nSampling cell',
                    spec: 'Same as MMT332'
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/mmt330'
        },
        {
            id: 'mmt310',
            title: 'MMT310',
            subtitle: 'TRANSMITTER FOR LUBRICATION SYSTEMS, HYDRAULIC SYSTEMS AND TRANSFORMERS',
            category: 'fixed',
            image: '/hstech/images/MMT310.png',
            gallery: ['/hstech/images/MMT310.png'],
            desc: `Transmitter for lubrication systems, hydraulic systems and transformers`,
            specs: [
                {
                    model: 'MMT317',
                    application: 'Compact type',
                    typicalApplication: '• Continuous measurement of moisture in oil\n• max. cable length: 10m\n• IP66',
                    measurementRange: 'Small pressure tight probe\n• Swagelok: NPT 1/2", ISO 3/8" or ISO 1/2"\n• Pressure range: 0…10bar',
                    spec: 'Measurement range:\n• Water Activity aw 0…1 (0…100%RS)\n• Temperature -40…+180℃\n\nOutputs:\n2 Analog outputs (3rd optional)\n• 0/4...20mA, 0…1/5/10V\nSerial output\n• RS-232C'
                },
                {
                    model: 'MMT318',
                    application: 'Pipeline type',
                    typicalApplication: 'Same as MMT317',
                    measurementRange: 'Pressurized pipelines\n• Fitting body: ISO 1/2", NPT 1/2"\n• Pressure range (with ball-valve up to 120℃): 0…40bar',
                    spec: 'Same as MMT317'
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/mmt310'
        },
        {
            id: 'mm70',
            title: 'MM70',
            subtitle: 'HANDHELD OIL MOISTURE METER',
            category: 'handheld',
            image: '/hstech/images/MM70.png',
            gallery: ['/hstech/images/MM70.png', '/hstech/images/MM70_2.png'],
            desc: `±0.02Aw ultra-precision moisture sensor is suitable for inline process check and field calibration and is compatible with module type sensors`,
            specs: [
                {
                    model: 'MI70\nIndicator',
                    application: 'LCD display+buttons',
                    typicalApplication: '',
                    measurementRange: '',
                    spec: 'Operating temperature: -10…+40℃\nLCD with Back light\nData logging capacity (2,700 points)\nAudible alarm fuction\n\nLINK software with USB cable (Option)'
                },
                {
                    model: 'MM70\nProbe',
                    application: 'In-line type',
                    typicalApplication: '',
                    measurementRange: '',
                    spec: 'Moisture in Oil Sensor\n\nin-line process checking through ball valve\n\nAw measurement, ppm calculation\n\nMeasurement range(Accuracy):\n- Water Activity aw 0…1(±0.02aw @0...0.9)\n- Temperature -40…+100℃(±0.2℃ @ 20℃)'
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/mm70'
        },
        {
            id: 'mmt162',
            title: 'MMT162',
            subtitle: 'ECONOMICAL OIL MOISTURE TRANSMITTER',
            category: 'oil_module',
            image: '/hstech/images/MMT162.png',
            gallery: ['/hstech/images/MMT162.png'],
            desc: `Installation Transmitter for lubrication systems, hydraulic systems and transformers. High performance, but relatively inexpensive because it's low-end`,
            specs: [
                {
                    model: 'Metal type',
                    application: 'Direct pipeline installation',
                    typicalApplication: '• Economical online detection of moisture in oil\n• Direct installation in pipeline\n• MI70 can be used as a display, communication and datalogging device for the MMT162',
                    measurementRange: 'Working range:\n• Water Activity aw 0…1 (±0.02 aw)\n• Temperature -40…+80℃ (±0.2℃)\n• Pressure range: Up to 200bar\n\nConnection: ISO G1/2" thread or NPT 1/2" thread',
                    spec: 'Outputs:\n2 Analog outputs (3rd optional)\n• 0/4...20mA, 0…5/10V\nDigital outputs\n• RS-485 non-isolated, Vaisala protocol, Modbus RTU protocol\n\nOperating Environment:\nEMC compliance EN61326-1\nOperating temperature -40…+60℃\nStorage temperature -40…+80℃\nOil temperature -40…+80℃'
                },
                {
                    model: 'Plastic type',
                    application: 'Direct pipeline installation',
                    typicalApplication: 'Same as Metal type',
                    measurementRange: 'Working range:\n• Water Activity aw 0…1 (±0.02 aw)\n• Temperature -40…+80℃ (±0.2℃)\n• Pressure range: Up to 40bar\n\nConnection: ISO G1/2" thread',
                    spec: 'Same as Metal type'
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/mmt162'
        },
    ],
    barometer: [
        {
            id: 'ptu300',
            title: 'PTU300',
            subtitle: 'COMBINED PRESSURE, HUMIDITY AND TEMPERATURE TRANSMITTER',
            category: 'combined',
            image: '/hstech/images/PTU300.png',
            gallery: ['/hstech/images/PTU300.png', '/hstech/images/PTU300_2.jpg'],
            desc: `VAISALA combined pressure, humidity and temperature transmitter PTU300 is a unique instrument measuring three parameters simultaneously.`,
            specs: [
                {
                    model: 'PTU300',
                    application: '• Laboratories\n• Engine rooms\n• PTU301 for wall mounting\n• PTU303 for outdoor use\n• PTU307 warmed probe for outdoor and demanding meteorology\n• PTU30T for pressure and temperature only measurement\n• HMT330MIK Meteorlogical Installation Kit for meteorological purpose',
                    typicalApplication: 'Barometric Pressure\nPressure range 500 … 1100 hPa, 50 … 1100 hPa\nPressure units hPa, mbar, kPa, Pa, inHg, mmH20, mmHg, torr, psia\n\nRelative Humidity\nMeasurement range 0 … 100 %RH\n\nTemperature\nMeasurement range, probes\nPTU301: -40 … +60 °C\nPTU303: -40 … +80 °C\nPTU307: -40 … +180 °C\nPTU30T: -70 … +180 °C',
                    measurementRange: '',
                    spec: 'Barometric Pressure Accuracy\nTotal accuracy ( -40 … +60 °C )\n±0.15 hPa ( 500 … 1100 hPa )\n±0.25 hPa ( 500 … 1100 hPa )\n±0.45 hPa ( 50 … 1100 hPa )\n\nRelative Humidity Accuracy\n(At +15 … +25 °C)\n±1 %RH (0 … 90 %RH)\n±1.7 %RH (90 … 100 %RH)\n\nTemperature Accuracy\n(Accuracy at +20 °C)\nPTU301, PTU303, PTU307: ±0.2 °C\nPTU30T: ±0.1 °C (±0.18 °F)\n\nAnalog Outputs (Optional)\nCurrent output 0 … 20 mA, 4 … 20 mA\nVoltage output 0 … 1 V, 0 … 5 V, 0 … 10 V\n\nEthernet Interface (Optional)\nProtocols Telnet, Modbus TCP/IP'
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/151'
        },
        {
            id: 'ptb330',
            title: 'PTB330',
            subtitle: 'DIGITAL BAROMETER',
            category: 'barometer',
            image: '/hstech/images/PTB330.png',
            gallery: ['/hstech/images/PTB330.png', '/hstech/images/PTB330_2.jpg'],
            desc: `VAISALA combined pressure, humidity and temperature transmitter PTU300 is a unique instrument measuring three parameters simultaneously.`,
            specs: [
                {
                    model: 'PTB330',
                    application: '• Vaisala BAROCAP® sensor\n• Accurate measurement\n• Excellent long-term stability\n• Added reliability through redundancy\n• Graphical trend display with 1-year history data\n• Altitude corrected pressure (QFE, QNH)',
                    typicalApplication: 'Barometric Pressure Range\n: 500 ... 1100 hPa / 50 ... 1100 hPa',
                    measurementRange: '',
                    spec: 'Barometric Pressure Accuracy\nTotal Accuracy ( -40 ... +60 °C )\n500 ... 1100 hPa : ±0.15 hPa (Class A), ±0.25 hPa (Class B)\n50 ... 1100 hPa : ±0.45 hPa (Class B)\n\nLong-term Stability\n500 ... 1100 hPa ±0.1 hPa/year\n50 ... 1100 hPa ±0.1 hPa/year\n\nOperating Environment\nOperating temperature : -40 ... +60 °C\nOperating temperature with local display : 0 ... +60 °C'
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/152'
        },
        {
            id: 'ptb210',
            title: 'PTB210',
            subtitle: 'BAROCAP® DIGITAL BAROMETER',
            category: 'barometer',
            image: '/hstech/images/ PTB210.png',
            gallery: ['/hstech/images/ PTB210.png', '/hstech/images/PTB210_2.jpg'],
            desc: `VAISALA BAROCAP® Digital Barometer PTB210 is a reliable outdoor barometer for harsh conditions.`,
            specs: [
                {
                    model: 'PTB210',
                    application: '• Serial output for 500 … 1100 hPa\n• Serial output for 50 … 1100 hPa\n• Analog output with different scalings between 500 … 1100 hPa\n• Electronics housing IP65 (protected against sprayed water)\n• Accurate and stable measurement\n• NIST Traceable calibration (certificate included)\n• (option) Integrates directly with SPH10/20 ; This pairing offers accurate measurement in all wind conditions.',
                    typicalApplication: 'Barometric Pressure Measurement Range\n: 500 ... 1100 hPa / 50 ... 1100 hPa',
                    measurementRange: '',
                    spec: 'Barometric Pressure Accuracy\nTotal accuracy ( -40 … +60 °C )\n±0.25 hPa ( 500 … 1100 hPa, Class A )\n±0.30 hPa ( 500 … 1100 hPa, Class B )\n±0.50 hPa ( 50 … 1100 hPa )\n\nAnalog Output\nOutputs 0 … 5 VDC, 0 … 2.5 VDC (order specified)\n\nAll Models\nMax. pressure : 5000 hPa abs'
                },
                {
                    model: 'SPH10/20',
                    application: 'Static Pressure Head Series',
                    typicalApplication: '• Minimizes wind induced error\n• Reliable barometric pressure measurement in all weather\n• Wind tunnel tested structure',
                    measurementRange: '',
                    spec: 'Operating temperature\n: -60 … +80 °C\n\nSPH20 Inputs and Outputs\nElectrical connections: M12 connector\nPower supply :\nFactory setting 12 V / Changed connection: 24 V\nPower consumption during heating : 70 W\n\nThermostat Switching Temperature\n- On : +4 °C (±3 °C)\n- Off : +13 °C (±3 °C)'
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/153'
        },
        {
            id: 'ptb110',
            title: 'PTB110',
            subtitle: 'BAROCAP® BAROMETER',
            category: 'barometer',
            image: '/hstech/images/ PTB110.png',
            gallery: ['/hstech/images/ PTB110.png'],
            desc: `VAISALA BAROCAP® Barometer PTB110 is designed both for accurate barometric pressure measurements at room temperature and for general environmental pressure monitoring over a wide temperature range.`,
            specs: [
                {
                    model: 'PTB110',
                    application: '• Vaisala BAROCAP® sensor\n• Several pressure ranges\n• Accuracy ±0.3 hPa at +20 °C\n• Long-term stability\n• On/off control with external trigger\n• Output voltage 0 ... 2.5 or 0 ... 5 VDC\n• Current consumption less than 4 mA\n• Mountable on a (35 mm wide) DIN rail\n• Traceable calibration(certificate included)',
                    typicalApplication: 'Measurement Performance\nPressure range (1 hPa = 1 mbar)\n500 … 1 100 hPa\n600 … 1100 hPa\n800 … 1100 hPa\n800 … 1060 hPa\n600 … 1060 hPa\nResolution : 0.1 hPa',
                    measurementRange: '',
                    spec: 'Total Accuracy\n- at +15 … +25 °C : ±0.3 hPa\n- at 0 … +40 °C : ±0.6 hPa\n- Long-term stability : ±0.1 hPa / year\n\nOperating/Storage temperature\n: -40 … +60 °C'
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/154'
        },
        {
            id: 'pdt102',
            title: 'PDT102',
            subtitle: 'DIFFERENTIAL PRESSURE TRANSMITTER',
            category: 'differential',
            image: '/hstech/images/PDT102.png',
            gallery: ['/hstech/images/PDT102.png'],
            desc: `PDT102 offers ultra low pressure measurement for cleanroom control and monitoring applications.`,
            specs: [
                {
                    model: 'PDT102',
                    application: '• In-place system calibration and on-line monitoring without disturbing process tubes with optional process valve actuator and test jacks\n• Ultrathin profile ideally suited for DIN rail mount reduces installation and calibration costs\n• High accuracy, two options; 0.25 % or 0.50 % of span\n• Extremely robust MEMS silicon sensor technology provides very high accuracy, sensitivity, stability and durability\n• NIST traceable 9 point calibration with certificate\n• Front side accessible zero and span adjustment potentiometers\n• Application:\n- pharmaceutical, biotechnology, medical device\n- semiconductor controlled\n- manufacturing environments etc.',
                    typicalApplication: 'Measurement Performance\nMeasurement ranges(bidirectional)\n±50 Pa, ±0.25 in H2O\nAccuracy\n: 0.25 % span or 0.5 % span, depending on choice\nLong-term stability : ≤ 0.5 % span/year\nResponse time (10 ... 90 %) : 250 ms\nWarm-up time : 15 s\nPressure type : Differential, gauge, vacuum and compound',
                    measurementRange: '',
                    spec: 'Output Signal\n- 2-wire : 4 ... 20 mA\n- 3-wire : 0 ... 5 VDC\n\nOperating temperature\n: -29 … +70 °C'
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/155'
        },
        {
            id: 'pdt101',
            title: 'PDT101',
            subtitle: 'DIFFERENTIAL PRESSURE TRANSMITTER',
            category: 'differential',
            image: '/hstech/images/PDT101.png',
            gallery: ['/hstech/images/PDT101.png'],
            desc: `PDT101 offers precise measurement and control of very low pressures.`,
            specs: [
                {
                    model: 'PDT101',
                    application: '• DIN rail, panel or wall mountable\n• 2 pressure ranges (Pa and inH2O)\n• Accessible zero and span adjustment potentiometers\n• ¼" brass tubing connections\n• LED status indicator\n• Specially designed for critical and regulated environments\n• Euro style detachable connector\n• NIST traceable(certificate included)\n• Application:\n- life science\n- semiconductor\n- electronics industries, etc.',
                    typicalApplication: 'Measurement Performance\nMeasurement ranges(bidirectional)\n±60 Pa\n±0.25 in H2O\nAccuracy : 0.4% span\nLong-term stability : ≤ 0.5 % span/year\nResponse time (10 ... 90 %) : 250 ms\nWarm-up time : 15 s\nPressure type : Differential, gauge, vacuum and compound',
                    measurementRange: '',
                    spec: 'Output Signal\n- 2-wire : 4 ... 20 mA\n- 3-wire : 0 ... 5 VDC\n\nOperating temperature\n: -18 … +70 °C'
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/156'
        },
        {
            id: 'ptb330ts',
            title: 'PTB330TS',
            subtitle: 'BAROMETRIC PRESSURE TRANSFER STANDARD',
            category: 'transfer_standard',
            image: '/hstech/images/PTB330TS .png',
            gallery: ['/hstech/images/PTB330TS .png'],
            desc: `Barometric Pressure Transfer Standard PTB330TS combines a PTB330 digital barometer with a handheld MI70 indicator into a portable unit that can be used as a transfer standard.`,
            specs: [
                {
                    model: 'PTB330TS',
                    application: '▪ Portable, battery operated transfer standard with data logging capability\n▪ Barometric pressure with Vaisala BAROCAP® Digital Barometer PTB330\n– Excellent long term stability, Accurate measurements, Added reliability through redundancy\n▪ Optional humidity and temperature measurements with HMP155\n– Vaisala HUMICAP®180R sensor - superior long-term stability / New, fast temperature probe / Chemical purge\n▪ Multilingual user interface, nine languages\nData can be logged, and transferred to a PC via MI70 Link software\n▪ For professional meteorology, aviation, laboratories and demanding industrial applications',
                    typicalApplication: 'General\nOperating temperature -10 ... +40 °C\nOperating humidity Non-condensing\nMaximum pressure limit 5000 hPa abs.\nData logging capacity 2700 points\nOperation Time (Using Rechargeable Battery Pack)\nContinuous use with PTB330 11 h typical at +20 °C\nDatalogging use Up to 30 days',
                    measurementRange: '',
                    spec: 'Barometric Pressure (PTB330)\nMeasurement range 500 ... 1100 hPa\nTotal accuracy -40 ... +60 °C : ±0.15 hPa\nLong-term stability ±0.1 hPa/year\n\nRelative Humidity (HMP155)\nMeasurement range 0 ... 100 %RH\nAccuracy at +15 ... +25 °C : ±1 %RH (0 ... 90 %RH)\n±1.7 %RH (90 ... 100 %RH)\n\nTemperature (HMP155)\nMeasurement range -10 ... +40 °C\nAccuracy\n-10 ... +20 °C ±(0.176 - 0.0028 x temperature) °C\n+20 ... +40 °C ±(0.07 + 0.0025 x temperature) °C'
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/157'
        }
    ],
    weather: [
        {
            id: 'wxt530',
            title: 'Weather Transmitter WXT530 Series',
            subtitle: 'ALL-IN-ONE WEATHER SENSOR',
            category: '',
            image: '/hstech/images/Weather Transmitter WXT530 Series.png',
            gallery: ['/hstech/images/Weather Transmitter WXT530 Series.png'],
            desc: `The perfect mix of accurate air pressure, temperature, humidity, rainfall, wind speed, and wind direction data to measure weather conditions without the expense or magnitude of an automatic weather station.

Vaisala WXT530 Series is a unique series of all-in-one weather instruments that provides 6 of the most important weather parameters: barometric pressure, temperature, relative humidity, rainfall, wind speed and direction. With 6 models available, you can choose measurement parameter combinations to fit your application.

Key features include:

• Proven sensor technologies used by leading meteorological agencies.
• Ultrasonic WINDCAP® wind sensor has no moving parts and provides accurate wind speed and direction measurement.
• Acoustic RAINCAP® sensor operates without flooding, clogging, wetting, and evaporation losses and provide maintenance-free operation.
• Combined PTU module (barometric pressure BAROCAP®, temperature, and humidity HUMICAP® measurements) uses capacitive measurement for each parameter.
• Compliance with marine standard IEC60945 and DNV GL approved.
• Very low power consumption (typical 3.5mA at 12 VDC) is ideal for battery and solar panel powered system.
• Compact design, light-weight, single cabling for all measurements and secure one bolt mounting make installation and deployment easy and fast.

WXT536 replaces the WXT520 Weather Transmitter. WXT532 replaces WMT52 Ultrasonic Wind Sensor. For WXT520 and WMT52 customers, Vaisala also offers a modernization service.`,
            specs: [
                { label: 'Measurement range', value: 'Wind Speed: 0 ... 60 m/s\nWind Direction: 0 ... 360°\nBarometric Pressure: 600 ... 1100 hPa\nAir Temperature: -52 ... +60 °C\nRelative Humidity: 0 ... 100 %RH\nRain and Hail: Cumulative accumulation after the latest automatic or manual reset' },
                { label: 'Measurement accuracy', value: 'Wind Speed: ±3 % at 10 m/s\nWind Direction: ±3.0° at 10 m/s\nBarometric Pressure: ±0.5 hPa at 0 ...+30 °C, ±1 hPa at -52 ...+60 °C\nAir Temperature: ±0.3 °C at 20 °C (for sensor element)\nRelative Humidity: ±3 %RH at 0 ... 90 %RH, ±5 %RH, at 90 ... 100 %RH' },
                { label: 'Operating temperature', value: '-52 ...+60 °C (-62 ... 140°F)' },
                { label: 'Operating pressure', value: '600 … 1100 hPa' },
                { label: 'Operating voltage', value: '6 ... 24 VDC (-10 ... +30 %)' },
                { label: 'IP rating', value: 'Without mounting kit: IP65, With mounting kit: IP66' },
                { label: 'Analog outputs', value: 'Wind speed 0 … 20 mA or 4 … 20 mA\nWind direction 0 … 20 mA or 4 … 20 mA\nLoad impedance Max. 200 Ω\nFor more information on the full range of outputs available as part of our wider offering, see the datasheet.' },
                { label: 'Digital outputs', value: 'SDI-12, RS-232, RS-485, RS-422' }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/252'
        },
        {
            id: 'hmp155',
            title: 'HMP155 Series',
            subtitle: 'METEOROLOGICAL HUMIDITY AND TEMPERATURE PROBE',
            category: '',
            image: '/hstech/images/HMP155 Series.png',
            gallery: ['/hstech/images/HMP155 Series.png'],
            desc: `Vaisala's HUMICAP® HMP155 is a plug-and-play sensor that has excellent stability and withstands well even in harsh environments. The probe provides reliable humidity and temperature measurement and it is designed specifically for demanding outdoor applications.`,
            specs: [
                {
                    model: 'HMP155',
                    application: 'Meteorology, aviation and road weather, instrumentation',
                    typicalApplication: '▪ Weather-proof housing IP66\n▪ Various Output options; V, RS-485, resistive Pt100\n▪ Optional warmed humidity probe and chemical purge\n▪ Plug & Play\n▪ Using with DTR13 and DTR503 radiation shields and a Stevenson screen for long lifetime (optional)',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -80..+60°C',
                    spec: 'Accuracy\n▪ ± 1%RH (0…90%)\n▪ ±0.15°C at 20℃\n\nOutput\n▪ Voltage output: 0…1/5/10V\n▪ Resistive Pt100 4-wire connection\n▪ RS-485'
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/141'
        },
        {
            id: 'hms110',
            title: 'HMS110',
            subtitle: 'OUTDOOR HUMIDITY AND TEMPERATURE TRANSMITTER',
            category: '',
            image: '/hstech/images/ HMS110.png',
            gallery: ['/hstech/images/ HMS110.png'],
            desc: `Vaisala HUMICAP® Humidity and Temperature Transmitter Series HMS110 are ideal for cooling tower control and differential enthalpy control of economizers.`,
            specs: [
                {
                    model: 'HMS110',
                    application: 'Outdoor type (Integrated Radiation Shields)',
                    typicalApplication: '',
                    measurementRange: 'RH range: 0…100% RH\nTemperature range: -40..+60°C',
                    spec: 'Accuracy\n▪ ± 2%RH (0…90%)\n▪ ± 0.2ºC @ 20ºC PT1000\n\nIP65\n\nOutput\n2-wire current(4…20mA) or Modbus RTU output'
                },
                {
                    model: 'HMS112',
                    application: 'Outdoor type (Integrated Radiation Shields)',
                    typicalApplication: '',
                    measurementRange: '',
                    spec: 'Output\n2-wire current output(4…20mA)'
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/142'
        },
        {
            id: 'hms80',
            title: 'HMS80',
            subtitle: 'OUTDOOR HVAC HUMIDITY AND TEMPERATURE TRANSMITTER',
            category: '',
            image: '/hstech/images/HMS80.png',
            gallery: ['/hstech/images/HMS80.png'],
            desc: `The Humidity and Temperature Sensor Transmitter Series HMS80 are optimized for outdoor measurements HVAC.`,
            specs: [
                {
                    model: 'HMS82',
                    application: 'Outdoor type (Integrated Radiation Shields)',
                    typicalApplication: '▪ Measurement range:\n- RH range: 0…100%\n- Temperature range: -40…+60℃\n\n▪ Accuracy:\n- RH: ±3%RH(0…90%RH)\n- T: ± 0.3℃ @20℃\n\n▪ IP65\n\n▪ Calculated parameters\n- Td -40…+60℃\n- Enthalpy -40…460kJ/kg',
                    measurementRange: '',
                    spec: '2-wire current output(4…20mA)'
                },
                {
                    model: 'HMS82C',
                    application: 'Outdoor type + NPT ½" fitting',
                    typicalApplication: '',
                    measurementRange: '',
                    spec: '2-wire current output(4…20mA)'
                },
                {
                    model: 'HMS83',
                    application: 'Outdoor type (Integrated Radiation Shields)',
                    typicalApplication: '',
                    measurementRange: '',
                    spec: '3-wire voltage output(0…10V)'
                },
                {
                    model: 'HMS83C',
                    application: 'Outdoor type + NPT ½" fitting',
                    typicalApplication: '',
                    measurementRange: '',
                    spec: '3-wire voltage output(0…10V)'
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/143'
        },
        {
            id: 'hmt337',
            title: 'HMT337',
            subtitle: 'OUTDOOR HUMIDITY AND TEMPERATURE TRANSMITTER',
            category: '',
            image: '/hstech/images/HMT337.png',
            gallery: ['/hstech/images/HMT337.png', '/hstech/images/HMT337_2.jpg'],
            desc: `For weather observation and prediction of water vapour from precipitation`,
            specs: [
                {
                    model: 'HMT337',
                    application: 'Outdoor Installation',
                    typicalApplication: '▪ Humidity and temperature transmitter\n▪ Graphical Display\n▪ Warmed probe, for dew point temperature measurement under constant near-condensing conditions\n▪ Humidity measurement output with RH or Td\n▪ On-site calibration is possible with VAISALA HM70 model\n▪ IP rating\n- IP66\n- IP65 with local display',
                    measurementRange: '▪ Measurement range:\n- RH range: 0…100% RH\n- Temperature range: -70...+180°C (-94...+356°F)',
                    spec: '▪ Outputs\n- Current outputs: 0..20mA or 4…20mA\n- Voltage outputs: 0… 1V / 5V / 10V\n- Digital outputs: RS232, RS485(optional)'
                },
                {
                    model: 'HMT330MIK',
                    application: 'Installation Kit',
                    typicalApplication: '▪ Outdoor Humidity and Temperature Transmitter Installation Kit\n▪ Used with VAISALA HMT337 or PTU307\n▪ Effectively eliminates wind-induced pressure changes through the Vaisala SPH 10/20 Static Pressure Head (Optional)',
                    measurementRange: '',
                    spec: ''
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/144'
        },
        {
            id: 'ptu307',
            title: 'PTU307',
            subtitle: 'COMBINED BAROMETRIC PRESSURE, HUMIDITY AND TEMPERATURE TRANSMITTER',
            category: '',
            image: '/hstech/images/PTU307.png',
            gallery: ['/hstech/images/PTU307.png', '/hstech/images/PTU307_2.jpg'],
            desc: `This is a unique instrument measuring three parameters simultaneously: barometric pressure, humidity, and temperature. The instrument has four different humidity probe options for various measurement needs. Reliable HUMICAP® and BAROCAP® sensor technologies make it suitable for several applications such as engine testing booths, calibration laboratories, marine engine air intake monitoring and demanding meteorology applications.`,
            specs: [
                {
                    model: 'PTU307',
                    application: 'Outdoor Installation',
                    typicalApplication: '▪ Barometric pressure, humidity and temperature measurement in one transmitter\n▪ Graphical display and keypad for convenient operation',
                    measurementRange: '▪ Measurement range:\n- Barometric Pressure: 500 or 50…1100hPa\n- RH range: 0…100%\n- Temperature range: -40…+60℃',
                    spec: '▪ RS-232C serial interface with NMEA protocol for GPS use\n▪ Analog outputs, RS-232/485, LAN\n▪ Modbus protocol support (RTU/TCP)'
                },
                {
                    model: 'HMT330MIK',
                    application: 'Installation Kit',
                    typicalApplication: '▪ Outdoor Humidity and Temperature Transmitter Installation Kit\n▪ Used with VAISALA HMT337 or PTU307\n▪ Effectively eliminates wind-induced pressure changes through the Vaisala SPH 10/20 Static Pressure Head (Optional)',
                    measurementRange: '',
                    spec: ''
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/145'
        }
    ],
    h2o2: [
        {
            id: 'hpp271', title: 'HPP271 / HPP272', subtitle: 'H₂O₂ VAPOR PROBE', category: 'sensor',
            image: '/hstech/images/Model AXD Pressure Sensor.png',
            gallery: ['/hstech/images/Model AXD Pressure Sensor.png'],
            desc: 'Vaporized hydrogen peroxide (VHP/H2O2) measurement probe for bio-decontamination process monitoring. Enables real-time control of decontamination cycles in pharmaceutical and healthcare environments.',
            specs: [
                { label: 'Gas', value: 'H₂O₂ vapor (VHP)' },
                { label: 'H₂O₂ Range', value: 'HPP271: 0 ... 2000 ppm\nHPP272: 0 ... 1000 ppm' },
                { label: 'Accuracy', value: '± 10 % of reading (at steady state)' },
                { label: 'Response Time', value: 't90 < 30 s (HPP271)' },
                { label: 'Output', value: 'RS-485 Modbus (Indigo compatible)\n4...20 mA (HPP272)' },
                { label: 'Application', value: 'Pharmaceutical bio-decontamination\nIsolators, Cleanrooms, Hospital rooms' },
                { label: 'Protection', value: 'IP65 (probe head H₂O₂-resistant)' },
            ],
            datasheet: 'https://www.vaisala.com/sites/default/files/documents/HPP270-Datasheet-B211876EN.pdf'
        }
    ],

    // SETRA
    setra: [
        {
            id: 'setra_lite', title: 'Setra Lite™', subtitle: 'VISUAL DIFFERENTIAL PRESSURE INDICATOR', category: 'diff_ind',
            image: '/hstech/images/Setra Lite™  Visual Differential Pressure Indicator.png',
            gallery: [
                '/hstech/images/Setra Lite™  Visual Differential Pressure Indicator.png',
                '/hstech/images/Setra Lite™  Visual Differential Pressure Indicator 2.png',
                '/hstech/images/Setra Lite™  Visual Differential Pressure Indicator.png',
                '/hstech/images/Setra Lite™  Visual Differential Pressure Indicator.png',
                '/hstech/images/Setra Lite™  Visual Differential Pressure Indicator 2.png'
            ],
            desc: `The Setra Lite™ Room Pressure Indicator provides a simple, cost-effective, and accurate way to monitor and display room differential pressure in areas that today require manual verification.

Green means good to go and red indicates an alarm. Setra has created the simplest and easiest to use visual room pressure monitor in the market. Setra Lite™ is designed to easily fit in a single gang electric box, and also provides an optional visual display of the pressure, powered by Setra's legendary capacitive pressure sensor.

■ FEATURES
Setra Lite has many features found only in larger, more complex room pressure monitors. These include a bright light ring that can be seen at an angle or down a hallway, a digital display of the pressure value that is always-on or momentary, an alarm delay for door entry, and POS or NEG room mode. Setra Lite sensor has Setra's accuracy and reliability you know you can trust.

■ SIMPLE INSTALLATION
Setra Lite is about the size of a standard light switch, and just as a simple to install. It fits in a single-gang US electrical box, or international 86-box, and is powered by 24VAC or 24VDC. The reference side pressure pickup is integral with the Setra Lite faceplate. An analog output provides the building management system with the pressure signal for any additional trending or alarming needed.

■ WORKS WITH SETRA FLEX™
Setra Lite also integrates seamlessly with the Setra FLEX environmental monitor. Mount Setra Lite at additional doors that enter the space, and use an on-screen badge to display its value.`,
            specs: [
                { label: 'Visual Indication', value: 'Red/green light ring visible at an angle or down a hallway' },
                { label: 'Digital Display', value: 'Always-on or momentary pressure value display' },
                { label: 'Installation', value: 'Single-gang US electrical box or international 86-box' },
                { label: 'Power', value: '24VAC or 24VDC' },
                { label: 'Output', value: 'Analog output for BMS integration' },
                { label: 'Configuration', value: 'Easy 3-button setup (POS/NEG mode, alarm delay)' },
                { label: 'Application', value: 'Sterile processing, Sterile storage, USP 800 compliance, Laundry\nHospital room monitoring, Infectious control, Endoscopy, Bronchoscopy\nReplaces ball/tube through-wall pressure indicators' },
                { label: 'Integration', value: 'Works with Setra FLEX for multi-door rooms' },
            ]
        },
        {
            id: 'setra_flex', title: 'Setra Flex', subtitle: 'TOUCHSCREEN ROOM PRESSURE MONITOR', category: 'diff_ind',
            image: '/hstech/images/Setra Lite™  Visual Differential Pressure Indicator.png',
            gallery: ['/hstech/images/Setra Lite™  Visual Differential Pressure Indicator.png'],
            desc: 'Advanced touchscreen room pressure monitor with numeric display and configurable alarms. Provides visual and audible alerts when room pressure goes out of range.',
            specs: [
                { label: 'Display', value: '4.3" color touchscreen' },
                { label: 'Pressure Range', value: '0 ... ±1.25" WC (±311 Pa)' },
                { label: 'Accuracy', value: '±1% FS' },
                { label: 'Alarms', value: 'Visual (LED) + Audible + Relay output' },
                { label: 'Output', value: '4...20 mA, 0...10 V' },
                { label: 'Application', value: 'Isolation rooms, Cleanrooms\nPharmaceutical, Healthcare' },
            ]
        },
        {
            id: 'model_mrc', title: 'Model MRC', subtitle: 'MULTI-RANGE CRITICAL PRESSURE TRANSDUCER', category: 'diff_sen',
            image: '/hstech/images/Model MRC.png',
            gallery: ['/hstech/images/Model MRC.png', '/hstech/images/Model MRC.png', '/hstech/images/Model MRC.png', '/hstech/images/Model MRC.png', '/hstech/images/Model MRC.png'],
            desc: `Setra's Model MRC multi-range low differential pressure transducer uses a dead-ended capacitive sensing element that requires minimal amplification and delivers excellent accuracy and long term stability. The MRC is the industries first multi-range sensor designed for critical environments. It is the only multi-range sensor available with ±0.5% FS accuracy and field selectable ranges down to 0.1" W.C., a requirement for critical applications. The MRC has 4 selectable ranges and 3 selectable outputs, easily adjustable on the job with a flip of a switch or jumper. The MRC is offered with 3 different housing configurations: Duct Probe, DINrail Mount or wall mount as well as a universal design that incorporates all 3 configurations in one to address any installation changes on the job site.

■ THE FIRST 0.5% ACCURACY MULTI-RANGE EVER
The Setra MRC is the first multi-range transducer designed for use in Critical Environments. No other multi-range transducer product offers better than 1% FS accuracy; a requirement in most critical applications. The Setra MRC is available down to 0.1"W.C. with 0.5% FS accuracy.

■ FIELD SELECTABLE UNIVERSAL DESIGN
The MRC has 4 selectable ranges and 3 selectable outputs, giving the flexibility to make changes on the job site. The MRC is field configurable for range, mounting (DINrail, wall mount and duct mount), output (mA or voltage) and engineering units (W.C. or Pascals). This flexibility means that the contractor can use the MRC for all of their critical needs.

■ ROBUST ENCLOSURE FOR HARSH ENVIRONMENTS
The MRC housing is a robust IP67 rated design and is sealed with a gasket to make it wash down capable for difficult applications. The MRC also has a conduit fitting that make installation and wiring easier.

■ THE SETRA SENSOR
The core technology of the MRC is the all stainless steel capacitive sensing element. Setra designs and manufactures all of their sensing elements resulting in full control over the process and quality of every single sensor. The welded dead-ended capacitive sensors requires minimal amplification and delivers excellent accuracy and longterm stability. Setra's technology has been used in over 8 million installations and has the highest field acceptance rate in the industry.`,
            specs: [
                { label: 'Accuracy (RSS at constant temp)', value: '±0.5% FS' },
                { label: 'Compensated Range', value: '32 to 122°F (0 to 50°C)' },
                { label: 'Thermal Effects', value: '0.03% FS/°F (0.054% FS/°C)' },
                { label: 'Maximum Line Pressure', value: '10 PSI' },
                { label: 'Overpressure', value: '1 PSI' },
                { label: 'Long Term Stability', value: '1.0% FS/YR (max)' },
                { label: 'Zero Offset', value: '0.5% FS/G (calibrated at 0g vertical position)' },
                { label: 'Operating Temperature', value: '32 to 122°F (0 to 50°C)' },
                { label: 'Excitation Range', value: '13 to 30 VDC / 18 to 24 VAC (Voltage Output)\n13 to 30 VDC (4-20mA output)' },
                { label: 'Current Consumption', value: '30mA (max)' },
                { label: 'Mis-Wiring', value: 'Reverse Excitation Protection' },
                { label: 'Field Selectable Output', value: '0 to 5V, 0 to 10V (3-wire), 4 to 20mA (2-wire)' },
                { label: 'Output Resistance (Voltage)', value: '10 Ohms (max)' },
                { label: 'Load Resistance (Voltage)', value: '10 K-Ohms (min)' },
                { label: 'Loop Resistance (4-20mA)', value: '0 to 800 Ohms' },
                { label: 'Approval', value: 'CE & RoHS Compliant' },
                { label: 'Case', value: 'Fire-Retardant Polycarbonate (UL 94 V-0 Approved), Hinged Lid' },
                { label: 'Mounting', value: 'Two Screw Holes Vertical Position' },
                { label: 'Electrical Connection Block', value: 'Removable Screw Terminal' },
                { label: 'Pressure Fitting', value: '3/16" O.D. Barbed Brass' },
                { label: 'Zero & Span', value: 'Push Button' },
                { label: 'Weight', value: '8 Ounces (approx.)' },
                { label: 'Pressure Media', value: 'Typically air or similar non-conducting gases' },
            ]
        },
        {
            id: 'model_mrg', title: 'Model MRG', subtitle: 'MULTI-RANGE GENERAL PRESSURE TRANSDUCER', category: 'diff_sen',
            image: '/hstech/images/Model MRC.png',
            gallery: ['/hstech/images/Model MRC.png', '/hstech/images/Model MRC.png'],
            desc: `The Setra Model MRG is Setra's newest differential pressure transducer. The Setra MRG is the ideal product for any contractor, combining the flexibility of a multi-range with the performance of a single range transducer. The MRG has 8 selectable ranges and 3 selectable outputs, easily adjustable on the job with a flip of a switch or jumper. The MRG uses an IP67 rated housing and has a conduit fitting for easy wiring, making the MRG an ideal solution for any general HVAC application.

■ UNIVERSAL DESIGN
The Setra MRG utilizes a universal design that gives the user total flexibility to make changes on the job site. The user has the option to choose the field configurable range, mounting (DIN Rail, wall mount and duct mount), output (mA or Volt) and engineering unit (W.C. or Pascals). This flexibility means that the contractor can use the MRG for all of their needs.

■ 8 FIELD SELECTABLE RANGES
The Setra MRG provides 8 field selectable ranges (0.5, 1.0, 2.5 and 5.0"W.C.). These ranges can be selected on site by flipping to the desired range.

■ IP67 RATED HOUSING
The MRG housing is a robust IP67 rated design and is sealed with a gasket to make it wash-down capable for difficult applications. The MRG also has a conduit fitting that make installation and wiring easier.

■ CAPACITIVE SENSING TECHNOLOGY
Only Setra can claim ownership to the stainless steel capacitive design used in all of our HVAC/R sensors. Our advanced capacitive element provides excellent stability and linearity, while standing above the competitors in our ability to measure low pressure (<.0001 in. W.C) at high accuracy (0.25%). Our technology has been used in over 8 million installations and has the highest field acceptance rate in the industry.`,
            specs: [
                { label: 'Accuracy (RSS at constant temp)', value: '±1.0% FS' },
                { label: 'Compensated Range', value: '32 to 122°F (0 to 50°C)' },
                { label: 'Thermal Effects', value: '0.03% FS/°F (0.054% FS/°C)' },
                { label: 'Maximum Line Pressure', value: '10 PSI' },
                { label: 'Overpressure', value: 'Up to 10 PSI (range dependent)' },
                { label: 'Long Term Stability', value: '2.0% FS/YR (max)' },
                { label: 'Zero Offset', value: '0.5% FS/G (calibrated at 0g vertical position)' },
                { label: 'Operating Temperature', value: '32 to 122°F (0 to 50°C)' },
                { label: 'Excitation Range', value: '13 to 30 VDC / 18 to 24 VAC (Voltage Output)\n13 to 30 VDC (4-20mA output)' },
                { label: 'Current Consumption', value: '30mA (max)' },
                { label: 'Mis-Wiring', value: 'Reverse Excitation Protection' },
                { label: 'Field Selectable Output', value: '0 to 5V, 0 to 10V (3-wire), 4 to 20mA (2-wire)' },
                { label: 'Output Resistance (Voltage)', value: '10 Ohms (max)' },
                { label: 'Load Resistance (Voltage)', value: '10 K-Ohms (min)' },
                { label: 'Loop Resistance (4-20mA)', value: '0 to 800 Ohms' },
                { label: 'Approval', value: 'CE & RoHS Compliant' },
                { label: 'Case', value: 'Fire-Retardant Polycarbonate (UL 94 V-0 Approved), Hinged Lid' },
                { label: 'Mounting', value: 'Two Screw Holes Vertical Position' },
                { label: 'Electrical Connection Block', value: 'Removable Screw Terminal' },
                { label: 'Pressure Fitting', value: '3/16" O.D. Barbed Brass' },
                { label: 'Zero & Span', value: 'Push Button' },
                { label: 'Weight', value: '8 Ounces (approx.)' },
                { label: 'Pressure Media', value: 'Typically air or similar non-conducting gases' },
            ]
        },
        {
            id: 'model_264', title: 'Model 264', subtitle: 'LOW DIFFERENTIAL PRESSURE TRANSDUCER', category: 'diff_sen',
            image: '/hstech/images/264.jpg',
            gallery: ['/hstech/images/Model MRC.png', '/hstech/images/Model MRC.png'],
            desc: 'Low differential pressure transducer with exceptional stability. Used for HVAC pressure measurement in VAV boxes, fan pressure control, and filter monitoring.',
            specs: [
                { label: 'Pressure Ranges', value: '0...±0.25" WC to 0...±10" WC' },
                { label: 'Accuracy', value: '±1% FS (±0.5% optional)' },
                { label: 'Output', value: '4...20 mA, 0...5 V, 0...10 V' },
                { label: 'Input Power', value: '24 VDC / VAC' },
                { label: 'Application', value: 'HVAC VAV boxes, Fan pressure\nFilter monitoring, Cleanrooms' },
            ]
        },
        {
            id: 'pdt101', title: 'PDT101', subtitle: 'OEM DIFFERENTIAL PRESSURE SENSOR', category: 'diff_sen',
            image: '/hstech/images/Model MRC.png',
            gallery: ['/hstech/images/Model MRC.png'],
            desc: 'Compact OEM differential pressure sensor for filter condition monitoring and HVAC OEM applications.',
            specs: [
                { label: 'Type', value: 'OEM sensor (PCB mount)' },
                { label: 'Pressure Range', value: '0...0.5" WC to 0...10" WC' },
                { label: 'Output', value: '0.5...4.5 V (ratiometric)' },
                { label: 'Supply', value: '5 VDC' },
                { label: 'Application', value: 'Filter condition monitoring\nOEM HVAC equipment' },
            ]
        },
        {
            id: 'pdt102', title: 'PDT102', subtitle: 'DIFFERENTIAL PRESSURE TRANSMITTER', category: 'diff_sen',
            image: '/hstech/images/Model MRC.png', gallery: [],
            desc: 'High-accuracy differential pressure transmitter for HVAC and cleanroom filter condition monitoring with industry-standard 4-20 mA output.',
            specs: [
                { label: 'Pressure Range', value: '0...0.1" to 0...10" WC' },
                { label: 'Accuracy', value: '±1% FS' },
                { label: 'Output', value: '4...20 mA, 0...10 V' },
                { label: 'Input Power', value: '24 VDC' },
                { label: 'Application', value: 'HVAC, Cleanrooms\nFilter monitoring' },
                { label: 'Protection', value: 'IP65' },
            ]
        },
        {
            id: 'model_axd', title: 'Model AXD', subtitle: 'VERSATILE INDUSTRIAL PRESSURE TRANSDUCER', category: 'industrial',
            image: '/hstech/images/Model AXD Pressure Sensor.png',
            gallery: ['/hstech/images/Model AXD Pressure Sensor.png'],
            desc: `The Accusense™ Model AXD industrial pressure sensor is designed for Industrial and OEM customers who require high performance, reliability and versatility at an affordable price. It offers exceptional ±0.25% FS accuracy for pressure ranges as low as 1 PSI up to 10,000 PSI to meet a multitude of demanding applications. The Model AXD features all stainless steel wetted materials 17-4PHSS when ordered as "AXD1" or 316LSS when ordered as "AXDH".

■ AXD PRESSURE TRANSDUCER FEATURES
• High accuracy sensor
• IP67 rated design
• Non-oil filled design
• Long-term stability: less than 0.5%/year
• Exceptional EMI/RFI
• Rugged design withstands high shock & vibration
• NIST traceable calibration
• Wide operating voltage: 9 VDC to 30 VDC
• Multiple electrical termination and pressure fitting options
• Reverse wire protection
• CE & RoHS compliant`,
            specs: [
                { label: 'Accuracy (RSS)', value: '±0.25% FS (Non-Linearity BFSL, Non-Repeatability, Hysteresis at 70°F)' },
                { label: 'Response Time', value: '5 millisecond' },
                { label: 'Long Term Stability', value: '±0.5% FS/yr' },
                { label: 'Compensated Range (AXD1)', value: '-4 to +176°F (-20 to +80°C)' },
                { label: 'Compensated Range (AXDH)', value: '-4 to +176°F (-20 to +80°C)' },
                { label: 'Zero Shift (code "F")', value: 'AXD1: ±2% FS/100°F (±1.8% FS/50°C)\nAXDH: ±3%/100°F (±2.7% FS/50°C)' },
                { label: 'Zero Shift (code "Z")', value: 'AXD1: ±0.5% FS/100°F (±0.45%/50°C)\nAXDH: ±0.75%/100°F (±0.67% FS/50°C)' },
                { label: 'Span Shift (Range >50 PSI)', value: 'AXD1: ±1% FS/100°F (±1.4% FS/50°C)\nAXDH: ±2% FS/100°F (±1.8% FS/50°C)' },
                { label: 'Span Shift (Range ≤50 PSI)', value: 'AXD1: ±1.5% FS/100°F (±2% FS/50°C)\nAXDH: ±2% FS/100°F (±1.8% FS/50°C)' },
                { label: 'Operating Temperature', value: '-40 to +257°F (-40 to +125°C)' },
                { label: 'Storage Temperature', value: '-40 to +257°F (-40 to +125°C)' },
                { label: 'Acceleration', value: '10g Maximum (Shift in output <0.05 psi/g typical; pressure port axis only)' },
                { label: 'Shock', value: '200g Operating (Mil-Std. 202, Method 213B, Cond. C)' },
                { label: 'Vibration', value: '20g 50-2000 Hz (Mil-Std. 202, Method 204, Cond. C)' },
                { label: 'Excitation (Voltage)', value: 'Code "24": 9 to 30 VDC\nCode "45": 4.8-8.1 VDC (5VDC)\nCode "2E": 13.5-30 VDC\nReverse excitation protected' },
                { label: 'Power Consumption', value: '<0.15 watts (approx. 5mA @24VDC)' },
                { label: 'Output (Voltage)', value: 'See ordering information (calibrated into 50K ohm load, operable into 5000 ohm load or greater)\nZero output: ±25mV, Span (FS) output: ±50mV' },
                { label: 'Output Impedance', value: '100 ohms' },
                { label: 'Circuit (Voltage)', value: '3-wire (Exc, Out, Com)' },
                { label: 'Circuit (Current)', value: '2-Wire' },
                { label: 'Output (Current)', value: '4 to 20 mA (calibrated at factory with 24VDC loop supply, 250ohm load)\nZero output: ±0.08mA, Span (FS) output: ±0.16mA' },
                { label: 'External Load (Current)', value: '0 to 800 ohms' },
                { label: 'Min. Supply Voltage (VDC)', value: '9 + 0.02 x (Resistance of receiver plus line)' },
                { label: 'Max. Supply Voltage (VDC)', value: '30 + 0.004 x (Resistance of receiver plus line)' },
                { label: 'Environmental Rating', value: 'P1 (gauge): IP66/NEMA4X\nP1 (sealed), "xx" cable, M4, A1: IP67/NEMA6' },
                { label: 'Case Material', value: '304 stainless steel' },
                { label: 'Wetted Materials', value: 'AXD1: 17-4PHSS, 17-7PHSS\nAXDH: 316L stainless steel' },
                { label: 'Weight', value: '5 oz (approx.)' },
                { label: 'Pressure Media', value: 'Gases or liquids compatible with 17-4 PH or 316L stainless steel\n(Hydrogen not recommended for 17-4 PH, use 316L SS version)' },
                { label: 'Certifications', value: 'CE, EMC Directive (2014/30/EU), EN/IEC 61326-1, EN/IEC 61326-2-3:2012 Industrial' },
            ]
        },
        {
            id: 'model_206', title: 'Model 206', subtitle: 'RUGGED STAINLESS STEEL TRANSDUCER', category: 'industrial',
            image: '/hstech/images/206.jpg',
            gallery: ['/hstech/images/206.jpg'],
            desc: 'Rugged stainless steel pressure transducer for harsh industrial environments. Fully welded, hermetic construction for maximum reliability.',
            specs: [
                { label: 'Pressure Ranges', value: '0...15 to 0...3000 PSI (gauge/absolute)' },
                { label: 'Accuracy', value: '±0.25% FS' },
                { label: 'Output', value: '4...20 mA, 0...5 V, 1...5 V' },
                { label: 'Material', value: '316 stainless steel (all wetted parts)' },
                { label: 'Application', value: 'Chemical, Petrochemical\nHarsh environments, Corrosive media' },
                { label: 'Protection', value: 'IP67' },
            ]
        },
        {
            id: 'model_209', title: 'Model 209', subtitle: 'COMPACT OEM PRESSURE SENSOR', category: 'industrial',
            image: '/hstech/images/209.png',
            gallery: ['/hstech/images/209.png'],
            desc: 'Compact, cost-effective OEM pressure sensor for industrial equipment integration.',
            specs: [
                { label: 'Type', value: 'OEM compact sensor' },
                { label: 'Pressure Range', value: '0...15 to 0...300 PSI' },
                { label: 'Accuracy', value: '±0.25% FS' },
                { label: 'Output', value: '4...20 mA, 0...5 V' },
                { label: 'Application', value: 'OEM equipment integration\nIndustrial machines' },
            ]
        },
    ],

    // JUMO
    jumo: [
        {
            id: 'plastosens_pt0', title: 'PlastoSENS PT0', subtitle: 'SURFACE TEMPERATURE SENSOR', category: 'temperature',
            image: '/hstech/images/201.jpg',
            gallery: ['/hstech/images/201.jpg'],
            desc: 'PlastoSENS PT0 — Flush-mount surface temperature sensor for plastics processing. Designed for injection molding machines, extruders, and hot runner systems. Provides direct melt temperature measurement for process optimization.',
            specs: [
                { label: 'Type', value: 'Thermocouple Type J / Type K (application-specific)' },
                { label: 'Measuring range', value: '0 ... +400 °C (Type J)' },
                { label: 'Response time', value: 't₀.₉ < 0.5 s' },
                { label: 'Mounting', value: 'Flush-mount (screw-in, nozzle-tip)' },
                { label: 'Protection', value: 'Stainless steel, food-grade versions available' },
                { label: 'Application', value: 'Injection molding, Extrusion\nHot runner systems, Plastics processing' },
            ]
        },
        {
            id: 'plastosens_pt2', title: 'PlastoSENS PT2', subtitle: 'MELT TEMPERATURE SENSOR', category: 'temperature',
            image: '/hstech/images/201.jpg',
            gallery: ['/hstech/images/201.jpg'],
            desc: 'PlastoSENS PT2 — High-pressure melt temperature sensor for continuous melt temperature measurement in high-temperature plastics processes. Spring-loaded tip ensures permanent contact with melt for reliable readings.',
            specs: [
                { label: 'Type', value: 'Thermocouple Type J / Type K' },
                { label: 'Temperature range', value: '0 ... +450 °C' },
                { label: 'Pressure rating', value: 'Up to 2,000 bar (melt pressure compatible)' },
                { label: 'Tip design', value: 'Spring-loaded (permanent contact)' },
                { label: 'Connection', value: 'Miniature thermocouple connector' },
                { label: 'Application', value: 'Extrusion lines, Compounding\nHigh-pressure melt processes' },
            ]
        },
        {
            id: 'dtrans_ph02', title: 'dTRANS pH 02', subtitle: 'PROCESS pH TRANSMITTER', category: 'ph_transmitter',
            image: '/hstech/images/201.jpg',
            gallery: ['/hstech/images/201.jpg'],
            desc: 'Industrial field-mount pH transmitter with IP65 protection. HART communication for smart instrumentation integration. Supports JUMO and third-party electrodes.',
            specs: [
                { label: 'Measurement', value: 'pH 0 ... 14 / ORP / Temperature' },
                { label: 'Accuracy', value: '±0.01 pH' },
                { label: 'Output', value: '4...20 mA (HART 5.x/6.x), 2× relay' },
                { label: 'Mounting', value: 'Field mount (wall/pipe)' },
                { label: 'Protection', value: 'IP65 / IP67 (optional)' },
                { label: 'Communication', value: 'HART 5.x / 6.x' },
                { label: 'Application', value: 'Industrial processes\nWaste water, Chemical' },
            ]
        },
        {
            id: 'tecline_hd_201021',
            title: 'JUMO tecLine HD',
            subtitle: 'pH COMBINATION ELECTRODES (201021)',
            category: 'ph_electrode',
            image: '/hstech/images/JUMO tecLine HD pH Combination Electrodes (201021).jpg',
            gallery: ['/hstech/images/JUMO tecLine HD pH Combination Electrodes (201021).jpg'],
            desc: 'Especially robust industry electrodes for the most demanding applications. Designed for processes with increased pollutant and toxic loads as well as media containing oil.',
            specs: [
                { label: 'Application', value: 'Demanding industrial processes' },
                { label: 'Pressure', value: 'Up to 13 bar' },
                { label: 'Temperature Range', value: 'Up to 135 °C' },
                { label: 'Diaphragm', value: 'Extensive PTFE ring diaphragm' },
                { label: 'Features', value: 'Temperature probe integration available\nWith quality certificate' }
            ]
        },
        {
            id: 'tecline_201020',
            title: 'JUMO tecLine',
            subtitle: 'pH SINGLE-ROD ELECTRODES (201020)',
            category: 'ph_electrode',
            image: '/hstech/images/JUMO tecLine pH single-rod electrodes (201020) .jpg',
            gallery: ['/hstech/images/JUMO tecLine pH single-rod electrodes (201020) .jpg'],
            desc: 'High-quality industrial electrodes for process and industrial applications. Suitable for measurements in suspensions, paints/lacquers, low ion fluids, and high-alkaline environments.',
            specs: [
                { label: 'Type', value: 'Single-rod electrode' },
                { label: 'Pressure', value: 'Up to 10 bar' },
                { label: 'Options', value: 'Additional temperature probe\nDifferent fitting lengths' },
                { label: 'Applications', value: 'Water/wastewater, Suspensions, Paints\nLow ion fluids, High-temperature processes\nFluoride containing fluids' }
            ]
        },
        {
            id: 'tecline_cr_gt_202925',
            title: 'JUMO tecLine CR-GT',
            subtitle: 'CONDUCTIVE TWO-ELECTRODES CONDUCTIVITY SENSOR (202925)',
            category: 'ph_electrode',
            image: '/hstech/images/ JUMO tecLine CR-GT, Conductive Two-Electrodes Conductivity Sensor (202925).jpg',
            gallery: ['/hstech/images/ JUMO tecLine CR-GT, Conductive Two-Electrodes Conductivity Sensor (202925).jpg'],
            desc: 'Two-electrode conductivity sensor with special graphite electrodes. Ideal for medium separation, drinking water treatment, and wastewater control.',
            specs: [
                { label: 'Principle', value: 'Two-electrode' },
                { label: 'Electrode Material', value: 'Special graphite' },
                { label: 'Cell Constant', value: 'K = 1.0' },
                { label: 'Applications', value: 'Medium separation\nDrinking water treatment\nWastewater control/treatment\nConcentrate monitoring\nIndustrial water treatment' }
            ]
        },
        {
            id: 'ecotrans_202723',
            title: 'JUMO ecoTRANS pH 03',
            subtitle: 'TRANSMITTER / SWITCHING DEVICE (202723)',
            category: 'ph_transmitter',
            image: '/hstech/images/JUMO ecoTRANS pH 03 transmitter : switching device for pH : Redox voltage and temperature (202723).jpg',
            gallery: ['/hstech/images/JUMO ecoTRANS pH 03 transmitter : switching device for pH : Redox voltage and temperature (202723).jpg'],
            desc: 'Versatile pH/Redox transmitter with simple probe connection and guided calibration. Features 3-way isolation and DIN rail mounting for easy installation.',
            specs: [
                { label: 'Measurement', value: 'pH / mV / ORP (Redox voltage)' },
                { label: 'Connection', value: 'Screw terminals\nAsymmetric and symmetric' },
                { label: 'Outputs', value: '2x analog outputs 0(4)...20 mA / 0(2)...10 V\n1x relay changeover contact' },
                { label: 'Isolation', value: '3-way isolation (input/output/power)' },
                { label: 'Mounting', value: 'DIN rail' },
                { label: 'Features', value: 'Temperature monitoring\nCalibration timer\nWith calibration certificate' },
                { label: 'Applications', value: 'Water/wastewater management\nDrinking water treatment\nProcess technology\nSwimming pool technology\nFish-keeping' }
            ]
        },
        {
            id: 'dtrans_202551',
            title: 'JUMO dTRANS pH 02 Compact',
            subtitle: 'MULTICHANNEL TRANSMITTER/CONTROLLER (202551)',
            category: 'ph_transmitter',
            image: '/hstech/images/JUMO dTRANS pH 02 Compact multichannel transmitter:controller for pH, redox, ammonia, standard signals, and temperature (202551).jpg',
            gallery: ['/hstech/images/JUMO dTRANS pH 02 Compact multichannel transmitter:controller for pH, redox, ammonia, standard signals, and temperature (202551).jpg'],
            desc: 'Advanced multichannel transmitter/controller with large number display, bar graph, or trend display visualization. Includes integrated washing timer and calibration logbook.',
            specs: [
                { label: 'Measurement', value: 'pH, Redox, Ammonia, Temperature\nStandard signals' },
                { label: 'Display', value: 'Large numbers / Bar graph / Trend display' },
                { label: 'Calibration', value: '1, 2, and 3 points\nCalibration logbook' },
                { label: 'Features', value: 'Math and logic module\nIntegrated washing timer\n12 user languages\nElectrode monitoring' },
                { label: 'Options', value: 'RS422/RS485 interface\nPROFIBUS-DP interface\nData logger with real-time clock\nRetrofittable option boards' },
                { label: 'Applications', value: 'Neutralization\nDetoxification (parameter set selection)\nRedundant pH measurement\npH + flow rate measurement\npH + free chlorine measurement' }
            ]
        },
        {
            id: 'aquis_500_ph_202560',
            title: 'JUMO AQUIS 500 pH',
            subtitle: 'TRANSMITTER/CONTROLLER (202560)',
            category: 'ph_transmitter',
            image: '/hstech/images/JUMO AQUIS 500 pH Transmitter:Controller for pH value, Redox Voltage, NH3 (ammonia) Concentration and Temperature (202560)  .jpg',
            gallery: ['/hstech/images/JUMO AQUIS 500 pH Transmitter:Controller for pH value, Redox Voltage, NH3 (ammonia) Concentration and Temperature (202560)  .jpg'],
            desc: 'Comprehensive pH/Redox transmitter with automatic temperature compensation and selectable display visualization. Supports asymmetrical and symmetrical pH sensor connections.',
            specs: [
                { label: 'Measurement', value: 'pH, Redox voltage, NH₃ (ammonia), Temperature' },
                { label: 'Compensation', value: 'Automatic temperature compensation' },
                { label: 'Display', value: 'Large digits / Bar graph / Trend display' },
                { label: 'Calibration', value: '1/2/3-point calibration\nCalibration logbook' },
                { label: 'Connection', value: 'Solderless technology\nAsymmetrical and symmetrical pH sensors\npH-ISFET sensor support' },
                { label: 'Features', value: 'Activatable impedance measurement\nMulti-language support\nSetup program for programming' },
                { label: 'Applications', value: 'Drinking water monitoring\nGalvanic\nProcess technology\nWater/wastewater\nGreenhouse technology\nSwimming pool\nFishkeeping (seawater compatible)' }
            ]
        },
        {
            id: 'cti_500_202755',
            title: 'JUMO CTI-500',
            subtitle: 'INDUCTIVE CONDUCTIVITY/CONCENTRATION TRANSMITTER (202755)',
            category: 'conductivity',
            image: '/hstech/images/JUMO CTI-500  Inductive Conductivity:Concentration and Temperature Transmitter with Switching Contacts (202755).jpg',
            gallery: ['/hstech/images/JUMO CTI-500  Inductive Conductivity:Concentration and Temperature Transmitter with Switching Contacts (202755).jpg'],
            desc: 'Inductive conductivity transmitter with up to four measuring ranges and temperature coefficients. Features fast-response temperature sensor and desalination control.',
            specs: [
                { label: 'Type', value: 'Inductive conductivity/concentration' },
                { label: 'Measuring Ranges', value: 'Up to 4 ranges' },
                { label: 'Temperature Coefficients', value: 'Up to 4 coefficients' },
                { label: 'Temperature Sensor', value: 'Fast-response' },
                { label: 'Compensation', value: 'Linear temperature compensation\nNatural water\nOwn characteristic line (learn function)' },
                { label: 'Operation', value: 'Keypad/LCD display or setup program' },
                { label: 'Languages', value: 'EN, DE, FR, NL, ES, PL, SV, IT, PT' },
                { label: 'Features', value: 'Desalination control\nPlant documentation' }
            ]
        },
        {
            id: 'aquis_500_cr_202565',
            title: 'JUMO AQUIS 500 CR',
            subtitle: 'TRANSMITTER / CONTROLLER (202565)',
            category: 'conductivity',
            image: '/hstech/images/JUMO AQUIS 500 CR  transmitter : controller for conductivity, TDS, resistivity and temperature (202565)  .jpg',
            gallery: ['/hstech/images/JUMO AQUIS 500 CR  transmitter : controller for conductivity, TDS, resistivity and temperature (202565)  .jpg'],
            desc: 'Versatile conductivity transmitter with direct changeover between conductivity, resistivity, TDS, and customer-specific table measurements. Features pollution detection and auto-range operation.',
            specs: [
                { label: 'Measurement', value: 'Conductivity (μS/cm, mS/cm)\nResistivity (kΩ·cm, MΩ·cm)\nTDS (ppm, mg/l)\nCustomer-specific table' },
                { label: 'Compensation', value: 'Automatic temperature compensation' },
                { label: 'Display', value: 'Large LC graphics with backlight\nLarge numbers / Bar graph / Trend display' },
                { label: 'Calibration', value: 'Cell constant and temperature coefficient\nCalibration logbook' },
                { label: 'Cell Support', value: 'Two-electrode cells (standard)\nFour-electrode cells' },
                { label: 'Features', value: 'Pollution detection\nAuto-range operation' },
                { label: 'Protection', value: 'IP67 (surface mount)\nIP65 (panel mount)' },
                { label: 'Languages', value: 'DE, EN, FR + additional via setup program' }
            ]
        },
        {
            id: 'cti_750_202756',
            title: 'JUMO CTI-750',
            subtitle: 'INDUCTIVE CONDUCTIVITY/CONCENTRATION TRANSMITTER (202756)',
            category: 'conductivity',
            image: '/hstech/images/JUMO CTI-750   Inductive Conductivity:Concentration and Temperature Transmitter with Switching Contacts (202756)  .jpg',
            gallery: ['/hstech/images/JUMO CTI-750   Inductive Conductivity:Concentration and Temperature Transmitter with Switching Contacts (202756)  .jpg'],
            desc: 'Advanced inductive conductivity transmitter with concentration measurement capability. Features learning function for temperature coefficient and individual concentration characteristic.',
            specs: [
                { label: 'Type', value: 'Inductive conductivity/concentration' },
                { label: 'Measuring Ranges', value: 'Up to 4 ranges' },
                { label: 'Temperature Coefficients', value: 'Up to 4 coefficients' },
                { label: 'Concentration', value: 'Yes (with individual characteristic)' },
                { label: 'Temperature Sensor', value: 'Fast-response' },
                { label: 'Operation', value: 'Keypad/LCD display or setup program' },
                { label: 'Features', value: 'Learning function for temperature coefficient\nDesalination control\nPlant documentation' },
                { label: 'Applications', value: 'Product separation (food/beverage)\nBottle cleaning plants\nConcentration measurement\nCIP plants\nWater/wastewater technology\nChemical dispensing' }
            ]
        },
    ],

    // CMS (Data Logger / Continuous Monitoring System)
    cms: [
        {
            id: 'dl2000',
            title: 'DL2000',
            subtitle: 'RELATIVE HUMIDITY AND TEMPERATURE LOGGER',
            image: '/hstech/images/DL2000.png',
            gallery: ['/hstech/images/DL2000.png'],
            desc: `VAISALA's 2000 series of data loggers are designed to provide high accuracy measurements for temperature, relative humidity and an analog sensor of your choice.`,
            specs: [
                {
                    category: 'DL2000\n\nRH+T Logger',
                    model: 'DL2000-20R',
                    measuringQuantity: 'CH1: T\nCH2: RH',
                    features: 'Recording span: 7.1months\n(Sample interval: 5 min)',
                    application: '▪ Clean Room\n▪ Pharmaceutical Room\n▪ Laboratory\n▪ Food & beverage QC\n▪ Cosmetics factory',
                    spec: '- Measurement range:\n    RH 10~80%RH ± 1%RH\n    Temp -25~70℃ ± 0.1℃\n\n- Interval: 10S~24H\n- Bettery Expiration Date:\n  Maximum of 10Year\n- Channel: 2~4CH\n- Memory: 122,197-12Bit Samples\n- Interface: Available RS232, USB, WIFI, Ethernet\n- Records which meet the requirements of 21 CFR Part 11 and Annex11 can be provided.'
                },
                {
                    category: '',
                    model: 'DL2000-3CR',
                    measuringQuantity: 'CH1: T\nCH2: RH\nCH3: 4…20mA',
                    features: 'Recording span: 4.7months\n(Sample interval: 5 min)',
                    application: '',
                    spec: ''
                },
                {
                    category: '',
                    model: 'DL2000-35R',
                    measuringQuantity: 'CH1: T\nCH2: RH\nCH3:: 0…5VDC',
                    features: 'Recording span: 4.7months\n(Sample interval: 5 min)',
                    application: '',
                    spec: ''
                },
                {
                    category: '',
                    model: 'DL2000-3AR',
                    measuringQuantity: 'CH1: T\nCH2: RH\nCH3: 0…10VDC',
                    features: 'Recording span: 4.7months\n(Sample interval: 5 min)',
                    application: '',
                    spec: ''
                },
                {
                    category: '',
                    model: 'DL2000-4BR',
                    measuringQuantity: 'CH1: T\nCH2: RH\nCH3: Boolean\nCH4: Boolean',
                    features: 'Recording span: 3.5months\n(Sample interval: 5 min)',
                    application: '',
                    spec: ''
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/159'
        },
        {
            id: 'dl1000_1400',
            title: 'DL1000/1400',
            subtitle: 'TEMPERATURE DATA LOGGER',
            image: '/hstech/images/DL1000:1400.png',
            gallery: ['/hstech/images/DL1000:1400.png', '/hstech/images/DL1000:1400_2.png'],
            desc: `The 1000/1400 temperature data loggers include the VL series for regulated environments and the SP seriers for non FDA/GxP regulated industries.`,
            specs: [
                {
                    category: 'DL1000-1400\n\nTemperature\n\nLogger',
                    model: 'VL1000-2XX',
                    features: '-Sample capacity: 48,100 12-bit samples\n -up to 2 external sensors\n - Recording span(CH2): 2.7months\n   (Sample interval: 5 min)\n- SP model for non GxP application is available.',
                    application: '▪ Refrigerators and freezers\n▪ Incubators\n▪ Stability Chambers\n▪ Warehouses\n▪ Ambient conditions',
                    spec: '- Temperature Range\n   1) Internal Sensor: -25…70℃\n   2) External Probes\n     "N" type -25...70℃\n     "V" type -95...-40℃\n- Probe Cable Length:  3M, 7.6M\n- Interval: 10S~24H\n- Bettery Expiration Date: Maximum of    10Year\n- Interface: Available RS232, USB, \n\n  WIFI, Ethernet'
                },
                {
                    category: '',
                    model: 'VL1400-44X',
                    features: ' -Sample capacity: 85,300 12-bit samples\n -up to 4 external sensors\n - Recording span(CH4): 2.4months\n   (Sample interval: 5 min)\n- SP model for non GxP application is available.',
                    application: '',
                    spec: ''
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/160'
        },
        {
            id: 'dl1016_1416',
            title: 'DL1016/1416',
            subtitle: 'MULTI-APPLICATION TEMPERATURE DATA LOGGER',
            image: '/hstech/images/DL1016:1416.png',
            gallery: ['/hstech/images/DL1016:1416.png'],
            desc: `VAISALA's multi-application temperature data loggers monitor temperatures in up to four applications with one logger-ultra-low temperature freezers, freezer/refrigerators and incubators`,
            specs: [
                {
                    category: 'DL1016-1416\n\nTemperature Logger',
                    model: 'VL1016-22V',
                    features: ' -Sample capacity: 68,600 16-bit samples\n -up to 2 external sensors\n - Recording span(CH2): 3.8months\n   (Sample interval: 5 min)\n- SP model for non GxP application is available.',
                    application: '▪ Refrigerators and freezers\n▪ Incubators\n▪ Stability Chambers\n▪ Warehouses\n▪ Ambient conditions',
                    spec: '- Temperature Range\n     "V" type -95...-50℃\n- Probe Cable Length:  3M, 7.6M\n- Interval: 10S~24H\n- Bettery Expiration Date: Maximum of 10Year\n- Interface: Available RS232, USB, WIFI, Ethernet'
                },
                {
                    category: '',
                    model: 'VL1016-44V',
                    features: ' -Sample capacity: 101,375 16-bit samples\n -up to 4 external sensors\n - Recording span(CH4): 2.8months\n   (Sample interval: 5 min)\n- SP model for non GxP application is available.',
                    application: '',
                    spec: ''
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/161'
        },
        {
            id: 'dl4000',
            title: 'DL4000',
            subtitle: 'INPUT DATA LOGGER',
            image: '/hstech/images/DL4000.png',
            gallery: ['/hstech/images/DL4000.png'],
            desc: `DL4000 series of data loggers are designed to interface with a wide range of transducers, transmitters and sensors with a DC voltage or 0-20 mA current loop output.`,
            specs: [
                {
                    category: 'DL4000\n\nUniversal Input Data Logger',
                    model: '4000-405',
                    channelType: '0…5VDC',
                    features: '- Channel: 1~4CH\n- Sample capacity: 120,000-12bit samples\n- Easily set scaling and measurement units for recording\n- SP model for non GxP application is available.',
                    application: '▪ Clean Room\n▪ Pharmaceutical Room\n▪ Laboratory\n▪ Food & beverage QC\n▪ Cosmetics factory',
                    spec: '- Interval: 10S~24H\n- Bettery Expiration Date: Maximum of 10Year\n- Interface: Available RS232, USB, WIFI, Ethernet\n- Optional vNet cradle for Ethernet or Power over Ethernet connectivity'
                },
                {
                    category: '',
                    model: '4000-40A',
                    channelType: '0…10VDC',
                    features: '',
                    application: '',
                    spec: ''
                },
                {
                    category: '',
                    model: '4000-40C',
                    channelType: '0…20mA',
                    features: '',
                    application: '',
                    spec: ''
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/162'
        },
        {
            id: 'dl1700',
            title: 'DL1700',
            subtitle: 'THERMOCOUPLE DATA LOGGER',
            image: '/hstech/images/DL1700.png',
            gallery: ['/hstech/images/DL1700.png'],
            desc: `■  Suitable for cold and high temperature environments from -240 to 1760°C\n\n■  Available for J, K, T, E, R, and S-type thermocouple`,
            specs: [
                {
                    category: 'DL1700\n\nThermocouple\nData Logger',
                    model: 'DL1700',
                    features: '- Channel: 1~5CH\n  (Thermocouple 4CH + CJT 1CH)\n- Sample capacity: 135,165-12bit samples\n- SP model for non GxP application is available.\n- Applicable Thermocouple type\n Type K: Temp -200~+1370℃ ± 1.3℃\n Type J: Temp -130~+900℃ ± 1.0℃\n Type T: Temp -240~+350℃ ± 1.2℃\n Type E: Temp -110~+740℃ ± 0.7℃\n Type R: Temp -50~+1760℃ ± 4.4℃\n Type S: Temp -50~+1700℃ ± 5.1℃',
                    application: '▪ Liquid nitrogen\n▪ Oven\n▪ Sterilization Chamber',
                    spec: '- Interval: 10S~24H\n- Bettery Expiration Date: Maximum of 10Year\n- Interface: Available rs232, USB, WIFI, Ethernet'
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/163'
        },
        {
            id: 'wireless',
            title: 'Wireless',
            subtitle: 'WIRELESS DATA LOGGER',
            image: '/hstech/images/Wireless.png',
            gallery: ['/hstech/images/Wireless.png', '/hstech/images/Wireless_2.png'],
            desc: `Wireless data logger with temperature and humidity and two-channel analog input enables the sensor to be replaced and easy to install.\n\n■ LoRa communication, battery life of 18 months\n\n■ Replacement-type humidity and temperature sensor`,
            specs: [
                {
                    category: 'Wi-Fi Data logger',
                    model: 'HMT140',
                    spec: ' - Measurement range(Accuracy):\n     RH 0~100%RH, ±1.5%RH\n     Temp -40...+80℃, ±0.2℃\n - Bettery Expiration Date: Maximum of 18-Month\n - Channel: 2CH\n - Memory: 3060 Samples\n - Interface: WIFI\n - Interchangable probe\n - Probe Cable Length: Fixed Probe, 3, 5, 10M\n - IP65',
                    application: '▪ Clean Room\n▪ Pharmaceutical Room\n▪ Laboratory\n▪ Food & beverage QC\n▪ Cosmetics factory\n▪ Warehouse\n▪ Production areas'
                },
                {
                    category: 'RH+T Probe',
                    model: 'HMP110',
                    spec: ' - Measurement range(Accuracy):\n   RH 0...100%, ±3%RH\n   Temp -40...+60℃, ±0.5℃\n - HUMICAP SENSOR\n - Max. Probe Cable Length: 10M\n - IP65',
                    application: ''
                },
                {
                    category: 'RH+T Data Logger',
                    model: 'RFL100',
                    spec: ' - Can be used for cold storage area(down to -196℃)\n - Detachable high-accuracy RH+T Probes\n    HMP115 / RH+T / T -40…+60℃ / IP54\n    HMP115T / T only / T -40…+60℃ / IP54\n    HMP110 / RH+T / T -40…+80℃ / IP65\n    HMP110T / T only / T -40…+80℃ / IP65\n    TMP115 / T only / T -196...+90℃ / IP65\n - 30-day First In First Out(FIFO) memory buffer\n - Operation time(@ 20℃): 18 Months\n - Uses standard alkaline batteries\n - Optional magnetic mounting bracket(up to 10kg)',
                    application: ''
                },
                {
                    category: 'Vainet Wireless Access Point',
                    model: 'AP10',
                    spec: ' - 1 Unit of AP10 supports 32 VaiNet data loggers\n - Powered by Power over Ethernet(PoE) or DC adapter\n - Uses HTTPS communication and encryption to ensure secure data transmission\n - Wireless\n    Modulation: LoRa chirp spread spectrum\n    Output power: 14dBm(25mW)\n    Typical range(indoors): At least 100m',
                    application: ''
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/164'
        },
        {
            id: 'vnet_poe',
            title: 'vNET POE',
            subtitle: 'POWER OVER ETHERNET DATA LOGGER',
            image: '/hstech/images/vNET POE.png',
            gallery: ['/hstech/images/vNET POE.png'],
            desc: `Data logger powered and connected via a single Ethernet cable using Power over Ethernet.`,
            specs: [],
            datasheet: 'https://hs-tech-en.imweb.me/165'
        },
        {
            id: 'viewlinc',
            title: 'viewLinc Software',
            subtitle: 'CONTINUOUS MONITORING SYSTEM',
            image: '/hstech/images/viewLinc Software.jpg',
            gallery: ['/hstech/images/viewLinc Software.jpg'],
            desc: `VAISALA viewLinc Enterprise Server allows you to network several types of VAISALA data loggers using a combination of wired and wireless connections. It supports small installations of one or two measurement points or large systems that monitor thousands of locations.`,
            specs: [
                {
                    category: 'SOFTWARE',
                    model: 'viewLinc5.0',
                    description: ' - Continuous Monitering System(Manage Program)\n\n - License Key\n ▪ Small Version: 4Device or less\n ▪ Medium Version:\n   100Device or less\n ▪ Large Version:\n   Unlimited Device',
                    feature: '▪ Clean Room\n▪ Pharmaceutical Room\n▪ Laboratory\n▪ Food & Beverage QC\n▪ Cosmetics factory',
                    function: ' - Real-time monitoring of distributed sensors\n - Configurable multi-stage alarming with email, SMS\n   and on-screen notification\n - Graphical dashboards and trend analysis\n - Automated report scheduling with email delivery\n   Fully journaled audit trail\n - Active directory user logon integration\n - Creation Validation Document'
                }
            ],
            datasheet: 'https://hs-tech-en.imweb.me/166'
        }
    ],

}

// VAISALA Applications & Solutions Detail Data
export const VAISALA_APPLICATIONS: Record<string, any> = {
    semiconductor: {
        title: 'Semiconductor',
        shortDesc: 'Precise humidity and dewpoint control in cleanrooms and lithography processes.',
        image: '/hstech/images/SEMICONDUCTOR_1.png',
        applications: [
            { title: 'Dryer - Low Dew Point' },
            { title: 'Humidity & Temperature clean room control' },
            { title: 'Semiconductor Tool Monitoring' }
        ],
        content: `Cleanroom and other critical environments require precise environmental measurements to operate within consistent criteria. Humidity and temperature measurements can be particularly difficult in a clean room environment. VAISALA's highly accurate instruments and powerful solutions address measurement challenges and help you run cleanroom functions smoothly.

Our products measure, monitor, and record humidity, dew point, temperature, pressure, etc. Supports clean room operations with the latest technology, professional guidance, and a variety of services. With the latest technology, expert know-how, and extensive services to support clean room operations, our products measure, monitor and record humidity, dew point, temperature and pressure.

Learn more about our solutions for continuous monitoring systems and continuous data logging designed for use in critical, clean environments. For GxP regulated applications, we offer clean room monitoring systems designed for life sciences to help you meet these requirements.`,
        systems: [
            {
                title: '1. Dryer-Low Dew Point',
                desc: `VAISALA's Dew Point Sensors are used in many industries, such as compressed air systems, plastic drying, medical gas, and breathing air and fluidized bed dryers.`,
                features: [
                    'Unique patented technology that reduces deviation and ensures long-term reliability',
                    'Fastest response speed in high humidity and low humidity section of the dew-point transmitter'
                ],
                recommendedProducts: ['dmt340', 'dmt152', 'dmt143', 'dmt143l', 'dm70']
            },
            {
                title: '2. Humidity & Temperature Clean Room Control',
                desc: `VAISALA's products measure, monitor, and record humidity, dew point, temperature, and pressure through its extensive service supporting the latest technologies, expert know-how, and cleanroom operations. Provides a continuous monitoring system optimized for clean room control and a solution for continuous data logging.`,
                features: [
                    'Proven Long-Term Reliability',
                    'Hydrogen peroxide pollution control sensor coating option'
                ],
                recommendedProducts: ['hmt330', 'hmp1_9', 'hmt120', 'hmw90', 'hmdw110', 'hm70']
            },
            {
                title: '3. Semiconductor Tool Monitoring',
                desc: `Ultra-precision sensors ensure long-term stability enable precise control of the micro-environment around semiconductor equipment. VAISALA provides various types of temperature and pressure transducers applicable to the semiconductor industry.`,
                features: [
                    'HMT120/130 Humidity and Temperature Transmitters for Cleanrooms - VAISALA HUMICAP® Humidity and Temperature Transmitters HMT120 and HMT130 are designed for humidity and temperature monitoring in cleanrooms and are also suitable for demanding HVAC and light industrial applications.',
                    'PTU300 Combined Pressure, Humidity and Temperature Transmitter for Demanding Applications - PTU300 is a unique instrument measuring three parameters simultaneously. Barometric pressure, humidity and temperature measurement in one transmitter.',
                    'Industrial CMS - Continuous monitoring systems for industrial environments protect your valuable assets and critical processes. The control system and dual-run CMS provide accurate data, real-time trends, and easy report writing.',
                    'PTB110 Barometer for Industrial Use - VAISALA BAROCAP® Barometer PTB110 is designed both for accurate barometric pressure measurements at room temperature and for general environmental pressure monitoring over a wide temperature range.',
                    'PTB330 Digital Barometer for professional Meteorology, Aviation and Industrial Users - VAISALA BAROCAP® Digital Barometer PTB330 is a new-generation barometer, designed for a wide range of high-end atmospheric pressure measurement.',
                    'OEM module for Relative Humidity, Temperature and Dewpoint - Depending on your needs, you can select different types of OEM modules for relative humidity, temperature, and stall application.',
                    'HM70 Handheld Humidity and Temperature Meter for Spot-checking Applications - Designed for on-site transmission calibration and on-site inspection. Authorized calibration report can be issued for portable measuring instruments.',
                    'HMM100 Humidity Module for Environmental Chambers - VAISALA HUMICAP® Humidity Module HMM100 is an open frame module for integration into environmental chambers. The modules provide a single analog output channel for relative humidity(RH) or dew point(Td).',
                    'HMP110 Humidity and Temperature Probe - HMP110 is a trouble-free and cost-effective humidity transmitter with high accuracy and good stability.',
                    'HMP60 Humidity and Temperature Probe - HMP60 is a simple durable and cost-effective humidity probe. It is suitable for volume applications, integration into other manufacturers\' equipment, incubators, glove boxes, greenhouses, fermentation chambers and data loggers.'
                ],
                recommendedProducts: ['hmt120', 'ptu300', 'hmt330', 'hmp9', 'hmm170', 'hmm100', 'hmm105', 'dmt340', 'mmt330']
            }
        ],
        externalLink: 'http://www.vaisala.com/en/industrialmeasurements/applications/semiconductortoolmonitoring/Pages/default.aspx'
    },
    plant: {
        title: 'Plant',
        shortDesc: 'Reliable monitoring for industrial drying, coating, and chemical processes.',
        image: '/hstech/images/PLANT_1.png',
        applications: [
            { title: 'Lubrication & Hydraulics' },
            { title: 'Metal Heat Treatment Furnaces' },
            { title: 'Monitoring Lithium Battery Manufacturing' }
        ],
        content: `Provides rigid sensors tailored for different temperature and measurement environments and custom sensors for environmental installation criteria.`,
        systems: [
            {
                title: '1. Lubricant & Hydraulics',
                desc: `Water is a common contaminant in industrial oils that deteriorates its performance, whether used as a lubricant, coolant, insulator, or for other purposes. High moisture content increases the risk of corrosion, over-heating, machine malfunctions and other costly problems. The ability of oil to hold water in solution depends on the oil type, its age, and what additives are present. When the water content in oil reaches the saturation point, it separates out and free water is formed. Free water formation is critical in terms of problems related to water in oil. It prevents the formation of a uniform oil layer on metal surfaces, thus reducing its lubrication performance and increasing equipment wear and corrosion. It ruins polar additives like AW (anti-wear) and EP (extreme pressure). Water can also initiate micro-pitting. Free water provides a growth medium for microbes to form slime or mats, which easily plug filters and valves and may cause critical malfunctions. Continuous monitoring of moisture in oil ensures reliable equipment performance at all times and helps to schedule service intervals and prevent unscheduled downtime. It also reduces the risk of failures of critical and expensive machine parts, while requiring the activation of oil dryer systems only when necessary.`,
                features: [
                    'Real-time measuring',
                    'Local support – globally',
                    'Easier maintenance',
                    'Cost efficiency via stability and robustness',
                    'Fast, customized implementation',
                    'Works in most oils'
                ],
                recommendedProducts: ['mm70', 'mmt330', 'mmt310', 'mmt162']
            },
            {
                title: '2. Metal Heat Treatment Furnaces',
                desc: `Water vapor is a key component in furnace atmospheres and feed gas, affecting the chemistry between the gas and the metal parts in the process. Because of the wide variety of thermal heat treatment processes, target dew point temperatures can range from –60°C to elevated levels of +35°C and even higher. Due to the extremely high oven process temperatures typically involved in heat treating, a sampling system/line from the furnace to the dew point probe is normally required in order to cool the process gas before reaching the sensor.`,
                recommendedProducts: ['dmt340', 'dmt152', 'dmt143', 'dmt143l', 'dm70']
            },
            {
                title: '3. Monitoring Lithium Battery Manufacturing',
                desc: `The lithium-ion battery manufacturing process is sensitive to moisture. This challenging production environment demands a water vapor detection instrument with reliable performance and strong resistance to process byproducts that may be present in the atmosphere. Vaisala offers a chemically resistant polymer dew point sensor that is actively manipulated to achieve long term reliability with very little measurement drift. Calibrated devices using this sensor are available as low cost transmitters or fully configurable field instruments.`,
                recommendedProducts: ['dmt340', 'dmt152', 'hmt330', 'dmt143', 'dmt143l', 'dm70']
            }
        ],
        externalLink: 'http://www.vaisala.com/en/lifescience/applications/refrigeratorandfreezermonitoring/Pages/default.aspx'
    },
    automotive: {
        title: 'Automotive',
        shortDesc: 'Environmental testing in paint booths, engine test cells, and EV battery production.',
        image: '/hstech/images/Automotive.png',
        applications: [
            { title: 'Paint Booths' },
            { title: 'Engine Testing' }
        ],
        content: `Modern automotive paints are sensitive to environmental conditions during application. Humidity control of the facility, paint booth and compressed air assures an efficient process and a high-quality finish.`,
        systems: [
            {
                title: '1. Paint Booths',
                desc: `Modern automotive paints are sensitive to environmental conditions during application. Humidity control of the facility, paint booth and compressed air assures an efficient process and a high-quality finish.

Vaisala provides accurate humidity and dew point instruments with extremely low long-term drift, flexible installation options, and chemically durable sensors. In addition, Vaisala offers a family of intrinsically safe humidity instruments for hazardous locations. These instruments must be properly installed with appropriate safety barriers or isolators. Always refer to the User's Manual for complete information regarding the installation and wiring of intrinsically safe instruments.`,
                recommendedProducts: []
            },
            {
                title: '2. Engine Testing',
                desc: `Dynamometer testing often occurs at very low and very high temperatures. High reliability and uptime are desirable in test cell instrumentation.

Vaisala's BAROCAP® barometers and HUMICAP® humidity and temperature transmitters have operating ranges wide enough to accommodate virtually any test condition. A remote probe with sensor heating is available for condensing conditions. Other options include graphical display of history and measurement trends, data collection and transfer to PC, and flexible calibration. A three-in-one barometric pressure, humidity and temperature combination unit is also available.`,
                recommendedProducts: ['ptu300', 'hmd60', 'hmt330', 'hmt120', 'hmt360', 'hmm100', 'dpt146', 'dmt152', 'dm70', 'ptb330ts']
            }
        ],
        externalLink: 'http://www.vaisala.com/en/lifescience/applications/refrigeratorandfreezermonitoring/Pages/default.aspx'
    },
    marine: {
        title: 'Maritime',
        shortDesc: 'Weather observation and atmospheric measurement at sea.',
        image: '/hstech/images/Maritime.png',
        applications: [
            { title: 'Integrated Bridge Systems' },
            { title: 'Dynamic Positioning' },
            { title: 'Lubrication and Hydraulic Systems' },
            { title: 'Compressed Air Systems' },
            { title: 'Engine' },
            { title: 'Nox Emission Monitoring' }
        ],
        content: `Safety, security and efficiency are top requirements in maritime operations, and weather can have a serious affect on each of these. It is clear that accurate weather and sea state information is vital for ensuring the safety, security and operation of ports, ships and offshore platforms.`,
        systems: [],
        recommendedProducts: ['ptu300', 'hmt330', 'dmt340', 'mmt330', 'mmt310', 'mmt162', 'mm70'],
        externalLink: ''
    },
    agriculture: {
        title: 'Agriculture',
        shortDesc: 'Crop storage humidity control and greenhouse climate management.',
        image: '/hstech/images/Agriculture.png',
        applications: [
            { title: 'Greenhouse' }
        ],
        content: `Greenhouses are closed environments where conditions are optimized for plant growth. Optimal controls require information both from the indoor and outdoor environments. Typically, carbon dioxide (CO2), relative humidity, and temperature are measured in the greenhouse. Outside measurement parameters include wind speed and direction, rain and solar radiation. Vaisala offers instruments for measuring CO2, relative humidity and temperature in the greenhouse. Vaisala's outdoor transmitter portfolio includes products for measuring wind, precipitation, various humidity parameters and temperature. Outdoor transmitters come with wide operating temperature ranges suitable for most climates, flexible installation options, and solar and radiation shields for protection from the elements.`,
        systems: [],
        recommendedProducts: ['hmt330', 'gmp252', 'gm70', 'hmt120', 'hms110', 'hmp110', 'gmd20', 'dtr500'],
        externalLink: 'http://hs-tech.co.kr/page/0406.php'
    },
    power: {
        title: 'Power',
        shortDesc: 'Transformer oil moisture and hydrogen monitoring for grid asset protection.',
        image: '/hstech/images/POWER.png',
        applications: [
            { title: 'Power Transformers' },
            { title: 'SF6 Gas Insulated Equipment' },
            { title: 'Turbine Inlet Air' }
        ],
        content: `The power industry is currently facing the challenges of equipment coming to the end of its operational lifespan, the impact of overload situations, as well as an increasing number of network faults. Vaisala offers a diverse portfolio of real-time online measurement transmitters for utilities who want to mitigate these risks and safeguard their critical assets. Using Vaisala moisture-in-oil, hydrogen-in-oil, temperature, dew point, pressure and density meters, utilities can safely increase equipment performance and prepare timely maintenance plans to prevent unexpected outages.`,
        systems: [
            {
                title: '1. Power Transformers',
                desc: `Dissolved Gas Analysis(DGA) in Power Transformers A multi-gas DGA monitor, like the Optimus DGA Monitor, is the best choice for your critical transformers providing a comprehensive understanding of the condition of your transformer, whereas a single-gas monitor, Moisture, Hydrogen and Temperature Transmitter MHT410, can be used as a simple early warning indicator of a fault condition.`,
                recommendedProducts: ['mht410', 'opt100', 'mmt310', 'mm70', 'mmt330', 'mmt162', 'dpt145']
            },
            {
                title: '2. SF6 Gas Insulated Equipment',
                desc: `The electric power industry uses SF6 to insulate switchgears, circuit breakers and other equipment used in electricity transmission and distribution. To ensure the integrity of SF6 gas as an insulator, the amount of water vapor in SF6 gas should be kept to a minimum. Moisture may also increase the formation of unwanted secondary decomposition products, which can lead to arcing and equipment failure. Online monitoring of SF6 is convenient with Vaisala's Multiparameter Transmitter DPT145. The DPT145 is a unique innovation that not only monitors dewpoint online but also pressure and temperature. In addition the instrument calculates four other values, including gas density and ppm. The DPT145 provides an excellent assessment of the SF6 insulation. Both sudden and minor leaks are detected by the direct normalized pressure measurement, while online dew point measurement alerts the user to moisture issues, which can weaken the insulation properties of SF6 and cause rapid deterioration. Integrating the DPT145 into a condition-based monitoring system minimizes the need for on-site visits and helps to ensure that no SF6 is released into the atmosphere. Spot-checking is easy with Vaisala's hand-held dew point meter DM70 which is a lightweight, battery-powered instrument for measuring the dew point in SF6. It provides fast response time and internal data logging to optimize the field technician's time. A unique sample cell allows dew point measurement at both in gas pressure and in ambient atmospheric pressure. The cell meets and even exceeds environmental regulations by ensuring protection against accidental discharge of SF6, requiring minimal amount of SF6 for sampling, and enabling collection and recycling of SF6.`,
                recommendedProducts: ['dm70', 'dpt145']
            },
            {
                title: '3. Turbine Inlet Air',
                desc: `Monitoring humidity to optimize gas turbine performance The accurate measurement of the humidity of inlet air is essential for good turbine control. When the air is cooler the turbine performs better because as the temperature decreases, the density of the air increases. This results in a greater mass of air flowing through the turbine, resulting in increased power generation. A 1ºC increase in temperature may mean a 0.5% electricity loss. However, inlet air that is too cold or humid must be avoided as it may lead to water condensation or even icing, which damages the turbine blades. With reliable humidity monitoring the utility operator can cool and compress the inlet air, maximizing the power generated without risking condensation. Vaisala's 30 years of experience of industrial humidity measurements is incorporated into the Vaisala HUMICAP® Humidity and Temperature transmitter Series HMT330. For operators in the power industry this means reliable, stable and accurate measurements. With the HMT330 series you have many versatile options to choose from: a numerical and graphical display, a multilingual menu, alarms, trends, a one-year history, and WLAN/LAN.`,
                recommendedProducts: ['hmt300tmk', 'ptu300', 'hm70']
            }
        ],
        externalLink: 'http://www.vaisala.com/en/energy/Pages/default.aspx'
    },
    hvac: {
        title: 'HVAC',
        shortDesc: 'Indoor air quality and energy-efficient building automation.',
        image: '/hstech/images/HVAC.png',
        applications: [
            { title: 'Demand Controlled Ventilation' },
            { title: 'Indoor Air Quality' },
            { title: 'Data Centers' },
            { title: 'Hazardous Area' },
            { title: 'Metro Station' }
        ],
        content: `Vaisala's reliable and accurate HVAC meters and sensors are designed with energy efficiency in mind, whether you are optimizing cooling towers or demand-controlled ventilation. Our large selection includes ±3% and ±2% humidity and temperature measurement HVAC meters, CO2 measurement sensors and also handheld meters. They can be used indoors and outdoors, and installed on walls or in ventilation ducts.`,
        features: [
            'Easy installation method',
            'Easy maintenance',
            'CO2 Sensor of Innovative New Technology',
            'Reliable Humidity and Temperature Measurement'
        ],
        systems: [
            {
                title: '1. Demand Controlled Ventilation',
                desc: `Achieve energy efficiency and employee well-being with accurate CO2 measurements Insufficient ventilation causes human-produced carbon dioxide to build up indoors, decreasing employee well-being and productivity substantially. With accurate CO2 measurement, both energy efficiency and employee well-being can be achieved simultaneously. Green building initiatives, like the US Green Building Council's LEEDv4, British BREEAM and Australian Energy Rating all encourage commercial constructors and building operators to reduce their impact on environment by increasing their energy efficiency. Especially LEED v4 stresses the importance of precise ventilation automation control using accurate sensors. Also the ASHRAE Green Standard 189.1 (USA) and the European standard EN 13779 recommend using demand-controlled ventilation (DCV) primarily to reduce energy usage while promoting healthy indoor air. In DCV the ventilation intensity is adjusted to correspond to the true need in order to save energy. It has clear advantages especially when occupancy varies widely, such as in schools, conference centers, and auditoriums. The CO2 level in a space indicates human presence and can be used to control ventilation. The efficiency of DCV can only be optimized by accurate carbon dioxide sensing. Vaisala CARBOCAP® technology delivers maintenance-free accuracy and performance that lasts. The CO2 sensors can be used in a wide variety of applications, including variable outdoor CO2 levels or facilities with around-the-clock occupancy such as hospitals, workplaces, and residential buildings.`,
                recommendedProducts: ['gmp251', 'gmw90', 'gmw80', 'gmd20']
            },
            {
                title: '2. Indoor Air Quality',
                desc: `Indoor air quality (IAQ) is measured with humidity meters and temperature and CO₂ sensors to ensure standards for human comfort indoors. Although human comfort depends on an interaction of multiple variables, optimizing relative humidity, temperature and CO₂ by measuring indoor air quality (IAQ) satisfies the comfort requirements for a wider variety of occupants than optimizing only temperature.`,
                recommendedProducts: ['hmt330', 'hmp1_9', 'hmt120', 'hmw90', 'hmd60', 'hmdw110']
            },
            {
                title: '3. Data Centers',
                desc: `Data centers are the brains of almost any company whose success depends on efficient and reliable software operations. As there is quite a bit of powerful hardware sitting in one place, data centers must be safeguarded against both external and internal environmental influences, while the buildings also require sufficient cooling. Data centers are energy-intensive facilities, currently consuming more than 1.3% of the world's total electricity production. This energy is transformed into heat that has to be conveyed and dissipated away from the equipment racks in order to maintain the correct operating temperature. Cooling and air conditioning is one of the most important processes in any data center. Data center cooling can be done in a variety of ways, depending on the location and the local climate. Refrigerant cooling consumes a lot of energy, but its usage can be reduced by taking the climate into consideration when choosing the location for the data center. In dry climates evaporative cooling is effective at dissipating heat. In cold climates direct cooling with dry, cold air can be used. Locations near water offer the possibility to dissipate the heat into the water.`,
                recommendedProducts: ['hmt330', 'hmp1_9', 'hmt120', 'hmw90', 'hmd60', 'hmdw110']
            },
            {
                title: '4. Hazardous Area',
                desc: `Humidity control is critical in many spaces where flammable or explosive materials such as fuels, chemicals, explosives are being stored. These spaces are designated as hazardous due to potentially explosive atmospheres. They require specially designed and approved instruments for safe operation. Vaisala offers a family of intrinsically safe humidity instruments for hazardous locations. These instruments must be properly installed with appropriate safety barriers or isolators. Always refer to the User's Manual for complete information regarding the installation and wiring of intrinsically safe instruments.`,
                recommendedProducts: ['hmt360']
            },
            {
                title: '5. Metro Station',
                desc: `Humidity and temperature transmitters are used in metro stations to control ventilation and air conditioning. The control of air moisture levels provides a comfortable environment for passengers, optimizes HVAC equipment energy consumption, and maintains the integrity of the equipment. The Vaisala INTERCAP® and HUMICAP® Humidity and Temperature transmitters provide accurate and stable measurements with minimal maintenance requirements. Vaisala humidity sensors fully recover from condensation without compromising the performance. This is important especially in high humidity climates, where condensation is likely to occur.`,
                recommendedProducts: ['gmw90', 'gmw80', 'hmdw110', 'hmdw80']
            }
        ],
        externalLink: ''
    },
    lifescience: {
        title: 'Life Science',
        shortDesc: 'Sterile environment monitoring, bio-decontamination, and incubator control.',
        image: '/hstech/images/LIFE SCIENCE.png',
        applications: [
            { title: 'Refrigerator and Freezer Monitoring' },
            { title: 'Incubator Monitoring' },
            { title: 'Laboratory Monitoring' },
            { title: 'Hospital Pharmacy Monitoring' },
            { title: 'Warehouse Monitoring' },
            { title: 'Cleanroom Monitoring' },
            { title: 'Stability Chamber Monitoring' },
            { title: 'Pharmaceutical Manufacturing' },
            { title: 'Environmental Mapping Qualification' }
        ],
        content: `Vaisala monitoring solutions provide reliable, accurate measurements for pharmaceutical, biotechnology, and life science applications. Our systems ensure GxP compliance with gap-free data recording, 24/7 alarming, and comprehensive validation support.`,
        systems: [
            {
                title: '1. Refrigerator and Freezer Monitoring',
                desc: `Vaisala fridge and freezer monitoring, alarming, and reporting solutions reduce the risk of lost product and regulatory non-compliance in life science cold storage applications. Ideal for freezer temperature monitoring, with multiple connectivity options including wired and wireless, the system is simple to set up and easy to use.`,
                recommendedProducts: ['hmt140', 'dl2000', 'dl1000', 'dl4000', 'gmp343']
            },
            {
                title: '2. Incubator Monitoring',
                desc: `Monitor and measure your medical, pharmaceutical, and biotechnical incubators with Vaisala monitoring solutions. Designed for GxP applications, the Vaisala viewLinc monitoring system and devices ensure regulatory compliance, and provide assurance of accurate test and process results.

The system offers industry-best sensors with easy-to-use software, low cost-of-ownership, scalability, gap-free data records, and 24/7 remote alarming.`,
                recommendedProducts: ['hmt140', 'hm70', 'dmt340', 'gmp343', 'gmp251', 'dl2000', 'dl1000', 'dl4000']
            },
            {
                title: '3. Laboratory Monitoring',
                desc: `Reduce the risk of imprecise measurements and failed audits in your accredited calibration laboratories and metrological applications with Vaisala solutions. The Vaisala viewLinc continuous monitoring system offers significant savings, low cost-of-ownership, gap-free data records, and 24/7 remote alarming.`,
                recommendedProducts: ['hmt330', 'hmw90', 'gmw90', 'hmt140', 'hm70', 'dl2000', 'dl1000']
            },
            {
                title: '4-9. Additional Life Science Applications',
                desc: `Vaisala provides comprehensive solutions for hospital pharmacy, warehouse monitoring, cleanroom monitoring, stability chambers, pharmaceutical manufacturing, and environmental mapping qualification. All systems feature gap-free data recording, GxP compliance, and comprehensive validation support.`,
                recommendedProducts: ['hmt330', 'hmt140', 'hm70', 'hmp1_9', 'hmt120', 'dl2000', 'dl1000', 'dl4000']
            }
        ],
        externalLink: 'http://www.vaisala.com/en/lifescience/applications/refrigeratorandfreezermonitoring/Pages/default.aspx'
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// SETRA APPLICATIONS & SENSOR
// ═══════════════════════════════════════════════════════════════════════════

export const SETRA_APPLICATIONS_SENSOR: Record<string, any> = {
    precise_diff_pressure: {
        title: 'Precise Measurement Differential Pressure',
        shortDesc: 'High-accuracy differential pressure measurement for critical environments requiring ±0.25% FS precision or better, including reference laboratories and calibration facilities.',
        content: `Test stand-grade and industry standard differential pressure transducers designed for critical applications where accuracy and stability are paramount. These instruments provide exceptional performance for leak detection, cleanroom monitoring, medical instrumentation, and precision test equipment.`,
        models: [
            { name: 'ASL', image: '/hstech/images/ASL.png' },
            { name: '239', image: '/hstech/images/239.jpg' },
            { name: '201', image: '/hstech/images/201.jpg' }
        ],
        tableData: [
            ['Model', 'ASL', '239', '201'],
            ['Description', 'Test stand-grade low differential pressure transducer', 'Industry standard for high accuracy low differential pressure transducer', 'Very low differential/gauge pressure transducer'],
            ['Sample Applications', 'Filter pressure, Leak detection systems, Exhaust pressure, Medical instrumentation, Part integrity testing, Test stands, Wind tunnels', 'Leak detection systems, Exhaust pressure, Medical instrumentation, Part integrity testing, Cleanrooms (Captures dynamic pressure changes)', 'Vapor recovery systems, Exhaust gas control systems (Liquids or Gases Compatible with Stainless Steel and Inconel)'],
            ['Ranges', '0.25 to 40" W.C. Unidirectional, ±0.1 to ±15" W.C. Bidirectional', '0.5 to 30" W.C. Unidirectional, ±0.25 to ±15" W.C. Bidirectional', '5 to 50" W.C. Unidirectional, ±2.5" to ±25" W.C. Bidirectional'],
            ['Accuracy FS (RSS) or % of reading', '<±0.07% FS', 'Standard: ±0.14% FS\nOpt.: ±0.073% FS', 'Standard: ±0.5% FS\nOpt.: ±0.25% FS'],
            ['Operating temperature', '-40 to 85°C', '-18 to 80°C', '-40 to 80°C'],
            ['Compensated temperature range', '-20 to 60°C', '-1 to 65°C', '-33 to 80°C'],
            ['Thermal effect span, zero offset', 'Zero/Span tol. <±0.1% FS', 'Zero/Span Shift %FS/50°C: <±0.9', 'Zero Shift %FS/°F (%FS/ºC): <±2.0 (1.8)\nSpan Shift %FS/°F (%FS/ºC): <±1.5 (1.4)'],
            ['Overpressure', 'Operable line pressure: Vacuum to max 250 PSIG\nLine pressure effect: 2%/100 PSI', 'Up to 45 PSI', '-'],
            ['Maximum Line Pressure', '-', '100 PSI (689,473 Pa)', '100 PSI (689,473 Pa)'],
            ['Media compatibility', 'Clean, dry gases compatible with 300 series and 17-4 PH stainless steel', 'Gases compatible with stainless steel, hard anodized 6061 aluminum (Buna-N O-ring)', 'Gases or liquid compatible with stainless steel and Inconel'],
            ['Output', '0 to 5 VDC, 0 to 10 VDC, 4 to 20 mA', '4 to 20 mA, ±2.5 VDC, 0 to 5 VDC, 1 to 5 VDC, 1 to 6 VDC, 0 to 10 VDC', '4 to 20 mA'],
            ['Electrical terminations', '3 ft (1 m) standard cable, Standard 6-pin ext. bayonet connection', 'Cable, 30 AWG 9-conductor cable', '1/2" NPT Ext. conduit, 4-pin bayonet connector, Hirschmann w/ large ext. fitting, Terminal strip'],
            ['Pressure fittings', '1/8" NPT Int., Barb; 1/8" NPT Int., 1/8" NPT Int.; 1/8" NPT Ext., Barb; 7/16"-20 SAE Ext., Barb', '1/8" NPT Int.', '1/4"-18 NPT Ext., 1/4" Tube stub, 1/4"-18 NPT Int., 7/16" SAE 37° flare'],
            ['참고 사항', 'Thermal effect accuracy\nStandard: ±0.5%.\nOpt.: <0.25%\n(total error band, -20°C to 60°C)', 'Vibration / Acceleration / Shock:\n2g from 5 Hz to 500 Hz, 10g max, 50g operating', 'Acceleration / Shock:\n10g max / 50g operating']
        ]
    },
    air_cond_diff_pressure: {
        title: 'Air Conditioning Differential Pressure',
        shortDesc: 'Monitoring supply, return, and exhaust air pressure differentials in commercial HVAC systems and air handling units for energy optimization.',
        content: `HVAC-optimized differential pressure sensors for building automation, energy management, and critical environment pressure control. These transmitters provide reliable performance for static duct pressure, cleanroom cascades, and VAV system control.`,
        models: [
            { name: '269', image: '/hstech/images/269.jpg' },
            { name: '267', image: '/hstech/images/267.jpg' },
            { name: '264', image: '/hstech/images/264.jpg' }
        ],
        tableData: [
            ['Model', '269', '267', '264'],
            ['Description', "the pharmaceutical industry's stringent calibration guidelines", 'Very low differential pressure transducer', 'Low Differential Pressure Transducer'],
            ['Sample Applications', 'High Accuracy for Demanding Pharmaceutical Applications, Secure Calibration', 'Energy Management Systems, Static Duct Pressure, Cleanroom Pressure, Oven Pressurization & Furnace Draft Controls', 'HVAC/R systems, Room pressurization for critical environments, Energy management systems, Variable air volume and fan control (VAV)'],
            ['Ranges', '0.1 to 10" W.C. Unidirectional, ±0.05 to ±5" W.C. Bidirectional', '0.1 to 100" W.C. Unidirectional, ±0.1 to ±100" W.C. Bidirectional', '0.1 to 100" W.C. Unidirectional, ±0.05 to ±50" W.C. Bidirectional'],
            ['Accuracy FS (RSS) or % of reading', 'Standard: ±1.0% FS\nOpt.: ±0.5%, ±0.25%', 'Standard: ±1.0% FS\nOpt.: ±0.5%, ±0.4%, ±0.25%', 'Standard: ±1.0% FS\nOpt.: ±0.4%, ±0.25%'],
            ['Operating temperature', '-6 to 71°C', '-18 to 65°C', '-18 to 79°C'],
            ['Compensated temperature range', '-6 to 60°C', '5 to 65°C', '-18 to 65°C'],
            ['Thermal effect span, zero offset', 'Zero/Span Shift %FS/°F:\nOpt.: 0.01%\nStandard: 0.02%', 'Zero/Span Shift %FS/°F (°C): ±0.033 (±0.06)', 'Zero/Span Shift %FS/°F (°C): ±0.033 (±0.06)'],
            ['Overpressure', 'Up to 2 PSI (Range Dependent)', 'Up to 10 PSI (Range Dependent)', 'Up to 10 PSI (Range Dependent)'],
            ['Maximum Line Pressure', '10 PSI (68,947.3 Pa)', '10 PSI (68,947.3 Pa)', '10 PSI (68,947.3 Pa)'],
            ['Media compatibility', 'air or nonconducting gases. Use with liquids or corrosive gases will damage the unit.', 'air or nonconducting gases. Use with liquids or corrosive gases will damage the unit.', 'Clean air or similar non-conducting gases.'],
            ['Output', '4 to 20 mA', '4 to 20 mA', '4 to 20 mA, 0 to 5 VDC'],
            ['Electrical terminations', 'Detachable Electrical Connector', 'Detachable Electrical Connector', 'Terminal strip, 1/2" conduit enc.'],
            ['Pressure fittings', '3/16" O.D. Barbed Brass Fittings on Removable Process Head', '3/16" Barbed Brass Fitting, 1/4"NPTF Brass Fitting, Static Duct Probe', '3/16" O.D. barbed brass for 1/4" push on tubing']
        ]
    },
    precision_pressure: {
        title: 'Precision Measurement Pressure Sensor',
        shortDesc: 'Absolute and gauge pressure measurement for industrial process control, leak testing, and quality assurance applications.',
        content: `Test stand-grade and high accuracy pressure transducers for research, development, and demanding industrial applications. Includes vacuum manometers for semiconductor and petrochemical processes.`,
        models: [
            { name: 'ASM', image: '/hstech/images/ASM.png' },
            { name: '204', image: '/hstech/images/204.jpg' },
            { name: '730', image: '/hstech/images/730.png' }
        ],
        tableData: [
            ['', '정밀 계측용 압력센서', '진공 압력 센서'],
            ['Model', 'ASM', '204', '730'],
            ['Description', 'Test stand-grade pressure transducer', 'High accuracy pressure transducer', 'Vacuum Capacitance Manometer'],
            ['Sample Applications', 'Engine test stands, Particle test & analysis, Manifold pressure, Refrigeration testing, High accuracy industrial', 'Research & development, Vacuum systems, Dynamometers, Engine test cells, General purpose', 'Semiconductor, Petrochemical, Plasma sterilizers, Vacuum packaging'],
            ['Gauge (PSIG)', '•', '•', ''],
            ['Sealed Gauge (PSIS)', '', '', ''],
            ['Compound (PSIC)', '•', '', ''],
            ['Absolute (PSIA)', '•', '•', ''],
            ['Vacuum (PSIV)', '•', '•', '•'],
            ['Ranges (PSI)', '15 to 1,000 PSIG\n15 to 1,000 PSIC\n15 to 1,000 PSIA\n0 to 14.7 PSIV', '25 to 10,000 PSIG\n25 to 5,000 PSIA\n0 to 14.7 PSIV', '10, 20, 100, 200, 1000 Torr'],
            ['Accuracy FS (RSS) or % of reading', '±0.05% FS', '±0.11% FS, ±0.073% FS', 'Standard: ±1.0% FS\nOpt.: ±0.5%, ±0.25% FS'],
            ['Operating temperature', '-40° to 185°F (-40° to 85°C)', '0 to 176°F (-18° to 80°C)', '0 to 80°C'],
            ['Compensated temperature range', '-5° to 140°F (-20 to 60°C)', 'NA', '0 to 50°C'],
            ['Thermal effect % FS/100°F (% FS/50°C)', '<0.25% (total error band)', 'Zero: <±0.4 (0.36)\nSpan: <±0.3 (0.27)', 'Zero: ±0.25% FS/50℃\nSpan: ±1.35% Rdg/50℃'],
            ['Media compatibility', 'Gases or liquid compatible with 17-4 stainless steel', "Gases or liquids compatible with Inconel®. Inconel® wetted material is for 0.5\" tube option only. Other fitting options will add stainless steel", 'Non-condensing air or gas'],
            ['Output', '0 to 5 VDC, 0 to 10 VDC, 4 to 20 mA', '4 to 20 mA, 0 to 5 VDC, 0 to 2.5 VDC, 1 to 5 VDC, 1 to 6 VDC, 0 to 10 VDC, 1 to 10 VDC', '0 to 5 VDC, 0 to 10 VDC'],
            ['Electrical terminations', '3 ft (1 m) standard cable, Standard 6-pin ext. bayonet connection', 'Cable, 30 AWG 9-conductor cable', '9-pin D-Sub, Terminal strip, 15-pin D-Sub on 6" pigtail'],
            ['Pressure fittings', '1/8" NPT Ext., 1/8" NPT Int., 1/4" NPT Ext., 1/4" NPT Int., 7/16"-20 SAE Ext.', '1/4" NPT Int.', '0.5"OD tube (inconel), ISO NW10 (16, 25), 0.25" NPT Ext']
        ]
    },
    cooling_air_cond: {
        title: 'Cooling and Air Conditioning Pressure',
        shortDesc: 'Refrigerant pressure monitoring in cooling systems, chiller plants, and commercial HVAC installations for performance and safety.',
        content: `OEM pressure transducers for fuel cells, hydraulic systems, compressors, and HVAC/R equipment. Available in wide pressure ranges with multiple electrical termination and pressure fitting options.`,
        models: [
            { name: 'AXD', image: '/hstech/images/Model AXD Pressure Sensor.png' },
            { name: '206', image: '/hstech/images/206.jpg' },
            { name: '209', image: '/hstech/images/209.png' }
        ],
        tableData: [
            ['Model', 'AXD', '206', '209'],
            ['Description', 'Low & high range OEM pressure transducer', 'Field calibration-enabled OEM pressure transducer', 'General purpose OEM pressure transducer'],
            ['Sample Applications', 'Fuel cell OEM, Industrial OEM, CNG/LNG, Hydraulic systems, Compressor control, HVAC/R equipment', 'Hydraulic systems, Compressor control, HVAC/R equipment, Tank level', 'Hydraulic systems, Compressor control, HVAC/R equipment, Tank level'],
            ['Gauge (PSIG)', '•', '•', '•'],
            ['Sealed Gauge (PSIS)', '•', '', '•'],
            ['Compound (PSIC)', '•', '•', '•'],
            ['Absolute (PSIA)', '', '•', ''],
            ['Vacuum (PSIV)', '•', '', '•'],
            ['Ranges (PSI)', '1 to 10,000 PSIG\n200 to 10,000 PSIS\n5 to 10,000 PSIC\nATM to 14.7 PSIV', '25 to 10,000 PSIG\n25 to 10,000 PSIC\n25 to 10,000 PSIA', '1 to 10,000 PSIG\n200 to 10,000 PSIS\n1 to 10,000 PSIC\nATM to 14.7 PSIV'],
            ['Accuracy FS (RSS) or % of reading', '±0.25% FS', '±0.13% FS', '±0.25% FS'],
            ['Operating temperature', '-40° to 257°F (-40° to 125°C)', '-40° to 185°F (-40° to 85°C)', '-40° to 185°F (-40° to 85°C)'],
            ['Compensated temperature range', '-4° to 176°F (-20 to 80°C)', '-4° to 176°F (-20 to 80°C)', '-4° to 176°F (-20 to 80°C)'],
            ['Thermal effect % FS/100°F (% FS/50°C)', '<1% (TEB avail.)', 'Zero: ±1 (0.9)\nSpan: ±1.5 (1.4)', 'Zero: ±2.0 (1.8)\nSpan: ±1.5 (1.3)'],
            ['Media compatibility', 'Gases or liquid compatible with 17-4 or 316L stainless steel', 'Gases or liquid compatible with 17-4 stainless steel', 'Gases or liquid compatible with 17-4 or 17-7 stainless steel'],
            ['Output', '4 to 20 mA\n0.5 to 5.5 VDC\n0.5 to 10.5 VDC (13.5 VDC Exc. Min)\n0.5 to 4.5 VDC (5 VDC Exc.)', '4 to 20 mA\n0.1 to 5.1 VDC\n1 to 5 VDC\n1 to 6 VDC\n0.1 to 10.1 VDC', '4 to 20 mA\n0.5 to 5.5 VDC\n1 to 5 VDC\n1 to 6 VDC\n0.5 to 4.5 VDC (5 VDC Exc.)'],
            ['Electrical terminations', 'Cable, 3-pin Packard, M12 4-pin, 1/2" conduit', 'Cable, Hirschmann, 1/2" conduit w/ cable, Terminal strip', 'Cable, 3-pin Packard, 4-pin Packard, "Mini" Hirschmann, Terminal strip'],
            ['Pressure fittings', '1/4" NPT Ext., 1/4" NPT Int., 1/8" NPT Ext., 1/8" NPT Int., 7/16" SAE, 1/4" Int. SAE w/ Schraeder', '1/4" NPT Ext., 1/8" NPT Ext., 7/16" SAE', '1/4" NPT Ext., 7/16" SAE Ext., 1/8" NPT Ext., 1/4 Int. SAE internal 7/16"-20 w/ Schrader, 1/2" A Ext., 1/8" NPT Int. bulkhead']
        ]
    },
    uhp_pressure: {
        title: 'UHP Pressure Sensor',
        shortDesc: 'Ultra-high purity pressure sensing for semiconductor process gas lines, cleanroom air systems, and pharmaceutical manufacturing with wetted stainless or PTFE materials.',
        content: `Ultra High Purity flow-through and surface mount pressure transducers designed for semiconductor, pharmaceutical, and biotech applications. 316L stainless steel wetted materials ensure compatibility with high purity gases and liquids.`,
        models: [
            { name: '223', image: '/hstech/images/223.png' },
            { name: '224', image: '/hstech/images/224.png' },
            { name: '225', image: '/hstech/images/225 .png' },
            { name: '227', image: '/hstech/images/227.jpg' }
        ],
        tableData: [
            ['Model', '223', '224', '225', '227'],
            ['Description', 'Ultra High Purity Flow-Through Pressure Transducers', 'Ultra High Purity Flow-Through Pressure Transducer, Virtually insensitive to thermal transients in flow stream', 'Ultra High Purity Pressure Transducers', 'Ultra-High Purity Pressure Transducer'],
            ['Sample Applications', 'High purity gas delivery, Semiconductor process tools, Pharmaceutical & biotech process, Gas cabinets', 'Gas cabinets, High purity gas delivery systems, Semiconductor process tools', 'Modular 1-1/8" surface mount gas sticks and panels, High purity gas delivery systems, Semiconductor process tools', 'Modular 1-1/8" surface mount gas sticks and panels, High purity gas delivery systems, Semiconductor process tools'],
            ['Gauge (PSIG)', '•', '•', '•', '•'],
            ['Compound (PSIC)', '•', '•', '•', '•'],
            ['Absolute (PSIA)', '•', '•', '•', '•'],
            ['Ranges (PSI)', '0 to 25 (up to 3000) PSI, 0 to 1.7 (up to 200) Bar, -14.7 to 85.3 (up to 2983.5) PSI', '0 to 25 (up to 3000) PSI, 0 to 7 (up to 200) Bar, -14.7 to 85.3 (up to 2983.5) PSI', '0 to 25 (up to 3000) PSI, 0 to 7 (up to 200) Bar, 0 to 1000 (up to1500) Torr (ab)\n-14.7 to 85.3 (up to 2983.5) PSI', '0 to 25 (up to 3000) PSI, 0 to 7 (up to 200) Bar, 0 to 1000 (up to1500) Torr (ab)\n-14.7 to 85.3 (up to 2983.5) PSI'],
            ['Accuracy FS (RSS) or % of reading', '±0.25% FS', '±1.0% FS, Opt ±0.25% FS', '±0.25% FS', '±1.0% FS, Opt ±0.25% FS'],
            ['Operating temperature', '-40 to 85°C\n-30 to 80°C (방폭)', '-40 to 85°C\n-30 to 80°C (방폭)', '-40 to 85°C\n-30 to 80°C (방폭)', '-40 to 85°C\n-30 to 80°C (방폭)'],
            ['Compensated temperature range', '-9 to 65° C', '-9 to 65° C', '-9 to 65° C', '-9 to 65° C'],
            ['Thermal effect % FS/100°F (% FS/50°C)', '±2.0 (1.8)', '±2.0 (1.8)', '±2.0 (1.8)', '±2.0 (1.8)'],
            ['Media compatibility', 'Liquid or gases compatible with 316L stainless steel', 'Liquid or gases compatible with 316L stainless steel', 'Liquid or gases compatible with 316L stainless steel', 'Liquid or gases compatible with 316L stainless steel'],
            ['Output', '4 to 20 mA (2-wire)\n0 to 5 VDC, 0 to 10 VDC, 4 to 20 mA (방폭)', '4 to 20 mA (2-wire)\n0 to 5 VDC, 0 to 10 VDC, 4 to 20 mA (방폭)', '4 to 20 mA (2-wire)\n0 to 5 VDC, 0 to 10 VDC, 4 to 20 mA (방폭)', '4 to 20 mA (2-wire)\n0 to 5 VDC, 0 to 10 VDC, 4 to 20 mA (비방폭)'],
            ['Electrical terminations', '6ft. multiconductor cable, 4 pin bayonet connector, 15 pin (9 pin) D-sub connector', '6ft. multiconductor cable, 4 pin bayonet connector, 15 pin (9 pin) D-sub connector, 5 pin mini DIN', '6ft. multiconductor cable, 4 pin bayonet connector, 15 pin D-sub connector, 4 pin M12x1', '6ft. multiconductor cable, 4 pin bayonet connector, 15 pin (9 pin) D-sub connector (비방폭)'],
            ['Pressure fittings', '#4 M/M fixed face seals (2.24" end to end)\n#4 F/F swivel face seals (3.05" end to end)\n#4 M/F swivel face seals (3.65" end to end)\n#4  M/M swivel face seals (4.25" end to end)\n1/4" tube stubs (1.85" end to end)\n3/8" tube stubs (2.25" end to end)\n1/2" tube stubs (2.25" end to end)', '#4 male face seal swivel\n#4 female face seal swivel\n1/4" NPT male\n1/4" tube stub', 'Down mount "C" seal (1.125" Base)', 'Down mount "C" seal (1.125" Base)'],
            ['방폭', 'Optional ETL certified as conforming to UL 121201 and ATEX 2014/34/EU approval available for 4 to 20 mA output units', 'Optional ETL certified as conforming to UL-1604 and ATEX 94/9/EC approval available for 4 to 20 mA output units', '', '']
        ]
    },
    barometric: {
        title: 'Barometric Pressure Sensor',
        shortDesc: 'Atmospheric reference pressure measurement for altitude compensation, weather monitoring, and environmental control systems.',
        content: `Premium and low-cost barometric pressure sensors for weather stations, environmental monitoring, and engine test applications. Provides accurate absolute pressure measurement from 500 to 1,100 mb/hPa.`,
        models: [
            { name: '270', image: '/hstech/images/270.jpg' },
            { name: '276', image: '/hstech/images/276.jpg' },
            { name: '278', image: '/hstech/images/278.jpg' }
        ],
        tableData: [
            ['Model', '270', '276', '278'],
            ['Description', 'Premium barometric pressure sensor', 'Low-cost barometric pressure transducer', 'Low power barometric pressure transducer'],
            ['Sample Applications', 'High accuracy barometric pressure measurement, Data buoys, Remote weather stations, Engine test cells', 'Environmental monitoring systems, Wind measurement systems, Weather & environmental data logging', 'AWS, Data buoys and ships, Agriculture metrology, AWOS/ASOS systems'],
            ['Gauge (PSIG)', '•', '', ''],
            ['Compound (PSIC)', '', '', ''],
            ['Absolute (PSIA)', '•', '•', '•'],
            ['Vacuum (PSIV)', '', '', ''],
            ['Ranges (PSI)', '600/800 to 1,100 mb/hPa, 5 to 100 PSIA', '600/800 to 1,100 mb/hPa, 20 PSIA', '500/600/800 to 1,100 mb/hPa'],
            ['Accuracy FS (RSS) or % of reading', '±0.03% FS, ±0.05% FS', '±0.25% FS', 'Between ±0.3 and ±2.5 mb/hPa (range dependent)'],
            ['Operating temperature', '-18° to 80°C', '-18° to 80°C', '-40 to 60°C'],
            ['Compensated temperature range', '-1 to 49° C', '-1 to 55° C', 'NA'],
            ['Thermal effect % FS/100°F (% FS/50°C)', 'Barometric: ±0.2 (0.18)\nOther: ±0.1 (0.09)', '±1% FS', 'Please view data sheet'],
            ['Media compatibility', 'Non-condensing air or gas compatible with hard anodized aluminum, alumina ceramics, gold, fluorocarbon elastomer sealant & Buna-N O-ring', 'Non-condensing air or gas compatible with stainless steel, alumina ceramics, gold, and elastomer', 'Non-condensing air or gas'],
            ['Output', '0 to 5 VDC (24 VDC Exc.), 0 to 5 VDC (12 VDC Exc.)', '0.1 to 5.1 VDC (12 VDC / 24 VDC Exc.), 0.5 to 4.5 VDC (5 VDC Exc.)', '0 to 2.5 VDC (9.5 to 28 VDC Exc.), 0 to 5 VDC (9.5 to 28 VDC Exc.)'],
            ['Electrical terminations', 'Cable', 'Cable', '5-pin terminal block'],
            ['Pressure fittings', '1/8" NPT Int.', '1/8" push tube fitting, 1/8" NPT Ext.', '1/8" barbed fitting']
        ]
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// SETRA APPLICATIONS & SOLUTION
// ═══════════════════════════════════════════════════════════════════════════

export const SETRA_APPLICATIONS_SOLUTION: Record<string, any> = {
    setra_cems: {
        title: 'Setra CEMS™',
        subtitle: 'Continuous Environmental Monitoring System',
        shortDesc: 'Real-Time Environmental Monitoring for Your Critical Spaces and Cleanroom Environments.',
        content: `The Setra CEMS™ (Continuous Environmental Monitoring System) provides comprehensive real-time monitoring for critical spaces and cleanroom environments. With cloud-based analytics and visual monitoring capabilities, CEMS ensures your facility maintains optimal environmental conditions while meeting regulatory compliance requirements.`,
        cemsApplications: [
            'Cleanroom Manufacturing',
            'Isolation & Treatment Rooms',
            'Compounding Pharmacies'
        ],
        howItWorks: {
            flowImage: '/templates/hs-tech/images/setra/cems_flow.png',
            sensorsImage: '/templates/hs-tech/images/setra/cems_sensors.png',
            steps: [
                {
                    title: 'Sensor Hardware',
                    desc: 'Pressure, Temperature, Velocity/ACH, Door Sensor, Particle Sensing, Humidity'
                },
                {
                    title: 'Setra Cloud Analytics and Data Storage',
                    desc: 'Secure cloud-based data processing and storage'
                },
                {
                    title: 'Visual Monitoring, Trending, & Alarming via CEMS® Software',
                    desc: 'Real-time dashboards, alerts, and compliance reporting'
                }
            ]
        }
    },
    cleanroom: {
        title: 'Cleanroom Manufacturing',
        subtitle: 'Cleanroom Environmental Monitoring System',
        content: `Easily monitor the environment in cleanrooms with one system that is connected to your existing network, accessible remotely, and easily scalable up to thousands of monitored locations.

CEMS software provides alarming, real-time trend data, and reports for compliance with ISO Certifications and GxP regulations. Integration and installation of your Monitoring System is fast and easy with Setra's industry leading sensors that monitor temperature, relative humidity, particle count, CO₂, differential pressure, air velocity, door contact, and more.`,
        features: [
            {
                title: 'CONTINUOUS MONITORING',
                desc: 'Monitor Temp, RH, ACH, Diff. Pressure, Particulate Count, Door Status, CO₂, and many more parameters.'
            },
            {
                title: 'MEET REGULATORY REQUIREMENTS',
                desc: 'Contained in FDA 21 CFR Part 11, EU Annex 11, USP 797/800 and ISO 14644.'
            },
            {
                title: 'ENTERPRISE WIDE',
                desc: 'Facility monitoring all within the same system for distributed access which is easily restricted to individuals on a "need to know" basis.'
            },
            {
                title: 'ALARM NOTIFICATIONS',
                desc: 'Issued in real-time via SMS / Email with the ability to customize escalation levels.'
            },
            {
                title: 'MAPS AND FLOOR PLANS',
                desc: 'Provide a quick overall snapshot of facility status.'
            },
            {
                title: 'DATA INTEGRITY',
                desc: 'Ensured through secure hosting in the SetraCLOUD or an on-premises installation.'
            },
            {
                title: 'EASY TO DEPLOY AND USE',
                desc: 'Connect CEMS software and associated measurement sensing hardware to an existing network via Ethernet, WiFi or Cellular.'
            },
            {
                title: 'WEB-BASED USER INTERFACE',
                desc: 'All that you need to interface with CEMS software from anywhere, at anytime.'
            }
        ]
    },
    isolation: {
        title: 'Isolation & Treatment Rooms',
        subtitle: 'Display Real-Time Feedback and Alarming',
        content: `Modern healthcare requires nursing staff to monitor multiple things all at the same time. One person can't be in two places at the same time, which is why Setra designed this centralized monitoring system. Our system provides healthcare professionals with a central location for monitoring the environmental conditions of critical patient rooms. Our system displays real-time data while providing audible, visual and messaging alerts to those who need it most: nursing and facilities staff.`,
        features: [
            {
                title: 'Maximize patient safety',
                desc: 'Continuous environmental monitoring ensures critical patient room conditions'
            },
            {
                title: 'Reduce burden on nursing staff',
                desc: 'Centralized monitoring eliminates the need to check each room individually'
            },
            {
                title: 'Building maps and floor plans built in for visual monitoring',
                desc: 'Quick visual status overview of all monitored locations'
            },
            {
                title: 'Enterprise wide monitoring in one system',
                desc: 'Monitor multiple facilities from a single platform'
            },
            {
                title: 'Easy to use and deploy',
                desc: 'Quick installation and intuitive interface for immediate use'
            }
        ]
    },
    compounding: {
        title: 'Compounding Pharmacies',
        subtitle: 'USP <797> and <800> Compliance Monitoring',
        content: `Hospital pharmacies are unique because of the critical role they play in maintaining patient health and safety. Pharmacies that perform compounded sterile preparations (CSPs), in particular, must meet specific clean room standards to ensure sterile conditions are maintained. While there are many established environmental requirements in these spaces, some pharmacy managers are choosing to go the extra mile in exchange for added peace of mind.

Setra CEMS™ solution paired with our sensing hardware enable you to gain real-time insights into all your locations. With our cloud-based monitoring system, you gain data visualization and actionable insights as well as automated reporting, quality integrity, and risk mitigation.`,
        features: [
            {
                title: 'Full life-cycle guidance from industry experts',
                desc: 'Expert support in hardware and software implementation'
            },
            {
                title: 'Not limited to Setra devices',
                desc: 'Easily connect 3rd party sensors for comprehensive monitoring'
            },
            {
                title: 'Eliminate manual data logging and reporting',
                desc: 'Automated data collection and compliance reporting'
            },
            {
                title: 'Regulatory compliance automation',
                desc: 'Automatically monitor data to ensure the desired airflow, temperature, and humidity levels are achieved for regulatory compliance.'
            }
        ]
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// JUMO CATEGORY INTRODUCTIONS
// ═══════════════════════════════════════════════════════════════════════════

export const JUMO_CATEGORY_INTRO: Record<string, any> = {
    jumo_temp: {
        title: 'PlastoSENS',
        subtitle: 'Precision Temperature Sensors for Plastics Processing',
        desc: 'PlastoSENS series offers innovative temperature sensors specifically designed for demanding applications in plastics processing, high-voltage environments, chemical industries, and sterilization processes.',
        products: [
            {
                model: 'plastoSENS T01',
                image: '/hstech/images/plastoSENS T01.jpg',
                features: [
                    'Nominal voltage up to 7000 V AC',
                    'Standardized, voltage-resistant probe (e.g. for use in transformers)',
                    'Electrically insulating and heat conducting at the same time',
                    'Higher capacity – compared to conventional probes used in high voltage areas',
                    'Application areas: in transformers, generators, voltage rails, combined heat and power plants, etc'
                ]
            },
            {
                model: 'plastoSENS T02',
                image: '/hstech/images/plastoSENS T02.jpg',
                features: [
                    'Vibration and shock-resistant - shock-resistant – thanks to temperature probe that is completely surrounded by plastic',
                    'Can be used in almost all liquids – even in chemicals',
                    'High-Performance plastic favors low natural frequency in case of oscillation, resulting in higher load capacity for the temperature probe',
                    'Breakage resistance due to stable sensor - Can be used for motor oils, fuels, battery acids, etc.'
                ]
            },
            {
                model: 'plastoSENS T03',
                image: '/hstech/images/plastoSENS T03 .jpg',
                features: [
                    'Protection type IP69K – also steam-tight on the cable outlet',
                    'Absolute tightness – the applied special plastics form a substance-to-substance bond during the injection molding process and thereby guarantee steam-tightness',
                    'Application areas: in autoclaves, steam sterilizers, CIP cleaning, SIP cleaning, etc.'
                ]
            },
            {
                model: 'plastoSENS T04',
                image: '/hstech/images/plastoSENS T04 .jpg',
                features: [
                    'For temperatures from -40 to +180 °C',
                    'Precise pipe adaptation through full contact to surface area',
                    'Simple and fast mounting without tools',
                    'Heat-conductible plastic',
                    'Water-tight, IP65 - 70 % quicker mounting with the clip in comparison to mounting with a conventional hose clamp'
                ]
            }
        ]
    },
    jumo_liquid: {
        title: 'Liquid Analysis',
        subtitle: 'pH, Conductivity, and Water Quality Measurement Solutions',
        desc: 'Comprehensive liquid analysis solutions for water treatment, chemical, pharmaceutical, and food & beverage industries.'
    },
    jumo_control: {
        title: 'Control & Recording',
        subtitle: 'Paperless Recorders and Process Controllers',
        desc: 'Advanced control and data recording solutions for process automation, compliance monitoring, and quality assurance.',
        products: [
            {
                model: 'JUMO LOGOSCREEN 700',
                subtitle: 'Highly-Scalable Paperless Recorder (706530)',
                image: '/hstech/images/JUMO LOGOSCREEN 700   Highly-Scalable Paperless Recorder (706530).jpg',
                features: [
                    'Intuitive touch operation',
                    'Up to 3 analog outputs',
                    'Up to 10 customer-specific process screens',
                    'PROFINET IO device interface (extra code)',
                    'Integrated web server for online visualization same as on device',
                    'Recording of up to 5 batch reports',
                    'Up to 500 individual texts',
                    'Limit value monitoring function (120 channels)',
                    'Flow measurement (up to 8 channels)',
                    'Up to 8 counter inputs (max. 12.5 kHz)',
                    'User-specific application using structured text (ST code; extra code)',
                    'Automatic data readout via PCA Communication Software PCC',
                    'Data recording compliant with FDA 21 CFR Part 11 (extra code)',
                    'Manipulation detection with digital certificate (extra code)',
                    'Setup program incl. ST editor',
                    'PC programs for data evaluation and access control',
                    'AMS2750/CQI-9 (extra code)'
                ]
            },
            {
                model: 'JUMO Quantrol Compact Controller (702030)',
                image: '/hstech/images/JUMO Quantrol Compact Controller (702030).jpg',
                features: [
                    '48 × 48 mm formats',
                    'Two-state/three-state, continuous controller',
                    'Sensor monitoring',
                    'Up to 5 outputs',
                    'Autotuning for exact PID control',
                    'Manual/automatic mode',
                    'Configurable limit value monitoring (alarms)',
                    'Setpoint changeover',
                    'Level inhibit and keyboard lock',
                    'RS485 interface (Modbus RTU)',
                    'Ramp and timer function',
                    'Firing curve for pottery kilns',
                    'Push-in controller insert',
                    'Setup interface (USB Mini-B)'
                ]
            }
        ]
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// JUMO APPLICATIONS & SOLUTIONS
// ═══════════════════════════════════════════════════════════════════════════

export const JUMO_APPLICATIONS: Record<string, any> = {
    water_wastewater: {
        title: 'Water & Wastewater',
        shortDesc: 'pH, conductivity, and turbidity monitoring for drinking water treatment plants and effluent compliance.',
        image: '/templates/hs-tech/images/jumo/water_wastewater.jpg',
        content: `For water and wastewater technology, JUMO offers a variety of solutions for the most diverse applications. Whatever the requirements of measurement technology, JUMO always meets your needs. With the goal of guaranteeing consistent high-quality water and treated wastewater, there is a need to perform reliable, accurate measurements, which can be controlled and monitored from a central location.`,
        applications: [
            'Drinking water',
            'Swimming pool water',
            'Process water and Wastewater'
        ],
        measurementProducts: [
            'Find detailed information about products JUMO offers to the water and wastewater engineering'
        ]
    },
    shipbuilding: {
        title: 'Shipbuilding',
        shortDesc: 'Marine-grade sensors for seawater cooling systems, ballast water treatment, and shipboard process monitoring.',
        image: '/templates/hs-tech/images/jumo/shipbuilding.jpg',
        content: `The shipbuilding industry has high and varied demands on measuring devices. Equipment for this industry must have a secure process, long-term stability, and be unsusceptible to the salty humid sea air. In addition to the salty air, the devices are exposed to strong vibration, shocks, heat, cold, and dust. JUMO, your reliable partner, is at your side to help when you have questions, and to provide you with quick solutions.`,
        applications: [
            'Heating and cooling systems',
            'Engine room monitoring',
            'Water and wastewater treatment',
            'Ballast water management',
            'Ventilation and air conditioning systems'
        ],
        measurementProducts: [
            'Marine-grade pH sensors',
            'Conductivity transmitters',
            'Temperature sensors for harsh environments',
            'Pressure transducers'
        ]
    },
    pharmaceutical: {
        title: 'Pharmaceutical & Biotechnology',
        shortDesc: 'Precise liquid parameter control for sterile manufacturing, bioreactor processes, and purified water systems.',
        image: '/templates/hs-tech/images/jumo/pharmaceutical.jpg',
        content: `Whatever is demanded of the measurement technology, JUMO will always meet every requirement. Because the aim is to produce products of a consistently high quality, it is imperative to have reliable and accurate measurements which can be controlled and monitored from a central point.`,
        applications: [
            'Pharmaceutical water production',
            'Biological additives',
            'Sterilization processes',
            'Drying processes',
            'Clean room monitoring'
        ],
        measurementProducts: [
            'Sanitary pH electrodes',
            'Conductivity sensors for ultra-pure water',
            'Temperature sensors for sterilization',
            'Process controllers for GMP compliance'
        ]
    },
    semiconductor: {
        title: 'Semiconductor & Display',
        shortDesc: 'Ultra-pure water quality monitoring with high-accuracy conductivity and pH measurement for wafer cleaning and etching.',
        image: '/templates/hs-tech/images/jumo/semiconductor.jpg',
        content: `Solutions for cleaning, PCB etching, phenomenon, stripping and scrubber for semiconductor and display industries.`,
        applications: [
            'Scrubber systems',
            'PCB etching processes',
            'Wafer cleaning',
            'CVD processes',
            'Pump monitoring'
        ],
        measurementProducts: [
            'Ultra-pure water conductivity sensors',
            'pH sensors for etching processes',
            'Chemical concentration monitors',
            'Flow and pressure sensors'
        ]
    },
    heating: {
        title: 'Heating & Air Conditioning',
        shortDesc: 'Water quality management in HVAC systems and cooling towers to prevent corrosion, scaling, and biological growth.',
        image: '/templates/hs-tech/images/jumo/heating.jpg',
        content: `We all prefer a nice warm room. As manufacturers of heating and air-conditioning systems, you know just how important it is for all the components involved to be reliably controlled and monitored. JUMO, your reliable partner, is at your side to help when you have questions, and to provide you with quick solutions. It does not matter how you want to control and regulate your system, nor does it matter how you would like to protect your system.`,
        applications: [
            'Condensing boilers',
            'Solid fuel boilers',
            'Pellet heating systems',
            'Combined heat and power plants',
            'Air-conditioning and heat pumps'
        ],
        measurementProducts: [
            'Temperature controllers',
            'Pressure sensors',
            'Flow monitors',
            'PID controllers for boiler systems'
        ]
    },
    aquaculture: {
        title: 'Aquaculture',
        shortDesc: 'Continuous pH, dissolved oxygen, and conductivity monitoring for fish farming and recirculating aquaculture systems.',
        image: '/templates/hs-tech/images/jumo/aquaculture.jpg',
        content: `Fisheries is now the fastest growing area in food production, and more and more fish and crustaceans are being cultivated. In the aquaculture, water quality is determined by reliable processes and accurate measurement techniques, requiring precise products and solutions.`,
        applications: [
            'Fish farming',
            'Recirculating aquaculture systems (RAS)',
            'Water quality monitoring',
            'Dissolved oxygen control',
            'pH and temperature monitoring'
        ],
        measurementProducts: [
            'pH electrodes for aquatic environments',
            'Dissolved oxygen sensors',
            'Conductivity transmitters',
            'Temperature probes',
            'Multi-parameter controllers'
        ]
    }
}
