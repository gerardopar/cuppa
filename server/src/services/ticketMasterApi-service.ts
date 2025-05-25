import axios from "axios";
import { TicketmasterDiscoveryQueryParams } from "@shared/types/ticketMasterApi"; // adjust path

const ticketMasterApiUrl =
  "https://app.ticketmaster.com/discovery/v2/events.json";

export const getEvents = async (
  params: Omit<TicketmasterDiscoveryQueryParams, "apikey">
) => {
  try {
    const response = await axios.get(ticketMasterApiUrl, {
      params: {
        ...params,
        apikey: process.env.TICKETMASTER_API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching Ticketmaster events:", error);
    throw new Error("Failed to fetch Ticketmaster events");
  }
};
