# Recipe Content Standard

This standard defines how Cocktail Guru's recipe data is written, reviewed, and presented. It applies to classic cocktails, modern cocktails, and mocktails.

## Recipe content requirements

Every published recipe should have:

- A recognizable name and concise, factual description.
- A complete ingredient list using the app's canonical ingredient IDs.
- A positive quantity and supported unit for each ingredient. Use `top` only when the amount is intentionally variable.
- Preparation notes when they materially affect the ingredient or method, such as freshly squeezed juice.
- A preparation method, serving glass, and garnish that agree with the recipe instructions.
- Ordered instructions specific to the recipe, not generated solely from its preparation method.

Instructions should identify what to combine and how to prepare it, explain when the drink is ready using practical cues where useful, and describe straining, serving, and garnish when applicable. Avoid unsupported precision, including exact timing or temperature. Keep optional adjustments distinct from the core recipe.

## Accuracy and sourcing

- Check recipe details against a reliable, identifiable source before describing them as sourced.
- Add a reference only when it supports the recipe or a specific factual claim. Use a human-readable label and a direct, relevant URL.
- Do not imply that one reference supports unrelated details it does not cover.
- Recipe variations are acceptable, but do not present one variation as the only authoritative version when sources differ.
- Modern recipes may be original or adapted. Do not claim authorship or adaptation unless it is known.
- If there is no verified source, do not add an “unverified,” “house recipe,” or similar provenance label. Omit the attribution; do not imply external verification.
- Descriptive copy should avoid unsupported claims about history, origin, ingredients, or technique.

## Measurements and ingredient details

- Use metric quantities for measured liquid ingredients, with units supported by the application's `MeasurementUnit` type.
- Use count-based units such as `piece` or `leaf` when those are more practical than a volume measure.
- Preserve `dash`, `barspoon`, and `top` where the recipe calls for them; do not convert an inherently variable measure into false precision.
- Use ingredient preparation and display notes to clarify the recipe, not to make claims unsupported by the recipe source.
- Review allergens against the actual ingredients. Ingredient categories alone are not sufficient evidence that a recipe is allergen-free.
- Do not claim a drink is safe for a particular allergy or free from cross-contamination unless that information has been verified.

## Review checklist

Before adding or materially changing a recipe, verify:

1. Every ingredient ID exists, and every quantity is valid and greater than zero.
2. The units, preparation notes, method, glass, garnish, and instructions form a coherent recipe.
3. The instructions are specific to the drink and usable without relying on undocumented assumptions.
4. Sources support the claims they accompany, and labels accurately describe those sources.
5. Any variation or uncertain detail is handled without overstating authority or provenance.
6. Ingredient and allergen information does not make unsupported safety claims.
7. Automated catalog-integrity checks pass.

Automated checks can catch incomplete or inconsistent data, but they do not establish that a recipe is accurate. Human review against sources remains necessary.
