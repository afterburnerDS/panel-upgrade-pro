import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { QuizAnswers, TripsOption, LoadOption, HomeSizeOption } from "@/types/quiz";

const STORAGE_KEY = "panel-quiz-answers-v1";

const loadOptions: LoadOption[] = [
  "EV charger",
  "Home office circuits",
  "Heat pump / HVAC",
  "Induction range",
  "Hot tub / sauna",
  "Solar / battery soon",
  "Other",
];

interface QuizProps {
  answers: QuizAnswers;
  setAnswers: (a: QuizAnswers) => void;
  setStepGlobal: (n: number) => void;
  onQuizComplete: () => void; // advance to lead gate
}

const Quiz = ({ answers, setAnswers, setStepGlobal, onQuizComplete }: QuizProps) => {
  const [step, setStep] = useState<number>(2); // Q2->Q6

  useEffect(() => {
    setStepGlobal(step);
  }, [step, setStepGlobal]);

  useEffect(() => {
    // hydrate from localStorage on mount
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const data = JSON.parse(raw);
        setAnswers({ ...answers, ...data });
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  const totalSteps = 6;
  const progress = useMemo(() => Math.round((step / totalSteps) * 100), [step]);

  const next = () => {
    if (step < 6) setStep(step + 1);
    else onQuizComplete();
  };
  const prev = () => setStep(Math.max(2, step - 1));

  return (
    <section id="quiz" className="container px-4 py-12" aria-labelledby="quiz-heading">
      <div className="max-w-3xl mx-auto">
        <h2 id="quiz-heading" className="sr-only">Panel Check Quiz</h2>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm" aria-live="polite">Step {step} of {totalSteps}</span>
          <span className="text-sm" aria-hidden>{progress}%</span>
        </div>
        <div className="h-2 w-full rounded bg-muted">
          <div className="h-2 rounded bg-accent" style={{ width: `${progress}%` }} />
        </div>

        {step === 2 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Q2. Breaker behavior: How often do breakers trip?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {["Never", "A few times a year", "Monthly", "Weekly", "Daily"].map((opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setAnswers({ ...answers, trips: opt as TripsOption })}
                    className={`rounded-lg px-3 py-2 text-sm border transition ${
                      answers.trips === (opt as TripsOption)
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-background border-input hover:bg-accent/10"
                    }`}
                    aria-pressed={answers.trips === (opt as TripsOption)}
                  >
                    {opt}
                  </button>
                )))}
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={prev}>Back</Button>
                <Button variant="accent" onClick={next}>Next</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Q3. Upcoming loads (multi-select)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {loadOptions.map((opt) => {
                  const active = answers.loads.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        const set = new Set(answers.loads);
                        if (active) set.delete(opt); else set.add(opt);
                        setAnswers({ ...answers, loads: Array.from(set) });
                      }}
                      className={`rounded-lg px-3 py-2 text-sm border transition ${
                        active ? "bg-accent text-accent-foreground border-accent" : "bg-background border-input hover:bg-accent/10"
                      }`}
                      aria-pressed={active}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={prev}>Back</Button>
                <Button variant="accent" onClick={next}>Next</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Q4. Home size / load</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(["<1500", "1500-2500", "2500-4000", "4000+"] as HomeSizeOption[]).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setAnswers({ ...answers, homeSize: opt })}
                    className={`rounded-lg px-3 py-2 text-sm border transition ${
                      answers.homeSize === opt ? "bg-accent text-accent-foreground border-accent" : "bg-background border-input hover:bg-accent/10"
                    }`}
                    aria-pressed={answers.homeSize === opt}
                  >
                    {opt === "<1500" ? "⬇️ <1,500 sq ft" : opt === "1500-2500" ? "1,500–2,500" : opt === "2500-4000" ? "2,500–4,000" : "4,000+"}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm mb-1">Optional: Specific square footage</label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
                  placeholder="e.g., 3200"
                  value={answers.sqFtDetail || ""}
                  onChange={(e) => setAnswers({ ...answers, sqFtDetail: e.target.value })}
                />
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={prev}>Back</Button>
                <Button variant="accent" onClick={next}>Next</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 5 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Q5. Panel brand/photo (optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Upload a clear photo of your panel</label>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="block w-full text-sm"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const base64 = await fileToBase64(file);
                    setAnswers({ ...answers, panelPhoto: base64 });
                  }}
                />
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={prev}>Back</Button>
                <Button variant="accent" onClick={next}>Next</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 6 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Q6. Zip code & timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1">Zip code</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
                    placeholder="e.g., 85001"
                    value={answers.zip || ""}
                    onChange={(e) => setAnswers({ ...answers, zip: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Timeline</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["ASAP", "30–60 days", "Exploring budget"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setAnswers({ ...answers, timeline: t as any })}
                        className={`rounded-lg px-3 py-2 text-sm border transition ${
                          answers.timeline === (t as any)
                            ? "bg-accent text-accent-foreground border-accent"
                            : "bg-background border-input hover:bg-accent/10"
                        }`}
                        aria-pressed={answers.timeline === (t as any)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={prev}>Back</Button>
                <Button data-cta="finish-quiz" variant="hero" onClick={onQuizComplete}>See my results</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default Quiz;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
