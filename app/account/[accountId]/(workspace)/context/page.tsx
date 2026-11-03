"use client";

import { AlertTriangle, Compass, Cpu, Radio, Target } from "lucide-react";
import { useAccount } from "@/context/account-context";
import { getBusinessContext } from "@/lib/data-access";
import { BusinessContextHeader } from "@/components/business-context/business-context-header";
import { SignalGroup } from "@/components/business-context/signal-group";
import { Reveal } from "@/components/motion/reveal";

export default function BusinessContextPage() {
  const account = useAccount();
  const context = getBusinessContext(account.id);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Reveal>
        <BusinessContextHeader context={context} accountName={account.shortName} />
      </Reveal>
      <Reveal delay={0.05}>
        <SignalGroup icon={Target} title="Industry Priorities" signals={context.industryPriorities} />
      </Reveal>
      <Reveal delay={0.1}>
        <SignalGroup icon={Radio} title="Business Signals" signals={context.businessSignals} />
      </Reveal>
      <Reveal delay={0.15}>
        <SignalGroup icon={AlertTriangle} title="Potential Challenges" signals={context.potentialChallenges} />
      </Reveal>
      <Reveal delay={0.2}>
        <SignalGroup icon={Compass} title="Strategic Context" signals={context.strategicContext} />
      </Reveal>
      <Reveal delay={0.25}>
        <SignalGroup icon={Cpu} title="Relevant Technology Trends" signals={context.technologyTrends} />
      </Reveal>
    </div>
  );
}
