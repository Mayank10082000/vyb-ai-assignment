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
  const parsedData = Papa.parse(csv, { header: true });
  const units = parsedData.data
    .map((row) => (row as Record<string, string | undefined>)["Indian unit"])
    .filter((unit): unit is string => !!unit && unit.trim() !== "");
  return units;
};

export const parseAmbiguousTermsCsv = (filePath: string) => {
  const csv = fs.readFileSync(filePath, "utf8");
  return Papa.parse(csv, { header: true });
};
