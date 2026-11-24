import Image from 'next/image'
import { portfolio } from '@/lib/portfolio-config'
import { withBasePath } from '@/lib/site-path'

export function TitleBar() {
  return (
    <header className="flex h-10 shrink-0 items-center gap-4 border-b border-term-border bg-term-surface px-4">
      <div className="flex gap-2" aria-hidden>
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
      </div>
      <Image src={withBasePath('/dweepan-logo.svg')} alt="" width={24} height={24} className="size-6 rounded" />
      <p className="flex-1 truncate text-center text-xs text-term-muted">
        {`${portfolio.username}@${portfolio.hostname}: ~ — ${portfolio.name}`}
      </p>
      <a
        href={withBasePath('/resume/')}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded border border-term-border px-2 py-0.5 text-xs text-term-fg transition-colors hover:border-term-accent hover:text-term-accent"
      >
        {'resume ↗'}
      </a>
    </header>
  )
}
