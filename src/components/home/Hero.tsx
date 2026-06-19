import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '../ui/Button'
import { SectionLabel } from '../ui/SectionLabel'

export function Hero() {
  const reduceMotion = useReducedMotion()
  const parent = reduceMotion ? undefined : { hidden: {}, visible: { transition: { staggerChildren: 0.13, delayChildren: 0.18 } } }
  const child = reduceMotion ? undefined : { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const } } }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-image" role="img" aria-label="Amber cocktail glowing beneath warm bar light" />
      <div className="hero-vignette" />
      <div className="deco-frame" aria-hidden="true"><span /><span /><span /></div>
      <motion.div className="hero-content" variants={parent} initial={reduceMotion ? false : 'hidden'} animate="visible">
        <motion.div variants={child}><SectionLabel>The art of the pour</SectionLabel></motion.div>
        <motion.h1 variants={child} id="hero-title">Craft your <br /><em>evening</em></motion.h1>
        <motion.p variants={child} className="hero-copy">Choose what you have. We’ll reveal the drink hiding inside it.</motion.p>
        <motion.div variants={child}><Button to="/builder">Start mixing</Button></motion.div>
      </motion.div>
      <p className="hero-index" aria-hidden="true">No. 01 · Cocktail Atelier</p>
    </section>
  )
}
