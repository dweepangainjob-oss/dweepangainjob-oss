'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { portfolio } from '@/lib/portfolio-config'
import { withBasePath } from '@/lib/site-path'
import { MODE_STORAGE_KEY, isPortfolioMode, type PortfolioMode } from '@/lib/portfolio-modes'
import { THEME_STORAGE_KEY, isThemeName, type ThemeName } from '@/lib/themes'
import { autocomplete, executeCommand, type CommandContext } from './commands'
import { Welcome } from './sections'
import { TerminalContext } from './terminal-context'
import { TitleBar } from './title-bar'
import { QuickActions } from './quick-actions'
import { StatusBar } from './status-bar'

type Entry = { id: number; command: string | null; output: ReactNode }

const BOOT_LINES = [
  'initializing portfolio-sh v1.0.0',
  'mounting /home/' + portfolio.username,
  'loading experience.db',
  'compiling projects',
  'establishing secure connection',
  'ready.',
]

function Prompt() {
  return (
    <span className="shrink-0 whitespace-pre select-none">
      <span className="text-term-green">{portfolio.username}</span>
      <span className="text-term-muted">{'@'}</span>
      <span className="text-term-accent2">{portfolio.hostname}</span>
      <span className="text-term-muted">{':'}</span>
      <span className="text-term-accent">{'~'}</span>
      <span className="text-term-fg">{'$ '}</span>
    </span>
  )
}

function BootLog({ count }: { count: number }) {
  return (
    <div className="text-sm text-term-muted" aria-hidden>
      {BOOT_LINES.slice(0, count).map((line) => (
        <p key={line}>
          <span className="text-term-green">{'[  OK  ]'}</span> {line}
        </p>
      ))}
    </div>
  )
}

function isFinePointer() {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
}

export function Terminal() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [bootCount, setBootCount] = useState(0)
  const [booted, setBooted] = useState(false)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [theme, setThemeState] = useState<ThemeName>(portfolio.defaultTheme)
  const [mode, setModeState] = useState<PortfolioMode>('default')

  const idRef = useRef(0)
  const bootedRef = useRef(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const lastEntryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored && isThemeName(stored)) setThemeState(stored)
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem(MODE_STORAGE_KEY)
    if (stored && isPortfolioMode(stored)) setModeState(stored)
  }, [])

  const setTheme = useCallback((next: ThemeName) => {
    setThemeState(next)
    document.documentElement.dataset.theme = next
    localStorage.setItem(THEME_STORAGE_KEY, next)
  }, [])

  const setMode = useCallback((next: PortfolioMode) => {
    setModeState(next)
    localStorage.setItem(MODE_STORAGE_KEY, next)
  }, [])

  const finishBoot = useCallback(() => {
    if (bootedRef.current) return
    bootedRef.current = true
    setBooted(true)
    setEntries([
      { id: idRef.current++, command: null, output: <BootLog count={BOOT_LINES.length} /> },
      { id: idRef.current++, command: null, output: <Welcome /> },
    ])
  }, [])

  useEffect(() => {
    if (booted && isFinePointer()) inputRef.current?.focus()
  }, [booted])

  useEffect(() => {
    if (booted) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || bootCount >= BOOT_LINES.length) {
      const t = setTimeout(finishBoot, reduced ? 0 : 220)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setBootCount((c) => c + 1), 140)
    return () => clearTimeout(t)
  }, [bootCount, booted, finishBoot])

  useEffect(() => {
    if (!booted) return
    const scroller = scrollRef.current
    const last = lastEntryRef.current
    if (!scroller || !last) return
    if (entries.length <= 2) {
      scroller.scrollTop = 0
    } else {
      scroller.scrollTo({ top: last.offsetTop - 16, behavior: 'smooth' })
    }
  }, [entries, booted])

  const openUrl = useCallback((url: string) => {
    if (url.startsWith('mailto:') || url.startsWith('tel:')) {
      window.location.href = url
    } else {
      window.open(url.startsWith('/') ? withBasePath(url) : url, '_blank', 'noopener,noreferrer')
    }
  }, [])

  const ctx: CommandContext = useMemo(
    () => ({ theme, setTheme, mode, setMode, history, openUrl }),
    [theme, setTheme, mode, setMode, history, openUrl],
  )

  const run = useCallback(
    (raw: string) => {
      const command = raw.trim()
      if (!booted) finishBoot()
      setSuggestions([])
      setHistoryIndex(null)
      setInput('')
      if (!command) {
        setEntries((prev) => [...prev, { id: idRef.current++, command: '', output: null }])
        return
      }
      const nextHistory = [...history, command]
      setHistory(nextHistory)
      const result = executeCommand(command, { ...ctx, history: nextHistory })
      if (result.clear) {
        setEntries([])
      } else {
        setEntries((prev) => [...prev, { id: idRef.current++, command, output: result.output }])
      }
      if (isFinePointer()) inputRef.current?.focus()
    },
    [booted, finishBoot, history, ctx],
  )

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return

    if (e.key === 'Enter') {
      e.preventDefault()
      run(input)
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const { value, options } = autocomplete(input)
      setInput(value)
      setSuggestions(options.length > 1 ? options : [])
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const next = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(next)
      setInput(history[next])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === null) return
      const next = historyIndex + 1
      if (next >= history.length) {
        setHistoryIndex(null)
        setInput('')
      } else {
        setHistoryIndex(next)
        setInput(history[next])
      }
    } else if (e.key.toLowerCase() === 'l' && e.ctrlKey) {
      e.preventDefault()
      setEntries([])
    } else if (e.key.toLowerCase() === 'c' && e.ctrlKey && !window.getSelection()?.toString()) {
      e.preventDefault()
      setEntries((prev) => [...prev, { id: idRef.current++, command: `${input}^C`, output: null }])
      setInput('')
    }
  }

  const focusInput = () => {
    if (window.getSelection()?.toString()) return
    if (!booted) finishBoot()
    inputRef.current?.focus()
  }

  return (
    <TerminalContext.Provider value={{ run }}>
      <div className="flex h-full w-full flex-col overflow-hidden bg-term-bg font-mono text-sm text-term-fg shadow-2xl shadow-black/40 ring-1 ring-term-border md:rounded-xl md:text-[15px]">
        <TitleBar />
        <QuickActions />

        <div
          ref={scrollRef}
          onClick={focusInput}
          className="term-scroll relative flex-1 overflow-y-auto px-4 py-5 md:px-8 md:py-6"
          role="log"
          aria-live="polite"
          aria-label="Terminal output"
        >
          {!booted && <BootLog count={bootCount} />}

          <div className="flex flex-col gap-5">
            {entries.map((entry, i) => (
              <div
                key={entry.id}
                ref={i === entries.length - 1 ? lastEntryRef : undefined}
                className="animate-in fade-in-0 slide-in-from-bottom-1 duration-300"
              >
                {entry.command !== null && (
                  <p className="mb-2 flex flex-wrap break-all">
                    <Prompt />
                    <span className="text-term-fg">{entry.command}</span>
                  </p>
                )}
                {entry.output}
              </div>
            ))}
          </div>

          {booted && (
            <div className="mt-5">
              <label className="flex items-center">
                <Prompt />
                <span className="sr-only">Enter a command</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value)
                    setSuggestions([])
                  }}
                  onKeyDown={onKeyDown}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  enterKeyHint="go"
                  placeholder={entries.length <= 2 ? 'type a command or try "help"' : undefined}
                  className="min-w-0 flex-1 bg-transparent text-base text-term-fg caret-term-accent outline-none placeholder:text-term-muted/60 md:text-[15px]"
                />
              </label>
              {suggestions.length > 0 && (
                <p className="mt-1 flex flex-wrap gap-x-4 text-term-muted">
                  {suggestions.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </p>
              )}
            </div>
          )}
        </div>

        <StatusBar theme={theme} mode={mode} />
      </div>
    </TerminalContext.Provider>
  )
}
