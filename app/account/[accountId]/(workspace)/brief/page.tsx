"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useAccount } from "@/context/account-context";
import { useDemoProgress } from "@/context/demo-progress-context";
import { buildMeetingBrief } from "@/lib/meeting-brief";
import { GenerateBriefButton } from "@/components/brief/generate-brief-button";
import { BriefGenerationSequence } from "@/components/brief/brief-generation-sequence";
import { BriefDocument } from "@/components/brief/brief-document";
import { BriefActionsBar } from "@/components/brief/brief-actions-bar";
import { Reveal } from "@/components/motion/reveal";

export default function BriefPage() {
  const account = useAccount();
  const { progress, markBriefGenerated } = useDemoProgress();
  const [generating, setGenerating] = useState(false);
  const documentRef = useRef<HTMLDivElement>(null);
  const announcedRef = useRef(false);

  /**
   * `briefGeneratedAt` is optional on the progress state, so a record that has
   * `briefGenerated: true` without a timestamp — a partial write, or state
   * persisted before the timestamp field existed — used to fall through to the
   * empty "generate" prompt with no way out, on the screen reps care most
   * about. Treat the flag as the source of truth and backfill the timestamp.
   */
  const generatedAt = progress.briefGenerated ? (progress.briefGeneratedAt ?? progress.updatedAt) : null;
  const brief = generatedAt ? buildMeetingBrief(account.id, generatedAt) : null;

  // Bring the finished document into view and confirm it out loud, so the
  // result is unmissable rather than something that quietly replaced a button.
  useEffect(() => {
    if (!brief || generating || announcedRef.current) return;
    announcedRef.current = true;
    if (!progress.briefGeneratedAt) return;
    const age = Date.now() - new Date(progress.briefGeneratedAt).getTime();
    // Only celebrate a brief generated in this sitting, not one being revisited.
    if (age > 5000) return;
    toast.success("Meeting brief ready");
    documentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [brief, generating, progress.briefGeneratedAt]);

  function handleGenerate() {
    setGenerating(true);
  }

  function handleSequenceDone() {
    announcedRef.current = false;
    markBriefGenerated();
    setGenerating(false);
  }

  function handleRegenerate() {
    announcedRef.current = false;
    setGenerating(true);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Reveal>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Executive Meeting Brief</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            A polished, presentation-ready briefing for your meeting with {account.shortName}.
          </p>
        </div>
      </Reveal>

      {generating ? (
        <Reveal delay={0.05}>
          <BriefGenerationSequence accountName={account.shortName} onDone={handleSequenceDone} />
        </Reveal>
      ) : brief ? (
        <>
          <Reveal delay={0.05}>
            <BriefActionsBar brief={brief} accountId={account.id} onRegenerate={handleRegenerate} />
          </Reveal>
          <Reveal delay={0.1}>
            <div ref={documentRef} className="scroll-mt-6">
              <BriefDocument brief={brief} />
            </div>
          </Reveal>
        </>
      ) : (
        <Reveal delay={0.05}>
          <GenerateBriefButton onGenerate={handleGenerate} generating={generating} />
        </Reveal>
      )}
    </div>
  );
}
