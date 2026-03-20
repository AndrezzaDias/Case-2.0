describe('Conteúdos', () => {

  beforeEach(() => {
    cy.login()

    // Pré-condição: buscar a conta Teste QA
    cy.get('.md\\:gap-0 > :nth-child(1) > .relative > .flex').type('Teste QA')
    cy.get('.flex.items-center.gap-2').contains('Teste QA').click()
    cy.url().should('include', '/sites')
  })

  it('Acessar menu Conteúdos', () => {
    cy.get('[data-cy="Conteúdos-sidebar-button"]').click()
    cy.url().should('include', '/conteudos')
    //Cadstrando Conteúdo de Blog'
    cy.get('.flex-wrap > :nth-child(1) > .flex > .font-medium').contains('Blog').click()
    cy.get('button').contains('Novo item').click()

    cy.get('.pt-2 > .flex-col > .relative > .flex').type('Teste')
    cy.get('#dynamic-form > :nth-child(2) > .relative > .flex').type('TItulo Teste')
    cy.get(':nth-child(3) > .flex-col > .h-10').click()
    cy.contains('[role="option"]', 'Lançamentos / Guia de Compra').click()

    


    
    



 
    })
})