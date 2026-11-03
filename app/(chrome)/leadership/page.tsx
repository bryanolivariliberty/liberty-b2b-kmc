"use client";

import { useMemo, useState } from "react";
import { FilterX } from "lucide-react";
import { DEFAULT_LEADERSHIP_FILTERS, describeFilters, getLeadershipMetrics } from "@/lib/leadership-filters";
import { DemoDataBanner } from "@/components/shared/demo-data-banner";
import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { LeadershipFilterBar } from "@/components/leadership/leadership-filter-bar";
import { LeadershipMetricsGrid } from "@/components/leadership/leadership-metrics-grid";
import { UsageTrendChart } from "@/components/leadership/usage-trend-chart";
import { FeedbackTrendChart } from "@/components/leadership/feedback-trend-chart";
import { TopProductsChart } from "@/components/leadership/top-products-chart";
import { VerticalActivityTable } from "@/components/leadership/vertical-activity-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import type { LeadershipFilters } from "@/types";

export default function LeadershipPage() {
  const [filters, setFilters] = useState<LeadershipFilters>(DEFAULT_LEADERSHIP_FILTERS);
  const metrics = useMemo(() => getLeadershipMetrics(filters), [filters]);
  const hasData = metrics.briefsGenerated > 0 || metrics.activeReps > 0;

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-6 py-10 lg:px-8">
      <Reveal>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Leadership View</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Executive adoption dashboard for Know My Customer, as of {metrics.asOf} — showing {describeFilters(filters)}.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.04}>
        <LeadershipFilterBar filters={filters} onChange={setFilters} />
      </Reveal>

      <Reveal delay={0.06}>
        <DemoDataBanner>
          All figures on this dashboard are demo metrics for this prototype, not live usage data. Filters recompute
          every number from the same underlying rep-week activity.
        </DemoDataBanner>
      </Reveal>

      {!hasData ? (
        <Reveal delay={0.1}>
          <EmptyState
            icon={FilterX}
            title="No activity for this combination"
            description="This rep, vertical, and period together have no recorded activity in the tracked window."
            action={
              <Button variant="outline" size="sm" onClick={() => setFilters(DEFAULT_LEADERSHIP_FILTERS)}>
                Clear filters
              </Button>
            }
          />
        </Reveal>
      ) : (
        <>
          <Reveal delay={0.1}>
            <LeadershipMetricsGrid metrics={metrics} />
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal delay={0.14}>
              <Card>
                <CardHeader>
                  <SectionHeader title="Usage Trend" description="Briefs generated & queries run, weekly" />
                </CardHeader>
                <CardContent>
                  <UsageTrendChart data={metrics.usageTrend} />
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={0.18}>
              <Card>
                <CardHeader>
                  <SectionHeader title="Feedback Trend" description="Positive feedback rate, weekly" />
                </CardHeader>
                <CardContent>
                  <FeedbackTrendChart data={metrics.feedbackTrend} />
                </CardContent>
              </Card>
            </Reveal>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal delay={0.22}>
              <Card>
                <CardHeader>
                  <SectionHeader
                    title="Top Recommended Products"
                    description={
                      filters.repId === "all" ? "By recommendation count across all reps" : "By recommendation count for this rep"
                    }
                  />
                </CardHeader>
                <CardContent>
                  {metrics.topRecommendedProducts.length > 0 ? (
                    <TopProductsChart data={metrics.topRecommendedProducts} />
                  ) : (
                    <EmptyState title="No recommendations in this window" className="py-8" />
                  )}
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={0.26}>
              <Card>
                <CardHeader>
                  <SectionHeader title="Most Active Verticals" />
                </CardHeader>
                <CardContent>
                  {metrics.mostActiveVerticals.length > 0 ? (
                    <VerticalActivityTable data={metrics.mostActiveVerticals} />
                  ) : (
                    <EmptyState title="No vertical activity in this window" className="py-8" />
                  )}
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </>
      )}
    </div>
  );
}
