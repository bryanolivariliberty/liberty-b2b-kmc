import { redirect } from "next/navigation";
import { routes } from "@/lib/constants";
import { isValidAccountId } from "@/lib/data-access";

export default async function AccountIndexPage({ params }: { params: Promise<{ accountId: string }> }) {
  const { accountId } = await params;
  if (!isValidAccountId(accountId)) {
    redirect(routes.home());
  }
  redirect(routes.intelligence(accountId));
}
