import { useId } from 'react'

interface CocktailSearchProps {
  value: string
  onChange: (value: string) => void
}

export function CocktailSearch({ value, onChange }: CocktailSearchProps) {
  const inputId = useId()

  return (
    <div className="cocktail-search">
      <label className="cocktail-search__label" htmlFor={inputId}>
        Search the collection
      </label>
      <input
        className="cocktail-search__input"
        id={inputId}
        type="search"
        value={value}
        placeholder="Negroni, gin, bitter…"
        onChange={(event) => onChange(event.currentTarget.value)}
      />
    </div>
  )
}
