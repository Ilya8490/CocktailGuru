import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { createStagger, reduceLargeMotion, revealVariants } from '../../animations'
import { SectionLabel } from '../ui/SectionLabel'

export function FeaturedRitual() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-22, 22])

  return (
    <section ref={sectionRef} className="ritual section-gutter" aria-labelledby="ritual-title">
      <motion.div
        className="ritual-image-wrap"
        initial={reduceMotion ? false : { opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div style={{ y: imageY }} className="ritual-image" role="img" aria-label="A dark stirred cocktail with orange peel and cherry" />
        <span className="image-caption">After hours · served slowly</span>
      </motion.div>
      <motion.div
        className="ritual-copy"
        variants={createStagger({ staggerChildren: 0.09, delayChildren: 0.08 })}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <motion.div variants={reduceMotion ? reduceLargeMotion : revealVariants}><SectionLabel>Featured ritual</SectionLabel></motion.div>
        <motion.h2 variants={reduceMotion ? reduceLargeMotion : revealVariants} id="ritual-title">The midnight <br /><em>ritual</em></motion.h2>
        <motion.p variants={reduceMotion ? reduceLargeMotion : revealVariants}>A slow, amber meditation-layered with smoke, cherry, orange, and oak.</motion.p>
        <dl className="tasting-notes">
          {[
            ['Character', 'Smoky · Silken'],
            ['Moment', 'After midnight'],
            ['Finish', 'Warm · Lingering'],
          ].map(([term, description]) => (
            <motion.div variants={reduceMotion ? reduceLargeMotion : revealVariants} key={term}>
              <dt>{term}</dt><dd>{description}</dd>
            </motion.div>
          ))}
        </dl>
      </motion.div>
    </section>
  )
}
