// pages/dashboard.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please log in</p>;
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
