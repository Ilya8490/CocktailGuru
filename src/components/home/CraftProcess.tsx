import { motion, useReducedMotion } from 'framer-motion'
import { cardHover, cardRevealVariants, createStagger, reduceLargeMotion, revealVariants } from '../../animations'
import { SectionLabel } from '../ui/SectionLabel'

const steps = [
  { number: '01', title: 'Choose ingredients', body: 'Begin with the bottles, produce, and curiosities already within reach.' },
  { number: '02', title: 'Discover the balance', body: 'Watch sweetness, strength, acidity, and bitterness settle into proportion.' },
  { number: '03', title: 'Meet your cocktail', body: 'Receive a considered recipe shaped around what you chose.' },
]

export function CraftProcess() {
  const reduceMotion = useReducedMotion()
  const itemVariants = reduceMotion ? reduceLargeMotion : cardRevealVariants

  return (
    <section className="process section-gutter" aria-labelledby="process-title">
      <motion.div
        className="section-heading"
        variants={reduceMotion ? reduceLargeMotion : revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <SectionLabel>The method</SectionLabel>
        <h2 id="process-title">Three gestures, <br /><em>one perfect pour.</em></h2>
      </motion.div>
      <motion.ol
        className="process-list"
        variants={createStagger({ staggerChildren: 0.1, delayChildren: 0.1 })}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {steps.map((step) => (
          <motion.li key={step.number} variants={itemVariants} whileHover={reduceMotion ? undefined : cardHover}>
            <span className="step-number">{step.number}</span>
            <div><h3>{step.title}</h3><p>{step.body}</p></div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  )
}
