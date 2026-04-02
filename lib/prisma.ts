import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

// LibSQL adapter 생성 (SQLite 파일 기반)
import path from 'path'

// Next.js Dev Server에서 상대 경로 해석 문제를 피하기 위해 항상 절대 경로 사용
const dbPath = `file:${path.join(process.cwd(), 'prisma', 'dev.db')}`;

console.log('🔌 Connecting to SQLite at:', dbPath);

const adapter = new PrismaLibSql({
    url: dbPath
})

// Prisma 7에서는 adapter가 필수
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
