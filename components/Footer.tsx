import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="py-16 bg-neutral-950 text-neutral-400">
      <div className="container mx-auto px-6 md:px-8 max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="text-lg font-extrabold mb-4 tracking-tight uppercase text-white">Premium Page</div>
            <p className="text-neutral-500 text-sm max-w-sm mb-6 leading-relaxed">
              Global Interactive Digital Catalog Agency for Export-Champion Companies.
            </p>
            <div className="flex items-center gap-3">
              <a href="mailto:vibers.leo@gmail.com" className="w-9 h-9 border border-neutral-800 flex items-center justify-center text-neutral-500 hover:border-white hover:text-white transition-all">
                <Mail className="w-4 h-4" />
              </a>
              <a href="tel:+82-10-4866-5805" className="w-9 h-9 border border-neutral-800 flex items-center justify-center text-neutral-500 hover:border-white hover:text-white transition-all">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 text-neutral-600">Services</div>
            <ul className="space-y-3 text-sm">
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Digital Catalog</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">3D Showcase</Link></li>
              <li><Link href="/quote" className="hover:text-white transition-colors">Strategy Consulting</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 text-neutral-600">Company</div>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/quote" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 text-neutral-600">Resources</div>
            <ul className="space-y-3 text-sm">
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/portal" className="hover:text-white transition-colors">고객 포털</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800 flex flex-col gap-3">
          <div className="text-neutral-600 text-xs leading-relaxed">
            상호명: 위로 &nbsp;|&nbsp; 대표: 김성원 &nbsp;|&nbsp; 사업자등록번호: 545-16-01046 &nbsp;|&nbsp; 주소: 경남 양산시 고향의봄12길 10, 뉴그린빌 301호
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-3">
            <p className="text-neutral-600 text-xs">&copy; 2026 Premium Page by 위로. All rights reserved.</p>
            <div className="flex gap-6 text-neutral-600 text-[11px] font-bold uppercase tracking-[0.15em]">
              <Link href="/terms" className="hover:text-white transition-colors">이용약관</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link>
              <Link href="/refund" className="hover:text-white transition-colors">환불정책</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
