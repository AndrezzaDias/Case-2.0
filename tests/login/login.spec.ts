import { test, expect } from '@playwright/test'

test.describe('login', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies()
    await page.goto('/#/login')
    await page.evaluate(() => {
      localStorage.clear()
      sessionStorage.clear()
    })
    await page.goto('/#/login')
    await expect(page).toHaveURL(/login/)
  })

  test('Logando com sucesso', async ({ page }) => {
    await page.locator('[data-cy="email-input"]').fill(process.env.EMAIL!)
    await page.locator('[data-cy="password-input"]').fill(process.env.PASSWORD!)
    await page.locator('[data-cy="enter-button"]').click()
    await expect(page.locator('[data-cy="Contas-sidebar-button"]')).toBeVisible({ timeout: 120000 })
  })

  test('Login com senha incorreta', async ({ page }) => {
    await page.locator('[data-cy="email-input"]').fill(process.env.EMAIL!)
    await page.locator('[data-cy="password-input"]').fill('senha-errada')
    await page.locator('[data-cy="enter-button"]').click()
  })

  test('Login com campos vazios', async ({ page }) => {
    await page.locator('[data-cy="enter-button"]').click()
  })
})
