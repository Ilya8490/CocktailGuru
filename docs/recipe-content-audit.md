# Recipe Content Audit

## Scope and evidence

This is a first-pass audit of the 25 recipes currently defined in `src/data/cocktails.ts`, against the [Recipe Content Standard](./recipe-content-standard.md). It checks the recipe data and how the application currently generates instructions. It does not claim that a recipe is inaccurate; factual verification requires comparing it with reliable external recipe sources.

The catalog currently generates instructions from the broad preparation method rather than storing recipe-specific directions. Only Basil Beauty has a `references` entry, and that link concerns cocktail glassware, not its recipe. No recipe currently has a recipe-specific source recorded in the catalog.

Per the project's attribution policy, recipes without verified sources should not be labeled as unverified, house recipes, or otherwise given unsupported provenance. Missing attribution is recorded here as an audit finding, not as a user-facing recipe label.

## External source checks completed

The International Bartenders Association (IBA) pages and Liquor.com recipe pages below were checked as reference formulations. Their recipes are not treated as the only valid versions; differences identify variations for an editorial decision, not automatic errors.

| Recipe | Source and source-supported details | Comparison with catalog |
| --- | --- | --- |
| Old Fashioned | [IBA Old Fashioned](https://iba-world.com/iba-cocktail/old-fashioned/): 45 ml bourbon or rye, sugar cube, Angostura bitters, plain water; dissolve sugar in the glass, add ice and whiskey, stir gently; orange slice or zest and cocktail cherry. | Catalog uses 60 ml bourbon and 7.5 ml simple syrup, omits plain water, and lists orange peel only. This is a different formulation. The generic stir instructions omit the dissolve-in-glass process and cherry garnish. |
| Whiskey Sour | [IBA Whiskey Sour](https://iba-world.com/iba-cocktail/whiskey-sour/): 45 ml bourbon, 25 ml fresh lemon juice, 20 ml sugar syrup, optional few drops of egg white; shake with ice. IBA gives a cobbler-glass serve or an old-fashioned glass with ice, and describes orange and cherry garnish. | Catalog uses 60 ml bourbon, 30 ml lemon, and one piece egg white; method is dry-shake and garnish is lemon peel and cherry. These differ from the IBA version. The current generic instructions do not actually describe dry shaking. |
| Mojito | [IBA Mojito](https://iba-world.com/iba-cocktail/mojito/): white Cuban rum, fresh lime, mint sprigs, cane sugar, and soda water; mix mint, sugar, and lime, add soda and ice, add rum, top with soda, and stir lightly. | Catalog uses 50 ml rum, lime juice, simple syrup, mint leaves, and soda water, with method `churn`. It is a different formulation. The generic method-generated instructions incorrectly describe shaking and omit the mint/sugar preparation and soda top sequence. |
| French 75 | [IBA French 75](https://iba-world.com/iba-cocktail/french-75/): 30 ml gin, 15 ml fresh lemon, 15 ml sugar syrup, 60 ml Champagne; shake all ingredients except Champagne, strain into a flute, top with Champagne, and stir gently. | Catalog uses 10 ml syrup and a generic instruction to shake all liquid ingredients, including sparkling wine. The recipe should make the top-up order explicit; syrup quantity differs from the IBA formulation. |
| Paloma | [IBA Paloma](https://iba-world.com/iba-cocktail/paloma/): 50 ml 100% agave tequila, fresh lime, salt, and 100 ml pink grapefruit soda, built in a highball with ice. | Catalog uses 50 ml blanco tequila, grapefruit juice, lime juice, agave syrup, and soda water. This is a different formulation; the IBA source does not establish that the catalog version is incorrect. |
| Negroni | [Liquor.com Negroni](https://www.liquor.com/recipes/negroni/): describes the classic as equal parts gin, Campari, and sweet vermouth and identifies orange peel as the traditional garnish. | Catalog's 30 ml equal-parts formula and orange peel agree. Add instructions to stir with ice, serve over fresh ice in the rocks glass, and express/add the orange peel. The fetched page did not expose its full recipe card, so this check confirms the ratio and ingredient set, not every preparation detail. |
| Margarita | [Liquor.com Margarita](https://www.liquor.com/recipes/margarita/): supports tequila, orange liqueur, and fresh lime as the classic ingredient set; it notes that proportions, salt, and variations are debated. | Catalog's ingredient set is consistent. Keep the 50/25/25 formula only as the selected variation, mark lime as freshly squeezed, and give specific shake/strain/salt-rim directions. The fetched page did not expose its full recipe card, so do not claim its exact proportions are verified by this check. |
| Daiquiri | [Liquor.com Daiquiri](https://www.liquor.com/recipes/daiquiri/): 2 oz light rum, 1 oz freshly squeezed lime juice, 3/4 oz demerara syrup; shake with ice, double-strain into a chilled coupe, lime-twist garnish. | Catalog's 60/25/15 ml formula has less lime and syrup when scaled to 60/30/22.5 ml, uses simple rather than demerara syrup, and lists a lime wheel. Either retain this as a deliberate drier variation with a source that supports it, or change toward 60/30/22.5 ml and identify a demerara syrup ingredient; add fresh-juice, shake, double-strain, chilled-coupe, and garnish directions. |
| Manhattan | [Liquor.com Manhattan](https://www.liquor.com/recipes/manhattan-2/): 2 oz rye, 1 oz sweet vermouth, 2 dashes Angostura; stir with ice, strain into a chilled Nick & Nora or coupe, garnish with a brandied cherry or lemon twist. | Catalog's 60/30/2-dash formulation and Nick-and-Nora glass agree. Specify chilling/stirring, straining, and garnish. Consider naming the garnish as a brandied cherry only if that is the intended ingredient. |
| Dry Martini | [Liquor.com Dry Martini](https://www.liquor.com/recipes/dry-martini/): dry gin, dry vermouth, optional orange bitters; common ratios range from 4:1 to 8:1; stir, strain into a Martini glass, express lemon peel. | Catalog's 60:10 ratio is 6:1, within that range; orange bitters, stirring, glass, and lemon peel are consistent. Add the selected ratio as a deliberate variation and instructions to stir until properly chilled/diluted, strain, and express the lemon peel. |
| Tom Collins | [Liquor.com Tom Collins](https://www.liquor.com/recipes/tom-collins/): describes the Collins template as a gin sour served over ice in a tall glass and topped with soda water. | Catalog's gin, lemon, syrup, soda, and lemon wheel match the template. Shake only gin, lemon, and syrup; strain into an ice-filled Collins glass and top with soda. The page extract did not expose a full recipe card, so exact proportions remain unverified here. |
| Espresso Martini | [Liquor.com Espresso Martini](https://www.liquor.com/recipes/espresso-martini/): 2 oz vodka, 1/2 oz coffee liqueur, 1 oz espresso, 1/4 oz simple syrup; shake with ice, strain into a chilled cocktail glass, garnish with three coffee beans. | Catalog's coffee and garnish match, but its 40/20/30/10 ml proportions differ from the linked formulation (about 60/15/30/7.5 ml). Choose which ratio to publish; if aligning to this source, change the measures and describe the chilled glass and shake/strain steps. |

### Exact-name source search: modern recipes and mocktails

Exact-title web searches for the ten modern recipe names and three mocktail names below did not surface a clearly attributable, reliable recipe matching the catalog's formulation. Search results were noisy and are not proof that no such source exists. No recipe provenance should be inferred from this result. The existing Basil Beauty reference covers glassware only, not its formula.

| Recipe | Search result and content recommendation |
| --- | --- |
| Burgundy Hour | No reliable exact-title recipe source surfaced. Ask the recipe author to confirm whether rosemary is garnish-only and whether blackberries are muddled or simply shaken; make the directions explicit. |
| Velvet Ember | No reliable exact-title recipe source surfaced. Confirm that “smoke syrup” means the registry's Smoked Tea Syrup. Replace “flamed orange peel” with an unflamed orange twist unless the flame garnish is intentional and its handling is reviewed. |
| Gilded Fig | No reliable exact-title recipe source surfaced. Confirm the formula and that fresh fig is a garnish rather than a measured ingredient; specify the garnish in the serving steps. |
| Midnight Orchard | No reliable exact-title recipe source surfaced. Confirm that the spiced pear syrup is intended and that the pear fan is garnish-only; provide an explicit stir/strain/serve method. |
| Saffron Smoke | No reliable exact-title recipe source surfaced. Add ginger beer after shaking, not into the shaker. The description's “smoky whisky” is not guaranteed by generic Scotch; specify a peated Scotch if that is intended, or remove that claim. |
| Rosewood Sour | No reliable exact-title recipe source surfaced. Confirm the dry-shake technique, then describe dry shake followed by ice shake and strain. Review whether cranberry dust is an actual garnish, and add egg allergen data. |
| Black Cherry Highball | No reliable exact-title recipe source surfaced. Confirm whether cocktail cherries are muddled, added whole, or garnish-only; describe the chosen treatment, then build over ice and add cola last. |
| Spiced Pear Collins | No reliable exact-title recipe source surfaced. The pear-syrup ingredient is already named “Spiced Pear Syrup,” so the winter-spice idea is represented by that ingredient; shake the non-carbonated ingredients and add soda last. |
| Cacao Nocturne | No reliable exact-title recipe source surfaced. Confirm whether cacao nibs are garnish-only; document the stir, strain, and garnish steps. |
| Basil Beauty | No reliable exact-title recipe source surfaced. Confirm the unusual one-piece passion-fruit measure, brand-specific vodka display note, and whether the martini glass is intended. Keep the existing glassware link identified as glassware context, not a recipe source. |
| Crimson Garden | No reliable exact-title recipe source surfaced. Specify whether rosemary is lightly expressed/infused or garnish-only and add soda last. “Dry” is not established by the current data; use neutral descriptive copy unless the balance is verified. |
| Citrus No. 5 | No reliable exact-title recipe source surfaced. Specify that the juices and honey syrup are shaken before tonic is added; confirm the selected balance and avoid implying the title or formula has external provenance. |
| Smoked Apricot Fizz | No reliable exact-title recipe source surfaced. Add ginger beer last. The description says “black-tea smoke,” but the registry identifies the ingredient only as Smoked Tea Syrup; either verify its tea type or change the wording to “smoked-tea notes.” |

## Findings applying across the catalog

1. **Instructions are not recipe-specific.** The `c` helper in `src/data/cocktails.ts` creates the same two steps for every recipe of a given broad method. This omits recipe-specific order, ice, straining, serving, and garnish directions.
2. **Some generated directions conflict with the recipe's preparation method or ingredients.** The helper treats every method other than `build` and `stir` as a shake. Consequently, dry-shake and churn recipes receive shake-only wording. It also says to shake all liquid ingredients, which is not appropriate for recipes that include sparkling wine, soda water, or ginger beer as a top.
3. **Recipe sourcing is absent.** The single current reference is a glassware article attached to Basil Beauty; it does not document that drink's recipe. Recipe measures, method, glass, garnish, descriptions, and origin classifications need source review before attribution is added.
4. **Garnishes are separate from recipe ingredients.** That can be intentional, but review each garnish to ensure the instructions explain its use and any required garnish ingredient is available to the user.
5. **Allergen metadata needs a targeted correction/review.** `egg-white` is registered with category `other`, and the current ingredient helper only assigns allergens automatically to dairy and wine categories. It therefore has no egg allergen recorded despite being present in Whiskey Sour and Rosewood Sour.
6. **Mocktail classification is based on the ingredient registry.** The integrity test checks that mocktails contain no ingredient marked alcoholic; source/label review should also confirm the products represented by generic ingredients such as ginger beer are appropriate for the non-alcoholic catalog.

## Recipe-by-recipe audit queue

The table records the current formulation and action for each drink. Twelve classic recipes now have a source check (the seven Liquor.com checks above plus the five IBA checks); exact-name searches were also run for all ten modern recipe names and all three mocktail names. Search failure is not proof that no external source exists. “Generated method conflict” refers to the current generic steps, not necessarily a defect in the recipe formula.

| Recipe | Current method and notable data | Audit focus |
| --- | --- | --- |
| Old Fashioned | Stir; bourbon, simple syrup, Angostura bitters; orange peel | IBA comparison above confirms this is a different formula. Decide whether to retain it as a variation or align it; source-backed directions should address syrup, water, ice, and garnish. |
| Negroni | Stir; equal parts gin, Campari, sweet vermouth; orange peel | Ratio and orange peel agree with Liquor.com. Add stir-with-ice, rocks-glass over fresh ice, and orange-peel directions. |
| Margarita | Shake; blanco tequila, triple sec, lime; half salt rim and lime wheel | Ingredient set agrees with Liquor.com; exact ratio not confirmed from fetched page. Add fresh-lime preparation and explicit shake, strain, half-rim, and garnish steps; retain as a selected variation. |
| Daiquiri | Shake; white rum, lime, simple syrup; lime wheel | Liquor.com's recipe differs: 60/30/22.5 ml light rum/lime/demerara syrup, double-strained into chilled coupe, lime twist. Either align and add a demerara syrup ingredient or keep the current formula as a deliberate variation with its own supporting source. |
| Manhattan | Stir; rye, sweet vermouth, Angostura bitters; cocktail cherry | Quantities align with Liquor.com. Add stir-with-ice, strain into chilled Nick & Nora, garnish steps; decide whether the cherry is specifically brandied. |
| Dry Martini | Stir; gin, dry vermouth, orange bitters; lemon peel | Current 60:10 ratio is within Liquor.com's 4:1–8:1 range. Document this chosen ratio and add chilled/diluted stir, strain, and lemon-expression instructions. |
| Whiskey Sour | Dry-shake; bourbon, lemon, syrup, egg white; lemon peel and cherry | IBA comparison above confirms different measures, method, and garnish. Choose and document the intended variation; review egg allergen metadata. |
| Mojito | Churn; rum, lime, syrup, mint, soda water | IBA comparison above confirms different measures and ingredient form. Choose and document the intended variation; directions must add soda after preparation, not shake it. |
| Tom Collins | Shake; gin, lemon, syrup, soda water | Liquor.com supports the sour-over-ice/tall-glass/soda-top template. Shake only non-carbonated ingredients, strain into an ice-filled Collins glass, top with soda; exact ratios remain unchecked. |
| French 75 | Shake; gin, lemon, syrup, sparkling wine | IBA comparison above: exclude sparkling wine from the shaker and top up after straining. Current syrup quantity also differs from IBA. Decide which variation to retain. |
| Espresso Martini | Shake; vodka, coffee liqueur, espresso, syrup; three coffee beans | Liquor.com supports these ingredients and three-bean garnish, but its 60/15/30/7.5 ml formula differs from catalog's 40/20/30/10 ml. Choose a formula; if using that source, update quantities and add chilled-glass shake/strain steps. |
| Paloma | Build; tequila, grapefruit and lime juice, agave, soda water | IBA comparison above confirms this is a different, juice-based formulation. Decide whether to retain it as a variation; instructions should explain ice and soda order. |
| Burgundy Hour | Modern; gin, red wine, blackberry, lemon, honey syrup | No reliable exact-title source surfaced. Confirm if rosemary is garnish-only and whether blackberries are muddled or shaken; make preparation explicit. |
| Velvet Ember | Modern; mezcal, amaretto, bitters, smoke syrup | No reliable exact-title source surfaced. Confirm syrup identity; prefer an unflamed orange twist unless an intentional flame garnish and safe handling are reviewed. |
| Gilded Fig | Modern; cognac, fig syrup, lemon, elderflower liqueur | No reliable exact-title source surfaced. Confirm formula; identify fresh fig as garnish-only and describe its use in serving steps. |
| Midnight Orchard | Modern; rye, pear syrup, dry vermouth, orange bitters | No reliable exact-title source surfaced. Confirm spiced pear syrup and garnish; add explicit stir, strain, and serve instructions. |
| Saffron Smoke | Modern; Scotch, saffron syrup, lemon, ginger beer | No reliable exact-title source surfaced. Add ginger beer after shaking. Use peated Scotch or remove “smoky whisky” claim. |
| Rosewood Sour | Dry-shake; gin, cranberry, lemon, syrup, egg white | No reliable exact-title source surfaced. Specify dry-shake then ice-shake; confirm cranberry dust; add egg allergen metadata. |
| Black Cherry Highball | Build; dark rum, cocktail cherries, lime, cola | No reliable exact-title source surfaced. Confirm whether cherries are muddled, added whole, or garnish-only; build over ice and add cola last. |
| Spiced Pear Collins | Shake; gin, pear juice, lemon, pear syrup, soda water | No reliable exact-title source surfaced. Shake non-carbonated ingredients and add soda last. The syrup's registered name already includes “Spiced.” |
| Cacao Nocturne | Stir; dark rum, crème de cacao, coffee liqueur, orange bitters | No reliable exact-title source surfaced. Confirm cacao nibs are garnish-only; add explicit stir, strain, and garnish steps. |
| Basil Beauty | Shake; passion fruit, basil, citron vodka, pineapple, lime, coconut syrup | No reliable exact-title source surfaced. Confirm passion-fruit measure, vodka brand note, and intended glass. Existing glassware link is not recipe provenance. |
| Crimson Garden | Mocktail; cranberry, grapefruit, rosemary, grenadine, soda water | No reliable exact-title source surfaced. Clarify rosemary treatment and add soda last; replace “dry” with neutral copy unless balance supports it. |
| Citrus No. 5 | Mocktail; orange, lemon, lime, honey syrup, tonic water | No reliable exact-title source surfaced. Shake juice/syrup first, add tonic last, and confirm the recipe balance. |
| Smoked Apricot Fizz | Mocktail; apricot nectar, lemon, smoke syrup, ginger beer | No reliable exact-title source surfaced. Add ginger beer last; verify “black tea” in the syrup or soften to “smoked-tea notes.” |

## Recommended audit decisions

1. For classic recipes, select whether to align to the cited reference or intentionally retain a variation. Store a recipe-specific source only when it actually supports the selected formula.
2. Ask the recipe creator to confirm the ingredients, garnish use, and technique of modern recipes and mocktails. Do not invent provenance or add a user-facing “unverified” label.
3. Replace method-generated instructions with recipe-specific steps, paying particular attention to carbonated ingredients, dry-shake recipes, garnish handling, and serve style.
4. Add the supported recipe sources to the catalog and render clear labels. Keep the Basil Beauty glassware reference distinct from recipe sourcing.
5. Add egg to egg white allergen metadata and review all other allergen claims against ingredients rather than categories alone.
6. Strengthen catalog-integrity and detail-page tests to prevent generic/mismatched instructions, missing recipe sources where recorded, and missing allergen data.

## Completion status

- Catalog inventory: 25 recipes reviewed.
- Generic instruction generation: confirmed for all 25 recipes.
- Recipe-source coverage in app data: no recipe-specific sources are stored; the Basil Beauty link is about glassware.
- External source review: 12 classic recipes checked against IBA or Liquor.com reference pages. Exact-name searches run for the 10 modern recipes and 3 mocktails, with no clearly attributable exact-formula source found in accessible results. Those 13 still need author confirmation or a sourced reformulation.
- Recipe changes: none made during this audit pass.
