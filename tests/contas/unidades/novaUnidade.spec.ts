import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker/locale/pt_BR'
import { acessarContaTeste } from '../../../support/helpers'

test.describe('Nova Unidade', () => {
  const nomeUnidade = `Unidade automação apaga ${faker.string.alphanumeric(8)}`

  test.beforeEach(async ({ page }) => {
    await acessarContaTeste(page)
    await page.locator('[data-cy="Unidades-sidebar-button"]').click()
  })

  test('Cadastra, duplica e exclui uma unidade com sucesso', async ({ page }) => {
    await page.locator('[data-cy="header-button"]').click()

    // Step 1 - Informações básicas
    const [logotipoChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('[data-cy="send-image"]').nth(0).click(),
    ])
    await logotipoChooser.setFiles('tests/fixtures/imagem-teste.png')
    await page.getByRole('button', { name: 'Pular recorte' }).click()
    await expect(page.getByRole('dialog')).not.toBeVisible()

    const [imagemExibicaoChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('[data-cy="send-image"]').nth(1).click(),
    ])
    await imagemExibicaoChooser.setFiles('tests/fixtures/imagem-teste.png')
    await page.getByRole('button', { name: 'Pular recorte' }).click()
    await expect(page.getByRole('dialog')).not.toBeVisible()

    await page.locator('[name="name"]').fill(nomeUnidade)
    await page.locator('[name="displayName"]').fill(nomeUnidade)
    await page.locator('[name="cnpj"]').fill(faker.helpers.replaceSymbols('##.###.###/####-##'))
    await page.locator('[name="corporateName"]').fill(faker.company.name())
    await page.locator('[name="description"]').fill(faker.lorem.sentence())
    await page.getByRole('button', { name: 'Continuar' }).click()

    // Step 2 - Localização
    await page.locator('[name="zipCode"]').fill(faker.location.zipCode('#####-###'))
    await page.locator('[name="state"]').fill(faker.location.state())
    await page.locator('[name="city"]').fill(faker.location.city())
    await page.locator('[name="address"]').fill(faker.location.streetAddress())
    await page.locator('[name="neighborhood"]').fill(faker.location.county())
    await page.locator('[name="number"]').fill(faker.location.buildingNumber())
    await page.locator('.justify-start > .inline-flex').click()

    // Step 3 - Horários e Contato
    await page.locator('[name="email"]').fill(faker.internet.email().toLowerCase())
    await page.locator('[name="operatingHours.0.dayOfWeek"]').fill('Segunda a Sexta')
    await page.locator('[name="operatingHours.0.hours"]').fill('08:00 às 18:00')
    await page.locator('.bg-primary').click()

    await expect(page.getByText(nomeUnidade)).toBeVisible()

    // Duplicar
    await page.locator('tr').filter({ hasText: nomeUnidade }).locator('button').last().click()
    await page.getByText('Duplicar').click()
    await expect(page.getByText(`${nomeUnidade} (cópia)`)).toBeVisible()

    // Excluir cópia
    await page.locator('tr').filter({ hasText: `${nomeUnidade} (cópia)` }).locator('button').last().click()
    await page.locator('.text-destructive').click()
    await page.locator('.bg-destructive').click()
    await expect(page.getByText(`${nomeUnidade} (cópia)`)).not.toBeVisible()

    // Excluir original
    await page.locator('tr').filter({ hasText: nomeUnidade }).locator('button').last().click()
    await page.locator('.text-destructive').click()
    await page.locator('.bg-destructive').click()
    await expect(page.getByText(nomeUnidade)).not.toBeVisible()
  })
})
