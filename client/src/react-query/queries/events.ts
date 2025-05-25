import { useQuery } from "@tanstack/react-query";

import axiosClient from "../../axios/axiosClient";

import { TicketmasterEventResponse } from "@shared/types/ticketMasterApi";

export const useGetEvents = () => {
  return useQuery<TicketmasterEventResponse>({
    queryKey: ["getLocalEvents"],
    queryFn: async () => {
      const response = await axiosClient.get<TicketmasterEventResponse>(
        `/events/local`
      );
      return response.data;
    },
  });
};
