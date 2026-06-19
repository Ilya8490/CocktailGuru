import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { SectionLabel } from '../ui/SectionLabel'

export function FeaturedRitual() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-22, 22])

  return (
    <section ref={sectionRef} className="ritual section-gutter" aria-labelledby="ritual-title">
      <div className="ritual-image-wrap">
        <motion.div style={{ y: imageY }} className="ritual-image" role="img" aria-label="A dark stirred cocktail with orange peel and cherry" />
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
