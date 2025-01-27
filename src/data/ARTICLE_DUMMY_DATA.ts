import { Response } from "../types/article";

export const ARTICLE_DUMMY_DATA: Response = {
  status: "ok",
  totalResults: 6232,
  articles: [
    {
      source: {
        id: "wired",
        name: "Wired",
      },
      author: "Joel Khalili",
      title: "The First Bitcoin President? Tracing Trump’s Crypto Connections",
      description:
        "Crypto execs funneled millions in donations to swing this election, and now their man is in charge. Here’s how Donald Trump’s “crypto cabinet” could shape the next four years.",
      url: "https://www.wired.com/story/mapping-donald-trump-crypto-connections/",
      urlToImage:
        "https://media.wired.com/photos/67815aa7ced74e457dc3a71e/191:100/w_1280,c_limit/011025_Trumps-Crypto-Cabinet.jpg",
      publishedAt: "2025-01-16T11:00:00Z",
      content:
        "President Trump has surrounded himself with crypto enthusiasts. Thats no coincidence. In 2024 the cryptocurrency industry spent millions backing friendly congressional candidates, many of whom were R… [+817 chars]",
    },
  ],
};
