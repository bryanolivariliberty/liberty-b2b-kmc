"use client";

import { AgentProcessingSequence } from "@/components/processing/agent-processing-sequence";
import { useAccount } from "@/context/account-context";

export default function ProcessingPage() {
  const account = useAccount();
  return <AgentProcessingSequence account={account} />;
}
