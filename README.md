# VYB AI Assignment - Nutrition Estimator

This project implements a smart nutrition estimator for Indian dishes that calculates nutritional values per standard serving, even when data is partial, ambiguous, or incomplete.

## Features

- Takes a dish name as input and estimates its nutritional content
- Handles edge cases such as:
  - Ingredient synonyms and spelling variations
  - Missing quantities
  - Ambiguous dish types
  - Missing ingredients in the nutrition database
  - Non-standard measurement units
  - Recipes with no fixed ingredient list
  - Ambiguous serving sizes

## How It Works

1. **Recipe Generation**: Using OpenAI to generate a list of ingredients for a given dish
2. **Ingredient Mapping**: Mapping ingredients to the nutrition database, handling synonyms and variations
3. **Unit Conversion**: Converting household measurements to grams
4. **Dish Type Identification**: Identifying the dish type and standard serving size
5. **Nutrition Calculation**: Calculating nutrition per 100g basis and scaling to standard serving size

## API Endpoints

- `POST /api/recipe/estimate`: Estimates nutrition for a given dish name

  ```json
  {
    "dishName": "Paneer Butter Masala"
  }
  ```

- `PUT /api/recipe/estimate`: Test endpoint that introduces specific issues for testing

  ```json
  {
    "dish": "Chana Masala",
    "issues": ["missing ingredient in nutrition DB", "quantity missing"]
  }
  ```

- `GET /api/recipe/test-dishes`: Returns the predefined test dishes
- `POST /api/recipe/test-dishes`: Returns the reasoning tasks and solutions

## Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies
   ```
   npm install
   ```
3. Create a `.env.local` file with your OpenAI API key
   ```
   OPENAI_API_KEY=your-api-key
   ```
4. Run the development server
   ```
   npm run dev
   ```

## Testing with Postman

1. Start the development server
2. Send a POST request to `http://localhost:3000/api/recipe/estimate` with a JSON body:
   ```json
   {
     "dishName": "Paneer Butter Masala"
   }
   ```
3. To test edge cases, send a PUT request to the same endpoint with:
   ```json
   {
     "dish": "Chana Masala",
     "issues": ["missing ingredient in nutrition DB"]
   }
   ```

## Data Sources

This project uses the following data sources:

- Nutrition data for common ingredients
- Household measurement references
- Food category classifications

## Project Structure

- `/src/app/api/recipe/estimate`: API routes for nutrition estimation
- `/src/app/api/recipe/test-dishes`: API routes for test cases
- `/src/lib/nutritionUtils.ts`: Core nutrition calculation logic
- `/src/lib/openAi.ts`: OpenAI integration for recipe generation
- `/src/lib/parseCsv.ts`: CSV parsing utilities
- `/src/lib/types.ts`: TypeScript type definitions
- `/src/data/`: CSV data files

## Edge Case Handling

The system handles the following edge cases:

- **Ingredient Synonyms**: Maps variant names (e.g., "aloo" → "potato")
- **Missing Quantities**: Applies reasonable defaults
- **Ambiguous Dish Types**: Uses pattern matching to identify dish categories
- **Missing Ingredients**: Uses default nutritional values
- **Unit Variations**: Converts various units to a standard gram measurement
- **No Fixed Recipe**: Handles dishes with variable ingredients
- **Ambiguous Serving Size**: Adjusts to standard serving sizes based on dish type
