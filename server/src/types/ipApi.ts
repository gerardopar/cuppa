export interface IpApiQueryParams {
  fields?: number | string; // Bitmask or comma-separated string of fields
  lang?: string; // Language for city, region, etc. (e.g., "en", "de", "es")
}

export interface IpApiSuccessResponse {
  status: "success";
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string; // The IP address queried
}

export interface IpApiErrorResponse {
  status: "fail";
  message: string; // e.g. "private range"
  query: string; // The IP that failed
}

export type IpApiResponse = IpApiSuccessResponse | IpApiErrorResponse;
