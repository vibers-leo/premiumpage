'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'

const testimonials = [
    {
        id: 1,
        name: '김민수',
        role: '플라워샵 대표',
        company: '블룸가든',
        content: 'Premium Page 덕분에 온라인 주문이 300% 증가했습니다. 디자인도 아름답고 관리도 쉬워서 정말 만족스럽습니다.',
        rating: 5,
        image: '/testimonials/user1.jpg'
    },
    {
        id: 2,
        name: '이서연',
        role: '요가 스튜디오 원장',
        company: '젠 요가',
        content: '회원 관리와 예약 시스템이 완벽하게 통합되어 있어서 업무 효율이 크게 향상되었습니다. 강력 추천합니다!',
        rating: 5,
        image: '/testimonials/user2.jpg'
    },
    {
        id: 3,
        name: '박준호',
        role: 'IT 컨설턴트',
        company: '테크솔루션',
        content: '전문적인 디자인과 빠른 로딩 속도로 고객들의 신뢰를 얻을 수 있었습니다. 투자 대비 효과가 탁월합니다.',
        rating: 5,
        image: '/testimonials/user3.jpg'
    },
    {
        id: 4,
        name: '최지은',
        role: '사진작가',
        company: '모먼트 스튜디오',
        content: '포트폴리오를 아름답게 전시할 수 있는 완벽한 플랫폼입니다. 클라이언트들의 반응이 정말 좋습니다.',
        rating: 5,
        image: '/testimonials/user4.jpg'
    },
    {
        id: 5,
        name: '정태영',
        role: '레스토랑 오너',
        company: '미식가',
        content: '온라인 예약과 메뉴 관리가 너무 편리합니다. 매출이 눈에 띄게 증가했어요!',
        rating: 5,
        image: '/testimonials/user5.jpg'
    },
    {
        id: 6,
        name: '강수진',
        role: '인테리어 디자이너',
        company: '스페이스 디자인',
        content: '프로젝트 포트폴리오를 효과적으로 보여줄 수 있어서 신규 고객 유치에 큰 도움이 되었습니다.',
        rating: 5,
        image: '/testimonials/user6.jpg'
    }
]

export function Testimonials() {
    return (
        <section className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-4">
                {/* 헤더 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-6xl md:text-8xl font-black mb-6 gradient-text">고객 후기</h2>
                    <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
                        수백 명의 만족한 고객들이 Premium Page와 함께 성공하고 있습니다
                    </p>
                </motion.div>

                {/* 후기 그리드 */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                        >
                            <Card className="bg-card/30 backdrop-blur-xl border-2 border-white/10 hover:border-purple-500/50 transition-all h-full relative overflow-hidden group">
                                {/* 배경 그라디언트 */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-pink-900/5 to-cyan-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* 인용 부호 아이콘 */}
                                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Quote className="w-16 h-16 text-purple-400" />
                                </div>

                                <CardContent className="p-8 relative z-10">
                                    {/* 별점 */}
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>

                                    {/* 후기 내용 */}
                                    <p className="text-gray-300 text-lg leading-relaxed mb-8 italic">
                                        "{testimonial.content}"
                                    </p>

                                    {/* 고객 정보 */}
                                    <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                                        <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0">
                                            {/* 플레이스홀더 이미지 */}
                                            <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">
                                                {testimonial.name[0]}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                                            <p className="text-gray-400 text-sm">{testimonial.role}</p>
                                            <p className="text-purple-400 text-sm font-semibold">{testimonial.company}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* 통계 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto"
                >
                    {[
                        { number: '500+', label: '만족한 고객' },
                        { number: '4.9/5', label: '평균 평점' },
                        { number: '98%', label: '추천 의향' }
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-5xl md:text-6xl font-black gradient-text mb-2">
                                {stat.number}
                            </div>
                            <div className="text-gray-400 font-semibold">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
