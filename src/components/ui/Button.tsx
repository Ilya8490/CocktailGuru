import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ButtonProps {
  children: ReactNode
  to: string
  variant?: 'gold' | 'outline'
}

export function Button({ children, to, variant = 'gold' }: ButtonProps) {
  return <Link className={`button button--${variant}`} to={to}>{children}<span aria-hidden="true">↗</span></Link>
}
