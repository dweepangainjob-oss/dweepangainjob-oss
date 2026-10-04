import type { ReactNode } from 'react'
import Image from 'next/image'
import { portfolio } from '@/lib/portfolio-config'
import { getModeMeta, getProjectsForMode, getSkillsForMode, modeNames, type PortfolioMode } from '@/lib/portfolio-modes'
import { themes, type ThemeName } from '@/lib/themes'
import { Cmd, ExtLink } from './terminal-context'
import { AsciiPortrait } from './ascii-portrait'

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="font-semibold text-term-accent2">{'##'}</span>
      <h2 className="font-semibold uppercase tracking-widest text-term-fg">{children}</h2>
      <span aria-hidden className="h-px flex-1 bg-term-border" />
    </div>
  )
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded border border-term-border bg-term-surface px-1.5 py-0.5 text-xs text-term-fg/90">
      {children}
    </span>
  )
}

function NextHint({ items }: { items: string[] }) {
  return (
    <p className="mt-4 text-term-muted">
      {'→ next: '}
      {items.map((item, i) => (
        <span key={item}>
          <Cmd command={item} />
          {i < items.length - 1 && <span className="text-term-muted">{' · '}</span>}
        </span>
      ))}
    </p>
  )
}

const ASCII_LOGO = String.raw`
   .-------------.
   |  .-------.  |
   |  | >_    |  |
   |  |       |  |
   |  '-------'  |
   '-----. .-----'
      ___| |___
     '---------'`

export function Welcome() {
  const p = portfolio
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
      <div className="shrink-0">
        <AsciiPortrait />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-term-muted">{'// welcome to my corner of the internet'}</p>
        <h1 className="mt-1 text-balance text-3xl font-bold leading-tight text-term-fg term-glow md:text-5xl">
          {"Hi, I'm "}
          <span className="text-term-accent">{p.name}</span>
        </h1>
        <p className="mt-2 text-lg text-term-accent2">{p.role}</p>
        <p className="mt-1 max-w-xl text-pretty text-term-fg/80">{p.tagline}</p>

        <dl className="mt-4 grid max-w-xl grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
          <dt className="text-term-yellow">location</dt>
          <dd className="text-term-fg/90">{p.location}</dd>
          <dt className="text-term-yellow">status</dt>
          <dd className={p.availability.open ? 'text-term-green' : 'text-term-muted'}>
            {p.availability.open ? '● ' : '○ '}
            {p.availability.message}
          </dd>
          <dt className="text-term-yellow">contact</dt>
          <dd>
            <ExtLink href={`mailto:${p.email}`}>{p.email}</ExtLink>
          </dd>
        </dl>

        <p className="mt-5 text-term-fg/80">
          {'Type '}
          <Cmd command="help" />
          {' to see all commands, or click a command to run it. Recruiter in a hurry? Try '}
          <Cmd command="resume" />
          {'.'}
        </p>
      </div>
    </div>
  )
}

export function About() {
  const p = portfolio
  return (
    <section>
      <SectionTitle>About</SectionTitle>
      <div className="flex max-w-3xl flex-col gap-3 text-pretty leading-relaxed text-term-fg/90">
        {p.summary.map((para) => (
          <p key={para.slice(0, 24)}>{para}</p>
        ))}
      </div>
      <p className="mt-4 text-term-muted">
        {'interests: '}
        <span className="text-term-fg/80">{p.interests.join(' · ')}</span>
      </p>
      <NextHint items={['experience', 'projects', 'skills']} />
    </section>
  )
}

export function ExperienceSection() {
  return (
    <section>
      <SectionTitle>Experience</SectionTitle>
      <ol className="flex flex-col gap-6">
        {portfolio.experience.map((job) => (
          <li key={job.company + job.period} className="border-l-2 border-term-border pl-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-semibold text-term-fg">
                {job.role}
                <span className="text-term-muted">{' @ '}</span>
                <span className="text-term-accent">
                  {job.url ? <ExtLink href={job.url}>{job.company}</ExtLink> : job.company}
                </span>
              </h3>
              <span className="text-sm text-term-yellow">{job.period}</span>
            </div>
            <p className="text-sm text-term-muted">{job.location}</p>
            <ul className="mt-2 flex flex-col gap-1">
              {job.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-term-fg/90">
                  <span aria-hidden className="text-term-green">
                    {'>'}
                  </span>
                  <span className="text-pretty">{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {job.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </li>
        ))}
      </ol>
      <NextHint items={['projects', 'skills', 'resume']} />
    </section>
  )
}

export function ProjectsSection({ mode }: { mode: PortfolioMode }) {
  const projects = getProjectsForMode(portfolio.projects, mode)
  return (
    <section>
      <SectionTitle>Projects</SectionTitle>
      <div className="grid gap-3 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="flex flex-col rounded-md border border-term-border bg-term-surface/60 p-4 transition-colors hover:border-term-accent/60"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-term-accent">
                <span className="text-term-muted">{'./'}</span>
                {project.name}
              </h3>
              <span className="text-xs text-term-muted">{project.period}</span>
            </div>
            <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-term-fg/90">
              {project.description}
            </p>
            {project.highlights && (
              <ul className="mt-2 flex flex-col gap-0.5 text-sm">
                {project.highlights.map((h) => (
                  <li key={h} className="text-term-green">
                    {'+ '}
                    {h}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              {project.url && <ExtLink href={project.url}>{'[live]'}</ExtLink>}
              {project.repo && <ExtLink href={project.repo}>{'[source]'}</ExtLink>}
            </div>
          </article>
        ))}
      </div>
      <p className="mt-4 text-term-muted">
        {'tip: run '}
        <span className="text-term-fg">{'open <slug>'}</span>
        {' to launch a project, e.g. '}
        <Cmd command={`open ${projects[0]?.slug ?? ''}`} />
      </p>
    </section>
  )
}

export function SkillsSection({ mode }: { mode: PortfolioMode }) {
  const skillGroups = getSkillsForMode(portfolio.skills, mode)
  return (
    <section>
      <SectionTitle>Skills</SectionTitle>
      <div className="flex flex-col gap-3">
        {skillGroups.map((group) => (
          <div key={group.category} className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-4">
            <span className="text-term-yellow">{group.category}</span>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
      {portfolio.certifications.length > 0 && (
        <div className="mt-4">
          <span className="text-term-muted">{'certifications:'}</span>
          <ul className="mt-1">
            {portfolio.certifications.map((c) => (
              <li key={c} className="text-term-fg/90">
                <span className="text-term-green">{'[x] '}</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}
      <NextHint items={['experience', 'education', 'contact']} />
    </section>
  )
}

export function EducationSection() {
  return (
    <section>
      <SectionTitle>Education</SectionTitle>
      <ul className="flex flex-col gap-4">
        {portfolio.education.map((edu) => (
          <li key={edu.school} className="border-l-2 border-term-border pl-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-semibold text-term-fg">{edu.degree}</h3>
              <span className="text-sm text-term-yellow">{edu.period}</span>
            </div>
            <p className="text-term-accent">{edu.school}</p>
            {edu.notes && <p className="mt-1 text-pretty text-term-fg/80">{edu.notes}</p>}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function ContactSection() {
  const p = portfolio
  return (
    <section>
      <SectionTitle>Contact</SectionTitle>
      {p.availability.open && (
        <p className="mb-3 text-term-green">
          {'● '}
          {p.availability.message}
        </p>
      )}
      <dl className="grid grid-cols-[6rem_1fr] gap-x-4 gap-y-1.5">
        <dt className="text-term-yellow">email</dt>
        <dd>
          <ExtLink href={`mailto:${p.email}`}>{p.email}</ExtLink>
        </dd>
        {p.phone && (
          <>
            <dt className="text-term-yellow">phone</dt>
            <dd>
              <ExtLink href={`tel:${p.phone}`}>{p.phone}</ExtLink>
            </dd>
          </>
        )}
        <dt className="text-term-yellow">website</dt>
        <dd>
          <ExtLink href={p.website}>{p.website.replace(/^https?:\/\//, '')}</ExtLink>
        </dd>
        {p.socials.map((s) => (
          <div key={s.label} className="contents">
            <dt className="text-term-yellow">{s.label.toLowerCase()}</dt>
            <dd>
              <ExtLink href={s.url}>{s.handle}</ExtLink>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-term-muted">
        {'Fastest way to reach me: '}
        <Cmd command="email" />
        {' — I usually reply within 24 hours.'}
      </p>
    </section>
  )
}

export type HelpEntry = { name: string; description: string; usage?: string; aliases?: string[] }

export function Help({ entries }: { entries: HelpEntry[] }) {
  return (
    <section>
      <SectionTitle>Available commands</SectionTitle>
      <ul className="grid gap-x-8 gap-y-1 md:grid-cols-2">
        {entries.map((entry) => (
          <li key={entry.name} className="grid grid-cols-[7.5rem_1fr] gap-3">
            <Cmd command={entry.name} className="justify-self-start" />
            <span className="text-term-fg/80">
              {entry.description}
              {entry.aliases && entry.aliases.length > 0 && (
                <span className="text-term-muted">{` (${entry.aliases.join(', ')})`}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-col gap-0.5 text-sm text-term-muted">
        <p>
          <kbd className="text-term-fg">Tab</kbd>
          {' autocomplete · '}
          <kbd className="text-term-fg">↑ ↓</kbd>
          {' history · '}
          <kbd className="text-term-fg">Ctrl+L</kbd>
          {' clear'}
        </p>
      </div>
    </section>
  )
}

export function ThemeList({ current }: { current: ThemeName }) {
  return (
    <section>
      <SectionTitle>Themes</SectionTitle>
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {themes.map((t) => (
          <li key={t.name}>
            <div
              data-theme={t.name}
              className="flex items-center justify-between gap-3 rounded-md border border-term-border bg-term-bg px-3 py-2"
            >
              <div className="flex flex-col">
                <Cmd command={`theme ${t.name}`} className="justify-self-start text-left">
                  {t.name}
                </Cmd>
                <span className="text-xs text-term-muted">{t.label}</span>
              </div>
              <div className="flex gap-1" aria-hidden>
                <span className="size-3 rounded-full bg-term-accent" />
                <span className="size-3 rounded-full bg-term-accent2" />
                <span className="size-3 rounded-full bg-term-green" />
                <span className="size-3 rounded-full bg-term-yellow" />
                <span className="size-3 rounded-full bg-term-red" />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-term-muted">
        {'current: '}
        <span className="text-term-fg">{current}</span>
        {' · usage: '}
        <span className="text-term-fg">{'theme <name>'}</span>
      </p>
    </section>
  )
}

export function ModeList({ current }: { current: PortfolioMode }) {
  return (
    <section>
      <SectionTitle>Modes</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {modeNames.map((mode) => {
          const meta = getModeMeta(mode)
          const active = mode === current
          return (
            <span
              key={mode}
              className={`rounded border px-2 py-1 text-xs ${
                active ? 'border-term-accent bg-term-accent/10 text-term-accent' : 'border-term-border text-term-fg/80'
              }`}
            >
              <Cmd command={`mode ${mode}`}>{meta.label}</Cmd>
              {active && <span className="ml-1 text-term-green">{'[active]'}</span>}
            </span>
          )
        })}
      </div>
      <p className="mt-3 text-term-muted">
        {'current: '}
        <span className="text-term-fg">{current}</span>
        {' · '}
        <span className="text-term-fg">{getModeMeta(current).summary}</span>
      </p>
    </section>
  )
}

export function Neofetch({ theme, mode }: { theme: ThemeName; mode: PortfolioMode }) {
  const p = portfolio
  const rows: [string, string][] = [
    ['name', p.name],
    ['role', p.role],
    ['location', p.location],
    ['experience', `${p.experience.length} roles`],
    ['projects', `${p.projects.length} featured`],
    ['top stack', p.skills.flatMap((s) => s.items).slice(0, 4).join(', ')],
    ['theme', theme],
    ['mode', mode],
    ['shell', 'portfolio-sh 1.0'],
  ]
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
      <pre aria-hidden className="shrink-0 text-xs leading-tight text-term-accent term-glow">
        {ASCII_LOGO}
      </pre>
      <div>
        <p className="font-semibold">
          <span className="text-term-accent">{p.username}</span>
          <span className="text-term-fg">{'@'}</span>
          <span className="text-term-accent2">{p.hostname}</span>
        </p>
        <p aria-hidden className="text-term-muted">
          {'-'.repeat(p.username.length + p.hostname.length + 1)}
        </p>
        <dl className="grid grid-cols-[auto_1fr] gap-x-3">
          {rows.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-term-yellow">{k}</dt>
              <dd className="text-term-fg/90">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-3 flex gap-1" aria-hidden>
          {['bg-term-red', 'bg-term-green', 'bg-term-yellow', 'bg-term-accent', 'bg-term-accent2', 'bg-term-fg'].map(
            (c) => (
              <span key={c} className={`h-3 w-6 ${c}`} />
            ),
          )}
        </div>
      </div>
    </div>
  )
}
