import { WikiResponse } from "../types/wikiApi";

export const fetchWikiData = async (name: string): Promise<WikiResponse> => {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
    name
  )}&prop=pageimages&format=json&pithumbsize=300&origin=*`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch Wikipedia data for ${name}`);
  }

  const data: WikiResponse = await res.json();
  return data;
};
