import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);

        if (_event === "SIGNED_IN") {
          console.log("➡️ Redirecting after SIGNED_IN to /dashboard");
          router.push("/dashboard");
        }
        if (_event === "SIGNED_OUT") {
          console.log("➡️ Redirecting after SIGNED_OUT to /login");
          router.push("/login");
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
