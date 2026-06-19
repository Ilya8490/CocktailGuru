export type IngredientCategory = 'spirit' | 'liqueur' | 'fortified-wine' | 'wine' | 'beer' | 'juice' | 'syrup' | 'bitters' | 'mixer' | 'fruit' | 'herb' | 'spice' | 'dairy' | 'garnish' | 'other'
export type Allergen = 'dairy' | 'egg' | 'nuts' | 'sulfites' | 'gluten'
export interface Ingredient { id: string; name: string; category: IngredientCategory; color: string; icon: string; isAlcoholic: boolean; allergens: Allergen[]; aliases: string[]; referenceUrl?: string }
