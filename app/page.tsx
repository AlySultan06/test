import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PosterCard, { Poster } from "@/components/PosterCard";

export default async function HomePage() {
  const posters = await prisma.poster.findMany({ take: 3 });

  return (
    <div className="hero">
      <div>
        <span className="badge">Positfy Studio</span>
        <h1>Posters engineered for immersive rooms.</h1>
        <p>
          Positfy blends cinematic prints with adaptive sizing. Explore curated
          poster drops, build your cart, and let our AI agent align the perfect
          dimensions to your space.
        </p>
        <div className="hero-actions">
          <Link href="/posters" className="btn primary">
            Browse posters
          </Link>
          <Link href="/agent" className="btn">
            Talk to the AI agent
          </Link>
        </div>
      </div>
      <section>
        <h2 className="section-title">Featured drop</h2>
        <div className="grid">
          {posters.map((poster) => (
            <PosterCard key={poster.id} poster={poster as Poster} />
          ))}
        </div>
      </section>
    </div>
  );
}
