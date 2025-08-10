import { useMemo, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import SocialProof from "@/components/SocialProof";

import Quiz from "@/components/Quiz";
import LeadGate from "@/components/LeadGate";
import ResultsReport from "@/components/ResultsReport";
import CalendarSection from "@/components/CalendarSection";

import SiteFooter from "@/components/SiteFooter";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import type { QuizAnswers, LeadInfo } from "@/types/quiz";

const Index = () => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    age: "",
    trips: "",
    loads: [],
    homeSize: "",
    sqFtDetail: "",
    zip: "",
    timeline: "",
  });

  const [showLeadGate, setShowLeadGate] = useState(false);
  const [lead, setLead] = useState<LeadInfo | null>(null);

  const quizRef = useRef<HTMLDivElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const totalSteps = 6;

  const onStartQuiz = () => {
    setStep(1);
    document.getElementById("root")?.scrollIntoView({ behavior: "smooth" });
  };

  const onContinueFromHero = () => {
    setStep(2);
    document.querySelector("#quiz")?.scrollIntoView({ behavior: "smooth" });
  };

  const onQuizComplete = () => {
    setShowLeadGate(true);
    window.setTimeout(() => document.querySelector("#lead-gate")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const onLeadSubmitted = (l: LeadInfo) => {
    setLead(l);
    window.setTimeout(() => document.querySelector("#results")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const downloadReport = () => {
    const content = `<!doctype html><html><head><meta charset='utf-8'><title>Panel Check Report</title></head><body><h1>Panel Check Report</h1><p>Tiered results and recommendations based on your quiz. Save for your records.</p><pre>${JSON.stringify({ answers, lead }, null, 2)}</pre></body></html>`;
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

  const seoTitle = "Premium Panel Upgrades | High-End Home Electrical";
  const seoDesc = "Premium electrical panel upgrades ($8K–$15K avg). Safer, EV-ready, code-compliant. Take our 60-second Panel Check and claim $200 OFF.";

  return (
    <main>
      <SEOHead title={seoTitle} description={seoDesc} />
      <Hero
        age={answers.age as any}
        setAge={(age) => setAnswers({ ...answers, age })}
        onStartQuiz={onStartQuiz}
        onContinue={onContinueFromHero}
        step={step}
        totalSteps={totalSteps}
      />

      <Benefits />
      <SocialProof />
      

      <Quiz
        answers={answers}
        setAnswers={setAnswers}
        setStepGlobal={setStep}
        onQuizComplete={onQuizComplete}
      />

      {showLeadGate && !lead && (
        <div id="lead-gate">
          <LeadGate onSubmitted={onLeadSubmitted} />
        </div>
      )}

      {lead && (
        <div id="results">
          <ResultsReport answers={answers} onDownload={downloadReport} onBookScroll={bookScroll} />
        </div>
      )}

      {lead && (
        <div id="calendar">
          <CalendarSection leadName={lead.name} />
        </div>
      )}

      
      <SiteFooter />

      <MobileStickyCTA onClick={onContinueFromHero} />
    </main>
  );
};

export default Index;
