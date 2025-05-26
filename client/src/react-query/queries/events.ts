import { useQuery } from "@tanstack/react-query";
import axiosClient from "../../axios/axiosClient";

import {
  TicketmasterEventResponse,
  TicketmasterDiscoveryQueryParams,
} from "@shared/types/ticketMasterApi";

export const useGetLocalEvents = (
  params?: Omit<TicketmasterDiscoveryQueryParams, "apikey">
) => {
  return useQuery<{ events: TicketmasterEventResponse }>({
    queryKey: ["getLocalEvents", params],
    queryFn: async () => {
      const response = await axiosClient.get<{
        events: TicketmasterEventResponse;
      }>("/events/local", {
        params,
      });
      return response.data;
    },
    enabled: true,
  });
};
