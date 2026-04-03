// PremiumPage API 클라이언트
// 백엔드: premiumpage.kr (NextAuth/JWT)

import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "https://premiumpage.kr/api";

interface ApiOptions {
  method?: string;
  body?: Record<string, unknown>;
}

export async function apiFetch<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { method = "GET", body } = options;
  const token = await SecureStore.getItemAsync('userToken');

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401) {
    await SecureStore.deleteItemAsync('userToken');
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    throw new Error(`API 오류: ${response.status}`);
  }

  return response.json();
}

// 소식 목록 조회
export async function fetchNews(limit = 10) {
  return apiFetch(`/news?limit=${limit}`);
}

// 내 사이트 목록 조회
export async function fetchMySites() {
  return apiFetch("/sites");
}

// 구독 현황 조회
export async function fetchSubscription() {
  return apiFetch("/subscription");
}

// 사이트 상세 조회
export async function fetchSiteDetail(id: string) {
  return apiFetch(`/sites/${id}`);
}
