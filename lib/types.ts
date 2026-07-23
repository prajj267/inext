// ============================================================
// Shared data types — now mirror the Prisma schema.
// Public components consume these; DB queries return them.
// ============================================================

export interface MemberLink {
  id?:   string;
  label: string;
  href:  string;
}

export interface Member {
  id?:            string;
  name:           string;
  role?:          string;        // Optional now
  category:       MemberCategory;
  focus:          string;
  photo?:         string;
  order:          number;
  // Alumni-specific fields
  organization?:  string;        // For alumni: current organization
  thesisTitle?:   string;        // For alumni: thesis title
  batch?:         string;        // For alumni: e.g., "2015-2019"
  links:          MemberLink[];
}

export type MemberCategory = 'FACULTY' | 'PHD' | 'MASTERS' | 'UNDERGRAD' | 'ALUMNI' | 'INTERN';

export interface AuthorSegment {
  id?:   string;
  text:  string;
  bold:  boolean;
  order: number;
}

export interface Publication {
  id?:      string;
  title:    string;
  authors:  AuthorSegment[];
  venue:    string;
  year:     number;
  pubType?: string;
  pdfPath?: string;
  doiUrl?:  string;
}

export type ProjectStatus = 'ONGOING' | 'COMPLETED';

export interface Project {
  id?:           string;
  title:         string;
  description:   string;
  status:        ProjectStatus;
  category?:     string;   // "Funded" | "Consultancy"
  role?:         string;   // PI / Co-PI
  funding?:      string;
  amount?:       string;
  period?:       string;
  collaborators?: string;
}

export type NewsTag = 'PAPER' | 'AWARD' | 'TALK' | 'EVENT' | 'MISC';

export interface NewsItem {
  id?:  string;
  date: string;
  tag:  NewsTag;
  body: string;
}

export type AchievementCategory = 'FACULTY' | 'PHD' | 'UG';

export interface Achievement {
  id?:         string;
  year:        string;
  title:       string;
  description: string;
  category:    AchievementCategory;
}
