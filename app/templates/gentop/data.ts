// Last Updated: 2026-02-05 11:20 KST
export interface MenuItem {
    id: string
    label: string
    href: string
    subs?: MenuItem[]
}

export interface BrandItem {
    brand: string
    href: string
    items: MenuItem[]
}

export const GENTOP_MENU: BrandItem[] = [
    {
        brand: 'GENTOP',
        href: '/templates/gentop?tab=cover',
        items: [
            {
                id: 'company',
                label: 'COMPANY',
                href: '/templates/gentop?category=company',
                subs: [
                    { id: 'overview', label: 'Company Overview', href: '/templates/gentop?category=company&tab=overview' },
                    { id: 'greeting', label: 'CEO Message', href: '/templates/gentop?category=company&tab=greeting' },
                    { id: 'history', label: 'History', href: '/templates/gentop?category=company&tab=history' },
                    { id: 'philosophy', label: 'Philosophy', href: '/templates/gentop?category=company&tab=philosophy' },
                    { id: 'org', label: 'Organization', href: '/templates/gentop?category=company&tab=org' },
                    { id: 'biz_area', label: 'Business Area', href: '/templates/gentop?category=company&tab=biz_area' },
                    { id: 'cert', label: 'Certifications', href: '/templates/gentop?category=company&tab=cert' },
                    { id: 'ci', label: 'CI/BI', href: '/templates/gentop?category=company&tab=ci' },
                    { id: 'location', label: 'Location', href: '/templates/gentop?category=company&tab=location' }
                ]
            },
            {
                id: 'business',
                label: 'BUSINESS SCOPE',
                href: '/templates/gentop?category=business',
                subs: [
                    { id: 'infra', label: 'Construction Infra', href: '/templates/gentop?category=business&tab=infra' },
                    { id: 'fm', label: 'Facility Management', href: '/templates/gentop?category=business&tab=fm' },
                    { id: 'pa', label: 'Public Address System', href: '/templates/gentop?category=business&tab=pa' },
                    { id: 'parking', label: 'Parking Control', href: '/templates/gentop?category=business&tab=parking' },
                    { id: 'access', label: 'Access Control', href: '/templates/gentop?category=business&tab=access' },
                    { id: 'cctv', label: 'CCTV System', href: '/templates/gentop?category=business&tab=cctv' },
                    { id: 'led', label: 'LED Display', href: '/templates/gentop?category=business&tab=led' },
                    { id: 'eco', label: 'Eco-Friendly Energy', href: '/templates/gentop?category=business&tab=eco' },
                    { id: 'defense', label: 'Defense Business', href: '/templates/gentop?category=business&tab=defense' }
                ]
            },
            {
                id: 'mas',
                label: 'MAS PRODUCTS',
                href: '/templates/gentop?category=mas',
                subs: [
                    { id: 'mas_cctv', label: 'Video Surveillance (MAS)', href: '/templates/gentop?category=mas&tab=mas_cctv' }
                ]
            },
            {
                id: 'portfolio',
                label: 'PORTFOLIO',
                href: '/templates/gentop?category=portfolio',
                subs: [
                    { id: 'port_list', label: 'Project Portfolio', href: '/templates/gentop?category=portfolio&tab=port_list' }
                ]
            },
            {
                id: 'center',
                label: 'PR CENTER',
                href: '/templates/gentop?category=center',
                subs: [
                    { id: 'notice', label: 'Notice', href: '/templates/gentop?category=center&tab=notice' },
                    { id: 'catalog', label: 'E-Catalog', href: '/templates/gentop?category=center&tab=catalog' },
                    { id: 'video', label: 'PR Video', href: '/templates/gentop?category=center&tab=video' },
                    { id: 'event', label: 'Events', href: '/templates/gentop?category=center&tab=event' },
                ]
            },
            {
                id: 'recruit',
                label: 'RECRUIT',
                href: '/templates/gentop?category=recruit',
                subs: [
                    { id: 'recruit_info', label: 'Recruit Info', href: '/templates/gentop?category=recruit&tab=recruit_info' },
                    { id: 'faq', label: 'FAQ', href: '/templates/gentop?category=recruit&tab=faq' },
                ]
            },
            {
                id: 'inquiry',
                label: 'CONTACT',
                href: '/templates/gentop?category=inquiry',
                subs: [
                    { id: 'contact_form', label: 'Online Inquiry', href: '/templates/gentop?category=inquiry&tab=contact_form' }
                ]
            }
        ]
    }
]

// Real Image Mapping based on gentop.co.kr Structure
export const DB: Record<string, any> = {
    // COMPANY
    overview: { title: 'Company Overview', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80', desc: 'GENTOP Co., Ltd. is a leading provider of integrated mechatronics ensuring safety and efficiency.' },
    greeting: { title: 'CEO Message', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80', desc: 'We are committed to customer value creation through continuous innovation and trust.' },
    history: { title: 'History', image: 'https://images.unsplash.com/photo-1507207611509-9807fa2341c9?auto=format&fit=crop&w=1600&q=80', desc: 'A journey of growth and technological advancement since our establishment in 2004.' },
    philosophy: { title: 'Management Philosophy', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80', desc: 'Harmony of People, Technology, and Environment for a better future.' },
    org: { title: 'Organization', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80', desc: 'Organized for efficiency: Management, Sales, Technology, and R&D Divisions.' },
    biz_area: { title: 'Business Area', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80', desc: 'Comprehensive ICT solutions ranging from infrastructure to smart control systems.' },
    cert: { title: 'Certifications', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1600&q=80', desc: 'Proven quality with ISO certifications, Patent registrations, and Industry awards.' },
    ci: { title: 'CI / BI', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80', desc: 'Our identity reflects our core values of innovation and reliability.' },
    location: { title: 'Location', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1600&q=80', desc: 'Visit our headquarters: Haeundae-gu, Busan, South Korea.' },

    // BUSINESS
    infra: { title: 'Construction Infra', image: 'https://images.unsplash.com/photo-1544725121-be3bf52e2dc8?auto=format&fit=crop&w=1600&q=80', desc: 'Expert ICT infrastructure construction for smart buildings and cities.' },
    fm: { title: 'Facilities Management', image: 'https://images.unsplash.com/photo-1581094794329-cd48ef42bf68?auto=format&fit=crop&w=1600&q=80', desc: 'Integrated facility management solutions for optimal building performance.' },
    pa: { title: 'Public Address System', image: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&w=1600&q=80', desc: 'Advanced PA systems ensuring clear communication and safety broadcasting.' },
    parking: { title: 'Parking Control', image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1600&q=80', desc: 'Smart parking systems with LPR and automated payment integration.' },
    access: { title: 'Access Control', image: 'https://images.unsplash.com/photo-1558002038-1091a1661f31?auto=format&fit=crop&w=1600&q=80', desc: 'Secure entry management with biometric and RFID technologies.' },
    cctv: { title: 'CCTV System', image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1600&q=80', desc: 'High-definition video surveillance for enhanced security and monitoring.' },
    led: { title: 'LED Display', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80', desc: 'indoor/Outdoor LED displays for vivid visual communication.' },
    eco: { title: 'Eco-Friendly Energy', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=80', desc: 'Solar and wind energy solutions for a sustainable future.' },
    defense: { title: 'Defense Business', image: 'https://images.unsplash.com/photo-1598367772323-3be63e11385c?auto=format&fit=crop&w=1600&q=80', desc: 'Specialized defense equipment and communication systems.' },

    // MAS
    mas_cctv: { title: 'MAS Video Surveillance', image: 'https://images.unsplash.com/photo-1580982327559-c1202864eb05?auto=format&fit=crop&w=1600&q=80', desc: 'Public procurement service certified video surveillance products.' },

    // PORTFOLIO
    port_list: { title: 'Project References', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80', desc: 'Notable Projects: Myeong-dong Water Plant, Uiryeong Center, Digital Media Center, and more.' },

    // PR CENTER
    notice: { title: 'Notices', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80', desc: 'Check out the latest news and announcements.' },
    catalog: { title: 'E-Catalog', image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=1600&q=80', desc: 'Download detailed brochures for our products and solutions.' },
    video: { title: 'PR Video', image: 'https://images.unsplash.com/photo-1492619879874-88db10a9b31d?auto=format&fit=crop&w=1600&q=80', desc: 'Watch our corporate promotional videos.' },
    event: { title: 'Event Gallery', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80', desc: 'Photos from our company events and exhibitions.' },

    // RECRUIT
    recruit_info: { title: 'Recruit Info', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80', desc: 'Join us and grow your career with Gentop.' },
    faq: { title: 'Recruit FAQ', image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1600&q=80', desc: 'Frequently asked questions about our hiring process.' },

    // INQUIRY
    contact_form: { title: 'Online Inquiry', image: 'https://images.unsplash.com/photo-1423666639041-f14dcceaeb36?auto=format&fit=crop&w=1600&q=80', desc: 'Have questions? Send us a message.' }
}
