"use client";

import { motion } from "framer-motion";
import { useCart } from "@/components/CartProvider";

export type Poster = {
  id: string;
  title: string;
  description: string;
  price: number;
  size: string;
  image: string;
};

export default function PosterCard({ poster }: { poster: Poster }) {
  const { addItem } = useCart();

  return (
    <motion.article
      className="card glow"
      whileHover={{ y: -6, rotateX: 4, rotateY: -4 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
    >
      <img src={poster.image} alt={poster.title} />
      <span className="badge">{poster.size}</span>
      <h3>{poster.title}</h3>
      <p>{poster.description}</p>
      <strong>${poster.price.toFixed(2)}</strong>
      <button
        className="btn primary"
        onClick={() =>
          addItem({
            id: poster.id,
            title: poster.title,
            price: poster.price,
            size: poster.size
          })
        }
      >
        Add to cart
      </button>
    </motion.article>
  );
}
