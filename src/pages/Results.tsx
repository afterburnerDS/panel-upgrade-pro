import { useEffect, useMemo, useState } from "react";
import SEOHead from "@/components/SEOHead";
import ResultsReport from "@/components/ResultsReport";
import CalendarSection from "@/components/CalendarSection";
import { Button } from "@/components/ui/button";
import { scoreQuiz } from "@/lib/quizScoring";
import type { LeadInfo, QuizAnswers } from "@/types/quiz";
import { useNavigate } from "react-router-dom";

const ANSWERS_KEY = "panelQuizAnswers";
const LEAD_KEY = "panelLeadInfo";

const Results = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);
  const [lead, setLead] = useState<LeadInfo | null>(null);

  useEffect(() => {
    try {
      const a = localStorage.getItem(ANSWERS_KEY);
      const l = localStorage.getItem(LEAD_KEY);
      if (a) setAnswers(JSON.parse(a));
      if (l) setLead(JSON.parse(l));
    } catch {}
  }, []);

  useEffect(() => {
    if (answers == null) {
      // If no context, send back to quiz
      const t = setTimeout(() => navigate("/quiz"), 600);
      return () => clearTimeout(t);
    }
  }, [answers, navigate]);

  const summary = useMemo(() => {
    if (!answers) return { score: 0, tier: 1, percent: 0 } as const;
    const { score, tier } = scoreQuiz(answers);
    const maxScore = 12; // from scoring rules
    const percent = Math.round((score / maxScore) * 100);
    return { score, tier, percent } as const;
  }, [answers]);

  const downloadReport = () => {
    const content = `<!doctype html><html><head><meta charset='utf-8'><title>Panel Check Report</title></head><body><h1>Panel Check Report</h1><p>Tiered results and recommendations based on your quiz. Save for your records.</p><pre>${JSON.stringify(
      { answers, lead },
      null,
      2
    )}</pre></body></html>`;
    const blob = new Blob([content], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "panel-check-report.html";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const bookScroll = () => {
    document.querySelector("#calendar")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <SEOHead
        title="Your Panel Readiness Results"
        description="Detailed safety and EV readiness report with personalized recommendations."
      />

      <section className="container px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <header className="rounded-2xl border bg-primary/5 p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold">Your Panel Readiness</h1>
            <p className="text-muted-foreground mt-1">Based on your home's details and planned loads</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl bg-background border p-4">
                <p className="text-xs text-muted-foreground">Readiness Score</p>
                <p className="text-2xl font-semibold">{summary.percent}%</p>
              </div>
              <div className="rounded-xl bg-background border p-4">
                <p className="text-xs text-muted-foreground">Tier</p>
                <p className="text-2xl font-semibold">{summary.tier}</p>
              </div>
              <div className="rounded-xl bg-background border p-4">
                <p className="text-xs text-muted-foreground">Raw score</p>
                <p className="text-2xl font-semibold">{summary.score}/12</p>
              </div>
            </div>
            <div className="mt-6">
              <Button size="lg" variant="hero" onClick={bookScroll}>Schedule Consultation</Button>
            </div>
          </header>

          {answers && (
            <ResultsReport answers={answers} onDownload={downloadReport} onBookScroll={bookScroll} />
          )}
        </div>
      </section>

      <div id="calendar">
        <CalendarSection leadName={lead?.name} />
      </div>
    </main>
  );
};

export default Results;
