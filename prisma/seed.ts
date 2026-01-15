import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const posters = [
    {
      title: "Neon Skyline",
      description: "A cinematic neon cityscape with rain-soaked reflections.",
      price: 48,
      size: "24x36 in",
      image: "/posters/neon-skyline.svg"
    },
    {
      title: "Desert Mirage",
      description: "Soft gradients and dunes for warm minimalist interiors.",
      price: 42,
      size: "18x24 in",
      image: "/posters/desert-mirage.svg"
    },
    {
      title: "Botanical Pulse",
      description: "Layered leaves with motion blur for modern spaces.",
      price: 55,
      size: "30x40 in",
      image: "/posters/botanical-pulse.svg"
    },
    {
      title: "Ocean Static",
      description: "Cool-toned waves with glitch-inspired textures.",
      price: 50,
      size: "24x32 in",
      image: "/posters/ocean-static.svg"
    }
  ];

  for (const poster of posters) {
    await prisma.poster.upsert({
      where: { title: poster.title },
      update: poster,
      create: poster
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
