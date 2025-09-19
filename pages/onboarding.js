// pages/onboarding.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function Onboarding() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Not logged in</p>; // middleware will handle redirect

  return (
    <div>
      <h1>Onboarding</h1>
      <p>Hi {user.email}, let’s get you set up!</p>
    </div>
  );
}
