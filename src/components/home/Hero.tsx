import { Button } from '../ui/Button'
import { SectionLabel } from '../ui/SectionLabel'

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-image" role="img" aria-label="Amber cocktail glowing beneath warm bar light" />
      <div className="hero-vignette" />
      <div className="deco-frame" aria-hidden="true"><span /><span /><span /></div>
      <div className="hero-content">
        <SectionLabel>The art of the pour</SectionLabel>
        <h1 id="hero-title">Craft your <br /><em>evening</em></h1>
        <p className="hero-copy">Choose what you have. We’ll reveal the drink hiding inside it.</p>
        <Button to="/builder">Start mixing</Button>
      </div>
      <p className="hero-index" aria-hidden="true">No. 01 · Cocktail Atelier</p>
    </section>
  )
}
