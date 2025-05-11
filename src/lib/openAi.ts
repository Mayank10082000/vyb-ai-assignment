import OpenAI from "openai";
import { parseUnitsCsv } from "./parseCsv";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const unitsCsvPath = "./src/data/Unit of measurements.csv";
console.log(unitsCsvPath);

export const generateRecipe = async (dishName: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a cooking assistant that tells about the ingredients based on dishname. You will use the ${parseUnitsCsv(
            unitsCsvPath
          )} to tell the unit of the ingredients. Dont use the terms outside the measurement csv file, if you dont have any option then you will according to your understanding and the context of the dish as well as the measurement csv file need to convert them into units  present in the measurement  csv file. No other units or words that are not present in the measurement csv file will be used.`,
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
