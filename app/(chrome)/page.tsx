"use client";

import { useMemo, useState } from "react";
import { HomeHero } from "@/components/home/home-hero";
import { AccountSearchField } from "@/components/home/account-search-field";
import { AccountPickerCard } from "@/components/home/account-picker-card";
import { GreenfieldPanel } from "@/components/home/greenfield-panel";
import { PrototypeIntroBanner } from "@/components/home/prototype-intro-banner";
import { getAllAccounts } from "@/lib/data-access";

const accounts = getAllAccounts();

export default function HomePage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return accounts;
    return accounts.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.shortName.toLowerCase().includes(q) ||
        a.industry.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-20">
      <HomeHero />
      <AccountSearchField value={query} onChange={setQuery} />

      {filtered.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((account, i) => (
            <AccountPickerCard key={account.id} account={account} index={i} />
          ))}
        </div>
      )}

      {/* A search with no Liberty match is the greenfield entry point, not a
          dead end — the panel switches to offering open-web research on the
          typed name. */}
      <GreenfieldPanel query={filtered.length === 0 ? query : ""} />

      <PrototypeIntroBanner />
    </div>
  );
}
