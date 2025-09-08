import type { CakeReport } from "../types";

export const cakeList = [
  "Amanera",
  "Bela Dama",
  "Black Noar",
  "Cheese Cake",
  "Čoko Malina",
  "Dubai",
  "Esterhazi",
  "Ferrero",
  "Kinder Bueno",
  "Moskva",
  "Oreo",
  "Pita Jabuka",
  "Prase",
  "Reforma",
  "Toffee",
  "Zito",
];

export const cakeImages: Record<string, string> = {
  Amanera: "https://baza.mamagoca.com/wp-content/uploads/2025/03/Amarenai.png",
  "Bela Dama":
    "https://baza.mamagoca.com/wp-content/uploads/2025/03/Bela-dama.png",
  "Black Noar": "",
  "Cheese Cake":
    "https://baza.mamagoca.com/wp-content/uploads/2025/03/Cheesecake.png",
  "Čoko Malina":
    "https://baza.mamagoca.com/wp-content/uploads/2025/03/Coko-malina.png",
  Dubai: "https://baza.mamagoca.com/wp-content/uploads/2025/04/dubai.png",
  Esterhazi:
    "https://baza.mamagoca.com/wp-content/uploads/2025/03/Esterhaise.png",
  Ferrero: "https://baza.mamagoca.com/wp-content/uploads/2025/03/Twist.png",
  "Kinder Bueno":
    "https://baza.mamagoca.com/wp-content/uploads/2025/03/Kinder-Bueno.png",
  Moskva: "https://baza.mamagoca.com/wp-content/uploads/2025/03/Moskva.png",
  Oreo: "https://baza.mamagoca.com/wp-content/uploads/2025/03/Oreo.png",
  "Pita Jabuka":
    "https://baza.mamagoca.com/wp-content/uploads/2025/03/Pita-jabuka.png",
  Prase: "https://baza.mamagoca.com/wp-content/uploads/2025/03/Prase.png",
  Reforma: "https://baza.mamagoca.com/wp-content/uploads/2025/03/reforma.png",
  Toffee: "https://baza.mamagoca.com/wp-content/uploads/2025/03/Toffe.png",
  Zito: "https://baza.mamagoca.com/wp-content/uploads/2025/03/Zito-sa-slagom.png",
};

export const generateInitCakeList = (): CakeReport[] => {
  const initCakeList = cakeList.map((cake, index) => ({
    id: (index + 1).toString(),
    name: cake,
    start: 0,
    inflow: 0,
    outflow: 0,
    wolt: 0,
    expense: 0,
    dayend: 0,
    description: "",
  }));
  return initCakeList;
};
