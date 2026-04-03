import { View, Text, ScrollView, Pressable } from "react-native";
import {
  Globe,
  ExternalLink,
  Settings,
  TrendingUp,
  CheckCircle,
  AlertCircle,
} from "lucide-react-native";

const MOCK_SITES = [
  {
    id: "1",
    name: "드림카페",
    domain: "dreamcafe.premiumpage.kr",
    status: "active",
    visitors: "456",
    plan: "프로",
  },
  {
    id: "2",
    name: "서울법률사무소",
    domain: "seoullaw.premiumpage.kr",
    status: "active",
    visitors: "234",
    plan: "비즈니스",
  },
  {
    id: "3",
    name: "블루핏 요가",
    domain: "bluefit.premiumpage.kr",
    status: "maintenance",
    visitors: "—",
    plan: "베이직",
  },
];

export default function SitesScreen() {
  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerClassName="pb-8"
    >
      {/* 사이트 수 요약 */}
      <View className="mx-4 mt-4 bg-surface rounded-xl p-4 flex-row items-center">
        <Globe size={20} color="#3b82f6" />
        <Text className="text-text font-medium ml-2">
          총 {MOCK_SITES.length}개 사이트 관리 중
        </Text>
      </View>

      {/* 사이트 목록 */}
      {MOCK_SITES.map((site) => (
        <View key={site.id} className="mx-4 mt-4 bg-surface rounded-xl p-4">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-text font-bold text-base">{site.name}</Text>
            {site.status === "active" ? (
              <View className="flex-row items-center">
                <CheckCircle size={14} color="#10b981" />
                <Text className="text-green-600 text-xs font-medium ml-1">
                  운영 중
                </Text>
              </View>
            ) : (
              <View className="flex-row items-center">
                <AlertCircle size={14} color="#f59e0b" />
                <Text className="text-amber-600 text-xs font-medium ml-1">
                  점검 중
                </Text>
              </View>
            )}
          </View>

          <Text className="text-text-muted text-sm">{site.domain}</Text>

          <View className="flex-row items-center mt-3 gap-4">
            <View className="flex-row items-center">
              <TrendingUp size={14} color="#64748b" />
              <Text className="text-text-muted text-sm ml-1">
                방문자 {site.visitors}
              </Text>
            </View>
            <Text className="text-primary text-sm font-medium">
              {site.plan}
            </Text>
          </View>

          <View className="flex-row mt-3 gap-2">
            <Pressable className="flex-1 bg-white rounded-lg py-2 flex-row items-center justify-center">
              <ExternalLink size={14} color="#3b82f6" />
              <Text className="text-primary text-sm font-medium ml-1">
                방문
              </Text>
            </Pressable>
            <Pressable className="flex-1 bg-white rounded-lg py-2 flex-row items-center justify-center">
              <Settings size={14} color="#64748b" />
              <Text className="text-text-muted text-sm font-medium ml-1">
                관리
              </Text>
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
