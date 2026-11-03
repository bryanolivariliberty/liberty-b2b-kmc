"use client";

import { AlertTriangle, CheckCircle2, CircleDashed, CircleDot, Clock, MessageSquareQuote } from "lucide-react";
import { getExecutiveRoadmap } from "@/lib/data-access";
import { DemoDataBanner } from "@/components/shared/demo-data-banner";
import { SectionHeader } from "@/components/shared/section-header";
import { StatTile } from "@/components/shared/stat-tile";
import { RoadmapPhaseCard } from "@/components/roadmap/roadmap-phase-card";
import { CriticalDependencyCard } from "@/components/roadmap/critical-dependency-card";
import { FeedbackLogList } from "@/components/roadmap/feedback-log-list";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import type { RoadmapStatus } from "@/types";

const roadmap = getExecutiveRoadmap();

function countItems(status: RoadmapStatus): number {
  return roadmap.phases.reduce((acc, phase) => acc + phase.items.filter((item) => item.status === status).length, 0);
}

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-6 py-10 lg:px-8">
      <Reveal>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Executive Roadmap</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Where Know My Customer stands and what comes next, as of {roadmap.updatedAt}.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.04}>
        <Card>
          <CardContent className="pt-5">
            <p className="text-[15px] leading-relaxed text-foreground">{roadmap.summary}</p>
          </CardContent>
        </Card>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile label="Shipped" value={countItems("shipped")} icon={CheckCircle2} />
          <StatTile label="In Progress" value={countItems("in-progress")} icon={CircleDot} />
          <StatTile label="Next" value={countItems("next")} icon={Clock} />
          <StatTile label="Planned" value={countItems("planned")} icon={CircleDashed} />
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <DemoDataBanner>
          This roadmap describes the state of the Know My Customer concept and is maintained alongside the prototype.
          Timeframes are planning estimates, not committed delivery dates.
        </DemoDataBanner>
      </Reveal>

      <Reveal delay={0.14}>
        <section className="space-y-4">
          <SectionHeader
            icon={AlertTriangle}
            title="Start these three now"
            description="The long-lead items that gate everything else — none of them are engineering work"
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {roadmap.criticalDependencies.map((dependency, i) => (
              <CriticalDependencyCard key={dependency.id} dependency={dependency} index={i} />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.18}>
        <section className="space-y-4">
          <SectionHeader title="Delivery phases" description="What has landed, what is being built, and what comes after" />
          <div className="space-y-5">
            {roadmap.phases.map((phase, i) => (
              <RoadmapPhaseCard key={phase.id} phase={phase} index={i} />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.22}>
        <Card>
          <CardHeader>
            <SectionHeader
              icon={MessageSquareQuote}
              title="Feedback received and what we did"
              description="Every review comment, and where it landed on this roadmap"
            />
          </CardHeader>
          <CardContent>
            <FeedbackLogList entries={roadmap.feedbackLog} />
          </CardContent>
        </Card>
      </Reveal>
    </div>
  );
}
