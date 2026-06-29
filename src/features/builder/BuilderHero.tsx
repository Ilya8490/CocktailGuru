import { SectionLabel } from '../../components/ui/SectionLabel'

interface BuilderHeroProps {
  selectedCount: number
}

export function BuilderHero({ selectedCount }: BuilderHeroProps) {
  return (
    <section className="builder-hero section-gutter">
      <SectionLabel>Builder</SectionLabel>
      <h1>Build from <em>your bar</em></h1>
      <p>
        Choose what you have on hand. The glass will surface exact recipes first, then near matches worth finishing.
      </p>
      <p className="builder-hero__count">{selectedCount} selected</p>
    </section>
  )
}
