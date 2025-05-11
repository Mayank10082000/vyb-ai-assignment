import path from "path";
import { generateRecipe } from "./openAi";
import fs from "fs";

export const parseAiResponse = async (dishName: string) => {
  const response = await generateRecipe(dishName);
  const content = response;
  if (!content) {
    throw new Error("AI response is empty.");
  }
  const sections = content.split("Assumptions:");
  const ingredientsSection = sections[0].replace("Ingredients:", "").trim();
  const assumptionsSection = sections[1]?.trim() || "";

  const ingredients = ingredientsSection
    .split("\n")
    .filter((line: string) => line.trim() !== "")
    .map((line: string) => line.replace("- ", "").trim());

  const assumptions = assumptionsSection
    .split("\n")
    .filter((line: string) => line.trim() !== "")
    .map((line: string) => line.replace("- ", "").trim());

  // Save assumptions to a text file
  const assumptionsDir = path.join(process.cwd(), "assumptions");
  if (!fs.existsSync(assumptionsDir)) {
    fs.mkdirSync(assumptionsDir);
  }

  const fileName = `${dishName
    .toLowerCase()
    .replace(/\s+/g, "_")}_assumptions.txt`;
  const filePath = path.join(assumptionsDir, fileName);

  fs.writeFileSync(filePath, assumptions.join("\n"), "utf8");

  return { ingredients, assumptions };
};
