import { prisma } from "@/lib/prisma";

const CATALOGS = [
  { id: "hstech", name: "HS-TECH", domain: "hstech.premiumpage.kr", pages: 24 },
  { id: "gentop", name: "GENTOP", domain: "gentop.premiumpage.kr", pages: 10 },
  { id: "hangseong", name: "항성산업사", domain: "hangseong.premiumpage.kr", pages: 8 },
  { id: "emt", name: "EMT", domain: "emt.premiumpage.kr", pages: 12 },
  { id: "air-hstech", name: "Air HS-TECH (GENWISH)", domain: "hstechco.premiumpage.kr", pages: 25 },
];

function verifyAdminSecret(request: Request): boolean {
  const secret = process.env.VIBERS_ADMIN_SECRET;
  if (!secret) return false;
  return request.headers.get("x-vibers-admin-secret") === secret;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const resource = url.searchParams.get("resource");

  if (!verifyAdminSecret(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (resource) {
    try {
      let data = null;
      const page = Number(url.searchParams.get("page") ?? 1);
      const take = 20;
      const skip = (page - 1) * take;

      if (resource === "projects") {
        data = await prisma.project.findMany({
          take,
          skip,
          orderBy: { createdAt: "desc" },
          select: { id: true, name: true, description: true, userId: true, createdAt: true },
        });
      } else if (resource === "quotes") {
        data = await prisma.quoteRequest.findMany({
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
      } else if (resource === "users") {
        data = await prisma.user.findMany({
          take,
          skip,
          orderBy: { createdAt: "desc" },
          select: { id: true, email: true, name: true, role: true, createdAt: true },
        });
      } else if (resource === "catalogs") {
        data = CATALOGS;
      }

      return Response.json({ resource, data });
    } catch (err) {
      console.error(`[vibers-admin:premiumpage:${resource}]`, err);
      return Response.json({ error: "Resource fetch failed" }, { status: 500 });
    }
  }

  try {
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

    const projects = await prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, createdAt: true },
    });

    const recentActivity = projects.map((p) => ({
      id: p.id,
      type: "project_created" as const,
      label: p.name,
      timestamp: p.createdAt.toISOString(),
    }));

    return Response.json({
      projectId: "premiumpage",
      projectName: "PremiumPage (전자카탈로그)",
      stats: {
        totalUsers,
        contentCount,
        mau: recentSignups,
        recentSignups,
      },
      recentActivity,
      health: "healthy",
    });
  } catch (err) {
    console.error("[vibers-admin:premiumpage]", err);
    return Response.json({
      projectId: "premiumpage",
      projectName: "PremiumPage (전자카탈로그)",
      stats: { mau: 0, totalUsers: 0, contentCount: 0, recentSignups: 0 },
      recentActivity: [],
      health: "error",
    });
  }
}

export async function POST(request: Request) {
  if (!verifyAdminSecret(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return Response.json({ error: "Not implemented" }, { status: 501 });
}
