import { motion } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'
import { modalVariants } from '../../animations'

import type { LibraryFilterAction } from '../../hooks/useLibraryFilters'
import type { LibraryQuery } from '../../utils/libraryQuery'
import { CocktailFilters } from './CocktailFilters'

interface MobileFilterSheetProps {
  query: LibraryQuery
  onToggle: LibraryFilterAction
  onClearAll: () => void
}

export function MobileFilterSheet({ query, onToggle, onClearAll }: MobileFilterSheetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const wasOpenRef = useRef(false)
  const generatedId = useId()
  const dialogId = `mobile-filters-${generatedId.replace(/:/g, '')}`

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      wasOpenRef.current = true
      if (!dialog.open) {
        if (typeof dialog.showModal === 'function') {
          dialog.showModal()
        } else {
          dialog.setAttribute('open', '')
        }
      }
      closeButtonRef.current?.focus()
      return
    }

    if (dialog.open) {
      if (typeof dialog.close === 'function') {
        dialog.close()
      } else {
        dialog.removeAttribute('open')
      }
    }

    if (wasOpenRef.current) {
      wasOpenRef.current = false
      triggerRef.current?.focus()
    }
  }, [isOpen])

  const close = () => setIsOpen(false)

  const handleDialogClose = () => {
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <div className="mobile-filter-sheet">
      <button
        aria-controls={dialogId}
        aria-expanded={isOpen}
        className="mobile-filter-sheet__trigger"
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Filters
      </button>

      <dialog
        aria-labelledby={`${dialogId}-title`}
        className="mobile-filter-sheet__dialog"
        id={dialogId}
        ref={dialogRef}
        role="dialog"
        onCancel={close}
        onClose={handleDialogClose}
        onKeyDown={(event) => {
          if (event.key === 'Escape') close()
        }}
      >
        <motion.div variants={modalVariants} initial="hidden" animate="visible" className="mobile-filter-sheet__panel">
        <div className="mobile-filter-sheet__header">
          <h2 className="mobile-filter-sheet__title" id={`${dialogId}-title`}>
            Refine the collection
          </h2>
          <button className="mobile-filter-sheet__close" type="button" onClick={close} ref={closeButtonRef}>
            Close
          </button>
        </div>

        <CocktailFilters
          className="mobile-filter-sheet__filters"
          idPrefix={`${dialogId}-filter`}
          query={query}
          onToggle={onToggle}
        />

        <div className="mobile-filter-sheet__actions">
          <button className="mobile-filter-sheet__clear" type="button" onClick={onClearAll}>
            Clear all
          </button>
          <button className="mobile-filter-sheet__done" type="button" onClick={close}>
            View cocktails
          </button>
        </div>
        </motion.div>
      </dialog>
    </div>
  )
}
