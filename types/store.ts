import { Pagination } from "./pagination";

type DayOfWeek = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

type TimeRange = {
  open: string;
  close: string;
};

export type ServiceHours = {
  [key in DayOfWeek]: TimeRange[];
};

export type Store = {
  id: string;
  uid: string;
  code: string;
  name: string;
  description: string;
  ownership: string;
  address: string;
  city: string;
  state: string;
  country: string;
  email: string;
  phones: string[];
  location?: Location;
  timeZone: string;
  serviceHours: ServiceHours;
  available: boolean;
  priceTier: string;
  distance?: number;
  deliveryEta?: number;
  createdAt: string;
  updatedAt: string;
};

export type FetchStoresResponse = {
  stores: Store[];
  pagination: Pagination;
};
