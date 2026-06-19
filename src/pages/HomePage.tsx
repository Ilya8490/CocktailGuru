import { CraftProcess } from '../components/home/CraftProcess'
import { FeaturedRitual } from '../components/home/FeaturedRitual'
import { FinalInvitation } from '../components/home/FinalInvitation'
import { Hero } from '../components/home/Hero'
import { PageTransition } from '../components/ui/PageTransition'

export function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <CraftProcess />
      <FeaturedRitual />
      <FinalInvitation />
    </PageTransition>
  )
}
