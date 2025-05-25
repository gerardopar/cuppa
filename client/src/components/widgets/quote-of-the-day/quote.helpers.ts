import { ZenQuote } from "@shared/types/zenQuotesApi";

export const getRandomShortZenQuote = (
  maxLength = 70,
  quotes: ZenQuote[]
): ZenQuote | null => {
  const shortQuotes = quotes.filter((quote) => quote?.q?.length < maxLength);
  return shortQuotes.length
    ? shortQuotes[Math.floor(Math.random() * shortQuotes.length)]
    : null;
};
