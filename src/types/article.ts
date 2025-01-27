export interface Response {
  status: "ok" | "error"; // The request's success or failure status
  totalResults: number; // Total number of results available
  articles: Article[]; // Array of articles
}

export interface Article {
  source: Source; // The source of the article
  author: string | null; // Author of the article (null if unavailable)
  title: string; // Title of the article
  description: string; // Description or snippet of the article
  url: string; // Direct URL to the article
  urlToImage: string | null; // URL to an image relevant to the article
  publishedAt: string; // Published date and time in UTC
  content: string | null; // Truncated content of the article
}

export interface Source {
  id: string | null; // Identifier for the source (null if unavailable)
  name: string; // Display name of the source
}
