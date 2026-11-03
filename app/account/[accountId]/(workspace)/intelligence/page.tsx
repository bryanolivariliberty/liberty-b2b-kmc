"use client";

import { Building2, Calendar, DollarSign, HeartPulse, PieChart } from "lucide-react";
import { useAccount } from "@/context/account-context";
import { AccountProfileSection } from "@/components/intelligence/account-profile-section";
import { CurrentRelationshipSection } from "@/components/intelligence/current-relationship-section";
import { CurrentProductsSection } from "@/components/intelligence/current-products-section";
import { LocationsList } from "@/components/intelligence/locations-list";
import { AccountHealthSection } from "@/components/intelligence/account-health-section";
import { OpportunityPotentialCard } from "@/components/intelligence/opportunity-potential-card";
import { RevenueMixChart } from "@/components/intelligence/revenue-mix-chart";
import { IntelligenceStatStrip, type IntelligenceStatItem } from "@/components/intelligence/intelligence-stat-strip";
import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { formatCompactCurrency } from "@/lib/format";

export default function IntelligencePage() {
  const account = useAccount();

  const stats: IntelligenceStatItem[] = [
    { label: "Account Segment", value: account.segment, icon: Building2 },
    { label: "Est. Monthly Revenue", value: formatCompactCurrency(account.estimatedMonthlyRevenue.amount), icon: DollarSign },
    { label: "Relationship Tenure", value: `${account.currentRelationship.relationshipTenureYears} yrs`, icon: Calendar },
    { label: "Account Health", value: account.accountHealth.status, icon: HeartPulse },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Reveal>
        <IntelligenceStatStrip items={stats} />
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Reveal delay={0.05}>
            <AccountProfileSection account={account} />
          </Reveal>
          <Reveal delay={0.1}>
            <CurrentRelationshipSection account={account} />
          </Reveal>
          <Reveal delay={0.15}>
            <CurrentProductsSection products={account.currentLibertyProducts} />
          </Reveal>
          <Reveal delay={0.2}>
            <LocationsList locations={account.locations} />
          </Reveal>
        </div>

        <div className="space-y-6">
          <Reveal delay={0.1}>
            <Card>
              <CardHeader>
                <SectionHeader icon={PieChart} title="Revenue Mix" />
              </CardHeader>
              <CardContent>
                <RevenueMixChart data={account.revenueMix} />
              </CardContent>
            </Card>
          </Reveal>
          <Reveal delay={0.15}>
            <AccountHealthSection health={account.accountHealth} />
          </Reveal>
          <Reveal delay={0.2}>
            <OpportunityPotentialCard potential={account.opportunityPotential} />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
