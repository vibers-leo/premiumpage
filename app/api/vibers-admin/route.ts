import { createAdminHandler } from "@vibers/admin-kit/handler";
import { prisma } from "@/lib/prisma";

const CATALOGS = [
  { id: "hstech", name: "HS-TECH", domain: "hstech.premiumpage.kr", pages: 24 },
  { id: "gentop", name: "GENTOP", domain: "gentop.premiumpage.kr", pages: 10 },
  { id: "hangseong", name: "항성산업사", domain: "hangseong.premiumpage.kr", pages: 8 },
  { id: "emt", name: "EMT", domain: "emt.premiumpage.kr", pages: 12 },
  { id: "air-hstech", name: "Air HS-TECH (GENWISH)", domain: "hstechco.premiumpage.kr", pages: 25 },
];

export const { GET, POST } = createAdminHandler({
  projectId: "premiumpage",
  projectName: "PremiumPage (전자카탈로그)",

  async getStats() {
    const [totalUsers, contentCount, recentSignups] = await Promise.all([
      prisma.user.count(),
      prisma.project.count(),
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
      }),
    ]);

    return {
      totalUsers,
      contentCount,
      mau: recentSignups,
      recentSignups,
    };
  },

  async getRecentActivity() {
    const projects = await prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, createdAt: true },
    });

    return projects.map((p) => ({
      id: p.id,
      type: "project_created" as const,
      label: p.name,
      timestamp: p.createdAt.toISOString(),
    }));
  },

  async getResource(resource, searchParams) {
    const page = Number(searchParams?.get("page") ?? 1);
    const take = 20;
    const skip = (page - 1) * take;

    if (resource === "projects") {
      return prisma.project.findMany({
        take,
        skip,
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, description: true, userId: true, createdAt: true },
      });
    }

    if (resource === "quotes") {
      return prisma.quoteRequest.findMany({
        take,
        skip,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          contactName: true,
          contactEmail: true,
          templateId: true,
          status: true,
          createdAt: true,
        },
      });
    }

    if (resource === "users") {
      return prisma.user.findMany({
        take,
        skip,
        orderBy: { createdAt: "desc" },
        select: { id: true, email: true, name: true, role: true, createdAt: true },
      });
    }

    if (resource === "catalogs") {
      return CATALOGS;
    }

    return null;
  },
});
