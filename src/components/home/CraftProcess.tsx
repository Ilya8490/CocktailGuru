import { SectionLabel } from '../ui/SectionLabel'

const steps = [
  { number: '01', title: 'Choose ingredients', body: 'Begin with the bottles, produce, and curiosities already within reach.' },
  { number: '02', title: 'Discover the balance', body: 'Watch sweetness, strength, acidity, and bitterness settle into proportion.' },
  { number: '03', title: 'Meet your cocktail', body: 'Receive a considered recipe shaped around what you chose.' },
]

export function CraftProcess() {
  return (
    <section className="process section-gutter" aria-labelledby="process-title">
      <div className="section-heading">
        <SectionLabel>The method</SectionLabel>
        <h2 id="process-title">Three gestures, <br /><em>one perfect pour.</em></h2>
      </div>
      <ol className="process-list">
        {steps.map((step) => (
          <li key={step.number}>
            <span className="step-number">{step.number}</span>
            <div><h3>{step.title}</h3><p>{step.body}</p></div>
          </li>
        ))}
      </ol>
    </section>
  )
}
