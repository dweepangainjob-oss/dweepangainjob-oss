import { Terminal } from '@/components/terminal/terminal'

export default function Home() {
  return (
    <main className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-term-page md:p-6 lg:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(60% 50% at 20% 0%, color-mix(in oklab, var(--term-accent) 18%, transparent), transparent 70%), radial-gradient(50% 40% at 90% 100%, color-mix(in oklab, var(--term-accent2) 14%, transparent), transparent 70%)',
        }}
      />
      <div className="relative h-full w-full max-w-6xl">
        <Terminal />
      </div>
    </main>
  )
}
