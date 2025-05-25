// const generalCategories: string[] = [
//   "Breaking News",
//   "Politics",
//   "Business",
//   "Technology",
//   "Sports",
//   "Entertainment",
// ];

// const recommendationCategories: string[] = [
//   "Trending",
//   "Editor's Picks",
//   "For You",
//   "Viral News",
// ];

export interface Response {
  status: "ok" | "error"; // The request's success or failure status
  totalResults: number; // Total number of results available
  articles: Article[]; // Array of articles
}

export interface Article {
  source?: Source | null | undefined; // The source of the article
  author?: string | null | undefined; // Author of the article (null if unavailable)
  title?: string | null | undefined; // Title of the article
  description?: string | null | undefined; // Description or snippet of the article
  url?: string; // Direct URL to the article
  urlToImage?: string | null | undefined; // URL to an image relevant to the article
  publishedAt?: string | null | undefined; // Published date and time in UTC
  content?: string | null | undefined; // Truncated content of the article
}

export interface Source {
  id: string | null; // Identifier for the source (null if unavailable)
  name: string; // Display name of the source
}
