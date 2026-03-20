describe('login', () => {
    beforeEach(() =>{
        cy.visit('/#/login')
        cy.url().should('include', '/login')
    })

    it('Logando com sucesso', () => {
    cy.get('[data-cy="email-input"]').type(Cypress.env('EMAIL'))
    cy.get('[data-cy="password-input"]').type(Cypress.env('PASSWORD'))
    cy.get('[data-cy="enter-button"]').click()
    cy.url().should('include', '/contas')
    
    })  
    it('Login com senha incorreta', () => {
    cy.get('[data-cy="email-input"]').type(Cypress.env('EMAIL'))
    cy.get('[data-cy="password-input"]').type('senha-errada')
    cy.get('[data-cy="enter-button"]').click()
    
    })
    it('Login com campos vazios', () => {
    cy.get('[data-cy="enter-button"]').click()
    })
})