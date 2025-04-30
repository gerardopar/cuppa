/**
 * Types for SerpApi 'google_trends_trending_now' response
 */

/**
 * Top-level response from SerpApi Google Trends Trending Now endpoint
 */
export interface GoogleTrendsTrendingNowResponse {
  /** Metadata about the search */
  search_metadata: SearchMetadata;
  /** Parameters used for the search */
  search_parameters: SearchParameters;
  /** Array of trending search items */
  trending_searches: TrendingSearchItem[];
}

/** Metadata returned with each search */
export interface SearchMetadata {
  id: string;
  status: string;
  json_endpoint: string;
  created_at: string;
  processed_at: string;
  google_trends_trending_now_url: string;
  raw_html_file: string;
  prettify_html_file: string;
  total_time_taken: number;
}

/** Parameters sent in the search request */
export interface SearchParameters {
  engine: string;
  hl?: string;
  geo?: string;
  hours?: number;
  frequency?: string;
  date?: string;
  api_key?: string;
  no_cache?: boolean;
  async?: boolean;
}

/** A single trending search item */
export interface TrendingSearchItem {
  /** The search query text */
  query: string;
  /** Unix timestamp for when this trend started */
  start_timestamp: number;
  /** Whether the trend is still active */
  active: boolean;
  /** Approximate search volume */
  search_volume: number;
  /** Percent increase in search volume */
  increase_percentage: number;
  /** Categories associated with this trend */
  categories: Category[];
  /** Time-series breakdown of the trend */
  trend_breakdown: TrendBreakdown[];
  /** Link to fetch time-series data for this query */
  serpapi_google_trends_link: string;
}

/** Category metadata for a trend */
export interface Category {
  /** Category name, e.g. 'Business & Industrial' */
  name: string;
  /** Flexible additional fields */
  [key: string]: any;
}

/** Single point in the trend breakdown */
export interface TrendBreakdown {
  /** Unix timestamp of this data point */
  timestamp: number;
  /** Human-readable time, e.g. '2025-04-30T05:00:00Z' */
  formatted_time?: string;
  /** Trend value at this timestamp */
  value: number;
  /** Any other fields returned */
  [key: string]: any;
}
