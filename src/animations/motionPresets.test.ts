import { describe, expect, it } from 'vitest'
import { createStagger, durations, easings, getPageTransition, reducedMotionVariants } from './motionPresets'

describe('motion presets', () => {
  it('exposes the luxury timing scale and easing curve', () => {
    expect(durations).toEqual({
      fast: 0.18,
      medium: 0.3,
      slow: 0.5,
      hero: 0.8,
    })
    expect(easings.luxury).toEqual([0.22, 1, 0.36, 1])
  })

  it('creates consistent stagger transitions', () => {
    expect(createStagger()).toEqual({
      hidden: {},
      visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
    })
    expect(createStagger({ staggerChildren: 0.14, delayChildren: 0.2 })).toEqual({
      hidden: {},
      visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
    })
  })

  it('keeps page motion to opacity only when reduced motion is requested', () => {
    expect(getPageTransition(true)).toEqual(reducedMotionVariants.fadeOnly)
    expect(getPageTransition(false).enter).toMatchObject({ opacity: 1, y: 0 })
  })
})
