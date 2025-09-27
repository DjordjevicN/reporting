export const codeToText = (code: string | null) => {
  switch (code) {
    case "admin":
      return "Administrator";
    case "nbg":
      return "Novi Beograd";
    case "vcr":
      return "Vračar";
    default:
      return "Nepoznata uloga";
  }
};
