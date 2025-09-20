// pages/dashboard.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("dashboardStats");
      if (stored) {
        try {
          setStats(JSON.parse(stored));
        } catch (err) {
          console.error("Failed to parse dashboard stats:", err);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dashboardStats", JSON.stringify(stats));
    }
  }, [stats]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2">Level: {stats.level}</p>
      <p>XP: {stats.xp}</p>
    </div>
  );
}

import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Not logged in</p>; // middleware will handle redirect

  return (
    <div>
      <h1>Welcome {user.email}</h1>
      <button
        onClick={async () => {
          await supabase.auth.signOut();
        }}
      >
        Logout
      </button>
    </div>
  );
}
