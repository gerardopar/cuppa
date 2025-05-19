import moment from "moment";
import { PollFilterOptions, PollResponse } from "../types/voteHubApi";

const voteHubApiUrl = `https://api.votehub.com/polls`;

const voteHubApiDefaults = {
  defaultPollType: "approval",
  defaultFromDate: moment().startOf("month").format("YYYY-MM-DD"),
  defaultToDate: moment().format("YYYY-MM-DD"),
};

export const getPollsData = async (voteHubApiOptions: PollFilterOptions) => {
  try {
    const {
      poll_type = voteHubApiDefaults.defaultPollType,
      pollster,
      subject,
      from_date = voteHubApiDefaults.defaultFromDate,
      to_date = voteHubApiDefaults.defaultToDate,
      min_sample_size,
      population,
    } = voteHubApiOptions;

    const url = new URL(voteHubApiUrl);
    url.searchParams.append("poll_type", poll_type || "");
    if (pollster) url.searchParams.append("pollster", pollster || "");
    if (subject) url.searchParams.append("subject", subject || "");
    if (from_date) {
      url.searchParams.append(
        "from_date",
        moment(from_date).format("YYYY-MM-DD") || ""
      );
    }

    if (to_date) {
      url.searchParams.append(
        "to_date",
        moment(to_date).format("YYYY-MM-DD") || ""
      );
    }
    if (min_sample_size) {
      url.searchParams.append(
        "min_sample_size",
        min_sample_size?.toString() || ""
      );
    }
    if (population) {
      url.searchParams.append("population", population || "");
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch polls");
    }

    const data: PollResponse[] = await response.json();

    return data;
  } catch (e) {
    console.error("Error fetching polls:", e);
    throw new Error("Failed to fetch polls");
  }
};
