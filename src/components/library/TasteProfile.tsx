import type { TasteAxis, TasteProfile as TasteProfileData } from '../../types'

const axes: TasteAxis[] = ['sweet', 'sour', 'bitter', 'strong', 'fruity', 'spicy']

export function TasteProfile({ taste }: { taste: TasteProfileData }) {
  return (
    <section className="taste-profile" aria-labelledby="taste-profile-title">
      <p className="detail-kicker">Palate</p>
      <h2 id="taste-profile-title">Taste profile</h2>
      <dl>
        {axes.map((axis) => (
          <div key={axis}>
            <dt>{axis}</dt>
            <dd><meter min="0" max="5" value={taste[axis]}>{taste[axis]} of 5</meter></dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
