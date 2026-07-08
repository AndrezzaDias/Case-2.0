import { faker } from '@faker-js/faker/locale/pt_BR'

describe('Criar site', () => {
    const NOME_SITE = `Novo site automação apaga ${faker.string.alphanumeric(8)}`

    beforeEach(() => {
        cy.acessarContaTeste()
    })

    it('Cria e exclui um novo site com sucesso', () => {
        cy.get('[data-cy="header-button"]').click()
        cy.get('[data-cy="input-title"]').type(NOME_SITE)
        cy.get('[data-cy="next-step-site"]').click()
        cy.get('[data-cy="select-template-empty"]').click()

        cy.url().should('include', '/builder')
        cy.contains('Personalize seu Header').should('be.visible')

        // Abre o dropdown de tipo de página e seleciona Painel de Controle
        cy.get('.inline-flex > .flex').click()
        cy.contains('Painel de Controle').click()

        // Confirma "Salvar e sair" no modal de alterações não salvas
        cy.get('.flex-row > .flex > .bg-primary').click()

        // Valida que o site foi criado com o nome correto
        cy.get('div.gap-2 > .flex-col > .text-lg', { timeout: 15000 })
            .should('contain', NOME_SITE)

        cy.wait(2000)
        cy.screenshot('sites/site-criado', { capture: 'fullPage' })

        // --- EXCLUSÃO DO SITE CRIADO ---

        cy.get('[data-cy="domain-button"]')
            .should('be.visible')
            .click()

        cy.get('.md\\:flex-row.gap-6 > .md\\:flex-col > :nth-child(6)')
            .should('be.visible')
            .click()

        cy.get('.rounded-lg.flex-col > .inline-flex')
            .should('be.visible')
            .click()

        cy.get('[data-cy="name-input"]')
            .should('be.visible')
            .type(NOME_SITE)

        cy.get('[data-cy="confirm-button"]')
            .should('be.visible')
            .click()

        cy.contains('excluído', { timeout: 10000 }).should('be.visible')

        cy.wait(2000)
        cy.screenshot('sites/site-excluido', { capture: 'fullPage' })
    })
})
