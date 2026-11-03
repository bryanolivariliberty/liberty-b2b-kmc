"use client";

import { useAccount } from "@/context/account-context";
import { getProductOpportunities } from "@/lib/data-access";
import { buildPresentationContent } from "@/lib/presentation";
import { PresentationShell } from "@/components/presentation/presentation-shell";

export default function PresentPage() {
  const account = useAccount();
  const opportunities = getProductOpportunities(account.id);
  const content = buildPresentationContent(account, opportunities);

  return <PresentationShell content={content} />;
}
