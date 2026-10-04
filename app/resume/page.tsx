import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { portfolio } from '@/lib/portfolio-config'
import { PrintButton } from '@/components/resume/print-button'

export const metadata: Metadata = {
  title: `Resume — ${portfolio.name}`,
  description: `Resume of ${portfolio.name}, ${portfolio.role}.`,
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-7 break-inside-avoid-page">
      <h2 className="border-b border-neutral-200 pb-1 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  )
}

export default function ResumePage() {
  const p = portfolio
  return (
    <div className="min-h-dvh bg-neutral-100 py-8 text-neutral-900 print:bg-white print:py-0">
      <div className="mx-auto mb-4 flex max-w-[52rem] items-center justify-between px-4 print:hidden">
        <Link href="/" className="font-mono text-sm text-neutral-600 hover:text-neutral-900">
          {'← back to terminal'}
        </Link>
        <PrintButton />
      </div>

      <main className="mx-auto max-w-[52rem] bg-white px-8 py-10 shadow-sm ring-1 ring-neutral-200 md:px-14 md:py-12 print:max-w-none print:p-0 print:shadow-none print:ring-0">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">{p.name}</h1>
          <p className="mt-1 text-lg text-neutral-700">{p.role}</p>
          <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-neutral-600">
            <span>{p.location}</span>
            <span aria-hidden>{'·'}</span>
            <a href={`mailto:${p.email}`} className="underline-offset-2 hover:underline">
              {p.email}
            </a>
            {p.phone && (
              <>
                <span aria-hidden>{'·'}</span>
                <span>{p.phone}</span>
              </>
            )}
            <span aria-hidden>{'·'}</span>
            <a href={p.website} className="underline-offset-2 hover:underline">
              {p.website.replace(/^https?:\/\//, '')}
            </a>
            {p.socials.map((s) => (
              <span key={s.label} className="contents">
                <span aria-hidden>{'·'}</span>
                <a href={s.url} className="underline-offset-2 hover:underline">
                  {s.url.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </span>
            ))}
          </p>
        </header>

        <Section title="Summary">
          <p className="text-pretty text-[15px] leading-relaxed text-neutral-800">{p.summary.join(' ')}</p>
        </Section>

        <Section title="Experience">
          <div className="flex flex-col gap-5">
            {p.experience.map((job) => (
              <article key={job.company + job.period} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold">
                    {job.role}
                    <span className="font-normal text-neutral-600">{`, ${job.company}`}</span>
                  </h3>
                  <span className="font-mono text-xs text-neutral-500">{job.period}</span>
                </div>
                <p className="text-sm text-neutral-500">{job.location}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-neutral-800 marker:text-neutral-400">
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <p className="mt-1.5 font-mono text-xs text-neutral-500">{job.stack.join(' · ')}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section title="Selected Projects">
          <div className="flex flex-col gap-3">
            {p.projects.map((proj) => (
              <article key={proj.slug} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold">{proj.name}</h3>
                  <span className="font-mono text-xs text-neutral-500">{proj.period}</span>
                </div>
                <p className="font-mono text-xs text-neutral-500">{proj.stack.join(' · ')}</p>
                {proj.repo && (
                  <a href={proj.repo} className="text-xs text-neutral-600 underline-offset-2 hover:underline">
                    {proj.repo.replace(/^https?:\/\//, '')}
                  </a>
                )}
                {proj.highlights && (
                  <ul className="mt-1 list-disc space-y-0.5 pl-5 text-[15px] leading-relaxed text-neutral-800 marker:text-neutral-400">
                    {proj.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </Section>

        <Section title="Skills">
          <dl className="grid gap-x-6 gap-y-1.5 text-[15px] sm:grid-cols-[9rem_1fr]">
            {p.skills.map((group) => (
              <div key={group.category} className="contents">
                <dt className="font-medium text-neutral-600">{group.category}</dt>
                <dd className="text-neutral-800">{group.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Education">
          {p.education.map((edu) => (
            <div key={edu.school} className="mb-2">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold">
                  {edu.degree}
                  <span className="font-normal text-neutral-600">{`, ${edu.school}`}</span>
                </h3>
                <span className="font-mono text-xs text-neutral-500">{edu.period}</span>
              </div>
              {edu.notes && <p className="text-[15px] text-neutral-700">{edu.notes}</p>}
            </div>
          ))}
          {p.certifications.length > 0 && (
            <p className="mt-2 text-[15px] text-neutral-700">
              <span className="font-medium text-neutral-600">{'Certifications: '}</span>
              {p.certifications.join(' · ')}
            </p>
          )}
        </Section>
      </main>
    </div>
  )
}
