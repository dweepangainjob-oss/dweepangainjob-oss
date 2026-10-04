import test from 'node:test'
import assert from 'node:assert/strict'
import { isPortfolioMode, getProjectsForMode, getSkillsForMode, portfolioModes } from './portfolio-modes.ts'
import { parseCommandInput } from './command-parser.ts'

test('portfolio modes include recruiter, developer, AI engineer, and full-stack views', () => {
  assert.equal(isPortfolioMode('default'), true)
  assert.equal(isPortfolioMode('recruiter'), true)
  assert.equal(isPortfolioMode('developer'), true)
  assert.equal(isPortfolioMode('ai-engineer'), true)
  assert.equal(isPortfolioMode('full-stack'), true)
  assert.equal(isPortfolioMode('unknown'), false)
  assert.equal(isPortfolioMode('toString'), false)
  assert.deepEqual(Object.keys(portfolioModes), ['default', 'recruiter', 'developer', 'ai-engineer', 'full-stack'])
})

test('focused modes select the matching projects and skills', () => {
  const projects = [
    { slug: 'ai-crm-pim-platform' },
    { slug: 'fraud-detection-system' },
    { slug: 'secure-chat-application' },
    { slug: 'smart-tire-analyzer' },
  ]
  const skills = [
    { category: 'AI / LLM' },
    { category: 'Web Development' },
    { category: 'Hardware / Graphics / CAD' },
  ]

  assert.deepEqual(
    getProjectsForMode(projects, 'ai-engineer').map(({ slug }) => slug),
    ['ai-crm-pim-platform', 'fraud-detection-system'],
  )
  assert.deepEqual(
    getProjectsForMode(projects, 'full-stack').map(({ slug }) => slug),
    ['ai-crm-pim-platform', 'secure-chat-application'],
  )
  assert.deepEqual(getSkillsForMode(skills, 'ai-engineer').map(({ category }) => category), ['AI / LLM'])
  assert.deepEqual(getSkillsForMode(skills, 'full-stack').map(({ category }) => category), ['Web Development'])
  assert.equal(getProjectsForMode(projects, 'default').length, projects.length)
})

test('command parser trims input and normalizes command names', () => {
  assert.deepEqual(parseCommandInput('  OpEn  ai-council  '), {
    rawName: 'OpEn',
    name: 'open',
    args: ['ai-council'],
  })
  assert.deepEqual(parseCommandInput('  '), { rawName: '', name: '', args: [] })
})