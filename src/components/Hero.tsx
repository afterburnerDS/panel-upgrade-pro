import { Button } from "@/components/ui/button";

import { useEffect, useRef } from "react";

const VALUE_CHIPS = [
  "Safety & code compliance",
  "EV-ready capacity",
  "Boost home value",
  "Warranty & permits handled",
];

export type AgeOption = "<10" | "10-20" | "20-30" | "30+ / not sure" | "";

interface HeroProps {
  age: AgeOption;
  setAge: (age: AgeOption) => void;
  onStartQuiz: () => void;
  onContinue: () => void;
  step: number;
  totalSteps: number;
}

const Hero = ({ age, setAge, onStartQuiz, onContinue, step, totalSteps }: HeroProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Ensure focus ring is visible for accessibility when jumping to Q1
    if (sectionRef.current) {
      sectionRef.current.setAttribute("tabindex", "-1");
    }
  }, []);

  const progress = Math.round((step / totalSteps) * 100);

  return (
    <header className="relative overflow-hidden">
      <div className="bg-hero-gradient">
        <div className="container px-4 py-12 sm:py-16 md:py-20 text-primary-foreground">
          <div className="max-w-3xl mx-auto text-center">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent/20 text-accent-foreground px-3 py-1 text-xs tracking-wide">
              <span className="inline-block size-2 rounded-full bg-accent" /> Premium Panel Upgrades
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Transform Your Home’s Electrical System — Premium Panel Upgrades ($8K–$15K Avg)
            </h1>
            <p className="mt-4 text-base sm:text-lg max-w-prose opacity-90 mx-auto">
              Safer, smarter, and ready for EVs & modern living. Take our 60-second Panel Check to unlock $200 OFF your upgrade.
            </p>
            <p className="mt-2 text-sm opacity-90">★★★★★ 4.9/5 from high-end homeowners</p>

            <div className="mt-8">
              <div className="mx-auto max-w-2xl rounded-xl border border-white/10 bg-card text-foreground shadow-lg overflow-hidden">
                <div className="bg-success/10 text-success px-4 py-2 text-sm border-b border-success/20">
                  Licensed • Insured • Permit & inspection included
                </div>
                <div className="p-4 sm:p-6">
                  <fieldset>
                    <legend className="block text-sm font-medium mb-3">Q1. How old is your current electrical panel?</legend>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {( ["<10", "10-20", "20-30", "30+ / not sure"] as AgeOption[] ).map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setAge(opt)}
                          className={`rounded-lg px-3 py-2 text-sm border transition ${
                            age === opt ? "bg-accent text-accent-foreground border-accent" : "bg-background border-input hover:bg-accent/10"
                          }`}
                          aria-pressed={age === opt}
                        >
                          {opt.startsWith("<") ? `🟢 ${opt} years` : opt.startsWith("10") ? `🟡 ${opt} years` : opt.startsWith("20") ? `🟠 ${opt} years` : `🔴 ${opt}`}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
                      <Button data-cta="start-quiz" variant="hero" size="lg" onClick={onStartQuiz}>
                        Start 60-Second Panel Check
                      </Button>
                      <Button variant="outline" size="lg" onClick={onContinue}>
                        Continue to Next Question
                      </Button>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {VALUE_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="text-xs sm:text-sm rounded-full bg-secondary/20 text-primary-foreground border border-white/10 px-3 py-1"
                  aria-label={chip}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
