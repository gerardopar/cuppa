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
