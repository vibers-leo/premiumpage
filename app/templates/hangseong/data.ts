import { Factory, History, Globe, Users, Trophy, Lightbulb, MapPin, Settings, ShieldCheck, FileCheck, Phone, Megaphone } from 'lucide-react'

// Icon Mapping
export const ICON_MAP: Record<string, any> = {
    company: Factory,
    history: History,
    global: Globe,
    users: Users,
    trophy: Trophy,
    vision: Lightbulb,
    location: MapPin,
    process: Settings,
    quality: ShieldCheck,
    cert: FileCheck,
    contact: Phone,

}

// Top Navigation Structure (Based on Official Website)
export const HANGSEONG_MENU = [
    {
        brand: 'HANGSEONG',
        href: '/templates/hangseong?tab=cover',
        items: [
            {
                id: 'about',
                label: 'About Us',
                href: '/templates/hangseong?tab=about',
                subs: [
                    { id: 'greeting', label: 'Greeting', href: '/templates/hangseong?category=about&tab=greeting' },
                    { id: 'history', label: 'History', href: '/templates/hangseong?category=about&tab=history' },
                    { id: 'summary', label: 'Summary', href: '/templates/hangseong?category=about&tab=summary' },
                    { id: 'organization', label: 'Organization chart', href: '/templates/hangseong?category=about&tab=organization' },
                    { id: 'vision', label: 'Vision & expectation', href: '/templates/hangseong?category=about&tab=vision' },
                    { id: 'location', label: 'Directions & Map', href: '/templates/hangseong?category=about&tab=location' }
                ]
            },
            {
                id: 'products',
                label: 'Introduction of Item',
                href: '/templates/hangseong?tab=products',
                subs: [
                    { id: 'hvac', label: 'HVAC Blower Motors', href: '/templates/hangseong?category=products&tab=hvac' },
                    { id: 'all_in_one', label: 'All-in-one Motors', href: '/templates/hangseong?category=products&tab=all_in_one' },
                    { id: 'other_press', label: 'Other press products', href: '/templates/hangseong?category=products&tab=other_press' }
                ]
            },
            {
                id: 'qm',
                label: 'QM',
                href: '/templates/hangseong?tab=qm',
                subs: [
                    { id: 'quality_mgmt', label: 'Quality Management', href: '/templates/hangseong?category=qm&tab=quality_mgmt' }
                ]
            },
            {
                id: 'equipment',
                label: 'Equipment',
                href: '/templates/hangseong?tab=equipment',
                subs: [
                    { id: 'equipment_status', label: 'Equipment Status', href: '/templates/hangseong?category=equipment&tab=equipment_status' }
                ]
            },
            {
                id: 'reliability',
                label: 'Reliability Evaluation',
                href: '/templates/hangseong?tab=reliability',
                subs: [
                    { id: 'process_chart', label: 'Process Chart', href: '/templates/hangseong?category=reliability&tab=process_chart' },
                    { id: 'certification', label: 'Certification', href: '/templates/hangseong?category=reliability&tab=certification' }
                ]
            },
            {
                id: 'support',
                label: 'Support',
                href: '/templates/hangseong?tab=support',
                subs: [
                    { id: 'contact', label: 'Contact Us', href: '/templates/hangseong?category=support&tab=contact' }
                ]
            }
        ]
    }
]

// Category Information (Used for Bento/Grid views)
export const CATEGORY_INFO: Record<string, any> = {
    // About Us
    about: { title: 'About Us', desc: 'Global Leader in Automotive Parts', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80' },
    greeting: { title: 'CEO Message', desc: 'Message from the CEO', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80' },
    history: { title: 'History', desc: 'Our Journey of Innovation', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80' },
    summary: { title: 'Summary', desc: 'Company Overview', image: 'https://images.unsplash.com/photo-1554774853-719586f8c277?auto=format&fit=crop&w=1200&q=80' },
    organization: { title: 'Organization', desc: 'Corporate Structure', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80' },
    vision: { title: 'Vision', desc: 'Future Expectations', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80' },
    location: { title: 'Directions', desc: 'Where to Find Us', image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80' },

    // Products
    products: { title: 'Products', desc: 'High Quality Automotive Components', image: 'https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?auto=format&fit=crop&w=1200&q=80' },
    hvac: { title: 'HVAC Blower Motors', desc: 'High Performance Blower Motor Parts', image: '/templates/hangseong/images/hvac_products.png' },
    all_in_one: { title: 'All-in-one Motors', desc: 'Integrated Cooling Solutions', image: '/templates/hangseong/images/cooling_products.png' },
    other_press: { title: 'Other Press Products', desc: 'Precision Stamped Components', image: '/templates/hangseong/images/other_products.png' },

    // QM
    qm: { title: 'Quality Management', desc: 'Zero Defect Quality System', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80' },
    quality_mgmt: { title: 'Quality Management', desc: 'Quality System & Policy', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80' },

    // Equipment
    equipment: { title: 'Equipment', desc: 'State-of-the-art Facilities', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80' },
    equipment_status: { title: 'Equipment Status', desc: 'Manufacturing Machinery', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80' },

    // Reliability
    reliability: { title: 'Reliability Evaluation', desc: 'Testing & Certification', image: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&w=1200&q=80' },
    process_chart: { title: 'Process Chart', desc: 'Manufacturing Process Flow', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80' },
    certification: { title: 'Certification', desc: 'International Standards', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80' },

    // Support
    support: { title: 'Support', desc: 'Customer Center', image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80' },

    contact: { title: 'Contact Us', desc: 'Get in Touch', image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80' }
}

// Sub-Category Lists (for intermediate drill-down views)
export const SUB_CATEGORIES: Record<string, any[]> = {
    // Products
    products: [
        {
            id: 'hvac',
            title: 'HVAC Blower Motors',
            desc: 'High-efficiency blower motor cases and covers',
            items: [
                { id: 'hvac_case_01', label: 'Fitting Type Motor Case' },
                { id: 'hvac_cover_01', label: 'Rear & Front Cover' },
                { id: 'hvac_bracket_01', label: 'Motor Case with Bracket' },
                { id: 'hvac_core_01', label: 'Motor Core' }
            ]
        },
        {
            id: 'all_in_one',
            title: 'All-in-one Motors',
            desc: 'Integrated cooling fan and motor components',
            items: [
                { id: 'cooling_case_01', label: 'Drawing Motor Case' },
                { id: 'cooling_bracket_01', label: 'Support Bracket' }
            ]
        },
        {
            id: 'other_press',
            title: 'Other Press Products',
            desc: 'Various precision stamped parts for automotive use',
            items: [
                { id: 'mount_bracket_01', label: 'Mount Bracket' },
                { id: 'trunk_bonnet_01', label: 'Trunk & Bonnet Parts' }
            ]
        }
    ],
    // Individual Product Categories for separate pages
    hvac: [
        {
            id: 'hvac',
            title: 'HVAC Blower Motors',
            desc: 'High-efficiency blower motor cases and covers',
            items: [
                { id: 'hvac_case_01', label: 'Fitting Type Motor Case' },
                { id: 'hvac_cover_01', label: 'Rear & Front Cover' },
                { id: 'hvac_bracket_01', label: 'Motor Case with Bracket' },
                { id: 'hvac_core_01', label: 'Motor Core' }
            ]
        }
    ],
    all_in_one: [
        {
            id: 'all_in_one',
            title: 'All-in-one Motors',
            desc: 'Integrated cooling fan and motor components',
            items: [
                { id: 'cooling_case_01', label: 'Drawing Motor Case' },
                { id: 'cooling_bracket_01', label: 'Support Bracket' }
            ]
        }
    ],
    other_press: [
        {
            id: 'other_press',
            title: 'Other Press Products',
            desc: 'Various precision stamped parts for automotive use',
            items: [
                { id: 'mount_bracket_01', label: 'Mount Bracket' },
                { id: 'trunk_bonnet_01', label: 'Trunk & Bonnet Parts' }
            ]
        }
    ],
    // QM / Reliability / Equipment / Support (Simple lists if needed)
    qm: [{ id: 'quality_mgmt', label: 'Quality Management' }],
    reliability: [{ id: 'process_chart', label: 'Process Chart' }, { id: 'certification', label: 'Certification' }],
    equipment: [{ id: 'equipment_status', label: 'Equipment Status' }],
    support: [{ id: 'contact', label: 'Contact Us' }]
}

// Product Database (Detailed Items)
export const DB: Record<string, any[]> = {
    // PRODUCTS
    hvac: [
        {
            id: 'hvac_case_01',
            title: "FIT-TYPE MOTOR CASE ASM",
            subtitle: 'Case, Cover & Magnet Asm',
            category: 'hvac',
            // Updated to 1000px wide JPG (Correct Image)
            image: '/templates/hangseong/images/products/hvac_wide_case.jpg',
            desc: '', // Description is not used in the new layout
            specs: [
                {
                    label: 'Purpose',
                    value: '• Automobile DC-MOTOR Case (Housing)\n• DC-MOTOR case for home appliances\n• Out Diameter : Ø50 ~ 76 mm\n• Length : 45.5 ~ 84 mm'
                },
                {
                    label: 'Feature',
                    value: '• Cases are manufactured by bending boards 360°.\n  As a spring back phenomenon is prevented by connecting both ends easily using interference fit by applying a tooth form structure, the roundness level of 0.1 is guaranteed.'
                }
            ],
            tags: ['Automotive', 'EV Motor', 'Fitting Type', 'Housing']
        },
        {
            id: 'hvac_cover_02',
            title: "REAR & FRONT COVER ASM FOR VARIOUS MOTORS",
            subtitle: 'Front Cover & Rear Cover',
            category: 'hvac',
            image: '/templates/hangseong/images/products/hvac_wide_cover.jpg',
            desc: '',
            specs: [
                {
                    label: 'Purpose',
                    value: '• Automobile DC-MOTOR Rear & Front Cover\n• DC-MOTOR Cover for Home Appliances\n• O.D : Ø 61 ~ 76mm'
                },
                {
                    label: 'Feature',
                    value: '• Guaranteeing concentricity of bolt and bearing assembly parts for attaching various automobile DC-MOTOR rear covers (plating and painting → custom order)\n• Manufacturing cover assemblies for DC-Motor which is worked progressively'
                }
            ],
            tags: ['DC Motor', 'Cover Assembly', 'Precision', 'Custom Order']
        },
        {
            id: 'hvac_bracket_03',
            title: 'MOTOR CASE ASM(WITH BRACKET)',
            subtitle: '',
            category: 'hvac',
            image: '/templates/hangseong/images/products/hvac_wide_bracket.jpg',
            desc: '',
            specs: [
                {
                    label: 'Purpose',
                    value: '• Automobile DC-Motor bracket ASM\n• DC-Motor bracket ASM for home appliances\n• Out Diameter : Ø 56.5 ~ 76 mm(Case Only)\n• Length : 70 ~ 84 mm(Case Only)'
                },
                {
                    label: 'Feature',
                    value: '• Bracket for plate-type motor attachment (plating/painting → custom order)\n• Attaching a bracket for separable motors using a fixture exclusive for position fixing by product'
                }
            ],
            tags: ['Bracket', 'Mounting', 'Assembly', 'Automotive']
        },
        {
            id: 'hvac_core_04',
            title: 'CORE & PARTS FOR VARIOUS MOTORS',
            subtitle: 'Core     Parts',
            category: 'hvac',
            image: '/templates/hangseong/images/products/hvac_wide_core_v2.jpg',
            desc: '',
            specs: [
                {
                    label: 'Purpose',
                    value: '• Automobile DC-MOTOR core\n• Core for BLDC motors for hybrid vehicles\n• Base, brush holder and oil pan for automobile DC-Motors\n• Core O.D : Ø44 , Ø50 , Ø55 , Ø64 , Ø74 mm'
                },
                {
                    label: 'Feature',
                    value: '• Rotor/stator cover for various DC/BLDC motors (custom-order production)\n• Small parts for various DC-Motors (custom-order production)'
                }
            ],
            tags: ['Core', 'BLDC', 'Hybrid Vehicle', 'Rotor', 'Stator']
        }
    ],
    all_in_one: [
        {
            id: 'cooling_case_01',
            title: 'DRAWING MOTOR CASE ASM',
            subtitle: 'All-in-one condenser DC motor & blower DC Motor',
            category: 'all_in_one',
            image: '/templates/hangseong/images/products/cooling_wide_case.jpg',
            specs: [
                {
                    label: 'Purpose',
                    value: '• Automobile condenser DC-MOTOR case & blower DC motor\n• Out Diameter : Ø 98 ~ 82 mm, Ø 30~52mm\n• Length : 36 ~ 69 mm'
                },
                {
                    label: 'Feature',
                    value: '• It is a process of making jointless container-shaped products. It reduces, as much as possible, progressive drawing processes using the property of metal and the character of a press process to the maximum and the number of drawings without making wrinkles and cracks.'
                }
            ],
            tags: ['Cooling', 'Drawing Process', 'Seamless', 'Condenser']
        },
        {
            id: 'cooling_bracket_01',
            title: 'SUPPORT BRACKET FOR VARIOUS MOTORS',
            subtitle: 'Bracket Parts',
            category: 'all_in_one',
            image: '/templates/hangseong/images/products/cooling_wide_bracket.jpg',
            specs: [
                {
                    label: 'Purpose',
                    value: '• It is used to attach a motor case to a counterpart while supporting it.'
                },
                {
                    label: 'Feature',
                    value: '• Producing various types of brackets depending on motor types\n• Focusing on managing the position of a bolt hole and concentricity of a bracket'
                }
            ],
            tags: ['Support', 'Mounting', 'Precision', 'High Concentricity']
        }
    ],
    other_press: [
        {
            id: 'mount_bracket_01',
            title: 'MOUNT BRACKET WELDING PRODUCTS',
            subtitle: '',
            category: 'other_press',
            image: '/templates/hangseong/images/products/other_wide_mount.jpg',
            specs: [
                {
                    label: 'Purpose',
                    value: '• Installed on the transmission and internal parts of a vehicle\n• Mount Adapter Bracket'
                },
                {
                    label: 'Feature',
                    value: '• Mount bracket connecting and installing the main body and internal parts of a vehicle\n• Possessing the function of absorbing vibration while driving a car'
                }
            ],
            tags: ['Mounting', 'Welding', 'Vibration Control', 'Transmission']
        },
        {
            id: 'trunk_bonnet_01',
            title: 'BRACKETS FOR TRUNKS AND BONNET SHOCK ABSORBERS',
            subtitle: '',
            category: 'other_press',
            image: '/templates/hangseong/images/products/other_wide_shock.jpg',
            specs: [
                {
                    label: 'Purpose',
                    value: '• Shock absorber components of automobile trunks, bonnets, etc.'
                },
                {
                    label: 'Feature',
                    value: '• Producing various types of products depending on car models\n• Focusing on managing the floor-framing plan of the bracket attached part, the angle of a bracket and the position of the hole of a rivet.'
                }
            ],
            tags: ['Shock Absorber', 'Trunk', 'Bonnet', 'Precision Press']
        }
    ],
    // Dummies so DB search works for general categories if needed
    products: []
}

// Company History Timeline Data
export const HISTORY_DATA = [
    { year: '2024', month: '12', event: 'GMB KOREA EOP Motor Housing Mass Production' },
    { year: '2024', month: '10', event: 'Patent (No. 10-2872305) "Adhesive Application Device and Method for Fixing Magnets to Motor Case" Registration' },
    { year: '2023', month: '07', event: 'Smart Factory Completion' },
    { year: '2023', month: '07', event: 'T50 Automated Assembly Line Construction' },
    { year: '2023', month: '01', event: 'GMB KOREA EOP Motor Cover Proto Development' },
    { year: '2023', month: '01', event: 'GMB KOREA EOP HEATSINK Proto Development (2023–2024)' },
    { year: '2022', month: '10', event: 'GMB KOREA Partner Company Registration' },
    { year: '2022', month: '07', event: 'Smart Factory Initiative' },
    { year: '2022', month: '04', event: 'Jinyoung Korea Partner Company Registration' },
    { year: '2022', month: '03', event: 'GMB KOREA EOP Motor Housing Proto Sample Development' },
    { year: '2021', month: '11', event: 'IATF16949:2016 Certification Renewal' },
    { year: '2021', month: '11', event: 'Kaeyang Electric EPB Yoke Assembly Proto Sample (3 types) Development (2021.11–2023.07)' },
    { year: '2021', month: '03', event: 'T55 Automated Assembly Line Construction' },
    { year: '2021', month: '03', event: 'Industry-Academia Cooperation (DIT) Project Participation (Work-Learning Dual System / Unitech)' },
    { year: '2018', month: '11', event: 'IATF16949:2016 Acquired Certification' },
    { year: '2015', month: '05', event: 'Designated as a root technology specialized enterprise (Small and Medium Business Administration)' },
    { year: '2013', month: '07', event: 'Innovative SME (INNO-BIZ)' },
    { year: '2012', month: '10', event: 'Establishment of affiliated research institute (recognition)' },
    { year: '2012', month: '01', event: 'Patent for the automatic application of the adhesive for fixing the magnet to the motor case (No. 10-1104375)' },
    { year: '2011', month: '07', event: 'Automatic assembly system for attaching magnets to motor case Patent No. 10-1050245' },
    { year: '2011', month: '07', event: 'Patent for Invention of Automatic Manufacturing System for Bending and Sizing Process of Motor Case (No. 10-1050246)' },
    { year: '2010', month: '01', event: 'Acquired venture business certification (Technology guarantee fund)' },
    { year: '2009', month: '06', event: 'Acquired ISO/TS 16949:2009 certification' },
    { year: '2009', month: '06', event: 'Acquired ISO 9001:2008 certification' },
    { year: '2008', month: '11', event: 'Motor Case Magnet Continuous manual process line automatic flow process system development' },
    { year: '2008', month: '03', event: 'Moved to 1200-1, Jisa-dong, Gangseo-gu, Busan' },
    { year: '2007', month: '09', event: 'Established a research and development department (Korea Industrial Technology Association)' },
    { year: '2003', month: '11', event: 'Obtained QS9000 certification' },
    { year: '2001', month: '12', event: 'Patent of DC MOTOR CASE using the first numerical type fitting (No. 0319972)' },
    { year: '2001', month: '04', event: 'Appointed as a promising small and medium-sized export company (Part. Ulsan Small & Medium Business)' },
    { year: '1989', month: '10', event: 'Changed the name of the star industry company' },
    { year: '1979', month: '06', event: 'Established Samyang Industrial Co., Ltd. (Foundation)' }
]
