'use client'

import { EmtOriginalTemplate } from '@/components/templates/EmtOriginal'

const gearProducts = [
    {
        id: 'gear-x1',
        name: 'Precision Planetary Gear',
        category: 'Gears',
        description: 'High-torque transmission designed for advanced robotics and automation.',
        specs: [
            { label: 'Ratio', value: '10:1' },
            { label: 'Efficiency', value: '98%' },
            { label: 'Backlash', value: '< 3 arcmin' }
        ]
    },
    {
        id: 'servo-m2',
        name: 'Industrial Servo Motor',
        category: 'Motors',
        description: 'Reliable motion control solution ensuring high precision and stability.',
        specs: [
            { label: 'Power', value: '400W' },
            { label: 'Speed', value: '3000 RPM' },
            { label: 'Protection', value: 'IP65' }
        ]
    },
    {
        id: 'drive-sys',
        name: 'Integrated Drive System',
        category: 'Drives',
        description: 'All-in-one heavy duty drive solution for industrial machinery.',
        specs: [
            { label: 'Voltage', value: '400V/690V' },
            { label: 'Control', value: 'EtherCAT' },
            { label: 'Cooling', value: 'Fanless' }
        ]
    },
    {
        id: 'actuator-pro',
        name: 'Linear Actuator Pro',
        category: 'Actuators',
        description: 'Compact yet powerful linear motion actuator.',
        specs: [
            { label: 'Stroke', value: '500mm' },
            { label: 'Force', value: '2000N' },
            { label: 'Speed', value: '100mm/s' }
        ]
    }
]

export default function PrecisionGearPage() {
    return (
        <EmtOriginalTemplate
            companyName="PRIME GEAR TECH"
            tagline="Precision Engineering for Global Industries"
            products={gearProducts}
            defaultLanguage="en"     // Default to English for Global Tech
            defaultThemeMode="dark"  // Industrial Look
            brandColor="amber"       // Industrial Amber
        />
    )
}
