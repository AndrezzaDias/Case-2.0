import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker/locale/pt_BR'
import { acessarContaTeste } from '../../../support/helpers'

test.describe('Criar site', () => {
  const NOME_SITE = `Novo site automação apaga ${faker.string.alphanumeric(8)}`

  test.beforeEach(async ({ page }) => {
    await acessarContaTeste(page)
  })

  test('Cria e exclui um novo site com sucesso', async ({ page }) => {
    await page.locator('[data-cy="header-button"]').click()
    await page.locator('[data-cy="input-title"]').fill(NOME_SITE)
    await page.locator('[data-cy="next-step-site"]').click()
    await page.locator('[data-cy="select-template-empty"]').click()

    await expect(page).toHaveURL(/builder/)
    await expect(page.getByText('Personalize seu Header')).toBeVisible()

    await page.locator('.inline-flex > .flex').click()
    await page.getByRole('menuitem', { name: 'Painel de Controle' }).click()

    await page.locator('.flex-row > .flex > .bg-primary').click()

    await expect(
      page.locator('div.gap-2 > .flex-col > .text-lg').filter({ hasText: NOME_SITE })
    ).toBeVisible({ timeout: 15000 })

    await page.waitForTimeout(2000)
    await page.screenshot({ path: 'tests/screenshots/site-criado.png', fullPage: true })

    await page.locator('[data-cy="domain-button"]').click()
    await page.locator('.md\\:flex-row.gap-6 > .md\\:flex-col > :nth-child(6)').click()
    await page.locator('.rounded-lg.flex-col > .inline-flex').click()
    await page.locator('[data-cy="name-input"]').fill(NOME_SITE)
    await page.locator('[data-cy="confirm-button"]').click()

    await expect(page.getByText('excluído').first()).toBeVisible({ timeout: 10000 })

    await page.waitForTimeout(2000)
    await page.screenshot({ path: 'tests/screenshots/site-excluido.png', fullPage: true })
  })
})
