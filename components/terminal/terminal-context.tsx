'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { withBasePath } from '@/lib/site-path'
import { cn } from '@/lib/utils'

type TerminalContextValue = { run: (command: string) => void }

export const TerminalContext = createContext<TerminalContextValue | null>(null)

export function useTerminal() {
  const ctx = useContext(TerminalContext)
  if (!ctx) throw new Error('useTerminal must be used inside <TerminalContext>')
  return ctx
}

export function Cmd({
  command,
  children,
  className,
}: {
  command: string
  children?: ReactNode
  className?: string
}) {
  const { run } = useTerminal()
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        run(command)
      }}
      className={cn(
        'cursor-pointer rounded-sm text-term-accent underline decoration-term-accent/40 decoration-dotted underline-offset-4 transition-colors hover:text-term-accent2 hover:decoration-term-accent2 focus-visible:outline focus-visible:outline-1 focus-visible:outline-term-accent',
        className,
      )}
    >
      {children ?? command}
    </button>
  )
}

export function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith('http')
  return (
    <a
      href={href.startsWith('/') ? withBasePath(href) : href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={(e) => e.stopPropagation()}
      className="text-term-accent underline decoration-term-accent/40 underline-offset-4 transition-colors hover:text-term-accent2 hover:decoration-term-accent2"
    >
      {children}
    </a>
  )
}
