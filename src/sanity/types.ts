export type Slug = { current: string };

export type SiteSettings = {
  groupName?: string;
  tagline?: string;
  heroQuote?: string;
  mission?: string;
  vision?: string;
  founderQuote?: string;
  heroImage?: string;
  employeesCount?: string;
  countriesCount?: string;
  subsidiariesCount?: string;
  assetsDisplay?: string;
  yearFounded?: string;
  countries?: string[];
  phone?: string;
  email?: string;
  address?: string;
};

export type Company = {
  _id: string;
  name: string;
  slug?: Slug;
  sector?: string;
  shortDescription?: string;
  longDescription?: string;
  highlightStat?: string;
  highlightStatLabel?: string;
  location?: string;
  websiteUrl?: string;
  imageUrl?: string;
  gallery?: string[];
  order?: number;
  featured?: boolean;
};

export type Leader = {
  _id: string;
  name: string;
  title?: string;
  bio?: string;
  quote?: string;
  imageUrl?: string;
  order?: number;
};

export type Milestone = {
  _id: string;
  year: string;
  title: string;
  description?: string;
  order?: number;
};

export type PitchSlideKind =
  | "cover"
  | "intro"
  | "stat"
  | "company"
  | "quote"
  | "leader"
  | "milestones"
  | "contact"
  | "closing";

export type PitchSlide = {
  _id: string;
  order: number;
  kind: PitchSlideKind;
  eyebrow?: string;
  heading?: string;
  body?: string;
  statValue?: string;
  statLabel?: string;
  company?: Company;
};
