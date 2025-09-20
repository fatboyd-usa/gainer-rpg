// pages/bosses.js
import { useState, useEffect } from "react";

export default function Bosses() {
  const [bosses, setBosses] = useState([]);

  // Load from localStorage only in the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("bosses");
      if (stored) {
        try {
          setBosses(JSON.parse(stored));
        } catch (err) {
          console.error("Failed to parse bosses:", err);
        }
      }
    }
  }, []);

  // Save to localStorage when bosses changes
  useEffect(() => {
    if (typeof window !== "undefined" && bosses.length > 0) {
      localStorage.setItem("bosses", JSON.stringify(bosses));
    }
  }, [bosses]);

  const addBoss = () => {
    const newBoss = {
      id: Date.now(),
      name: `Boss ${bosses.length + 1}`,
    };
    setBosses([...bosses, newBoss]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bosses</h1>
      <button
        onClick={addBoss}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Add Boss
      </button>
      <ul className="mt-4 space-y-2">
        {bosses.map((boss) => (
          <li key={boss.id} className="border p-2 rounded">
            {boss.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
