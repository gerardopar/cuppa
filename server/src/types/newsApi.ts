// Everything API
// https://newsapi.org/docs/endpoints/everything

export type NewsSortBy = "relevancy" | "popularity" | "publishedAt";

export type NewsSearchIn = "title" | "description" | "content";

export interface NewsEverythingParams {
  /** Your API key (can also be passed in the X-Api-Key header) */
  apiKey?: string;

  /** Keywords or phrases to search for (URL-encoded if advanced query used) */
  q: string;

  /** Restrict search to specific fields: title, description, or content */
  searchIn?:
    | `${NewsSearchIn}`
    | `${NewsSearchIn},${NewsSearchIn}`
    | `${NewsSearchIn},${NewsSearchIn},${NewsSearchIn}`;

  /** Comma-separated string of source IDs */
  sources?: string;

  /** Comma-separated string of domains to include (e.g., 'bbc.co.uk,techcrunch.com') */
  domains?: string;

  /** Comma-separated string of domains to exclude */
  excludeDomains?: string;

  /** Oldest article allowed (ISO 8601 format: YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss) */
  from?: string;

  /** Newest article allowed (ISO 8601 format) */
  to?: string;

  /** 2-letter ISO-639-1 language code */
  language?: string;

  /** Sort order of articles */
  sortBy?: NewsSortBy;

  /** Number of results per page (default 100, max 100) */
  pageSize?: number;

  /** Page number to paginate through results */
  page?: number;
}

export type NewsApiStatus = "ok" | "error";

export interface NewsSource {
  id: string | null;
  name: string;
}

export interface NewsArticle {
  source: NewsSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string; // ISO 8601 format
  content: string | null;
}

export interface NewsEverythingSuccessResponse {
  status: "ok";
  totalResults: number;
  articles: NewsArticle[];
}

export interface NewsEverythingErrorResponse {
  status: "error";
  code: string;
  message: string;
}

export type NewsEverythingResponse =
  | NewsEverythingSuccessResponse
  | NewsEverythingErrorResponse;

export type NewsCountryCode =
  | "ae"
  | "ar"
  | "at"
  | "au"
  | "be"
  | "bg"
  | "br"
  | "ca"
  | "ch"
  | "cn"
  | "co"
  | "cu"
  | "cz"
  | "de"
  | "eg"
  | "fr"
  | "gb"
  | "gr"
  | "hk"
  | "hu"
  | "id"
  | "ie"
  | "il"
  | "in"
  | "it"
  | "jp"
  | "kr"
  | "lt"
  | "lv"
  | "ma"
  | "mx"
  | "my"
  | "ng"
  | "nl"
  | "no"
  | "nz"
  | "ph"
  | "pl"
  | "pt"
  | "ro"
  | "rs"
  | "ru"
  | "sa"
  | "se"
  | "sg"
  | "si"
  | "sk"
  | "th"
  | "tr"
  | "tw"
  | "ua"
  | "us"
  | "ve"
  | "za";

export type NewsCategory =
  | "business"
  | "entertainment"
  | "general"
  | "health"
  | "science"
  | "sports"
  | "technology";

// Top Headlines API
// https://newsapi.org/docs/endpoints/top-headlines

export interface TopHeadlinesParams {
  /** Your API key */
  apiKey?: string;

  /** The 2-letter ISO 3166-1 code of the country */
  country?: NewsCountryCode;

  /** The category of news */
  category?: NewsCategory;

  /** Comma-separated string of source identifiers */
  sources?: string;

  /** Keywords or phrases to search for */
  q?: string;

  /** Number of results per page (max 100) */
  pageSize?: number;

  /** Page number */
  page?: number;
}

export interface NewsSource {
  id: string | null;
  name: string;
}

export interface NewsArticle {
  source: NewsSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string; // ISO 8601
  content: string | null;
}

export interface TopHeadlinesSuccessResponse {
  status: "ok";
  totalResults: number;
  articles: NewsArticle[];
}

export interface TopHeadlinesErrorResponse {
  status: "error";
  code: string;
  message: string;
}

export type TopHeadlinesResponse =
  | TopHeadlinesSuccessResponse
  | TopHeadlinesErrorResponse;
