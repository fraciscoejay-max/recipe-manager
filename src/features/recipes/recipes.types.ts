import type { Recipe } from "@/features/meals/meals.types";

/** A recipe saved locally and assigned a stable id. */
export interface SavedRecipe extends Recipe {
  id: string;
}

/** What we send to create one: everything except the id. */
export type NewRecipe = Recipe;

/** A partial update identified by the saved recipe id. */
export type RecipePatch = { id: string } & Partial<Omit<SavedRecipe, "id">>;
