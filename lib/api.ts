// PremiumPage API 클라이언트
// 백엔드: premiumpage.kr (NextAuth/JWT)

const API_BASE_URL = "https://premiumpage.kr/api";

interface ApiOptions {
  method?: string;
  body?: Record<string, unknown>;
  token?: string;
}

export async function api<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { method = "GET", body, token } = options;

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

  if (!response.ok) {
    throw new Error(`API 오류: ${response.status}`);
  }

  return response.json();
}

// 소식 목록 조회
export async function fetchNews(limit = 10) {
  return api(`/news?limit=${limit}`);
}

// 내 사이트 목록 조회
export async function fetchMySites(token: string) {
  return api("/sites", { token });
}

// 구독 현황 조회
export async function fetchSubscription(token: string) {
  return api("/subscription", { token });
}

// 사이트 상세 조회
export async function fetchSiteDetail(id: string, token: string) {
  return api(`/sites/${id}`, { token });
}
