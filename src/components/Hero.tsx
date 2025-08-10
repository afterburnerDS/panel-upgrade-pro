import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-panel-upgrade.jpg";
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
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="mb-3 inline-block rounded-full bg-accent/20 text-accent-foreground px-3 py-1 text-xs tracking-wide">
                Complete the quiz today and claim $200 OFF your panel upgrade.
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                Transform Your Home’s Electrical System — Premium Panel Upgrades ($8K–$15K Avg)
              </h1>
              <p className="mt-4 text-base sm:text-lg max-w-prose opacity-90">
                Safer, smarter, and ready for EVs & modern living. Take our 60-second Panel Check to unlock $200 OFF your upgrade.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
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

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button data-cta="start-quiz" variant="hero" size="lg" onClick={onStartQuiz}>
                  Start 60-Second Panel Check
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#quiz">Continue</a>
                </Button>
              </div>

              <div ref={sectionRef} className="mt-10 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm" aria-live="polite">Step {step} of {totalSteps}</span>
                  <span className="text-sm" aria-hidden>{progress}%</span>
                </div>
                <div className="h-2 w-full rounded bg-white/20">
                  <div className="h-2 rounded bg-accent" style={{ width: `${progress}%` }} />
                </div>

                <fieldset className="mt-4">
                  <legend className="block text-sm font-medium mb-3">Q1. How old is your current electrical panel?</legend>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(["<10", "10-20", "20-30", "30+ / not sure"] as AgeOption[]).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setAge(opt)}
                        className={`rounded-lg px-3 py-2 text-sm border transition ${
                          age === opt ? "bg-accent text-accent-foreground border-accent" : "bg-white/5 border-white/20 hover:bg-white/10"
                        }`}
                        aria-pressed={age === opt}
                      >
                        {opt.startsWith("<") ? `🟢 ${opt} years` : opt.startsWith("10") ? `🟡 ${opt} years` : opt.startsWith("20") ? `🟠 ${opt} years` : `🔴 ${opt}`}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="accent" onClick={onContinue}>Continue</Button>
                  </div>
                </fieldset>
              </div>
            </div>

            <div className="relative">
              <img
                src={heroImg}
                alt="Before and after premium electrical panel upgrade in a modern residential garage"
                className="w-full h-auto rounded-lg shadow-lg"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
