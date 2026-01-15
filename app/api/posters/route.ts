import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const posters = await prisma.poster.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(posters);
}
