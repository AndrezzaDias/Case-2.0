import { test, expect } from '@playwright/test'
import { irParaContas } from '../../support/helpers'

test.describe('Contas - Smoke Test', () => {
  test.beforeEach(async ({ page }) => {
    await irParaContas(page)
  })

  test('O total de contas bate com a soma de contas de clientes e contas de teste', async ({ page }) => {
    const valores = page.locator('.text-2xl.text-foreground.font-bold')
    const contasDeClientes = parseInt((await valores.nth(1).textContent())!)
    const totalDeContasDeTeste = parseInt((await valores.nth(2).textContent())!)
    const totalDeContas = parseInt((await valores.nth(3).textContent())!)
    expect(totalDeContas).toBe(contasDeClientes + totalDeContasDeTeste)
  })

  test('A tabela de contas carrega com itens', async ({ page }) => {
    const linhas = page.locator('.\\[\\&_tr\\:last-child\\]\\:border-0 tr')
    await expect(linhas).not.toHaveCount(0)
  })
})
