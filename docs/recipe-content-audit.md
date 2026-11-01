# Recipe Content Audit

## Scope and evidence

This is a first-pass audit of the 25 recipes currently defined in `src/data/cocktails.ts`, against the [Recipe Content Standard](./recipe-content-standard.md). It checks the recipe data and how the application currently generates instructions. It does not claim that a recipe is inaccurate; factual verification requires comparing it with reliable external recipe sources.

The catalog currently generates instructions from the broad preparation method rather than storing recipe-specific directions. Only Basil Beauty has a `references` entry, and that link concerns cocktail glassware, not its recipe. No recipe currently has a recipe-specific source recorded in the catalog.

Per the project's attribution policy, recipes without verified sources should not be labeled as unverified, house recipes, or otherwise given unsupported provenance. Missing attribution is recorded here as an audit finding, not as a user-facing recipe label.

## External source checks completed

The International Bartenders Association (IBA) recipe pages below were checked as reference formulations. Their recipes are not treated as the only valid versions; differences identify variations for an editorial decision, not automatic errors.

| Recipe | Source and source-supported details | Comparison with catalog |
| --- | --- | --- |
| Old Fashioned | [IBA Old Fashioned](https://iba-world.com/iba-cocktail/old-fashioned/): 45 ml bourbon or rye, sugar cube, Angostura bitters, plain water; dissolve sugar in the glass, add ice and whiskey, stir gently; orange slice or zest and cocktail cherry. | Catalog uses 60 ml bourbon and 7.5 ml simple syrup, omits plain water, and lists orange peel only. This is a different formulation. The generic stir instructions omit the dissolve-in-glass process and cherry garnish. |
| Whiskey Sour | [IBA Whiskey Sour](https://iba-world.com/iba-cocktail/whiskey-sour/): 45 ml bourbon, 25 ml fresh lemon juice, 20 ml sugar syrup, optional few drops of egg white; shake with ice. IBA gives a cobbler-glass serve or an old-fashioned glass with ice, and describes orange and cherry garnish. | Catalog uses 60 ml bourbon, 30 ml lemon, and one piece egg white; method is dry-shake and garnish is lemon peel and cherry. These differ from the IBA version. The current generic instructions do not actually describe dry shaking. |
| Mojito | [IBA Mojito](https://iba-world.com/iba-cocktail/mojito/): white Cuban rum, fresh lime, mint sprigs, cane sugar, and soda water; mix mint, sugar, and lime, add soda and ice, add rum, top with soda, and stir lightly. | Catalog uses 50 ml rum, lime juice, simple syrup, mint leaves, and soda water, with method `churn`. It is a different formulation. The generic method-generated instructions incorrectly describe shaking and omit the mint/sugar preparation and soda top sequence. |
| French 75 | [IBA French 75](https://iba-world.com/iba-cocktail/french-75/): 30 ml gin, 15 ml fresh lemon, 15 ml sugar syrup, 60 ml Champagne; shake all ingredients except Champagne, strain into a flute, top with Champagne, and stir gently. | Catalog uses 10 ml syrup and a generic instruction to shake all liquid ingredients, including sparkling wine. The recipe should make the top-up order explicit; syrup quantity differs from the IBA formulation. |
| Paloma | [IBA Paloma](https://iba-world.com/iba-cocktail/paloma/): 50 ml 100% agave tequila, fresh lime, salt, and 100 ml pink grapefruit soda, built in a highball with ice. | Catalog uses 50 ml blanco tequila, grapefruit juice, lime juice, agave syrup, and soda water. This is a different formulation; the IBA source does not establish that the catalog version is incorrect. |

## Findings applying across the catalog

1. **Instructions are not recipe-specific.** The `c` helper in `src/data/cocktails.ts` creates the same two steps for every recipe of a given broad method. This omits recipe-specific order, ice, straining, serving, and garnish directions.
2. **Some generated directions conflict with the recipe's preparation method or ingredients.** The helper treats every method other than `build` and `stir` as a shake. Consequently, dry-shake and churn recipes receive shake-only wording. It also says to shake all liquid ingredients, which is not appropriate for recipes that include sparkling wine, soda water, or ginger beer as a top.
3. **Recipe sourcing is absent.** The single current reference is a glassware article attached to Basil Beauty; it does not document that drink's recipe. Recipe measures, method, glass, garnish, descriptions, and origin classifications need source review before attribution is added.
4. **Garnishes are separate from recipe ingredients.** That can be intentional, but review each garnish to ensure the instructions explain its use and any required garnish ingredient is available to the user.
5. **Allergen metadata needs a targeted correction/review.** `egg-white` is registered with category `other`, and the current ingredient helper only assigns allergens automatically to dairy and wine categories. It therefore has no egg allergen recorded despite being present in Whiskey Sour and Rosewood Sour.
6. **Mocktail classification is based on the ingredient registry.** The integrity test checks that mocktails contain no ingredient marked alcoholic; source/label review should also confirm the products represented by generic ingredients such as ginger beer are appropriate for the non-alcoholic catalog.

## Recipe-by-recipe audit queue

The table records the current formulation and remaining audit focus for each drink. The five source comparisons above apply to Old Fashioned, Whiskey Sour, Mojito, French 75, and Paloma; the other recipes still need external source review. “Generated method conflict” refers to the current generic steps, not an externally verified defect in the recipe formula.

| Recipe | Current method and notable data | Audit focus |
| --- | --- | --- |
| Old Fashioned | Stir; bourbon, simple syrup, Angostura bitters; orange peel | IBA comparison above confirms this is a different formula. Decide whether to retain it as a variation or align it; source-backed directions should address syrup, water, ice, and garnish. |
| Negroni | Stir; equal parts gin, Campari, sweet vermouth; orange peel | Verify the equal-parts formula, serving ice, and garnish against a recipe source. The “ruby equal-parts classic” description contains a formulation claim. |
| Margarita | Shake; blanco tequila, triple sec, lime; half salt rim and lime wheel | Verify proportions, salt-rim treatment, and coupe choice; margarita formulas and serving styles vary. |
| Daiquiri | Shake; white rum, lime, simple syrup; lime wheel | Verify quantities and whether the stated garnish and glass match the selected source. |
| Manhattan | Stir; rye, sweet vermouth, Angostura bitters; cocktail cherry | Verify proportions and garnish; check that directions distinguish stirring with ice from serving. |
| Dry Martini | Stir; gin, dry vermouth, orange bitters; lemon peel | Verify the chosen vermouth ratio, bitters, and garnish as a specific variation; avoid presenting it as the only Martini formula. |
| Whiskey Sour | Dry-shake; bourbon, lemon, syrup, egg white; lemon peel and cherry | IBA comparison above confirms different measures, method, and garnish. Choose and document the intended variation; review egg allergen metadata. |
| Mojito | Churn; rum, lime, syrup, mint, soda water | IBA comparison above confirms different measures and ingredient form. Choose and document the intended variation; directions must add soda after preparation, not shake it. |
| Tom Collins | Shake; gin, lemon, syrup, soda water | Generated instructions say to shake all liquids, including soda water. Verify that soda is added after shaking and confirm measures and serving glass. |
| French 75 | Shake; gin, lemon, syrup, sparkling wine | IBA comparison above: exclude sparkling wine from the shaker and top up after straining. Current syrup quantity also differs from IBA. Decide which variation to retain. |
| Espresso Martini | Shake; vodka, coffee liqueur, espresso, syrup; three coffee beans | Verify measures, whether syrup is part of the selected formulation, and the garnish. |
| Paloma | Build; tequila, grapefruit and lime juice, agave, soda water | IBA comparison above confirms this is a different, juice-based formulation. Decide whether to retain it as a variation; instructions should explain ice and soda order. |
| Burgundy Hour | Modern; gin, red wine, blackberry, lemon, honey syrup | Verify the recipe and description. Rosemary appears in the garnish but not the measured ingredients; clarify whether it is garnish-only or part of preparation. |
| Velvet Ember | Modern; mezcal, amaretto, bitters, smoke syrup | Verify the named recipe and ingredient descriptions. The flamed orange-peel garnish requires a clear, source-supported serving instruction. |
| Gilded Fig | Modern; cognac, fig syrup, lemon, elderflower liqueur | Verify the formula and description. Fresh fig is named as garnish but is not a recipe ingredient. |
| Midnight Orchard | Modern; rye, pear syrup, dry vermouth, orange bitters | Verify the formula and description. The pear-fan garnish is not part of the recipe ingredient list. |
| Saffron Smoke | Modern; Scotch, saffron syrup, lemon, ginger beer | Generated instructions say to shake all liquids, including ginger beer. Verify that ginger beer is added after shaking and assess whether saffron appears in the recipe or only in the named syrup/garnish. |
| Rosewood Sour | Dry-shake; gin, cranberry, lemon, syrup, egg white | Generated instructions omit dry shaking. Verify the formula and garnish; cranberry dust is not listed as a recipe ingredient. Review egg allergen metadata. |
| Black Cherry Highball | Build; dark rum, cocktail cherries, lime, cola | Verify whether the cherries are muddled, added whole, or used only as garnish; generated directions do not specify preparation. |
| Spiced Pear Collins | Shake; gin, pear juice, lemon, pear syrup, soda water | Generated instructions say to shake all liquids, including soda. Verify topping order and the “spiced” description; the recipe has no separate spice ingredient. |
| Cacao Nocturne | Stir; dark rum, crème de cacao, coffee liqueur, orange bitters | Verify the named recipe and measures. Cacao nibs appear as garnish but not as a recipe ingredient. |
| Basil Beauty | Shake; passion fruit, basil, citron vodka, pineapple, lime, coconut syrup | Existing reference documents martini glassware only, not the recipe. Verify the formulation, ingredient naming/brand note, passion-fruit measure, garnish, and glass against the recipe's actual source. |
| Crimson Garden | Mocktail; cranberry, grapefruit, rosemary, grenadine, soda water | Verify measures, rosemary preparation, and soda addition order. Ensure the source/formulation supports the “dry sparkling finish” description. |
| Citrus No. 5 | Mocktail; orange, lemon, lime, honey syrup, tonic water | Verify measures and tonic addition order. Confirm that the description accurately represents the recipe rather than implying unsupported provenance. |
| Smoked Apricot Fizz | Mocktail; apricot nectar, lemon, smoke syrup, ginger beer | Verify the named recipe and syrup description. Confirm ginger beer addition order and that the description's black-tea detail is supported by the smoke syrup formulation. |

## Recommended audit decisions

1. Research and record a relevant recipe source for each recipe where a reliable source can be identified. For recipes with no verified source, leave attribution absent; do not add a provenance label.
2. Decide whether the modern recipes are documented adaptations, known original recipes, or simply lack known provenance. Only encode or display authorship/adaptation claims when supported.
3. Correct the catalog's recipe-specific method, ingredient order, and garnish details based on the selected source for each recipe.
4. Define the ingredient/allergen metadata review rule and add egg to egg white after confirming the registry's allergen model.
5. After content review, replace method-generated instructions with explicit directions and strengthen automated integrity tests to prevent the identified generic/mismatched patterns.

## Completion status

- Catalog inventory: 25 recipes reviewed.
- Generic instruction generation: confirmed for all 25 recipes.
- Recipe-source coverage in app data: no recipe-specific sources are stored; the Basil Beauty link is about glassware.
- External source review: completed for Old Fashioned, Whiskey Sour, Mojito, French 75, and Paloma; remaining 20 recipes require source review.
- Recipe changes: none made during this audit pass.
