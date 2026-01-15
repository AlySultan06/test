import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const vibeMap: Record<string, string> = {
  cinematic: "Neon Skyline",
  minimal: "Desert Mirage",
  nature: "Botanical Pulse",
  futuristic: "Ocean Static"
};

export async function POST(request: Request) {
  const { roomWidth, roomHeight, vibe, focus } = (await request.json()) as {
    roomWidth?: number;
    roomHeight?: number;
    vibe?: string;
    focus?: string;
  };

  const width = Number(roomWidth || 0);
  const height = Number(roomHeight || 0);
  const wallArea = width * height;

  let suggestedSize = "18x24 in";
  if (wallArea > 120) suggestedSize = "36x48 in";
  else if (wallArea > 80) suggestedSize = "30x40 in";
  else if (wallArea > 40) suggestedSize = "24x36 in";

  const recommendationTitle = vibeMap[vibe ?? ""] ?? "Neon Skyline";
  const poster = await prisma.poster.findFirst({
    where: { title: recommendationTitle }
  });

  const notes = [
    `Room scale: ${width}ft x ${height}ft`,
    focus ? `Placement focus: ${focus}` : "Placement focus: center-stage wall",
    "Aim for eye-level alignment at 57-60 inches."
  ];

  return NextResponse.json({
    recommendation: poster
      ? `${poster.title} is tuned for ${vibe ?? "cinematic"} moods.`
      : "A cinematic highlight print would fit your space.",
    suggestedSize,
    notes
  });
}
