describe('Contas', () => {
    beforeEach(() => {
        cy.login()
    })

    it('Buscar conta por nome', () =>{
    cy.get('.md\\:gap-0 > :nth-child(1) > .relative > .flex').type('Empresa And Qa')
    cy.get('.flex.items-center.gap-2').contains('Empresa And Qa').click()
    cy.url().should('include', '/sites')
    })
        
    
})