import type { ReactNode } from 'react'
import { portfolio } from '@/lib/portfolio-config'
import { parseCommandInput } from '@/lib/command-parser'
import { getModeMeta, isPortfolioMode, modeNames, type PortfolioMode } from '@/lib/portfolio-modes'
import { isThemeName, themeNames, type ThemeName } from '@/lib/themes'
import {
  About,
  ContactSection,
  EducationSection,
  ExperienceSection,
  Help,
  ModeList,
  Neofetch,
  ProjectsSection,
  SkillsSection,
  ThemeList,
  Welcome,
} from './sections'
import { Cmd, ExtLink } from './terminal-context'

export type CommandContext = {
  theme: ThemeName
  setTheme: (theme: ThemeName) => void
  mode: PortfolioMode
  setMode: (mode: PortfolioMode) => void
  history: string[]
  openUrl: (url: string) => void
}

export type CommandResult = { output?: ReactNode; clear?: boolean }

type Command = {
  name: string
  description: string
  aliases?: string[]
  hidden?: boolean
  run: (args: string[], ctx: CommandContext) => CommandResult
}

function Line({ children, tone = 'fg' }: { children: ReactNode; tone?: 'fg' | 'muted' | 'error' | 'success' }) {
  const color = {
    fg: 'text-term-fg/90',
    muted: 'text-term-muted',
    error: 'text-term-red',
    success: 'text-term-green',
  }[tone]
  return <p className={`whitespace-pre-wrap ${color}`}>{children}</p>
}

const commands: Command[] = [
  {
    name: 'mode',
    description: 'Switch the portfolio display mode',
    aliases: ['view'],
    run: (args, ctx) => {
      const requested = args[0]?.toLowerCase()
      if (!requested) return { output: <ModeList current={ctx.mode} /> }

      if (!isPortfolioMode(requested)) {
        return {
          output: (
            <Line tone="error">
              {`mode: unknown mode "${requested}". Try `}
              <Cmd command="mode" />
              {' to see options.'}
            </Line>
          ),
        }
      }

      ctx.setMode(requested)
      const meta = getModeMeta(requested)
      return {
        output: <Line tone="success">{`Mode set to ${meta.label}. ${meta.summary}`}</Line>,
      }
    },
  },
  {
    name: 'help',
    description: 'List all available commands',
    aliases: ['?'],
    run: () => ({
      output: (
        <Help
          entries={commands
            .filter((c) => !c.hidden)
            .map(({ name, description, aliases }) => ({ name, description, aliases }))}
        />
      ),
    }),
  },
  {
    name: 'about',
    description: 'Who I am and what I do',
    aliases: ['whoami', 'bio'],
    run: () => ({ output: <About /> }),
  },
  {
    name: 'experience',
    description: 'Work history and impact',
    aliases: ['work', 'exp'],
    run: () => ({ output: <ExperienceSection /> }),
  },
  {
    name: 'projects',
    description: 'Things I have built',
    aliases: ['proj', 'work-samples'],
    run: (_args, ctx) => ({ output: <ProjectsSection mode={ctx.mode} /> }),
  },
  {
    name: 'skills',
    description: 'Languages, tools and practices',
    aliases: ['stack', 'tech'],
    run: (_args, ctx) => ({ output: <SkillsSection mode={ctx.mode} /> }),
  },
  {
    name: 'education',
    description: 'Degrees and learning',
    aliases: ['edu'],
    run: () => ({ output: <EducationSection /> }),
  },
  {
    name: 'contact',
    description: 'How to reach me',
    aliases: ['socials', 'links'],
    run: () => ({ output: <ContactSection /> }),
  },
  {
    name: 'resume',
    description: 'Open my printable resume',
    aliases: ['cv'],
    run: (_args, ctx) => {
      ctx.openUrl('/resume')
      return {
        output: (
          <Line tone="success">
            {'Opening resume in a new tab… If nothing happened, '}
            <ExtLink href="/resume">{'click here'}</ExtLink>
            {'.'}
          </Line>
        ),
      }
    },
  },
  {
    name: 'email',
    description: 'Send me an email',
    aliases: ['mail'],
    run: (_args, ctx) => {
      ctx.openUrl(`mailto:${portfolio.email}`)
      return {
        output: (
          <Line tone="success">
            {'Opening your mail client for '}
            <ExtLink href={`mailto:${portfolio.email}`}>{portfolio.email}</ExtLink>
            {'…'}
          </Line>
        ),
      }
    },
  },
  {
    name: 'open',
    description: 'Open a project by slug',
    run: (args, ctx) => {
      const slug = args[0]?.toLowerCase()
      const project = portfolio.projects.find((p) => p.slug === slug)
      if (!slug || !project) {
        return {
          output: (
            <Line tone={slug ? 'error' : 'muted'}>
              {slug ? `open: project "${slug}" not found. ` : 'usage: open <slug>. '}
              {'Available: '}
              {portfolio.projects.map((p, i) => (
                <span key={p.slug}>
                  <Cmd command={`open ${p.slug}`}>{p.slug}</Cmd>
                  {i < portfolio.projects.length - 1 ? ', ' : ''}
                </span>
              ))}
            </Line>
          ),
        }
      }
      const url = project.url ?? project.repo
      if (url) ctx.openUrl(url)
      return {
        output: url ? (
          <Line tone="success">
            {`Launching ${project.name} → `}
            <ExtLink href={url}>{url}</ExtLink>
          </Line>
        ) : (
          <Line tone="muted">{`${project.name} has no public link yet.`}</Line>
        ),
      }
    },
  },
  {
    name: 'theme',
    description: 'List or switch color themes',
    run: (args, ctx) => {
      const requested = args[0]?.toLowerCase()
      if (!requested) return { output: <ThemeList current={ctx.theme} /> }
      if (requested === 'random') {
        const options = themeNames.filter((t) => t !== ctx.theme)
        const pick = options[Math.floor(Math.random() * options.length)]
        ctx.setTheme(pick)
        return { output: <Line tone="success">{`Theme set to ${pick}.`}</Line> }
      }
      if (!isThemeName(requested)) {
        return {
          output: (
            <Line tone="error">
              {`theme: unknown theme "${requested}". Run `}
              <Cmd command="theme" />
              {' to see options.'}
            </Line>
          ),
        }
      }
      ctx.setTheme(requested)
      return { output: <Line tone="success">{`Theme set to ${requested}.`}</Line> }
    },
  },
  {
    name: 'neofetch',
    description: 'System info, portfolio edition',
    aliases: ['fetch'],
    run: (_args, ctx) => ({ output: <Neofetch theme={ctx.theme} mode={ctx.mode} /> }),
  },
  {
    name: 'welcome',
    description: 'Show the welcome screen again',
    aliases: ['banner', 'home'],
    run: () => ({ output: <Welcome /> }),
  },
  {
    name: 'history',
    description: 'Show previously run commands',
    run: (_args, ctx) => ({
      output:
        ctx.history.length === 0 ? (
          <Line tone="muted">{'No history yet.'}</Line>
        ) : (
          <ol className="text-term-fg/90">
            {ctx.history.map((h, i) => (
              <li key={`${h}-${i}`} className="flex gap-4">
                <span className="w-6 text-right text-term-muted">{i + 1}</span>
                <Cmd command={h}>{h}</Cmd>
              </li>
            ))}
          </ol>
        ),
    }),
  },
  {
    name: 'clear',
    description: 'Clear the terminal',
    aliases: ['cls'],
    run: () => ({ clear: true }),
  },
  {
    name: 'ls',
    description: 'List sections',
    hidden: true,
    run: () => ({
      output: (
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          {['about', 'experience', 'projects', 'skills', 'education', 'contact', 'resume'].map((s) => (
            <Cmd key={s} command={s} className="text-term-accent2">
              {s === 'resume' ? 'resume.pdf' : `${s}/`}
            </Cmd>
          ))}
        </div>
      ),
    }),
  },
  {
    name: 'pwd',
    description: 'Print working directory',
    hidden: true,
    run: () => ({ output: <Line>{`/home/${portfolio.username}/portfolio`}</Line> }),
  },
  {
    name: 'date',
    description: 'Current date and time',
    hidden: true,
    run: () => ({ output: <Line>{new Date().toString()}</Line> }),
  },
  {
    name: 'echo',
    description: 'Print text',
    hidden: true,
    run: (args) => ({ output: <Line>{args.join(' ')}</Line> }),
  },
  {
    name: 'sudo',
    description: 'Try it',
    hidden: true,
    run: (args) => {
      if (args.join(' ').toLowerCase().replace(/\s+/g, '-') === 'hire-me') {
        return {
          output: (
            <div className="flex flex-col gap-1">
              <Line tone="success">{'[sudo] permission granted. Excellent decision.'}</Line>
              <Line>
                {'Drafting offer letter… done. Send it to '}
                <ExtLink href={`mailto:${portfolio.email}?subject=Let's%20talk`}>{portfolio.email}</ExtLink>
              </Line>
            </div>
          ),
        }
      }
      return {
        output: (
          <Line tone="error">
            {`${portfolio.username} is not in the sudoers file. This incident will be reported. (try `}
            <Cmd command="sudo hire-me" />
            {')'}
          </Line>
        ),
      }
    },
  },
  {
    name: 'hire',
    description: 'Hire me',
    hidden: true,
    aliases: ['hireme'],
    run: () => ({ output: <ContactSection /> }),
  },
  {
    name: 'exit',
    description: 'Exit',
    hidden: true,
    run: () => ({
      output: (
        <Line tone="muted">
          {"There's no escape — but there is "}
          <Cmd command="contact" />
          {'.'}
        </Line>
      ),
    }),
  },
  {
    name: 'rm',
    description: 'Remove',
    hidden: true,
    run: () => ({ output: <Line tone="error">{'Nice try. This portfolio is write-protected.'}</Line> }),
  },
]

const lookup = new Map<string, Command>()
for (const cmd of commands) {
  lookup.set(cmd.name, cmd)
  cmd.aliases?.forEach((a) => lookup.set(a, cmd))
}

export const completionCandidates = commands.filter((c) => !c.hidden).map((c) => c.name)
export const allCommandNames = Array.from(lookup.keys())

function distance(a: string, b: string) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 1; j <= b.length; j++) dp[0][j] = j
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
    }
  }
  return dp[a.length][b.length]
}

export function executeCommand(input: string, ctx: CommandContext): CommandResult {
  const { rawName, name, args } = parseCommandInput(input)
  const command = lookup.get(name)
  if (command) return command.run(args, ctx)

  const suggestion = completionCandidates
    .map((c) => ({ c, d: distance(name, c) }))
    .sort((a, b) => a.d - b.d)[0]

  return {
    output: (
      <Line tone="error">
        {`command not found: ${rawName}. `}
        {suggestion && suggestion.d <= 3 ? (
          <>
            {'Did you mean '}
            <Cmd command={suggestion.c} />
            {'? '}
          </>
        ) : null}
        <span className="text-term-muted">
          {'Type '}
          <Cmd command="help" />
          {' for a list of commands.'}
        </span>
      </Line>
    ),
  }
}

export function autocomplete(input: string): { value: string; options: string[] } {
  const trimmed = input.trimStart()
  if (trimmed.toLowerCase().startsWith('mode ')) {
    const partial = trimmed.slice(5).toLowerCase()
    const options = modeNames.filter((mode) => mode.startsWith(partial))
    return { value: options.length === 1 ? `mode ${options[0]}` : input, options }
  }
  if (trimmed.toLowerCase().startsWith('theme ')) {
    const partial = trimmed.slice(6).toLowerCase()
    const options = [...themeNames, 'random'].filter((t) => t.startsWith(partial))
    return { value: options.length === 1 ? `theme ${options[0]}` : input, options }
  }
  if (trimmed.toLowerCase().startsWith('open ')) {
    const partial = trimmed.slice(5).toLowerCase()
    const options = portfolio.projects.map((p) => p.slug).filter((s) => s.startsWith(partial))
    return { value: options.length === 1 ? `open ${options[0]}` : input, options }
  }
  const options = completionCandidates.filter((c) => c.startsWith(trimmed.toLowerCase()))
  return { value: options.length === 1 ? options[0] : input, options }
}
