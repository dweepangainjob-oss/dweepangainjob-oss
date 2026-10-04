type PortfolioModeConfig = {
  label: string
  summary: string
  projectSlugs?: readonly string[]
  skillCategories?: readonly string[]
}

export const portfolioModes = {
  default: {
    label: 'default',
    summary: 'Balanced portfolio view for general browsing.',
  },
  recruiter: {
    label: 'recruiter',
    summary: 'Highlights impact, selected projects, skills, and contact details.',
  },
  developer: {
    label: 'developer',
    summary: 'Emphasizes engineering depth, stack, and project architecture.',
  },
  'ai-engineer': {
    label: 'ai-engineer',
    summary: 'Focuses on AI, machine learning, NLP, LLMs, and multi-agent projects.',
    projectSlugs: [
      'ai-crm-pim-platform',
      'ai-powered-resume-analyzer',
      'fraud-detection-system',
      'ai-email-assistant',
      'medical-report-analyzer',
      'ai-council-multi-agent-orchestration-system',
    ],
    skillCategories: [
      'Programming Languages',
      'AI / LLM',
      'Machine Learning',
      'Data and Analytics',
      'Security / Specialized',
    ],
  },
  'full-stack': {
    label: 'full-stack',
    summary: 'Focuses on full-stack applications, APIs, databases, and deployment.',
    projectSlugs: [
      'ai-crm-pim-platform',
      'ai-powered-resume-analyzer',
      'ai-email-assistant',
      'medical-report-analyzer',
      'secure-chat-application',
      'social-media-monitoring-tool',
      'ai-council-multi-agent-orchestration-system',
    ],
    skillCategories: [
      'Programming Languages',
      'Data and Analytics',
      'Web Development',
      'Databases, Cloud and DevOps',
    ],
  },
} satisfies Record<string, PortfolioModeConfig>

export type PortfolioMode = keyof typeof portfolioModes

export const modeNames = Object.keys(portfolioModes) as PortfolioMode[]

export const MODE_STORAGE_KEY = 'portfolio-mode'

export function isPortfolioMode(value: string): value is PortfolioMode {
  return Object.hasOwn(portfolioModes, value)
}

export function getModeMeta(mode: PortfolioMode) {
  return portfolioModes[mode]
}

export function getProjectsForMode<T extends { slug: string }>(projects: T[], mode: PortfolioMode) {
  const config = portfolioModes[mode]
  const slugs = 'projectSlugs' in config ? config.projectSlugs : undefined
  return slugs ? projects.filter((project) => slugs.includes(project.slug)) : projects
}

export function getSkillsForMode<T extends { category: string }>(skills: T[], mode: PortfolioMode) {
  const config = portfolioModes[mode]
  const categories = 'skillCategories' in config ? config.skillCategories : undefined
  return categories ? skills.filter((group) => categories.includes(group.category)) : skills
}