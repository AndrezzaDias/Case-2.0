describe('Sidebar - Área Administrativa', () => {
    beforeEach(() => {
        cy.login()
    })

    it('Exibe o logo e o label da área administrativa', () => {
        cy.get('svg[width="186"][height="24"]').should('be.visible')
        cy.contains('Área Administrativa').should('be.visible')
    })

    it('Exibe os itens principais do menu', () => {
        cy.get('[data-cy="Contas-sidebar-button"]').should('be.visible')
        cy.get('[data-cy="Administradores-sidebar-button"]').should('be.visible')
        cy.get('[data-cy="Tipos de conteúdo-sidebar-button"]').should('be.visible')
        cy.get('[data-cy="Integradores-sidebar-button"]').should('be.visible')
        cy.contains('div.flex.items-center.gap-2', 'Paddock').should('be.visible')
    })

    it('Exibe o menu Templates com seus submenus', () => {
        cy.contains('div.flex.items-center.gap-2', 'Templates').should('be.visible').click()
        cy.get('[data-cy="Sites-sidebar-button"]').should('be.visible')
        cy.get('[data-cy="Páginas-sidebar-button"]').should('be.visible')
        cy.get('[data-cy="Módulos-sidebar-button"]').should('be.visible')
    })

    it('Exibe a seção Outros com Central de Ajuda e Sair', () => {
        cy.contains('Outros').should('be.visible')
        cy.contains('Central de Ajuda').should('be.visible')
        cy.contains('Sair').should('be.visible')
    })
})
