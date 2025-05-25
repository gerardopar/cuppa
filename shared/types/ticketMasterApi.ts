export interface TicketmasterDiscoveryQueryParams {
  apikey: string; // Required

  keyword?: string;
  attractionId?: string;
  venueId?: string;
  postalCode?: string;
  city?: string;
  stateCode?: string;
  countryCode?: string;

  classificationName?: string;
  classificationId?: string;
  dmaId?: string; // Nielsen DMA ID
  marketId?: string;

  startDateTime?: string; // ISO 8601 format
  endDateTime?: string;

  includeTBA?: boolean;
  includeTBD?: boolean;
  includeTest?: boolean;

  size?: number; // Page size
  page?: number;

  sort?: string; // e.g. "date,asc" or "name,desc"
  locale?: string; // e.g. "en-us"
}

export interface TicketmasterEventResponse {
  _embedded?: {
    events: TicketmasterEvent[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

export interface TicketmasterEvent {
  name: string;
  id: string;
  url: string;
  locale: string;
  info?: string;
  pleaseNote?: string;

  dates: {
    start: {
      localDate: string;
      localTime?: string;
      dateTime?: string;
    };
    timezone?: string;
    status: {
      code: "onsale" | "offsale" | "cancelled" | "postponed" | "rescheduled";
    };
  };

  classifications?: {
    segment?: { name: string };
    genre?: { name: string };
    subGenre?: { name: string };
    type?: { name: string };
  }[];

  images?: {
    url: string;
    width: number;
    height: number;
    ratio: string;
    fallback: boolean;
  }[];

  _embedded?: {
    venues?: TicketmasterVenue[];
    attractions?: TicketmasterAttraction[];
  };
}

export interface TicketmasterVenue {
  name: string;
  city?: { name: string };
  state?: { name: string; stateCode?: string };
  country?: { name: string; countryCode?: string };
  address?: { line1?: string };
  postalCode?: string;
  location?: { longitude: string; latitude: string };
}

export interface TicketmasterAttraction {
  name: string;
  id: string;
  url?: string;
  classifications?: {
    genre?: { name: string };
    segment?: { name: string };
  }[];
}
