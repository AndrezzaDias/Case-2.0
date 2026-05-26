describe('Sites', () => {
  beforeEach(() => {
    cy.login()
    cy.get('.md\\:gap-0 > :nth-child(1) > .relative > .flex').type('Empresa And Qa')
    cy.get('.flex.items-center.gap-2').contains('Empresa And Qa').click()
    cy.url().should('include', '/sites')
  })

  it('Criar novo site', () => {
    cy.get('button').contains('Novo site').click()
    cy.get('[data-cy="input-title"]').type('Site de automação')
    cy.get('[data-cy="next-step-site"]').click()
    cy.get('[data-cy="select-template-empty"]').click()

    cy.get('.inline-flex > .flex').click()
    cy.contains('Painel de Controle').click()
    cy.get('div.gap-2 > .flex-col > .text-lg').should('contain', 'Site de automação')
  })
})