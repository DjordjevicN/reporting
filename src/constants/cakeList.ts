import type { CakeReport } from "../types";
import belaDama from "../assets/cakes/Bela-dama.png";
import cokoMalina from "../assets/cakes/Coko-malina.png";
import dubai from "../assets/cakes/dubai.png";
import esterhazi from "../assets/cakes/Esterhaise.png";
import ferrero from "../assets/cakes/Twist.png";
import kinderBueno from "../assets/cakes/Kinder-Bueno.png";
import moskva from "../assets/cakes/Moskva.png";
import oreo from "../assets/cakes/Oreo.png";
import pitaJabuka from "../assets/cakes/Pita-jabuka.png";
import prase from "../assets/cakes/Prase.png";
import reforma from "../assets/cakes/reforma.png";
import toffee from "../assets/cakes/Toffe.png";
import zito from "../assets/cakes/Zito-sa-slagom.png";
import cheeseCake from "../assets/cakes/Cheesecake.png";

export const cakeList = [
  "Bela Dama",
  "Dubai",
  "Kinder Bueno",
  "Toffee",
  "Black Noar",
  "Oreo",
  "Ferrero",
  "Prase",
  "Ledena Kocka",
  "Krempita",
  "Vocni Tart",
  "Cheese Cake",
  "Čoko Malina",
  "Esterhazi",
  "Moskva",
  "Reforma",
  "Pita Jabuka",
  "Trilece",
  "Zito",
];

export const cakeImages: Record<string, string> = {
  "Bela Dama": belaDama,
  "Black Noar": "",
  "Cheese Cake": cheeseCake,
  "Čoko Malina": cokoMalina,
  Dubai: dubai,
  Esterhazi: esterhazi,
  Ferrero: ferrero,
  "Kinder Bueno": kinderBueno,
  Moskva: moskva,
  Oreo: oreo,
  "Pita Jabuka": pitaJabuka,
  Prase: prase,
  Reforma: reforma,
  Toffee: toffee,
  Zito: zito,
  "Ledena Kocka": "",
  Krempita: "",
  "Vocni Tart": "",
  Trilece: "",
};

export const generateInitCakeList = (): CakeReport[] => {
  const initCakeList = cakeList.map((cake, index) => ({
    id: (index + 1).toString(),
    name: cake,
    start: "",
    inflow: "",
    outflow: "",
    wolt: "",
    expense: "",
    dayend: "",
    description: "",
  }));
  return initCakeList;
};
