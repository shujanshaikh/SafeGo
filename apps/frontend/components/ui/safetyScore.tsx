"use client";

import React, { useState } from "react";

const SafetyScore = () => {
  const [location, setLocation] = useState("");
  const [safety, setSafety] = useState<{ score: number; label: string; summary: string } | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const getSafetyScore = async () => {
    if (!location) return;
    setLoading(true);

    try {
      const response = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3-sonar-small-32k-online",
          messages: [{ role: "user", content: `How safe is ${location} for travelers?` }],
        }),
      });

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      setSafety(analyzeSafetyScore(aiResponse));
    } catch (error) {
      console.error("Error fetching safety score", error);
    }

    setLoading(false);
  };

  const analyzeSafetyScore = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes("dangerous") || lower.includes("high crime"))
      return { score: 2, label: "High Risk 🚨", summary: text };
    if (lower.includes("moderate") || lower.includes("some crime"))
      return { score: 5, label: "Moderate Risk ⚠️", summary: text };
    if (lower.includes("safe") || lower.includes("low crime"))
      return { score: 9, label: "Safe ✅", summary: text };
    return { score: 5, label: "Unknown", summary: text };
  };

  return (
    <div className="mt-5 p-4 bg-gray-100 rounded-lg shadow-md">
      <h3>🔍 Check Safety Score</h3>
      <div className="flex space-x-2 mt-2">
        <input
          type="text"
          className="p-2 border rounded w-full"
          placeholder="Enter a location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={getSafetyScore}>
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      {safety && (
        <div className="mt-3 p-3 rounded bg-gray-200">
          <h4>📌 {safety.label}</h4>
          <p>{safety.summary}</p>
        </div>
      )}
    </div>
  );
};

export default SafetyScore;
