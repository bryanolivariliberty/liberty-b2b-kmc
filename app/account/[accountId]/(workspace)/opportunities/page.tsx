"use client";

import { useAccount } from "@/context/account-context";
import { getProductOpportunities } from "@/lib/data-access";
import { OpportunityRankedList } from "@/components/opportunities/opportunity-ranked-list";
import { DemoDataBanner } from "@/components/shared/demo-data-banner";
import { Reveal } from "@/components/motion/reveal";

export default function OpportunitiesPage() {
  const account = useAccount();
  const opportunities = getProductOpportunities(account.id);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Reveal>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Opportunity Map</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Five configured product opportunities for {account.shortName}, ranked by KMC&rsquo;s synthesis of account
            data, industry context, product fit, and the sales playbook.
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <DemoDataBanner>
          Products and priority order reflect the Liberty product team&rsquo;s current recommendations for this
          account. Fit scores and relevance signals remain illustrative demo indicators, not mathematically
          validated scoring.
        </DemoDataBanner>
      </Reveal>
      <Reveal delay={0.1}>
        <OpportunityRankedList opportunities={opportunities} />
      </Reveal>
    </div>
  );
}
