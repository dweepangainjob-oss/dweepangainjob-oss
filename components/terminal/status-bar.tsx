'use client'

import { useEffect, useState } from 'react'
import { portfolio } from '@/lib/portfolio-config'
import type { PortfolioMode } from '@/lib/portfolio-modes'
import type { ThemeName } from '@/lib/themes'

function Clock() {
  const [time, setTime] = useState<string | null>(null)
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])
  return <span className="tabular-nums">{time ?? '--:--'}</span>
}

export function StatusBar({ theme, mode }: { theme: ThemeName; mode: PortfolioMode }) {
  const { availability, socials, email } = portfolio
  return (
    <footer className="flex h-8 shrink-0 items-center justify-between gap-3 border-t border-term-border bg-term-surface px-3 text-xs text-term-muted">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`flex shrink-0 items-center gap-1.5 rounded-sm px-1.5 py-0.5 font-medium ${
            availability.open ? 'bg-term-green/15 text-term-green' : 'bg-term-border text-term-muted'
          }`}
        >
          <span
            className={`size-1.5 rounded-full ${availability.open ? 'animate-pulse bg-term-green' : 'bg-term-muted'}`}
            aria-hidden
          />
          {availability.open ? 'open to work' : 'not looking'}
        </span>
        <span className="hidden truncate sm:inline">{`theme: ${theme}`}</span>
        <span className="hidden truncate sm:inline">{`mode: ${mode}`}</span>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <a href={`mailto:${email}`} className="transition-colors hover:text-term-accent">
          {'email'}
        </a>
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden transition-colors hover:text-term-accent sm:inline"
          >
            {s.label.toLowerCase()}
          </a>
        ))}
        <span aria-hidden className="text-term-border">
          {'|'}
        </span>
        <Clock />
      </div>
    </footer>
  )
}
