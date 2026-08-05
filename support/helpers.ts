import { Page, expect } from '@playwright/test'

export async function login(page: Page) {
  await page.goto('/#/login')
  await page.locator('[data-cy="email-input"]').fill(process.env.EMAIL!)
  await page.locator('[data-cy="password-input"]').fill(process.env.PASSWORD!)
  await page.locator('[data-cy="enter-button"]').click()
  await expect(page.locator('[data-cy="Contas-sidebar-button"]')).toBeVisible({ timeout: 120000 })
}

export async function irParaContas(page: Page) {
  await page.goto('/#/contas')
  await expect(page.locator('[data-cy="Contas-sidebar-button"]')).toBeVisible()
}

export async function acessarContaTeste(page: Page) {
  await irParaContas(page)
  await page.locator('.md\\:gap-0 > :nth-child(1) > .relative > .flex')
    .fill('Testes Automatizados QA [Não Alterar]')
  await page.waitForTimeout(1000)
  await page.locator('.min-w-\\[200px\\] > .items-center').click()
}

export async function acessarPainelDoSite(page: Page) {
  await acessarContaTeste(page)
  await page.locator('.p-6', { hasText: 'Site do Zero' })
    .getByRole('button', { name: 'Painel de Controle' })
    .click()
}
