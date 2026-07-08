import { faker } from '@faker-js/faker/locale/pt_BR'

describe('Nova Unidade', () => {
    const nomeUnidade = `Unidade automação apaga ${faker.string.alphanumeric(8)}`

    beforeEach(() => {
        cy.acessarContaTeste()
        cy.get('[data-cy="Unidades-sidebar-button"]').click()
    })

    it('Cadastra, duplica e exclui uma unidade com sucesso', () => {
        cy.get('[data-cy="header-button"]').click()

        // Etapa 1 de 3 - Informações Básicas
        cy.get(':nth-child(1) > .gap-4 > .gap-1 > .pt-1 > [data-cy="send-image"]')
            .selectFile('cypress/fixtures/imagem-teste.png', { force: true })
        cy.get(':nth-child(2) > .gap-4 > .gap-1 > .pt-1 > [data-cy="send-image"]')
            .selectFile('cypress/fixtures/imagem-teste.png', { force: true })
        cy.get('[name="name"]').type(nomeUnidade)
        cy.get('[name="displayName"]').type(nomeUnidade)
        cy.get('[name="cnpj"]').type(faker.helpers.replaceSymbols('##.###.###/####-##'))
        cy.get('[name="corporateName"]').type(faker.company.name())
        cy.get('[name="description"]').type(faker.lorem.sentence())
        cy.contains('button', 'Continuar').click()

        // Etapa 2 de 3 - Localização
        cy.get('[name="zipCode"]').type(faker.location.zipCode('#####-###'))
        cy.get('[name="state"]').type(faker.location.state())
        cy.get('[name="city"]').type(faker.location.city())
        cy.get('[name="address"]').type(faker.location.streetAddress())
        cy.get('[name="neighborhood"]').type(faker.location.county())
        cy.get('[name="number"]').type(faker.location.buildingNumber())
        cy.get('.justify-start > .inline-flex').click()

        // Etapa 3 de 3 - Funcionamento e Contato
        cy.get('[name="email"]').type(faker.internet.email().toLowerCase())
        cy.get('[name="operatingHours.0.dayOfWeek"]').type('Segunda a Sexta')
        cy.get('[name="operatingHours.0.hours"]').type('08:00 às 18:00')
        cy.get('.bg-primary').click()

        cy.contains(nomeUnidade).should('be.visible')

        // Duplica a unidade criada
        cy.contains('tr', nomeUnidade).find('button').last().click()
        cy.contains('Duplicar').click()
        cy.contains(`${nomeUnidade} (cópia)`).should('be.visible')

        // Exclui a cópia
        cy.contains('tr', `${nomeUnidade} (cópia)`).find('button').last().click()
        cy.get('.text-destructive').click()
        cy.get('.bg-destructive').click()
        cy.contains(`${nomeUnidade} (cópia)`).should('not.exist')

        // Exclui a unidade original
        cy.contains('tr', nomeUnidade).find('button').last().click()
        cy.get('.text-destructive').click()
        cy.get('.bg-destructive').click()
        cy.contains(nomeUnidade).should('not.exist')
    })
})
