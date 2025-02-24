// app/api/events/route.js
import { prisma } from "@/libs/database";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId");
  const location = searchParams.get("location");
  const scheduledAt = searchParams.get("scheduledAt");

  const events = await prisma.event.findMany({
    take: 10,
    where: {
      scheduledAt: {
        gt: new Date(),
      },
      ...(categoryId && { categoryId: parseInt(categoryId) }),
      ...(location && { location: { contains: location } }),
      ...(scheduledAt && { scheduledAt: { gte: new Date(scheduledAt) } }),
    },
    select: {
      id: true,
      title: true,
      location: true,
      description: true,
      scheduledAt: true,
      user: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: [{ scheduledAt: "desc" }],
  });

  return NextResponse.json(events);
}
