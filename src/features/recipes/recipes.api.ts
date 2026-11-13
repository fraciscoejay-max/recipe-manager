import type { SavedRecipe, NewRecipe, RecipePatch } from "./recipes.types";

const KEY = "saved-recipes";

const read = (): SavedRecipe[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as SavedRecipe[];
  } catch (error) {
    console.error("Could not read saved recipes from localStorage.", error);
    return [];
  }
};

const write = (rows: SavedRecipe[]) => localStorage.setItem(KEY, JSON.stringify(rows));

export const getRecipes = async (): Promise<SavedRecipe[]> => read();

export const deleteRecipe = async (id: string): Promise<{ id: string }> => {
  write(read().filter((recipe) => recipe.id !== id));
  return { id };
};

export const createRecipe = async (recipe: NewRecipe): Promise<SavedRecipe> => {
  const row: SavedRecipe = { ...recipe, id: crypto.randomUUID() };
  write([...read(), row]);
  return row;
};

export const updateRecipe = async ({ id, ...patch }: RecipePatch): Promise<SavedRecipe> => {
  let updated: SavedRecipe | undefined;
  const rows = read().map((recipe) => {
    if (recipe.id !== id) return recipe;
    updated = { ...recipe, ...patch };
    return updated;
  });

  if (!updated) throw new Error(`Saved recipe ${id} was not found.`);
  write(rows);
  return updated;
};
