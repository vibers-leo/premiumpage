import { View, Text, ScrollView, Pressable, Dimensions } from "react-native";
import {
  Bell,
  ChevronRight,
  Megaphone,
  Sparkles,
  Globe,
  TrendingUp,
  CreditCard,
  Settings,
  Plus,
  ArrowUpRight,
  User,
  Search
} from "lucide-react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp, FadeIn, Layout, SlideInRight } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const MOCK_NEWS = [
  {
    id: "1",
    category: "Update",
    title: "PremiumPage v3.0 Launched",
    content: "New design system and performance improvements applied.",
    date: "2026.03.28",
    color: "#3b82f6"
  },
  {
    id: "2",
    category: "Notice",
    title: "Server Maintenance Schedule",
    content: "Scheduled maintenance on April 1st, 2 AM - 5 AM.",
    date: "2026.03.25",
    color: "#f59e0b"
  },
  {
    id: "3",
    category: "Event",
    title: "New Registration Promo",
    content: "Get your first month free when you join this month.",
    date: "2026.03.20",
    color: "#10b981"
  },
];

const STATS = [
  { label: "Active Sites", value: "3", icon: Globe, color: "#3b82f6", bg: "#eff6ff" },
  { label: "Monthly Visits", value: "1,247", icon: TrendingUp, color: "#10b981", bg: "#f0fdf4" },
  { label: "Alerts", value: "5", icon: Bell, color: "#f59e0b", bg: "#fffbeb" },
];

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-[#fcfcfc]">
      <StatusBar style="dark" />
      
      {/* 커스텀 헤더 */}
      <View className="bg-white px-6 pt-14 pb-4 flex-row items-center justify-between border-b border-gray-50">
        <View>
           <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Business Dashboard</Text>
           <Text className="text-gray-900 text-2xl font-black tracking-tight">Premium<Text className="text-[#3b82f6]">Page</Text></Text>
        </View>
        <View className="flex-row items-center gap-4">
           <Pressable className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center border border-gray-100">
              <Search size={20} color="#111" />
           </Pressable>
           <Pressable className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center border border-gray-100">
              <User size={20} color="#111" />
           </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-6 pb-20">
          
          {/* 인사말 배너 */}
          <Animated.View entering={FadeInDown.duration(800)}>
            <LinearGradient
              colors={['#3b82f6', '#2563eb']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-[40px] p-8 shadow-2xl relative overflow-hidden"
            >
              <View className="flex-row items-center mb-6">
                <View className="bg-white/10 px-3 py-1 rounded-full border border-white/10">
                  <Text className="text-white text-[10px] font-black uppercase tracking-widest">Growth Tier: Enterprise</Text>
                </View>
              </View>
              
              <Text className="text-white text-3xl font-black leading-tight mb-2">
                Grow Your{"\n"}Business Online
              </Text>
              
              <Text className="text-white/70 text-sm font-bold mb-8">
                Welcome back, Premium Client.{"\n"}Your websites are performing 12% better.
              </Text>

              <View className="flex-row gap-3">
                 <Pressable className="bg-white rounded-2xl py-4 px-6 flex-row items-center">
                   <Plus size={18} color="#2563eb" strokeWidth={3} />
                   <Text className="text-[#2563eb] font-black ml-2">New Site</Text>
                 </Pressable>
                 <Pressable className="bg-white/10 rounded-2xl py-4 px-6 flex-row items-center border border-white/10">
                   <CreditCard size={18} color="#fff" />
                   <Text className="text-white font-black ml-2">Billing</Text>
                 </Pressable>
              </View>

              {/* 데코 엘리먼트 */}
              <View className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
            </LinearGradient>
          </Animated.View>

          {/* 통계 그리드 */}
          <View className="flex-row gap-4 mt-10">
            {STATS.map((stat, idx) => (
              <Animated.View 
                key={stat.label} 
                entering={FadeInUp.delay(idx * 100 + 400)}
                className="flex-1 bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm items-center"
              >
                <View className="w-12 h-12 rounded-2xl items-center justify-center mb-3" style={{ backgroundColor: stat.bg }}>
                  <stat.icon size={24} color={stat.color} />
                </View>
                <Text className="text-gray-400 text-[10px] font-black uppercase mb-1">{stat.label}</Text>
                <Text className="text-gray-900 font-black text-lg">{stat.value}</Text>
              </Animated.View>
            ))}
          </View>

          {/* 빠른 링크 섹션 */}
          <View className="mt-12 mb-6 flex-row items-center justify-between">
             <Text className="text-gray-900 text-xl font-black">Quick Actions</Text>
             <Pressable>
               <Text className="text-[#3b82f6] text-sm font-black">Customize</Text>
             </Pressable>
          </View>
          
          <View className="flex-row gap-4">
             <Pressable className="flex-1 bg-[#111] p-6 rounded-[32px] flex-row items-center justify-between">
                <View>
                   <Text className="text-white/60 text-[10px] font-black uppercase mb-1">Editor</Text>
                   <Text className="text-white font-black text-lg">Edit Pages</Text>
                </View>
                <ArrowUpRight size={20} color="#fff" />
             </Pressable>
             <Pressable className="flex-1 bg-gray-50 p-6 rounded-[32px] flex-row items-center justify-between border border-gray-100">
                <View>
                   <Text className="text-gray-400 text-[10px] font-black uppercase mb-1">Settings</Text>
                   <Text className="text-gray-900 font-black text-lg">Account</Text>
                </View>
                <Settings size={20} color="#111" />
             </Pressable>
          </View>

          {/* 최신 소식 리스트 */}
          <View className="mt-12 flex-row items-center justify-between mb-6">
            <Text className="text-gray-900 text-xl font-black">Latest News</Text>
            <ChevronRight size={20} color="#ccc" />
          </View>

          {MOCK_NEWS.map((item, idx) => (
            <Animated.View key={item.id} entering={FadeInUp.delay(idx * 100 + 600)} layout={Layout.springify()}>
              <Pressable 
                className="bg-white p-6 rounded-[32px] mb-4 border border-gray-50 flex-row items-center shadow-sm"
              >
                <View className="w-14 h-14 rounded-2xl items-center justify-center mr-5" style={{ backgroundColor: `${item.color}10` }}>
                  <Megaphone size={24} color={item.color} />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">{item.category}</Text>
                  <Text className="text-gray-900 font-bold text-[17px] mb-1" numberOfLines={1}>{item.title}</Text>
                  <Text className="text-gray-400 text-xs font-medium" numberOfLines={2}>{item.content}</Text>
                </View>
                <View className="items-end">
                   <Text className="text-gray-300 text-[10px] font-black">{item.date}</Text>
                </View>
              </Pressable>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
