interface IngredientSearchProps {
  value: string
  onChange: (value: string) => void
}

export function IngredientSearch({ value, onChange }: IngredientSearchProps) {
  return (
    <label className="ingredient-search">
      <span>Search ingredients</span>
      <input
        aria-label="Search ingredients"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Try gin, citrus, basil..."
      />
    </label>
  )
}
