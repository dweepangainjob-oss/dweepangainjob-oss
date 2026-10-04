import { expect, test, type Page } from '@playwright/test'

const quickActions = (page: Page) => page.getByRole('navigation', { name: 'Quick commands' })

test('welcome, all projects, and repository links render', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('pre[role="img"]')).toBeVisible()
  await expect(page.locator('header img')).toBeVisible()

  await quickActions(page).getByRole('button', { name: 'projects', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible()
  await expect(page.locator('article')).toHaveCount(9)
  await expect(page.getByRole('link', { name: '[source]' }).first()).toHaveAttribute('href', /^https:\/\/github\.com\//)
})

test('AI engineer mode filters projects and skills', async ({ page }) => {
  await page.goto('/')
  const commandInput = page.getByRole('textbox', { name: 'Enter a command' })
  await commandInput.fill('mode ai-engineer')
  await commandInput.press('Enter')
  await expect(page.getByText('mode: ai-engineer')).toBeVisible()

  await quickActions(page).getByRole('button', { name: 'projects', exact: true }).click()
  await expect(page.locator('article')).toHaveCount(6)
  await expect(page.locator('article').filter({ hasText: 'AI Council' })).toBeVisible()
  await expect(page.locator('article').filter({ hasText: 'Smart Tire Analyzer' })).toHaveCount(0)

  await quickActions(page).getByRole('button', { name: 'skills', exact: true }).click()
  await expect(page.getByText('AI / LLM', { exact: true })).toBeVisible()
  await expect(page.getByText('Web Development', { exact: true })).toHaveCount(0)
})

test('mobile portrait stays within the viewport and resume print controls hide', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 })
  await page.goto('/')
  const portrait = page.locator('pre[role="img"]')
  await expect(portrait).toBeVisible()

  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 })
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      page: document.documentElement.scrollWidth,
    }))
    expect(dimensions.page).toBeLessThanOrEqual(dimensions.viewport)
    expect(await portrait.evaluate((element) => element.getBoundingClientRect().width)).toBeLessThanOrEqual(width)
  }

  await page.goto('/resume')
  await expect(page.getByRole('heading', { name: 'Selected Projects' })).toBeVisible()
  await page.emulateMedia({ media: 'print' })
  await expect(page.getByRole('button', { name: 'Download PDF' })).toBeHidden()
})

test('Open Graph preview is served as a PNG', async ({ page, request }) => {
  await page.goto('/')
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /opengraph-image/)

  const response = await request.get('/opengraph-image')
  expect(response.ok()).toBeTruthy()
  expect(response.headers()['content-type']).toContain('image/png')
})
