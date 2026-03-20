describe('Contas', () => {
    beforeEach(() => {
        cy.login()
    })

    it('Buscar conta por nome', () =>{
    cy.get('.md\\:gap-0 > :nth-child(1) > .relative > .flex').type('Teste Qa')
    cy.get('.flex.items-center.gap-2').contains('Teste QA').click()
    cy.url().should('include', '/sites')
    })
        
    
})