import axios from "axios";
import { fetchWikiData } from "./wikiApi-service";

import { ZenQuote } from "@shared/types/zenQuotesApi";

const zenQuotesUrl = "https://zenquotes.io/api/quotes/";

export const getRandomZenQuotes = async (): Promise<ZenQuote[] | null> => {
  try {
    const response = await axios.get(zenQuotesUrl);

    const quotes = response?.data?.slice(0, 9);

    const quotesWithImage = await Promise.all(
      quotes.map(async (quote: ZenQuote) => {
        try {
          const wikiData = await fetchWikiData(quote?.a);
          const image =
            Object.values(wikiData?.query?.pages || {})?.[0]?.thumbnail
              ?.source || null;
          return {
            ...quote,
            i: image,
          };
        } catch (error) {
          console.error("Error fetching Wikipedia data", error);
          return {
            ...quote,
            i: null,
          };
        }
      })
    );

    return quotesWithImage;
  } catch (error) {
    console.error("Error fetching Zen Quotes", error);
    return null;
  }
};
