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
