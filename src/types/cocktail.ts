export type CocktailOrigin = 'classic' | 'modern' | 'mocktail'
export type MeasurementUnit = 'ml' | 'g' | 'piece' | 'leaf' | 'dash' | 'barspoon' | 'top'
export type Glassware = 'coupe' | 'nick-and-nora' | 'martini' | 'rocks' | 'highball' | 'collins' | 'flute' | 'wine' | 'copper-mug'
export type PreparationMethod = 'build' | 'stir' | 'shake' | 'dry-shake' | 'blend' | 'churn' | 'swizzle'
export interface TasteProfile { sweet: number; sour: number; bitter: number; strong: number; fruity: number; spicy: number }
export interface RecipeIngredient { ingredientId: string; quantity: number; unit: MeasurementUnit; preparation?: string; displayNote?: string }
export interface SourceReference { label: string; url: string }
export interface Cocktail { id: string; slug: string; name: string; origin: CocktailOrigin; description: string; glass: Glassware; method: PreparationMethod; garnish: string; instructions: string[]; tags: string[]; taste: TasteProfile; ingredients: RecipeIngredient[]; references?: SourceReference[] }
