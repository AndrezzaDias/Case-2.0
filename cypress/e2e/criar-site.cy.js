describe('Sites', () => {
  beforeEach(() => {
    cy.login()
    // Busca a conta Teste QA (pré-condição para criar site)
    cy.get('.md\\:gap-0 > :nth-child(1) > .relative > .flex').type('Teste QA')
    cy.get('.flex.items-center.gap-2').contains('Teste QA').click()
    cy.url().should('include', '/sites')
  })

  it('Criar novo site', () => {
    cy.get('button').contains('Novo site').click()
    cy.get('[data-cy="input-title"]').type('Site de automação')
    // Começando do zero
    cy.get('[data-cy="next-step-site"]').click()
    // Template da página inicial (Pagina em branco)
    cy.get('[data-cy="select-template-empty"]').click()
    cy.get('.mt-8 > .inline-flex').click()

  })

})