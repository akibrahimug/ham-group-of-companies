import { sanity } from "./client";
import type {
  Company,
  Leader,
  Milestone,
  PitchSlide,
  SiteSettings,
} from "./types";

const opts = { next: { revalidate: 60 } } as const;

export async function getFeaturedCompanies(limit = 6): Promise<Company[]> {
  return sanity.fetch<Company[]>(
    `*[_type == "company" && featured == true] | order(order asc, name asc)[0...$limit]`,
    { limit },
    opts
  );
}

export async function getCompanyBySlug(slug: string): Promise<Company | null> {
  return sanity.fetch<Company | null>(
    `*[_type == "company" && slug.current == $slug][0]`,
    { slug },
    opts
  );
}

export async function getAllCompanySlugs(): Promise<{ slug: string }[]> {
  return sanity.fetch<{ slug: string }[]>(
    `*[_type == "company" && defined(slug.current)]{ "slug": slug.current }`,
    {},
    opts
  );
}

export async function getRelatedCompanies(
  currentSlug: string,
  sector?: string,
  limit = 3
): Promise<Company[]> {
  return sanity.fetch<Company[]>(
    `*[_type == "company" && slug.current != $currentSlug && (!defined($sector) || sector == $sector)] | order(order asc)[0...$limit]`,
    { currentSlug, sector: sector ?? null, limit },
    opts
  );
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanity.fetch<SiteSettings | null>(
    `*[_type == "siteSettings"][0]`,
    {},
    opts
  );
}

export async function getCompanies(): Promise<Company[]> {
  return sanity.fetch<Company[]>(
    `*[_type == "company"] | order(order asc, name asc)`,
    {},
    opts
  );
}

export async function getLeaders(): Promise<Leader[]> {
  return sanity.fetch<Leader[]>(
    `*[_type == "leader"] | order(order asc, name asc)`,
    {},
    opts
  );
}

export async function getMilestones(): Promise<Milestone[]> {
  return sanity.fetch<Milestone[]>(
    `*[_type == "milestone"] | order(order asc, year asc)`,
    {},
    opts
  );
}

export async function getPitchSlides(): Promise<PitchSlide[]> {
  return sanity.fetch<PitchSlide[]>(
    `*[_type == "pitchSlide"] | order(order asc) { ..., "company": companyRef-> }`,
    {},
    opts
  );
}
