import { NextRequest, NextResponse } from "next/server";
import { generateRecipe } from "@/lib/openAi";

export async function POST(request: NextRequest) {
  try {
    const { dishName } = await request.json();
    const recipe = await generateRecipe(dishName);
    return NextResponse.json({ recipe });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error in recipe route: ", error.message);
    } else {
      console.log("Error in recipe route: ", error);
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
