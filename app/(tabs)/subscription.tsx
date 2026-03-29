import { View, Text, ScrollView, Pressable } from "react-native";
import {
  CreditCard,
  Calendar,
  CheckCircle,
  Crown,
  ArrowRight,
} from "lucide-react-native";

const MOCK_SUBSCRIPTIONS = [
  {
    id: "1",
    siteName: "드림카페",
    plan: "프로",
    price: "49,000원/월",
    nextPayment: "2026.04.25",
    status: "active",
  },
  {
    id: "2",
    siteName: "서울법률사무소",
    plan: "비즈니스",
    price: "99,000원/월",
    nextPayment: "2026.04.20",
    status: "active",
  },
  {
    id: "3",
    siteName: "블루핏 요가",
    plan: "베이직",
    price: "29,000원/월",
    nextPayment: "2026.04.15",
    status: "active",
  },
];

const PLANS = [
  {
    name: "베이직",
    price: "29,000",
    features: ["1페이지", "기본 템플릿", "SSL 인증서"],
  },
  {
    name: "프로",
    price: "49,000",
    features: ["5페이지", "프리미엄 템플릿", "SEO 최적화", "분석 대시보드"],
    popular: true,
  },
  {
    name: "비즈니스",
    price: "99,000",
    features: [
      "무제한 페이지",
      "커스텀 디자인",
      "우선 지원",
      "고급 분석",
      "다국어 지원",
    ],
  },
];

export default function SubscriptionScreen() {
  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerClassName="pb-8"
    >
      {/* 현재 구독 */}
      <View className="mx-4 mt-4">
        <Text className="text-lg font-bold text-text mb-4">현재 구독</Text>
        {MOCK_SUBSCRIPTIONS.map((sub) => (
          <View key={sub.id} className="bg-surface rounded-xl p-4 mb-3">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-text font-semibold">{sub.siteName}</Text>
              <View className="flex-row items-center bg-blue-100 px-2 py-1 rounded-full">
                <Crown size={12} color="#3b82f6" />
                <Text className="text-primary text-xs font-medium ml-1">
                  {sub.plan}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <CreditCard size={14} color="#64748b" />
                <Text className="text-text-muted text-sm ml-1">
                  {sub.price}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Calendar size={14} color="#64748b" />
                <Text className="text-text-muted text-sm ml-1">
                  다음 결제: {sub.nextPayment}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* 요금제 안내 */}
      <View className="mx-4 mt-6">
        <Text className="text-lg font-bold text-text mb-4">요금제</Text>
        {PLANS.map((plan) => (
          <View
            key={plan.name}
            className={`rounded-xl p-4 mb-3 ${
              plan.popular ? "bg-primary" : "bg-surface"
            }`}
          >
            {plan.popular && (
              <Text className="text-white text-xs font-bold mb-2">
                인기 요금제
              </Text>
            )}
            <View className="flex-row items-end justify-between mb-3">
              <Text
                className={`text-lg font-bold ${
                  plan.popular ? "text-white" : "text-text"
                }`}
              >
                {plan.name}
              </Text>
              <View className="flex-row items-end">
                <Text
                  className={`text-2xl font-bold ${
                    plan.popular ? "text-white" : "text-primary"
                  }`}
                >
                  {plan.price}
                </Text>
                <Text
                  className={`text-sm ml-1 mb-1 ${
                    plan.popular ? "text-white opacity-80" : "text-text-muted"
                  }`}
                >
                  원/월
                </Text>
              </View>
            </View>
            {plan.features.map((feature) => (
              <View key={feature} className="flex-row items-center mb-1">
                <CheckCircle
                  size={14}
                  color={plan.popular ? "#ffffff" : "#10b981"}
                />
                <Text
                  className={`text-sm ml-2 ${
                    plan.popular ? "text-white" : "text-text"
                  }`}
                >
                  {feature}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      <View className="mx-4 mt-2">
        <Text className="text-text-muted text-xs text-center">
          결제는 추후 토스페이먼츠 연동 후 활성화됩니다
        </Text>
      </View>
    </ScrollView>
  );
}
