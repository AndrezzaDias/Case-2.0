describe('Sidebar - Site', () => {
    beforeEach(() => {
        cy.acessarContaTeste()
    })

    it('Exibe os itens do menu Workspace', () => {
        cy.get('[data-cy="Sites-sidebar-button"]').should('be.visible')
        cy.get('[data-cy="Conteúdos-sidebar-button"]').should('be.visible')
        cy.get('[data-cy="Unidades-sidebar-button"]').should('be.visible')
        cy.get('[data-cy="Configurações-sidebar-button"]').should('be.visible')
        cy.get('[data-cy="Integradores-sidebar-button"]').should('be.visible')
    })

    it('Exibe o menu Leads com seus submenus', () => {
        cy.contains('button', 'Leads').should('be.visible').click()
        cy.get('[data-cy="Listagem-sidebar-button"]').should('be.visible')
        cy.get('[data-cy="Equipes-sidebar-button"]').should('be.visible')
    })

    it('Exibe os itens do menu Área Administrativa', () => {
        cy.get('[data-cy="Contas-sidebar-button"]').should('be.visible')
        cy.get('[data-cy="Administradores-sidebar-button"]').should('be.visible')
        cy.contains('div.flex.items-center.gap-2', 'Templates').should('be.visible')
        cy.contains('div.flex.items-center.gap-2', 'Paddock').should('be.visible')
    })

    it('Exibe a seção Outros com Central de Ajuda', () => {
        cy.contains('Central de Ajuda').should('be.visible')
    })

    it('Exibe os elementos da tela de Sites carregados', () => {
        cy.contains('span.text-2xl.font-semibold.text-foreground', 'Sites').should('be.visible')
        cy.get('[data-cy="header-button"]').should('be.visible')
        cy.get('input[placeholder="Buscar site"]').should('be.visible')
        cy.get('.md\\:flex-row > [data-testid="trigger-button"]').should('be.visible')
        cy.contains('Ordenar por').should('be.visible')
        cy.contains('Site do Zero').should('be.visible')
        cy.contains('Acessar site').should('be.visible')
        cy.contains('button', 'Painel de Controle').should('be.visible')
    })
})
