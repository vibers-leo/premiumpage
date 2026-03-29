import { View, Text, ScrollView, Pressable } from "react-native";
import {
  Bell,
  ChevronRight,
  Megaphone,
  Sparkles,
  Globe,
  TrendingUp,
} from "lucide-react-native";

const MOCK_NEWS = [
  {
    id: "1",
    category: "업데이트",
    title: "프리미엄페이지 v3.0 출시",
    content: "새로운 디자인 시스템과 성능 개선이 적용되었습니다.",
    date: "2026.03.28",
  },
  {
    id: "2",
    category: "공지",
    title: "서버 정기 점검 안내",
    content: "4월 1일 오전 2시~5시 서버 점검이 예정되어 있습니다.",
    date: "2026.03.25",
  },
  {
    id: "3",
    category: "이벤트",
    title: "신규 가입 프로모션",
    content: "이번 달 가입 시 첫 달 무료 혜택을 드립니다.",
    date: "2026.03.20",
  },
];

const STATS = [
  { label: "활성 사이트", value: "3", icon: Globe, color: "#3b82f6" },
  { label: "이번 달 방문자", value: "1,247", icon: TrendingUp, color: "#10b981" },
  { label: "새 알림", value: "5", icon: Bell, color: "#f59e0b" },
];

export default function HomeScreen() {
  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerClassName="pb-8"
    >
      {/* 인사말 배너 */}
      <View className="mx-4 mt-4 bg-primary rounded-2xl p-6">
        <Text className="text-white text-sm font-medium opacity-80">
          프리미엄페이지
        </Text>
        <Text className="text-white text-xl font-bold mt-1">
          안녕하세요, 고객님
        </Text>
        <Text className="text-white text-sm mt-2 opacity-80">
          프리미엄 웹사이트로 비즈니스를 성장시키세요
        </Text>
      </View>

      {/* 통계 카드 */}
      <View className="flex-row mx-4 mt-6 gap-3">
        {STATS.map((stat) => (
          <Pressable
            key={stat.label}
            className="flex-1 bg-surface rounded-xl p-4 items-center"
          >
            <stat.icon size={22} color={stat.color} />
            <Text className="text-text font-bold text-lg mt-2">
              {stat.value}
            </Text>
            <Text className="text-text-muted text-xs mt-1">{stat.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* 빠른 메뉴 */}
      <View className="flex-row mx-4 mt-6 gap-3">
        <Pressable className="flex-1 bg-surface rounded-xl p-4 items-center">
          <Sparkles size={22} color="#3b82f6" />
          <Text className="text-text text-xs font-medium mt-2">
            새 사이트
          </Text>
        </Pressable>
        <Pressable className="flex-1 bg-surface rounded-xl p-4 items-center">
          <Megaphone size={22} color="#f59e0b" />
          <Text className="text-text text-xs font-medium mt-2">
            공지 확인
          </Text>
        </Pressable>
        <Pressable className="flex-1 bg-surface rounded-xl p-4 items-center">
          <Bell size={22} color="#10b981" />
          <Text className="text-text text-xs font-medium mt-2">알림</Text>
        </Pressable>
      </View>

      {/* 최신 소식 */}
      <View className="mx-4 mt-8">
        <Text className="text-lg font-bold text-text mb-4">최신 소식</Text>
        {MOCK_NEWS.map((item) => (
          <Pressable
            key={item.id}
            className="bg-surface rounded-xl p-4 mb-3 flex-row items-center"
          >
            <View className="flex-1">
              <Text className="text-xs text-primary font-medium mb-1">
                {item.category}
              </Text>
              <Text className="text-text font-semibold" numberOfLines={1}>
                {item.title}
              </Text>
              <Text
                className="text-text-muted text-sm mt-1"
                numberOfLines={2}
              >
                {item.content}
              </Text>
              <Text className="text-text-muted text-xs mt-2">{item.date}</Text>
            </View>
            <ChevronRight size={18} color="#94a3b8" />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
