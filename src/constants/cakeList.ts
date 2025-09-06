import type { CakeReport } from "../types";

export const cakeList = ["Amanera", "Dubai", "Black Noar"];

export const generateInitCakeList = (): CakeReport[] => {
  const initCakeList = cakeList.map((cake, index) => ({
    id: (index + 1).toString(),
    name: cake,
    start: 0,
    inflow: 0,
    outflow: 0,
    wolt: 0,
    expense: 0,
    end: 0,
    description: "",
  }));
  return initCakeList;
};
