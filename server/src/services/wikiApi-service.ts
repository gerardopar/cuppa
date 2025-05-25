import axios from "axios";

import { WikiResponse } from "../types/wikiApi";

export const fetchWikiData = async (name: string): Promise<WikiResponse> => {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
      name
    )}&prop=pageimages&format=json&pithumbsize=300&origin=*`;

    const response = await axios.get(url);

    const data: WikiResponse = await response?.data;
    return data;
  } catch (error) {
    console.error("Error fetching Wikipedia data", error);
    throw new Error("Failed to fetch Wikipedia data");
  }
};
