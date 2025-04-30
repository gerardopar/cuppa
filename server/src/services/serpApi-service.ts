import axios from "axios";

import {
  GoogleTrendsTrendingNowResponse,
  TrendingSearchItem,
} from "../types/serpApi";

export async function fetchDailyTrends(): Promise<string[]> {
  const response = await axios.get<GoogleTrendsTrendingNowResponse>(
    "https://serpapi.com/search.json",
    {
      params: {
        engine: "google_trends_trending_now",
        geo: "US",
        hours: 24,
        hl: "en",
        api_key: process.env.SERP_API_KEY!,
      },
    }
  );

  return response.data.trending_searches
    .map((item: TrendingSearchItem) => item.query)
    .filter((query: string) => query.length > 0);
}
