import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker/locale/pt_BR'
import { acessarContaTeste } from '../../../support/helpers'

test.describe('Envio de Lead - Site', () => {
  const nome = faker.person.fullName()
  const email = faker.internet.email().toLowerCase()
  const telefone = '(11) 99999-9999'

  test('Envia um lead pelo site e confere que aparece na listagem de Leads', async ({ page }) => {
    const respostaLead = page.waitForResponse('**/conversions')

    await page.goto('https://45757361-f6c2-4d86-b715-8849d41e4a24.autocommerce.work/')
    const aceitarCookies = page.getByText('Aceitar')
    if (await aceitarCookies.isVisible({ timeout: 5000 }).catch(() => false)) {
      await aceitarCookies.click()
    }

    await page.locator('[name="name"]').fill(nome)
    await page.locator('[name="email"]').fill(email)
    await page.locator('[name="phone"]').fill(telefone)
    await page.locator(':nth-child(1) > [name="contactPreference[]"]').check()
    await page.locator(':nth-child(3) > [name="contactPreference[]"]').check()
    await page.locator('.sc-3675ea87-0').click()

    const resposta = await respostaLead
    expect(resposta.status()).toBeGreaterThanOrEqual(200)
    expect(resposta.status()).toBeLessThanOrEqual(202)

    await expect(page.getByText('Obrigado!')).toBeVisible()

    await acessarContaTeste(page)
    await page.getByRole('button', { name: 'Leads' }).click()
    await page.locator('[data-cy="Listagem-sidebar-button"]').click()
    await expect(page.getByText(nome)).toBeVisible()
  })
})
