'use client'

import { useTerminal } from './terminal-context'

const ACTIONS = ['about', 'experience', 'projects', 'skills', 'education', 'contact', 'theme', 'mode', 'help']

export function QuickActions() {
  const { run } = useTerminal()
  return (
    <nav
      aria-label="Quick commands"
      className="term-scroll flex shrink-0 gap-1 overflow-x-auto border-b border-term-border bg-term-surface/60 px-3 py-2"
    >
      {ACTIONS.map((action) => (
        <button
          key={action}
          type="button"
          onClick={() => run(action)}
          className="group flex shrink-0 items-center gap-1.5 rounded px-2.5 py-1 text-xs text-term-muted transition-colors hover:bg-term-bg hover:text-term-fg focus-visible:outline focus-visible:outline-1 focus-visible:outline-term-accent"
        >
          <span className="text-term-accent/70 group-hover:text-term-accent" aria-hidden>
            {'›'}
          </span>
          {action}
        </button>
      ))}
    </nav>
  )
}
