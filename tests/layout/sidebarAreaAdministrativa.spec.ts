import { test, expect } from '@playwright/test'
import { irParaContas } from '../../support/helpers'

test.describe('Sidebar - Área Administrativa', () => {
  test.beforeEach(async ({ page }) => {
    await irParaContas(page)
  })

  test('Exibe o logo e o label da área administrativa', async ({ page }) => {
    await expect(page.locator('svg[width="186"][height="24"]')).toBeVisible()
    await expect(page.getByText('Área Administrativa')).toBeVisible()
  })

  test('Exibe os itens principais do menu', async ({ page }) => {
    await expect(page.locator('[data-cy="Contas-sidebar-button"]')).toBeVisible()
    await expect(page.locator('[data-cy="Administradores-sidebar-button"]')).toBeVisible()
    await expect(page.locator('[data-cy="Tipos de conteúdo-sidebar-button"]')).toBeVisible()
    await expect(page.locator('[data-cy="Integradores-sidebar-button"]')).toBeVisible()
    await expect(page.locator('div.flex.items-center.gap-2').filter({ hasText: 'Paddock' })).toBeVisible()
  })

  test('Exibe o menu Templates com seus submenus', async ({ page }) => {
    await page.locator('div.flex.items-center.gap-2').filter({ hasText: 'Templates' }).click()
    await expect(page.locator('[data-cy="Sites-sidebar-button"]')).toBeVisible()
    await expect(page.locator('[data-cy="Páginas-sidebar-button"]')).toBeVisible()
    await expect(page.locator('[data-cy="Módulos-sidebar-button"]')).toBeVisible()
  })

  test('Exibe a seção Outros com Central de Ajuda e Sair', async ({ page }) => {
    await expect(page.getByText('Outros')).toBeVisible()
    await expect(page.getByText('Central de Ajuda')).toBeVisible()
    await expect(page.getByText('Sair')).toBeVisible()
  })
})
