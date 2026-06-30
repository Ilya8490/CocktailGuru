import { motion, useReducedMotion } from 'framer-motion'
import { createStagger, reduceLargeMotion, revealVariants, transitions } from '../../animations'
import type { TasteAxis, TasteProfile as TasteProfileData } from '../../types'

const axes: TasteAxis[] = ['sweet', 'sour', 'bitter', 'strong', 'fruity', 'spicy']
const axisLabels: Record<TasteAxis, string> = {
  sweet: 'Sweetness',
  sour: 'Acidity',
  bitter: 'Bitterness',
  strong: 'Alcohol strength',
  fruity: 'Fruit',
  spicy: 'Body',
}

export function TasteProfile({ taste }: { taste: TasteProfileData }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      className="taste-profile"
      aria-labelledby="taste-profile-title"
      variants={createStagger({ staggerChildren: 0.07 })}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.p variants={reduceMotion ? reduceLargeMotion : revealVariants} className="detail-kicker">Palate</motion.p>
      <motion.h2 variants={reduceMotion ? reduceLargeMotion : revealVariants} id="taste-profile-title">Taste profile</motion.h2>
      <motion.dl variants={createStagger({ staggerChildren: 0.05 })}>
        {axes.map((axis) => (
          <motion.div variants={reduceMotion ? reduceLargeMotion : revealVariants} key={axis}>
            <dt>{axisLabels[axis]}</dt>
            <dd>
              <span className="taste-profile__track" role="meter" aria-valuemin={0} aria-valuemax={5} aria-valuenow={taste[axis]} aria-label={`${axisLabels[axis]} ${taste[axis]} of 5`}>
                <motion.span
                  className={`taste-profile__fill taste-profile__fill--${axis}`}
                  initial={false}
                  animate={{ scaleX: taste[axis] / 5 }}
                  transition={reduceMotion ? { duration: 0.01 } : transitions.slow}
                />
              </span>
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </motion.section>
  )
}
