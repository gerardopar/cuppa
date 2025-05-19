export type PollType = "approval" | "generic-ballot" | "favorability";

export type PopulationType = "a" | "rv" | "lv"; // a = all adults, rv = registered voters, lv = likely voters

export interface PollFilterOptions {
  /**
   * Type of poll to fetch (e.g., approval, favorability, generic-ballot)
   */
  poll_type?: PollType;

  /**
   * Pollster name or partial match (e.g., "Morning Consult")
   */
  pollster?: string;

  /**
   * Poll subject (e.g., "Biden", "Donald Trump")
   */
  subject?: string;

  /**
   * Filter polls whose end date is on or after this date (YYYY-MM-DD)
   */
  from_date?: string;

  /**
   * Filter polls whose end date is on or before this date (YYYY-MM-DD)
   */
  to_date?: string;

  /**
   * Minimum required sample size
   */
  min_sample_size?: number;

  /**
   * Population type: all adults (a), registered voters (rv), or likely voters (lv)
   */
  population?: PopulationType;
}

export interface PollAnswer {
  choice: string;
  pct: number;
}

export interface PollResponse {
  id: string;
  poll_type: "approval" | "generic-ballot" | "favorability" | string;
  sample_size: number;
  population: "a" | "rv" | "lv" | string; // a = all adults, rv = registered voters, lv = likely voters
  url: string;
  created_at: string; // ISO date string
  start_date: string; // ISO date string
  end_date: string; // ISO date string
  pollster: string;
  answers: PollAnswer[];
  seat_name: string | null;
  sponsors: string[];
  internal: boolean;
  partisan: string | null;
  subject: string;
}
