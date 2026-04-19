-- Premium Page 포털 시스템 마이그레이션
-- 2026-04-19: 사용자/소셜 로그인, 주문 관리, 코멘트, 크레딧, 상품 카탈로그

BEGIN;

-- ── 1. users 테이블 (기존 customers 대체) ──
CREATE TABLE IF NOT EXISTS premiumpage.users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email         TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    name          TEXT,
    phone         TEXT,
    company_name  TEXT,
    avatar_url    TEXT,
    role          TEXT NOT NULL DEFAULT 'client',  -- client | admin
    is_active     BOOLEAN NOT NULL DEFAULT true,
    last_login    TIMESTAMPTZ,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── 2. 소셜 로그인 계정 ──
CREATE TABLE IF NOT EXISTS premiumpage.social_accounts (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES premiumpage.users(id) ON DELETE CASCADE,
    provider    TEXT NOT NULL,  -- google | naver | kakao
    provider_id TEXT NOT NULL,
    UNIQUE(provider, provider_id)
);
CREATE INDEX IF NOT EXISTS idx_social_accounts_user ON premiumpage.social_accounts(user_id);

-- ── 3. 상품 (서비스 카탈로그) ──
CREATE TABLE IF NOT EXISTS premiumpage.products (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug          TEXT UNIQUE NOT NULL,
    name          TEXT NOT NULL,
    category      TEXT NOT NULL,  -- catalog | leaflet | proposal | maintenance
    description   TEXT,
    price_range   TEXT,
    price         INTEGER,
    duration_days INTEGER,
    is_active     BOOLEAN NOT NULL DEFAULT true,
    sort_order    INTEGER NOT NULL DEFAULT 0,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── 4. 기존 orders 테이블 이름 변경 + 새 orders ──
ALTER TABLE premiumpage.orders RENAME TO orders_legacy;

CREATE TABLE premiumpage.orders (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number     TEXT UNIQUE NOT NULL,
    user_id          UUID NOT NULL REFERENCES premiumpage.users(id),
    product_id       UUID REFERENCES premiumpage.products(id),
    title            TEXT NOT NULL,
    description      TEXT,
    amount           INTEGER NOT NULL DEFAULT 0,
    status           TEXT NOT NULL DEFAULT 'pending',
    -- pending → accepted → in_progress → review → revision → completed → cancelled
    toss_payment_key TEXT,
    toss_order_id    TEXT UNIQUE,
    paid_at          TIMESTAMPTZ,
    started_at       TIMESTAMPTZ,
    completed_at     TIMESTAMPTZ,
    deadline         TIMESTAMPTZ,
    attachments      TEXT,        -- JSON array
    reference_url    TEXT,
    admin_note       TEXT,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_orders_user ON premiumpage.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON premiumpage.orders(status);

-- ── 5. 주문 코멘트 (진행 과정 소통) ──
CREATE TABLE IF NOT EXISTS premiumpage.order_comments (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id       UUID NOT NULL REFERENCES premiumpage.orders(id) ON DELETE CASCADE,
    user_id        UUID NOT NULL REFERENCES premiumpage.users(id),
    content        TEXT NOT NULL,
    attachment_url TEXT,
    is_internal    BOOLEAN NOT NULL DEFAULT false,  -- 어드민 내부 메모
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_order_comments_order ON premiumpage.order_comments(order_id);

-- ── 6. 크레딧 거래 내역 ──
CREATE TABLE IF NOT EXISTS premiumpage.credit_transactions (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       UUID NOT NULL REFERENCES premiumpage.users(id),
    type          TEXT NOT NULL,  -- earn | spend | refund
    amount        INTEGER NOT NULL,
    balance_after INTEGER NOT NULL,
    description   TEXT,
    reference_id  TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_credit_txns_user ON premiumpage.credit_transactions(user_id);

-- ── 7. 기존 customers → users 데이터 마이그레이션 ──
INSERT INTO premiumpage.users (id, email, password_hash, company_name, name, phone, role, created_at)
SELECT id::uuid, email, password_hash, company_name, contact_name, phone, 'client', created_at
FROM premiumpage.customers
ON CONFLICT (email) DO NOTHING;

-- ── 8. 기본 상품 데이터 ──
INSERT INTO premiumpage.products (slug, name, category, description, price_range, duration_days, sort_order) VALUES
('catalog-basic',    'Basic 전자카탈로그',    'catalog',     '표준 디자인 전자카탈로그',                    '50~100만원',  7,  1),
('catalog-pro',      'Pro 전자카탈로그',      'catalog',     '브랜드 맞춤형 고급 디자인 + 다국어',          '200~500만원', 21, 2),
('catalog-master',   'Master 전자카탈로그',   'catalog',     '3D 모델링 + 최고급 인터랙션',                 '500~1500만원',42, 3),
('leaflet-basic',    '리플렛 기본',           'leaflet',     '기본 리플렛 디자인 및 인쇄',                  '30~80만원',   5,  4),
('leaflet-premium',  '리플렛 프리미엄',       'leaflet',     '고급 리플렛 디자인 + 특수 인쇄',              '80~200만원',  10, 5),
('proposal-basic',   '제안서 기본',           'proposal',    '기업 회사소개서 기본',                         '80~150만원',  7,  6),
('proposal-pro',     '제안서 전문',           'proposal',    'IR 덱 / 입찰 제안서 전문 제작',               '150~400만원', 14, 7),
('proposal-premium', '제안서 프리미엄',       'proposal',    '풀 브랜딩 + 전략 컨설팅 포함',                '400~800만원', 21, 8),
('maintenance-basic','유지보수 Basic',        'maintenance', '월 1회 콘텐츠 업데이트 + 호스팅',             '5만원/월',    30, 9),
('maintenance-premium','유지보수 Premium',    'maintenance', '월 5회 업데이트 + 성능 모니터링 + 우선 지원', '15만원/월',   30, 10)
ON CONFLICT (slug) DO NOTHING;

-- ── 9. 어드민 계정 생성 ──
INSERT INTO premiumpage.users (email, name, role)
VALUES ('vibers.leo@gmail.com', 'Leo (Admin)', 'admin')
ON CONFLICT (email) DO NOTHING;

COMMIT;
