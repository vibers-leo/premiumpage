'use client'

import Link from 'next/link'
import { Sparkles, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TemplateActionButtonsProps {
  demoUrl: string
}

export function TemplateActionButtons({ demoUrl }: TemplateActionButtonsProps) {
  const handleDemoClick = () => {
    // Scroll to the preview section or open in new tab
    const previewElement = document.querySelector('.sticky.top-24')
    if (previewElement) {
      previewElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Link href="/quote" className="imweb-btn imweb-btn-primary imweb-btn-lg">
        이 템플릿으로 시작하기
        <Sparkles className="w-5 h-5" />
      </Link>
      <button
        onClick={handleDemoClick}
        className="imweb-btn imweb-btn-secondary imweb-btn-lg"
      >
        <Eye className="w-5 h-5" />
        데모 보기
      </button>
    </div>
  )
}
