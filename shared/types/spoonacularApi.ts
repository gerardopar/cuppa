export interface RandomRecipeResponse {
  recipes: Recipe[];
}

export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: number | null;
  cookingMinutes: number | null;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  license: string;
  sourceName: string;
  pricePerServing: number;
  extendedIngredients: Ingredient[];
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  instructions: string;
  analyzedInstructions: AnalyzedInstruction[];
  originalId: number | null;
  spoonacularScore: number;
  spoonacularSourceUrl: string;
}

export interface Ingredient {
  id: number;
  name: string;
  original: string;
  amount: number;
  unit: string;
  [key: string]: any; // Spoonacular can include other props like meta, image, etc.
}

export interface AnalyzedInstruction {
  name: string;
  steps: InstructionStep[];
}

export interface InstructionStep {
  number: number;
  step: string;
  ingredients?: IngredientReference[];
  equipment?: EquipmentReference[];
  [key: string]: any;
}

export interface IngredientReference {
  id: number;
  name: string;
  image?: string;
}

export interface EquipmentReference {
  id: number;
  name: string;
  image?: string;
}
