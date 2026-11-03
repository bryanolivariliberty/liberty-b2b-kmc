import { notFound } from "next/navigation";
import { AccountProvider } from "@/context/account-context";
import { DemoProgressProvider } from "@/context/demo-progress-context";
import { PresentationTransitionProvider } from "@/context/presentation-transition-context";
import { getAccount, isValidAccountId } from "@/lib/data-access";

export default async function AccountLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ accountId: string }>;
}) {
  const { accountId } = await params;

  if (!isValidAccountId(accountId)) {
    notFound();
  }

  const account = getAccount(accountId);

  return (
    <AccountProvider account={account}>
      <DemoProgressProvider>
        <PresentationTransitionProvider>{children}</PresentationTransitionProvider>
      </DemoProgressProvider>
    </AccountProvider>
  );
}
