"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AppHeader } from "@/components/shared/app-header";
import { WorkspaceSidebar } from "@/components/workspace/workspace-sidebar";
import { WorkspaceTopBar } from "@/components/workspace/workspace-topbar";
import { AskKmcFab } from "@/components/ask-kmc/ask-kmc-fab";
import { AskKmcPanel } from "@/components/ask-kmc/ask-kmc-panel";
import { useAccount } from "@/context/account-context";
import { useDemoProgress } from "@/context/demo-progress-context";
import { AskKmcProvider } from "@/context/ask-kmc-context";
import { OnboardingProvider } from "@/context/onboarding-context";
import { WORKSPACE_NAV } from "@/lib/constants";
import { writeDemoState } from "@/lib/demo-storage";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const account = useAccount();
  const { markSectionVisited, hydrated } = useDemoProgress();

  useEffect(() => {
    if (!pathname) return;
    writeDemoState("lastWorkspacePath", pathname);
    // Wait for the progress hydration read to land first — marking a section
    // visited before that completes would overwrite previously-stored visited
    // sections with the pre-hydration default (see demo-progress-context.tsx).
    if (!hydrated) return;
    const match = WORKSPACE_NAV.find((item) => item.href(account.id) === pathname);
    if (match) markSectionVisited(match.key);
    // Re-run only on navigation or once hydration completes, not when the callback identity changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, hydrated]);

  return (
    <AskKmcProvider>
      <OnboardingProvider>
        <div className="flex min-h-screen flex-col">
          <AppHeader />
          <div className="flex flex-1">
            <WorkspaceSidebar />
            <div className="flex flex-1 flex-col">
              <WorkspaceTopBar />
              <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</main>
            </div>
          </div>
        </div>
        <AskKmcFab />
        <AskKmcPanel />
      </OnboardingProvider>
    </AskKmcProvider>
  );
}
