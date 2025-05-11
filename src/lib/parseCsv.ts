import fs from "fs";
import Papa from "papaparse";

export const parseNutritionCsv = (filePath: string) => {
  const csv = fs.readFileSync(filePath, "utf8");
  return Papa.parse(csv, { header: true });
};

export const parseIngredientsCsv = (filePath: string) => {
  const csv = fs.readFileSync(filePath, "utf8");
  return Papa.parse(csv, { header: true });
};

export const parseUnitsCsv = (filePath: string) => {
  const csv = fs.readFileSync(filePath, "utf8");
  return Papa.parse(csv, { header: true });
};
