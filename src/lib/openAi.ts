import OpenAI from "openai";
import { parseUnitsCsv } from "./parseCsv";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const unitsCsvPath = "./src/data/Unit of measurements.csv";

export const generateRecipe = async (dishName: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a cooking assistant that tells about the ingredients based on dishname. You are only allowed to use the ${parseUnitsCsv(
            unitsCsvPath
          )} units to tell the unit of the ingredients. No other unit will be considered. For the units that are not present in the ${parseUnitsCsv(
            unitsCsvPath
          )} file, if for any ingredient you are not able to find the unit that is present in ${parseUnitsCsv(
            unitsCsvPath
          )} file, you according to your knowledge have to convert them to the unit present and assign them some default amount which is generally used by other people from your knowledge base. And you have to write those assumptions also in assumptions part which you took to convert the unit. The output should be in the following format:
          Ingredients:
          - Ingredient 1: Amount (Unit)
          - Ingredient 2: Amount (Unit)
          - ...
          Assumptions:
          - Assumption 1: Amount (Unit)
          - Assumption 2: Amount (Unit)
          - ...
          `,
        },
        {
          role: "user",
          content: `I want to make ${dishName}. What are the ingredients?`,
        },
      ],
    });

    console.log(response.choices[0].message.content);

    return response.choices[0].message.content;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error in openAi ts file: ", error.message);
    } else {
      console.log("Error in openAi ts file: ", error);
    }
    throw new Error("Internal server error");
  }
};
