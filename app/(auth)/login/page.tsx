"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      email: String(formData.get("email")),
      password: String(formData.get("password"))
    };

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error ?? "Unable to sign in.");
      setLoading(false);
      return;
    }

    router.push("/posters");
  };

  return (
    <section>
      <h1 className="section-title">Welcome back</h1>
      <p style={{ color: "var(--muted)", marginBottom: 24 }}>
        Sign in to save your cart and access personalized sizing suggestions.
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        {error && <span style={{ color: "#ff9dab" }}>{error}</span>}
        <button className="btn primary" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <p style={{ marginTop: 16, color: "var(--muted)" }}>
        New to Positfy? <Link href="/register">Create an account</Link>
      </p>
    </section>
  );
}
