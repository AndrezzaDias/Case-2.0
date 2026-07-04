describe('Sidebar - Painel de Controle do Site', () => {
    beforeEach(() => {
        cy.acessarPainelDoSite()
    })

    it('Exibe o nome do site e os itens de configuração', () => {
        cy.get('.w-\\[228px\\] > div.px-4').should('be.visible')
        cy.get('[data-cy="Painel de controle-sidebar-button"]').should('be.visible')
        cy.get('[data-cy="Conteúdos-sidebar-button"]').should('be.visible')
        cy.get('[data-cy="Informações-sidebar-button"]').should('be.visible')
        cy.get('[data-cy="Unidades-sidebar-button"]').should('be.visible')
        cy.get('[data-cy="WhatsApp-sidebar-button"]').should('be.visible')
        cy.get('[data-cy="Integrações-sidebar-button"]').should('be.visible')
        cy.get('[data-cy="Domínio-sidebar-button"]').should('be.visible')
    })

    it('Exibe o menu Formulários com seus submenus', () => {
        cy.contains('Formulários').should('be.visible').click()
        cy.get('[data-cy="Cookies-sidebar-button"]').should('be.visible')
        cy.get('[data-cy="Scripts-sidebar-button"]').should('be.visible')
        cy.get('[data-cy="Ações sensíveis-sidebar-button"]').should('be.visible')
    })

    it('Exibe a seção Global com Header e Footer', () => {
        cy.get('[data-cy="Header-sidebar-button"]').should('be.visible')
        cy.get('[data-cy="Footer-sidebar-button"]').should('be.visible')
    })
})
