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

export interface Report {
  id: string;
  date: string;
  items: CakeReport[];
}
