import moment from "moment";
import { PollFilterOptions } from "../types/voteHubApi";

const voteHubApiUrl = `https://api.votehub.com/polls`;

export const getPollsData = async (voteHubApiOptions: PollFilterOptions) => {
  try {
    const {
      poll_type,
      pollster,
      subject,
      from_date,
      to_date,
      min_sample_size,
      population,
    } = voteHubApiOptions;

    const url = new URL(voteHubApiUrl);
    url.searchParams.append("poll_type", poll_type || "");
    url.searchParams.append("pollster", pollster || "");
    url.searchParams.append("subject", subject || "");
    url.searchParams.append(
      "from_date",
      moment(from_date).format("YYYY-MM-DD") || ""
    );
    url.searchParams.append(
      "to_date",
      moment(to_date).format("YYYY-MM-DD") || ""
    );
    url.searchParams.append(
      "min_sample_size",
      min_sample_size?.toString() || ""
    );
    url.searchParams.append("population", population || "");

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch polls");
    }

    const data = await response.json();

    return data;
  } catch (e) {
    console.error("Error fetching polls:", e);
    throw new Error("Failed to fetch polls");
  }
};
