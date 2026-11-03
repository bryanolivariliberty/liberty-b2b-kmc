"use client";

import { HelpCircle, ShieldQuestion, Users2, Zap } from "lucide-react";
import { useAccount } from "@/context/account-context";
import { getTalkingPoints } from "@/lib/data-access";
import { AudienceTabs } from "@/components/talking-points/audience-tabs";
import { ObjectionResponseAccordion } from "@/components/talking-points/objection-response-accordion";
import { ConversationTriggerList } from "@/components/talking-points/conversation-trigger-list";
import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

export default function TalkingPointsPage() {
  const account = useAccount();
  const talkingPoints = getTalkingPoints(account.id);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Reveal>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Talking Points</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tailored language for {account.shortName}, by audience — plus objections and conversation triggers to
            keep in your back pocket.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <Card>
          <CardHeader>
            <SectionHeader icon={Users2} title="By Audience" />
          </CardHeader>
          <CardContent>
            <AudienceTabs groups={talkingPoints.byAudience} />
          </CardContent>
        </Card>
      </Reveal>

      <Reveal delay={0.1}>
        <Card>
          <CardHeader>
            <SectionHeader icon={ShieldQuestion} title="Potential Objections" description="Suggested responses" />
          </CardHeader>
          <CardContent>
            <ObjectionResponseAccordion objections={talkingPoints.potentialObjections} />
          </CardContent>
        </Card>
      </Reveal>

      <Reveal delay={0.15}>
        <Card>
          <CardHeader>
            <SectionHeader icon={HelpCircle} title="Discovery Questions" />
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5">
              {talkingPoints.discoveryQuestions.map((q) => (
                <li key={q} className="flex gap-2.5 text-sm text-foreground">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-liberty-blue" aria-hidden />
                  {q}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </Reveal>

      <Reveal delay={0.2}>
        <Card>
          <CardHeader>
            <SectionHeader icon={Zap} title="Conversation Triggers" description="If the customer says this, try this" />
          </CardHeader>
          <CardContent>
            <ConversationTriggerList triggers={talkingPoints.conversationTriggers} />
          </CardContent>
        </Card>
      </Reveal>
    </div>
  );
}
