export interface CakeReport {
  id?: string;
  name: string;
  start: number | string;
  inflow: number | string;
  outflow: number | string;
  wolt: number | string;
  expense: number | string;
  dayend: number | string;
  description: string;
}
export type IStoreLocation = "nbg" | "vcr" | "admin" | null;
export interface Report {
  id: string;
  date: string;
  storeLocation?: IStoreLocation;
  items: CakeReport[];
}
