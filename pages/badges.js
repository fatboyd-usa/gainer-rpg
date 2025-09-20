import { useEffect, useState } from "react";

export default function Badges() {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    // Only run in the browser
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("badges");
      if (saved) setBadges(JSON.parse(saved));
    }
  }, []);

  return (
    <div>
      <h1>Your Badges</h1>
      {badges.length > 0 ? (
        <ul>
          {badges.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      ) : (
        <p>No badges yet.</p>
      )}
    </div>
  );
}
