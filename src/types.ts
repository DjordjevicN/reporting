export interface CakeReport {
  id?: string;
  name: string;
  start: number;
  inflow: number;
  outflow: number;
  wolt: number;
  expense: number;
  dayend: number;
  description: string;
}

export interface Report {
  id: string;
  date: string;
  cakes: CakeReport[];
}
