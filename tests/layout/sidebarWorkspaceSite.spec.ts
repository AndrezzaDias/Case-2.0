import { test, expect } from '@playwright/test'
import { acessarContaTeste } from '../../support/helpers'

test.describe('Sidebar - Site', () => {
  test.beforeEach(async ({ page }) => {
    await acessarContaTeste(page)
  })

  test('Exibe os itens do menu Workspace', async ({ page }) => {
    await expect(page.locator('[data-cy="Sites-sidebar-button"]')).toBeVisible()
    await expect(page.locator('[data-cy="Conteúdos-sidebar-button"]')).toBeVisible()
    await expect(page.locator('[data-cy="Unidades-sidebar-button"]')).toBeVisible()
    await expect(page.locator('[data-cy="Configurações-sidebar-button"]')).toBeVisible()
    await expect(page.locator('[data-cy="Integradores-sidebar-button"]')).toBeVisible()
  })

  test('Exibe o menu Leads com seus submenus', async ({ page }) => {
    await page.getByRole('button', { name: 'Leads' }).click()
    await expect(page.locator('[data-cy="Listagem-sidebar-button"]')).toBeVisible()
    await expect(page.locator('[data-cy="Equipes-sidebar-button"]')).toBeVisible()
  })

  test('Exibe os itens do menu Área Administrativa', async ({ page }) => {
    await expect(page.locator('[data-cy="Contas-sidebar-button"]')).toBeVisible()
    await expect(page.locator('[data-cy="Administradores-sidebar-button"]')).toBeVisible()
    await expect(page.locator('div.flex.items-center.gap-2').filter({ hasText: 'Templates' })).toBeVisible()
    await expect(page.locator('div.flex.items-center.gap-2').filter({ hasText: 'Paddock' })).toBeVisible()
  })

  test('Exibe a seção Outros com Central de Ajuda', async ({ page }) => {
    await expect(page.getByText('Central de Ajuda')).toBeVisible()
  })

  test('Exibe os elementos da tela de Sites carregados', async ({ page }) => {
    await expect(page.locator('span.text-2xl.font-semibold.text-foreground').filter({ hasText: 'Sites' })).toBeVisible()
    await expect(page.locator('[data-cy="header-button"]')).toBeVisible()
    await expect(page.locator('input[placeholder="Buscar site"]')).toBeVisible()
    await expect(page.locator('.md\\:flex-row > [data-testid="trigger-button"]')).toBeVisible()
    await expect(page.getByText('Ordenar por')).toBeVisible()
    await expect(page.getByText('Site do Zero')).toBeVisible()
    await expect(page.getByText('Acessar site').first()).toBeVisible()
    await expect(page.getByRole('button', { name: 'Painel de Controle' }).first()).toBeVisible()
  })
})
