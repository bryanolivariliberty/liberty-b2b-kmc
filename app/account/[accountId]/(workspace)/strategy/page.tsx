"use client";

import { ArrowRightCircle, DoorOpen, Search, ShieldCheck, Target } from "lucide-react";
import { useAccount } from "@/context/account-context";
import { getMeetingStrategy, getProductOpportunities } from "@/lib/data-access";
import { RecommendedObjectiveBanner } from "@/components/strategy/recommended-objective-banner";
import { StrategyStageTimeline } from "@/components/strategy/strategy-stage-timeline";
import { StrategyStageCard } from "@/components/strategy/strategy-stage-card";
import { ObjectionHandlingList } from "@/components/strategy/objection-handling-list";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

export default function StrategyPage() {
  const account = useAccount();
  const strategy = getMeetingStrategy(account.id);
  const opportunities = getProductOpportunities(account.id);

  const recommendedProducts = strategy.position.recommendedSlots
    .map((slot) => opportunities.find((o) => o.slot === slot))
    .filter((o) => o !== undefined);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Reveal>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Recommended Meeting Strategy</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            KMC coaching for how to open, discover, position, validate, and close this meeting with {account.shortName}.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <RecommendedObjectiveBanner objective={strategy.recommendedObjective} />
      </Reveal>

      <Reveal delay={0.08}>
        <StrategyStageTimeline />
      </Reveal>

      <Reveal delay={0.1}>
        <StrategyStageCard icon={DoorOpen} step={1} title="Open">
          <p className="text-sm leading-relaxed text-foreground">{strategy.openingStrategy}</p>
        </StrategyStageCard>
      </Reveal>

      <Reveal delay={0.14}>
        <StrategyStageCard icon={Search} step={2} title="Discover">
          <p className="text-sm leading-relaxed text-foreground">{strategy.discovery.summary}</p>
          <ul className="mt-3 space-y-2">
            {strategy.discovery.questions.map((q) => (
              <li key={q} className="flex gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-liberty-blue" aria-hidden />
                {q}
              </li>
            ))}
          </ul>
        </StrategyStageCard>
      </Reveal>

      <Reveal delay={0.18}>
        <StrategyStageCard icon={Target} step={3} title="Position">
          <p className="text-sm leading-relaxed text-foreground">{strategy.position.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {recommendedProducts.map((p) => (
              <Badge key={p.slot} variant="secondary">
                {p.productName}
              </Badge>
            ))}
          </div>
        </StrategyStageCard>
      </Reveal>

      <Reveal delay={0.22}>
        <StrategyStageCard icon={ShieldCheck} step={4} title="Validate">
          <ObjectionHandlingList objections={strategy.objectionHandling} />
        </StrategyStageCard>
      </Reveal>

      <Reveal delay={0.26}>
        <StrategyStageCard icon={ArrowRightCircle} step={5} title="Next Step">
          <p className="text-sm leading-relaxed text-foreground">{strategy.nextBestAction}</p>
        </StrategyStageCard>
      </Reveal>
    </div>
  );
}
