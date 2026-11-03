import { GreenfieldProspectView } from "@/components/greenfield/greenfield-prospect-view";
import { nameFromSlug } from "@/lib/greenfield";

/**
 * The company name arrives in the query string so the rep's own spelling,
 * capitalisation, and accents survive into the profile. The slug is only a
 * fallback for a link opened or shared without it.
 */
export default async function ProspectPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ name?: string | string[] }>;
}) {
  const { slug } = await params;
  const { name } = await searchParams;
  const typedName = Array.isArray(name) ? name[0] : name;

  return <GreenfieldProspectView slug={slug} name={typedName?.trim() || nameFromSlug(slug)} />;
}
