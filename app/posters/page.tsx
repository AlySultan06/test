import { prisma } from "@/lib/prisma";
import PosterCard, { Poster } from "@/components/PosterCard";

export default async function PostersPage() {
  const posters = await prisma.poster.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <section>
      <h1 className="section-title">All posters</h1>
      <p style={{ color: "var(--muted)", marginBottom: 24 }}>
        Discover the full Positfy collection with pricing, sizes, and ultra vivid
        textures.
      </p>
      <div className="grid">
        {posters.map((poster) => (
          <PosterCard key={poster.id} poster={poster as Poster} />
        ))}
      </div>
    </section>
  );
}
