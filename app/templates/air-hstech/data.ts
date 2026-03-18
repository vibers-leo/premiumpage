/**
 * Air HS-TECH Catalog Data
 * Source: hstechco.com/en
 * Brand: GENWISH — DC Engine-Off Air Conditioner Manufacturer
 */

// ─── Company Information ─────────────────────────────────────────────────────
export const COMPANY = {
    name: 'HS TECH',
    brand: 'GENWISH',
    tagline: 'As a leader in DC Non-Starting',
    subtagline: 'HS TECH, a leader of engine-off DC air conditioner manufacturers, always explore consumer needs.',
    ceo: 'Park, JoonWoo',
    businessReg: '147-87-00974',
    address: 'No. 56 Science Industrial complex 2ro Rd 3 Gahngseogu Busan metropolitan (Jisahdong)',
    tel: '+82-51-831-9935',
    fax: '+82-51-831-9930',
    email: 'hstech17@daum.net',
    inquiryHours: 'Weekdays 09:00am ~ 17:30pm (Closed on weekends and national holidays)',
    founded: '2017',
    country: 'Republic of Korea',
}

// ─── Brand Story ─────────────────────────────────────────────────────────────
export const BRAND = {
    name: 'GENWISH',
    origin: "It is a combination of 'Genius' meaning 'special talent' and 'Wish' meaning 'wind' in Korean, which implies an engine-off air conditioner brand of reasonable functions.",
    symbolMark: "The symbol is a core element of our BI (brand image) that is used as a communication tool for all visual media. Since the symbol internally creates a sense of unity and externally delivers a consistent image of the corporate identity to the public, it must be used in accordance with the logo use standards of each element.",
    signature: "The signature means the optimal formative combination of symbol mark and logo type. The standard up-and-down and left-right combination can be selectively used to the applicable environment or purpose.",
}

// ─── CEO Greeting ────────────────────────────────────────────────────────────
export const GREETING = {
    paragraphs: [
        "We, a leader of engine-off DC air conditioner manufacturers have developed a cooling/heating system suitable for any vehicle.",
        "For the best product quality and performance, we provide all clients with the comfortable environment.",
        "With an open mind and understanding diversity, we will move forward to create new values in the future through constant efforts and research.",
        "We will grow to be one of the most advanced manufacturers in the HVAC industry both nationwide and worldwide.",
        "We always do our best to serve our clients with ac blowing cool air in summer and heater blowing warm air in winter. We will satisfy you with the best technology and service.",
        "We will try more and more to meet your market needs. HS TECH will be reborn to grow and develop together with the clients. We would like you to send us your constant support and encouragement.",
    ],
}

// ─── History Timeline ────────────────────────────────────────────────────────
export const HISTORY: { year: string; events: { month: string; desc: string; img?: string }[] }[] = [
    {
        year: '2021',
        events: [
            { month: '06', desc: 'Genwish trademark application', img: '/templates/air-hstech/images/history-2021.png' },
            { month: '06', desc: '2 patent applications of engine-off air conditioner control' },
            { month: '05', desc: 'MOU with Victory RV' },
        ],
    },
    {
        year: '2020',
        events: [
            { month: '06', desc: 'Registration of people and technology companies', img: '/templates/air-hstech/images/history-2020.png' },
            { month: '04', desc: 'Venture company certification acquired' },
            { month: '01', desc: 'Company affiliated research center, established' },
        ],
    },
    {
        year: '2019',
        events: [
            { month: '08', desc: 'IATF16949 certification acquired' },
            { month: '05', desc: 'Registered as a partner of Hyosung Electronics', img: '/templates/air-hstech/images/history-2019.jpg' },
            { month: '04', desc: 'Excellent-technology company certification acquired — Nice D&B Co., Ltd.' },
            { month: '04', desc: 'Transfer of patent rights of HVAC motor case manufacturing' },
        ],
    },
    {
        year: '2018',
        events: [
            { month: '03', desc: 'ISO9001 certification acquired' },
            { month: '02', desc: 'DY (former Dongyang Electricity) company registered', img: '/templates/air-hstech/images/history-2018.png' },
        ],
    },
    {
        year: '2017',
        events: [
            { month: '10', desc: 'HS TECH Co., Ltd. founded', img: '/templates/air-hstech/images/history-2017.jpg' },
        ],
    },
]

// ─── Certifications ──────────────────────────────────────────────────────────
export const CERTIFICATIONS = [
    { id: 'cert-1', label: 'IATF16949', year: '2019', img: '/templates/air-hstech/images/cert-1.jpg' },
    { id: 'cert-2', label: 'ISO9001', year: '2018', img: '/templates/air-hstech/images/cert-2.jpg' },
    { id: 'cert-3', label: 'Venture Company', year: '2020', img: '/templates/air-hstech/images/cert-3.jpg' },
    { id: 'cert-4', label: 'Excellent Technology', year: '2019', img: '/templates/air-hstech/images/cert-4.jpg' },
]

// ─── DC AI Technology ────────────────────────────────────────────────────────
export const DC_TECHNOLOGY = {
    title: 'HSTECH Hitech Digital Artificial Intelligence Engine-Off Air Conditioner',
    desc: 'With use conditions of HS TECH digital artificial intelligence engine off air conditioner, this is a high-tech engine off air conditioner that minimizes battery consumption by load fluctuations of self-regulation.',
    aiControl: {
        title: 'Artificial Intelligence Control',
        steps: [
            { label: 'Operation', desc: 'One Touch' },
            { label: 'Sensor', desc: 'Automatic sensor detecting indoor temperature and operating conditions' },
            { label: 'AI Processing', desc: 'Optimal compressor operation by setting condition' },
            { label: 'Fan Control', desc: 'Fan Speed — Automatic fan speed' },
            { label: 'Climate Control', desc: 'Rapid cooling and heating self-regulated by temperature' },
            { label: 'Natural Feel', desc: 'Automatic comfort / automatic control' },
        ],
    },
    advantages: [
        'Automatic adjustment by detecting changes in the load of the room temperature',
        'Cooling/heating control under optimal conditions',
        'Reduction of power consumption by power-saving operation under optimal conditions (power consumption reduced by 40% compared to constant speed)',
        'The digital function instantly informs the operation status',
    ],
}

// ─── Products Database ───────────────────────────────────────────────────────
export interface ProductSpec {
    label: string
    value: string
}

export interface Product {
    id: string
    model: string
    name: string
    category: 'separate' | 'allinone' | 'heater' | 'controller' | 'accessory'
    type: string
    image: string
    desc: string
    specs: ProductSpec[]
    features?: string[]
}

export const PRODUCTS: Product[] = [
    // ── Separate Type ACs ──────────────────────────────────────────────────
    {
        id: 'hsd-180d',
        model: 'HSD-180D',
        name: 'DC Engine-Off Air Conditioner',
        category: 'separate',
        type: 'Separate Type — Horizontal Outdoor',
        image: '/templates/air-hstech/images/HSD-180D.jpg',
        desc: 'High-performance 1800W separate-type engine-off DC air conditioner with horizontal outdoor unit. Designed for cranes and heavy industrial vehicles.',
        specs: [
            { label: 'Power Supply', value: 'DC 24V' },
            { label: 'Refrigerant', value: 'R-134A' },
            { label: 'Cooling Capacity', value: '1,800W' },
            { label: 'Type', value: 'Separate (Outdoor: Horizontal)' },
        ],
        features: ['Digital AI control', 'Automatic temperature regulation', 'One-touch operation', '40% energy saving vs constant speed'],
    },
    {
        id: 'hsh-260d',
        model: 'HSH-260D',
        name: 'DC Engine-Off Air Conditioner',
        category: 'separate',
        type: 'Separate Type — Horizontal Indoor',
        image: '/templates/air-hstech/images/HSH-260D.jpg',
        desc: 'High-capacity 2600W separate-type engine-off DC air conditioner with horizontal indoor unit. Ideal for cabins requiring large cooling/heating output.',
        specs: [
            { label: 'Power Supply', value: 'DC 24V' },
            { label: 'Refrigerant', value: 'R-134A' },
            { label: 'Cooling Capacity', value: '2,600W' },
            { label: 'Type', value: 'Separate (Indoor: Horizontal)' },
        ],
        features: ['High-capacity cooling', 'Horizontal indoor unit', 'AI-controlled compressor', 'Industrial-grade durability'],
    },
    {
        id: 'hsp-180d',
        model: 'HSP-180D',
        name: 'Portable DC Engine-Off Air Conditioner',
        category: 'separate',
        type: 'Separate Type — Portable',
        image: '/templates/air-hstech/images/HSP-180D.jpg',
        desc: '1800W portable separate-type engine-off DC air conditioner. Versatile installation for various vehicle configurations.',
        specs: [
            { label: 'Power Supply', value: 'DC 24V' },
            { label: 'Refrigerant', value: 'R-134A' },
            { label: 'Cooling Capacity', value: '1,800W' },
            { label: 'Type', value: 'Separate (Portable)' },
        ],
        features: ['Portable design', 'Versatile installation', 'Compact form factor', 'DC 24V operation'],
    },
    {
        id: 'hsv-260d',
        model: 'HSV-260D',
        name: 'DC Engine-Off Air Conditioner',
        category: 'separate',
        type: 'Separate Type — Vertical Indoor',
        image: '/templates/air-hstech/images/HSV-260D.jpg',
        desc: '2600W separate-type engine-off DC air conditioner with vertical indoor unit. Superior airflow distribution for larger cabins.',
        specs: [
            { label: 'Power Supply', value: 'DC 24V' },
            { label: 'Refrigerant', value: 'R-134A' },
            { label: 'Cooling Capacity', value: '2,600W' },
            { label: 'Type', value: 'Separate (Indoor: Vertical)' },
        ],
        features: ['Vertical air discharge', 'Superior distribution', 'High cooling capacity', 'Premium comfort'],
    },
    // ── All-in-One ──────────────────────────────────────────────────────────
    {
        id: 'hss-065s',
        model: 'HSS-065S',
        name: 'All-in-One DC Engine-Off Air Conditioner',
        category: 'allinone',
        type: 'All-in-One Type',
        image: '/templates/air-hstech/images/HSS-065S.jpg',
        desc: 'Compact 650W all-in-one engine-off DC air conditioner. Perfect for small vehicles and campervans. Self-contained unit for easy installation.',
        specs: [
            { label: 'Power Supply', value: 'DC 12V' },
            { label: 'Refrigerant', value: 'R-134A' },
            { label: 'Cooling Capacity', value: '650W' },
            { label: 'Type', value: 'All-in-One' },
        ],
        features: ['Self-contained unit', 'DC 12V compatibility', 'Easy installation', 'Compact design'],
    },
    // ── Heaters ────────────────────────────────────────────────────────────
    {
        id: 'hs-024h',
        model: 'HS-024H',
        name: 'DC Heater & Air Purifier',
        category: 'heater',
        type: 'DC Heater / Air Purifier',
        image: '/templates/air-hstech/images/HS-024H.jpg',
        desc: 'Multi-functional DC-powered heater with integrated air purification. Provides warmth and clean air in vehicle cabins during engine-off operation.',
        specs: [
            { label: 'Power Supply', value: 'DC 24V' },
            { label: 'Function', value: 'Heating + Air Purification' },
            { label: 'Operation', value: 'Engine-Off (Non-Operating)' },
        ],
        features: ['Dual function: heating + purification', 'DC 24V operation', 'Engine-off compatible', 'Cabin air quality improvement'],
    },
    {
        id: 'hs-220h',
        model: 'HS-220H',
        name: 'AC Heater & Air Purifier',
        category: 'heater',
        type: 'AC Heater / Air Purifier',
        image: '/templates/air-hstech/images/HS-220H.jpg',
        desc: 'AC-powered heater and air purifier combination unit. Delivers superior heating performance and air purification for vehicle interiors.',
        specs: [
            { label: 'Power Supply', value: 'AC 220V' },
            { label: 'Function', value: 'Heating + Air Purification' },
            { label: 'Operation', value: 'Non-Operating Mode' },
        ],
        features: ['AC power compatibility', 'High heating capacity', 'Integrated air purifier', 'Commercial-grade performance'],
    },
    // ── Controllers ────────────────────────────────────────────────────────
    {
        id: 'touch-display',
        model: 'Touchable Display',
        name: 'Touchable Display Controller',
        category: 'controller',
        type: 'Touch Screen Controller',
        image: '/templates/air-hstech/images/touch-display.jpg',
        desc: 'Intuitive touchscreen display controller for GENWISH air conditioner systems. Easy-to-read digital interface for complete climate control.',
        specs: [
            { label: 'Type', value: 'Touchscreen' },
            { label: 'Interface', value: 'Digital Display' },
            { label: 'Compatible', value: 'GENWISH Series' },
        ],
        features: ['Touchscreen interface', 'Digital readout', 'Temperature display', 'Mode selection'],
    },
    {
        id: 'btn-display',
        model: 'A Button-Type Display',
        name: 'Button-Type Display Controller',
        category: 'controller',
        type: 'Button Controller',
        image: '/templates/air-hstech/images/btn-display.jpg',
        desc: 'Durable button-type display controller for GENWISH air conditioner systems. Reliable physical buttons for harsh operating environments.',
        specs: [
            { label: 'Type', value: 'Button + LED Display' },
            { label: 'Interface', value: 'Physical Buttons' },
            { label: 'Compatible', value: 'GENWISH Series' },
        ],
        features: ['Physical button interface', 'Glove-friendly operation', 'Vibration resistant', 'Industrial grade'],
    },
    // ── Accessories ────────────────────────────────────────────────────────
    {
        id: 'shared-room',
        model: 'Shared Room',
        name: 'Shared Room for Outdoor Units',
        category: 'accessory',
        type: 'Outdoor Unit Enclosure',
        image: '/templates/air-hstech/images/shared-room.jpg',
        desc: 'Protective enclosure system for multiple outdoor units. Enables efficient space utilization when multiple GENWISH units are deployed.',
        specs: [
            { label: 'Type', value: 'Outdoor Unit Enclosure' },
            { label: 'Purpose', value: 'Multi-unit Housing' },
            { label: 'Compatible', value: 'GENWISH Separate Series' },
        ],
        features: ['Space optimization', 'Multi-unit compatible', 'Weather protection', 'Modular design'],
    },
]

// ─── Applications ────────────────────────────────────────────────────────────
export interface Application {
    id: string
    title: string
    desc: string
    highlights: string[]
    images: string[]
}

export const APPLICATIONS: Application[] = [
    {
        id: 'crane',
        title: 'CRANE',
        desc: 'GENWISH engine-off air conditioners deliver reliable climate control for crane operator cabins. Maximizing operator comfort and productivity without engine idling.',
        highlights: [
            'Engine-off operation eliminates idle fuel consumption',
            'Consistent cabin temperature during long operating shifts',
            'Robust design withstands heavy industrial environments',
            'DC 24V compatible with crane electrical systems',
        ],
        images: [
            '/templates/air-hstech/images/crane-1.jpg',
            '/templates/air-hstech/images/crane-2.jpg',
            '/templates/air-hstech/images/crane-3.jpg',
        ],
    },
    {
        id: 'campingcar',
        title: 'CAMPING CAR',
        desc: 'Perfect for RV and camping car applications, providing comfortable temperature control during rest periods without running the vehicle engine.',
        highlights: [
            'Silent operation — no engine noise during sleep',
            'DC 12V and 24V options for various vehicle types',
            'Energy-efficient for battery-powered setups',
            'Compact all-in-one models for small campervans',
        ],
        images: [],
    },
    {
        id: 'ship',
        title: 'SHIP',
        desc: 'Marine-grade engine-off air conditioning for ship crew cabins and wheelhouses. Maintains comfortable conditions during anchor or port stay.',
        highlights: [
            'Corrosion-resistant design for marine environments',
            'Engine-off operation during port stays',
            'Reliable performance in humid marine conditions',
            'Multiple unit configurations for vessel layouts',
        ],
        images: [
            '/templates/air-hstech/images/ship-1.jpg',
            '/templates/air-hstech/images/ship-2.jpg',
            '/templates/air-hstech/images/ship-3.jpg',
        ],
    },
]

// ─── Product Categories ──────────────────────────────────────────────────────
export const PRODUCT_CATEGORIES = {
    separate: {
        label: 'Separate Type',
        desc: 'High-performance split-type DC air conditioners for heavy vehicles',
        models: ['HSD-180D', 'HSH-260D', 'HSP-180D', 'HSV-260D'],
    },
    allinone: {
        label: 'All-in-One Type',
        desc: 'Compact self-contained DC air conditioners',
        models: ['HSS-065S'],
    },
    heater: {
        label: 'Heater / Purifier',
        desc: 'DC and AC heaters with integrated air purification',
        models: ['HS-024H', 'HS-220H'],
    },
    controller: {
        label: 'Controllers',
        desc: 'Display controllers for GENWISH systems',
        models: ['Touchable Display', 'A Button-Type Display'],
    },
    accessory: {
        label: 'Accessories',
        desc: 'Optional components and housing solutions',
        models: ['Shared Room'],
    },
}
