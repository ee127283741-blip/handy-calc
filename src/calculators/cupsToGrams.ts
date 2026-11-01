// Grams per 1 US cup, from the King Arthur Baking ingredient weight chart.
// Entries listed there for 1/2 cup or 1 tablespoon are scaled to 1 cup (x2, x16).
export interface Ingredient {
  id: string;
  name: string;
  gramsPerCup: number;
}

export const INGREDIENTS: Ingredient[] = [
  { id: 'ap-flour', name: 'All-purpose flour', gramsPerCup: 120 },
  { id: 'bread-flour', name: 'Bread flour', gramsPerCup: 120 },
  { id: 'whole-wheat-flour', name: 'Whole wheat flour', gramsPerCup: 113 },
  { id: 'granulated-sugar', name: 'Granulated white sugar', gramsPerCup: 198 },
  { id: 'brown-sugar', name: 'Brown sugar (packed)', gramsPerCup: 213 },
  { id: 'powdered-sugar', name: "Confectioners' sugar (unsifted)", gramsPerCup: 113 },
  { id: 'butter', name: 'Butter', gramsPerCup: 226 },
  { id: 'water', name: 'Water', gramsPerCup: 227 },
  { id: 'milk', name: 'Milk', gramsPerCup: 227 },
  { id: 'vegetable-oil', name: 'Vegetable oil', gramsPerCup: 198 },
  { id: 'honey', name: 'Honey', gramsPerCup: 336 },
  { id: 'maple-syrup', name: 'Maple syrup', gramsPerCup: 312 },
  { id: 'cocoa', name: 'Cocoa powder (unsweetened)', gramsPerCup: 84 },
  { id: 'rolled-oats', name: 'Rolled oats (old-fashioned)', gramsPerCup: 89 },
  { id: 'rice', name: 'Rice (long grain, dry)', gramsPerCup: 198 },
  { id: 'chocolate-chips', name: 'Chocolate chips', gramsPerCup: 170 },
  { id: 'peanut-butter', name: 'Peanut butter', gramsPerCup: 270 },
];

export function getIngredient(id: string): Ingredient {
  const ing = INGREDIENTS.find((i) => i.id === id);
  if (!ing) throw new Error(`Unknown ingredient: ${id}`);
  return ing;
}

/** Parse "1 1/2", "3/4", "0.5" or "2" into a number. Returns NaN if invalid. */
export function parseAmount(input: string): number {
  const s = input.trim();
  if (!s) return NaN;
  const mixed = s.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixed) return Number(mixed[1]) + Number(mixed[2]) / Number(mixed[3]);
  const frac = s.match(/^(\d+)\/(\d+)$/);
  if (frac) return Number(frac[1]) / Number(frac[2]);
  return /^\d*\.?\d+$/.test(s) ? Number(s) : NaN;
}

export function cupsToGrams(cups: number, ingredientId: string): number {
  return cups * getIngredient(ingredientId).gramsPerCup;
}

export function gramsToCups(grams: number, ingredientId: string): number {
  return grams / getIngredient(ingredientId).gramsPerCup;
}
