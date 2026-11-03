import Link from "next/link";
import { SearchX } from "lucide-react";
import { LibertyLogo } from "@/components/shared/liberty-logo";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <LibertyLogo height={36} priority />
      <div className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        <SearchX className="size-6" />
      </div>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Page not found</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          This account or page doesn&rsquo;t exist in this prototype. Head back to pick one of the preconfigured demo
          accounts.
        </p>
      </div>
      <Button render={<Link href={routes.home()} />} nativeButton={false}>
        Back to Home
      </Button>
    </div>
  );
}
