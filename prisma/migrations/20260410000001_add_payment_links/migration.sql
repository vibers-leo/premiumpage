-- CreateTable
CREATE TABLE IF NOT EXISTS "premiumpage"."payment_links" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "token" UUID NOT NULL DEFAULT gen_random_uuid(),
    "amount" INTEGER NOT NULL,
    "order_name" TEXT NOT NULL,
    "customer_name" TEXT,
    "customer_email" TEXT,
    "memo" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "toss_order_id" TEXT,
    "toss_payment_key" TEXT,
    "paid_at" TIMESTAMPTZ,
    "expires_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT "payment_links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "payment_links_token_key" ON "premiumpage"."payment_links"("token");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "payment_links_toss_order_id_key" ON "premiumpage"."payment_links"("toss_order_id");
