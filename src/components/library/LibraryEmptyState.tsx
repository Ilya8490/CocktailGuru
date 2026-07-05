interface LibraryEmptyStateProps {
  onClearAll: () => void
}

export function LibraryEmptyState({ onClearAll }: LibraryEmptyStateProps) {
  return (
    <section className="library-empty-state">
      <h2 className="library-empty-state__title">No cocktails match this selection.</h2>
      <p>Adjust the search or clear the filters to reopen the cabinet.</p>
      <button className="library-empty-state__action" type="button" onClick={onClearAll}>
        Clear all filters
      </button>
    </section>
  )
}
