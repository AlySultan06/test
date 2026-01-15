"use client";

import { useState } from "react";

type AgentResponse = {
  recommendation: string;
  suggestedSize: string;
  notes: string[];
};

export default function AgentPage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AgentResponse | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setResponse(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      roomWidth: Number(formData.get("roomWidth")),
      roomHeight: Number(formData.get("roomHeight")),
      vibe: String(formData.get("vibe")),
      focus: String(formData.get("focus"))
    };

    const res = await fetch("/api/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    setResponse(data);
    setLoading(false);
  };

  return (
    <section>
      <h1 className="section-title">AI sizing agent</h1>
      <p style={{ color: "var(--muted)", marginBottom: 24 }}>
        Tell us about your room and mood. The Positfy agent will align scale,
        size, and poster style in seconds.
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <input
          name="roomWidth"
          type="number"
          min="1"
          step="0.1"
          placeholder="Room width (ft)"
          required
        />
        <input
          name="roomHeight"
          type="number"
          min="1"
          step="0.1"
          placeholder="Room height (ft)"
          required
        />
        <select name="vibe">
          <option value="cinematic">Cinematic glow</option>
          <option value="minimal">Minimal calm</option>
          <option value="nature">Nature calm</option>
          <option value="futuristic">Futuristic neon</option>
        </select>
        <input
          name="focus"
          type="text"
          placeholder="Focus area (sofa wall, bed frame, entryway)"
        />
        <button className="btn primary" type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Get recommendation"}
        </button>
      </form>

      {response && (
        <div className="card" style={{ marginTop: 32 }}>
          <span className="badge">Agent insight</span>
          <h3>{response.recommendation}</h3>
          <p>Suggested size: {response.suggestedSize}</p>
          <ul style={{ marginTop: 12, color: "var(--muted)" }}>
            {response.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
