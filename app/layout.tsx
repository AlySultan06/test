import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import TransitionLayout from "@/components/TransitionLayout";
import CustomCursor from "@/components/CustomCursor";
import CartProvider from "@/components/CartProvider";

export const metadata: Metadata = {
  title: "Positfy | Poster Gallery",
  description: "Positfy is a kinetic poster gallery with AI sizing assistance."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <CustomCursor />
          <Navbar />
          <TransitionLayout>
            <main>{children}</main>
          </TransitionLayout>
          <footer className="footer">
            Crafted for Positfy — Posters with presence and precision.
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
