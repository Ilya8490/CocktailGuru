import { motion, useReducedMotion } from 'framer-motion'
import { createStagger, reduceLargeMotion, revealVariants } from '../../animations'
import { Button } from '../ui/Button'
import { SectionLabel } from '../ui/SectionLabel'

export function FinalInvitation() {
  const reduceMotion = useReducedMotion()
  const child = reduceMotion ? reduceLargeMotion : revealVariants

  return (
    <motion.section
      className="invitation section-gutter"
      aria-labelledby="invitation-title"
      variants={createStagger({ staggerChildren: 0.1 })}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <motion.div variants={child}><SectionLabel>Your bar awaits</SectionLabel></motion.div>
      <motion.h2 variants={child} id="invitation-title">Something remarkable <br />is already <em>within reach.</em></motion.h2>
      <motion.p variants={child}>Begin with an ingredient. End with a new favorite.</motion.p>
      <motion.div variants={child}><Button to="/builder" variant="outline">Start mixing</Button></motion.div>
    </motion.section>
  )
}
