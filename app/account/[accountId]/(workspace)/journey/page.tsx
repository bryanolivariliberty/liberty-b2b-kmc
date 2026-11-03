"use client";

import { useMemo, useState } from "react";
import { Flag, Target } from "lucide-react";
import { useAccount } from "@/context/account-context";
import { buildCustomerJourney, formatJourneyForClipboard, formatStageForClipboard } from "@/lib/journey";
import { JourneyStageTimeline } from "@/components/journey/journey-stage-timeline";
import { JourneyAssetCard } from "@/components/journey/journey-asset-card";
import { CopyButton } from "@/components/shared/copy-button";
import { DemoDataBanner } from "@/components/shared/demo-data-banner";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import type { JourneyStageId } from "@/types";

export default function JourneyPage() {
  const account = useAccount();
  const journey = useMemo(() => buildCustomerJourney(account.id), [account.id]);
  const [activeStageId, setActiveStageId] = useState<JourneyStageId>(journey.stages[0].id);

  const stage = journey.stages.find((s) => s.id === activeStageId) ?? journey.stages[0];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Reveal>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Customer Journey</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Every asset below is already written for {account.shortName} — copy it straight into email or CRM.
            </p>
          </div>
          <CopyButton
            getText={() => formatJourneyForClipboard(journey, account.name)}
            label="Copy full journey"
            successMessage={`Full journey for ${account.shortName} copied`}
          />
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <Card>
          <CardContent className="space-y-2 pt-5">
            <p className="text-xs font-semibold tracking-wide text-liberty-blue uppercase">{journey.headline}</p>
            <p className="text-sm leading-relaxed text-foreground">{journey.positioning}</p>
          </CardContent>
        </Card>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="rounded-xl border border-border bg-muted/30 p-1.5">
          <JourneyStageTimeline stages={journey.stages} activeId={activeStageId} onSelect={setActiveStageId} />
        </div>
      </Reveal>

      <Reveal delay={0.14} key={stage.id}>
        <div className="space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-border bg-card p-5">
            <div className="min-w-0 space-y-3">
              <div className="flex items-start gap-2.5">
                <Target className="mt-0.5 size-4 shrink-0 text-liberty-blue" />
                <div>
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Goal of this stage</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-foreground">{stage.goal}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Flag className="mt-0.5 size-4 shrink-0 text-[#fab219]" />
                <div>
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Move on when</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{stage.exitCriteria}</p>
                </div>
              </div>
            </div>

            <CopyButton
              getText={() => formatStageForClipboard(stage, account.name)}
              label={`Copy ${stage.label} stage`}
              successMessage={`${stage.label} stage copied`}
              className="shrink-0"
            />
          </div>

          <div className="space-y-4">
            {stage.assets.map((asset) => (
              <JourneyAssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <DemoDataBanner>
          These templates are illustrative and use this account&rsquo;s demo data. Square-bracket placeholders are
          intentional — they mark the details only the rep can fill in, such as dates, results, and their own name.
        </DemoDataBanner>
      </Reveal>
    </div>
  );
}
