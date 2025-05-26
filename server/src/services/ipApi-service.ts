import axios from "axios";

import { IpApiResponse } from "../types/ipApi";

export const ipInfoApiUrl = "http://ip-api.com/json";

export const getUserLocationByIp = async (userIP?: string) => {
  try {
    const response = await axios.get<IpApiResponse>(
      `${ipInfoApiUrl}/${userIP}`
    );

    if (response?.data?.status === "fail") {
      console.warn("IP lookup failed:", response.data.message);
      throw new Error(response.data.message);
    }

    const {
      city,
      regionName: region,
      country,
      zip: postalCode,
      lat,
      lon,
      timezone,
      query: ip,
    } = response?.data;

    return {
      city,
      region,
      country,
      postalCode,
      coordinates: { lat, lng: lon },
      timezone,
      ip,
    };
  } catch (error) {
    console.error("Failed to fetch user location:", error);
    throw new Error("Unable to retrieve location data");
  }
};
