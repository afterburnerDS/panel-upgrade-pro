import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { LeadInfo } from "@/types/quiz";

interface LeadGateProps {
  onSubmitted: (lead: LeadInfo) => void;
}

const LeadGate = ({ onSubmitted }: LeadGateProps) => {
  const [lead, setLead] = useState<LeadInfo>({ name: "", email: "", phone: "", consent: false });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError(null);
    if (!lead.name || !lead.email || !lead.phone || !lead.consent) {
      setError("Please complete all required fields and consent.");
      return;
    }
    setLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      }).catch(() => {
        // No backend: gracefully fallback
        console.log("Lead captured (stub):", lead);
      });
    } catch (e) {
      console.log("Lead stubbed due to missing backend", e);
    } finally {
      setLoading(false);
      onSubmitted(lead);
    }
  };

  return (
    <section className="container px-4 py-12" aria-labelledby="leadgate-heading">
      <div className="max-w-xl mx-auto">
        <h2 id="leadgate-heading" className="text-2xl font-bold">Great—your custom results are ready.</h2>
        <p className="mt-2 text-muted-foreground">Enter your details to view your safety & capacity report and claim $200 OFF.</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm mb-1">Name<span className="sr-only"> (required)</span></label>
            <input
              type="text"
              className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
              value={lead.name}
              onChange={(e) => setLead({ ...lead, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email<span className="sr-only"> (required)</span></label>
            <input
              type="email"
              className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
              value={lead.email}
              onChange={(e) => setLead({ ...lead, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Phone<span className="sr-only"> (required)</span></label>
            <input
              type="tel"
              className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
              value={lead.phone}
              onChange={(e) => setLead({ ...lead, phone: e.target.value })}
              required
            />
          </div>
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={lead.consent}
              onChange={(e) => setLead({ ...lead, consent: e.target.checked })}
              className="mt-1"
            />
            <span>
              I consent to receive communications regarding my electrical upgrade via email and text. Message/data rates may apply.
            </span>
          </label>

          {error && <p className="text-destructive text-sm" role="alert">{error}</p>}

          <div>
            <Button data-cta="lead-submit" variant="hero" onClick={submit} disabled={loading}>
              {loading ? "Submitting..." : "View My Results"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadGate;
