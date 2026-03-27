/**
 * Platform type definitions for the SocialPair application
 */

/** Monthly usage statistics for a platform */
export interface MonthlyStat {
  month: string;
  users: number;
}

/** Pros and cons entry */
export interface ProCon {
  text: string;
}

/** Platform data model */
export interface Platform {
  id: string;
  name: string;
  logo: string;
  founded: number;
  founder: string;
  company: string;
  monthlyUsers: number;
  peakUsers: number;
  peakYear: number;
  targetAge: string;
  purpose: string;
  pros: ProCon[];
  cons: ProCon[];
  monthlyStats: MonthlyStat[];
  fameScore: number;
  description: string;
}
