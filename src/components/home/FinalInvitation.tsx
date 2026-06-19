import { Button } from '../ui/Button'
import { SectionLabel } from '../ui/SectionLabel'

export function FinalInvitation() {
  return (
    <section className="invitation section-gutter" aria-labelledby="invitation-title">
      <SectionLabel>Your bar awaits</SectionLabel>
      <h2 id="invitation-title">Something remarkable <br />is already <em>within reach.</em></h2>
      <p>Begin with an ingredient. End with a new favorite.</p>
      <Button to="/builder" variant="outline">Start mixing</Button>
    </section>
  )
}
