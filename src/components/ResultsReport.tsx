import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { scoreQuiz } from "@/lib/quizScoring";
import type { QuizAnswers, Tier } from "@/types/quiz";
import { useMemo } from "react";

interface ResultsReportProps {
  answers: QuizAnswers;
  onDownload: () => void;
  onBookScroll: () => void;
}

const tierHeading = (tier: Tier) => {
  if (tier === 3) return "Priority Upgrade Recommended — Likely 200A Main Service";
  if (tier === 2) return "Upgrade Worth Considering — Capacity & Safety Review Inside";
  return "No Urgent Risks Found — Monitor & Plan Ahead";
};

const ResultsReport = ({ answers, onDownload, onBookScroll }: ResultsReportProps) => {
  const { score, tier } = useMemo(() => scoreQuiz(answers), [answers]);

  const loadCount = (answers.loads || []).length;
  const loadPercent = Math.min(100, 20 + loadCount * 15 + (answers.homeSize === "4000+" ? 20 : answers.homeSize === "2500-4000" ? 10 : 0));

  const safetySummary = useMemo(() => {
    const parts: string[] = [];
    if (answers.age === "20-30") parts.push("Panel age may approach end-of-life; components can drift out of spec.");
    if (answers.age === "30+ / not sure") parts.push("Older or legacy panels may have documented issues; we’ll verify on-site.");
    if (["Monthly", "Weekly", "Daily"].includes(answers.trips)) parts.push("Frequent trips suggest overloads or weak breakers; modern panels reduce nuisance trips.");
    return parts.length ? parts.join(" ") : "No urgent flags based on your inputs; we’ll still perform a code-compliance review on-site.";
  }, [answers]);

  return (
    <section className="container px-4 py-12" aria-labelledby="results-heading">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 id="results-heading" className="text-2xl sm:text-3xl font-bold">{tierHeading(tier)}</h2>
          <p className="mt-2 text-sm text-muted-foreground">Score: {score} • Tier {tier}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Safety & Code Findings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{safetySummary}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Estimated Budget Range</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Typical panel upgrades: $8K–$15K depending on service size, distance, grounding, permits.</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Capacity & Future-Proofing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="h-3 w-full rounded bg-muted">
                  <div className="h-3 rounded bg-success" style={{ width: `${loadPercent}%` }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Projected load readiness based on planned circuits and home size.</p>
              </div>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                <li>Map planned loads to dedicated circuits and available amperage.</li>
                <li>Ensure headroom for EVs, induction, heat pumps, hot tubs, and battery/solar.</li>
                <li>Modern breakers and labeling reduce trips and improve safety.</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What a New Panel Enables</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>EVs</li>
                <li>Solar/battery</li>
                <li>Induction range</li>
                <li>Heat pump</li>
                <li>Backyard spa</li>
                <li>Dedicated home office power</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="mb-4">Book today to lock in $200 OFF your panel upgrade.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button data-cta="book-call" variant="hero" onClick={onBookScroll}>Book Phone Consultation</Button>
            <Button variant="outline" onClick={onDownload}>Download Report (PDF)</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsReport;
