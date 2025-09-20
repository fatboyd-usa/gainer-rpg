import { useState, useEffect } from "react";

export default function Onboarding() {
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("onboardingStep");
      if (stored) {
        setStep(Number(stored));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("onboardingStep", step);
    }
  }, [step]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Onboarding</h1>
      <p className="mt-2">You are on step {step}</p>
      <button
        onClick={() => setStep(step + 1)}
        className="bg-green-600 text-white px-4 py-2 rounded mt-4"
      >
        Next Step
      </button>
    </div>
  );
}
