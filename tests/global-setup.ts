import { chromium, FullConfig } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

async function globalSetup(config: FullConfig) {
  const baseURL = process.env.BASE_URL ?? 'https://d1lsqmzxukegpl.cloudfront.net'

  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-blink-features=AutomationControlled'],
  })

  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    viewport: { width: 1920, height: 1080 },
  })

  const page = await context.newPage()

  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false })
    // @ts-ignore
    window.chrome = { runtime: {} }
  })

  await page.goto(`${baseURL}/#/login`)
  await page.waitForLoadState('networkidle')

  // Digita caractere por caractere simulando humano
  const emailInput = page.locator('[data-cy="email-input"]')
  await emailInput.click()
  await emailInput.pressSequentially(process.env.EMAIL!, { delay: 80 })

  const passwordInput = page.locator('[data-cy="password-input"]')
  await passwordInput.click()
  await passwordInput.pressSequentially(process.env.PASSWORD!, { delay: 80 })

  await page.waitForTimeout(500)
  await page.locator('[data-cy="enter-button"]').click()

  await page.locator('[data-cy="Contas-sidebar-button"]').waitFor({ timeout: 120000 })

  await context.storageState({ path: 'tests/auth-state.json' })
  await browser.close()
  console.log('✅ Sessão salva com sucesso!')
}

export default globalSetup
