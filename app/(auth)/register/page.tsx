"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name")),
      email: String(formData.get("email")),
      password: String(formData.get("password"))
    };

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error ?? "Unable to register.");
      setLoading(false);
      return;
    }

    router.push("/login");
  };

  return (
    <section>
      <h1 className="section-title">Create your account</h1>
      <p style={{ color: "var(--muted)", marginBottom: 24 }}>
        Start a Positfy profile to track orders and AI recommendations.
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Full name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        {error && <span style={{ color: "#ff9dab" }}>{error}</span>}
        <button className="btn primary" type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>
      <p style={{ marginTop: 16, color: "var(--muted)" }}>
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
    </section>
  );
}
