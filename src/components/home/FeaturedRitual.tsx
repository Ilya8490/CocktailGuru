import { SectionLabel } from '../ui/SectionLabel'

export function FeaturedRitual() {
  return (
    <section className="ritual section-gutter" aria-labelledby="ritual-title">
      <div className="ritual-image-wrap">
        <div className="ritual-image" role="img" aria-label="A dark stirred cocktail with orange peel and cherry" />
        <span className="image-caption">After hours · served slowly</span>
      </div>
      <div className="ritual-copy">
        <SectionLabel>Featured ritual</SectionLabel>
        <h2 id="ritual-title">The midnight <br /><em>ritual</em></h2>
        <p>A slow, amber meditation—layered with smoke, cherry, orange, and oak.</p>
        <dl className="tasting-notes">
          <div><dt>Character</dt><dd>Smoky · Silken</dd></div>
          <div><dt>Moment</dt><dd>After midnight</dd></div>
          <div><dt>Finish</dt><dd>Warm · Lingering</dd></div>
        </dl>
      </div>
    </section>
  )
}
