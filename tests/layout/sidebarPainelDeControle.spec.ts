import { test, expect } from '@playwright/test'
import { acessarPainelDoSite } from '../../support/helpers'

test.describe('Sidebar - Painel de Controle do Site', () => {
  test.beforeEach(async ({ page }) => {
    await acessarPainelDoSite(page)
  })

  test('Exibe o nome do site e os itens de configuração', async ({ page }) => {
    await expect(page.locator('.w-\\[228px\\] > div.px-4')).toBeVisible()
    await expect(page.locator('[data-cy="Painel de controle-sidebar-button"]')).toBeVisible()
    await expect(page.locator('[data-cy="Conteúdos-sidebar-button"]')).toBeVisible()
    await expect(page.locator('[data-cy="Informações-sidebar-button"]')).toBeVisible()
    await expect(page.locator('[data-cy="Unidades-sidebar-button"]')).toBeVisible()
    await expect(page.locator('[data-cy="WhatsApp-sidebar-button"]')).toBeVisible()
    await expect(page.locator('[data-cy="Integrações-sidebar-button"]')).toBeVisible()
    await expect(page.locator('[data-cy="Domínio-sidebar-button"]')).toBeVisible()
  })

  test('Exibe o menu Formulários com seus submenus', async ({ page }) => {
    await page.getByText('Formulários').click()
    await expect(page.locator('[data-cy="Cookies-sidebar-button"]')).toBeVisible()
    await expect(page.locator('[data-cy="Scripts-sidebar-button"]')).toBeVisible()
    await expect(page.locator('[data-cy="Ações sensíveis-sidebar-button"]')).toBeVisible()
  })

  test('Exibe a seção Global com Header e Footer', async ({ page }) => {
    await expect(page.locator('[data-cy="Header-sidebar-button"]')).toBeVisible()
    await expect(page.locator('[data-cy="Footer-sidebar-button"]')).toBeVisible()
  })
})
