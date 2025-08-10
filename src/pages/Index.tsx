import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import SocialProof from "@/components/SocialProof";
import BottomCTA from "@/components/BottomCTA";
import SiteFooter from "@/components/SiteFooter";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import type { QuizAnswers } from "@/types/quiz";

const Index = () => {
  const navigate = useNavigate();
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

  const totalSteps = 6;

  const onStartQuiz = () => {
    navigate("/quiz");
  };

  const onContinueFromHero = () => {
    navigate("/quiz");
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
      





      <BottomCTA onCTAClick={() => navigate("/quiz")} />
      <SiteFooter />

      <MobileStickyCTA onClick={onContinueFromHero} />
    </main>
  );
};

export default Index;
