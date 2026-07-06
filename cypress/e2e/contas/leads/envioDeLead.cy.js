import { faker } from '@faker-js/faker/locale/pt_BR'

describe('Envio de Lead - Site', () => {
    const nome = faker.person.fullName()
    const email = faker.internet.email().toLowerCase()
    const telefone = '(11) 99999-9999'

    it('Envia um lead pelo site e confere que aparece na listagem de Leads', () => {
        cy.intercept('POST', '**/conversions').as('enviarLead')

        cy.visit('https://45757361-f6c2-4d86-b715-8849d41e4a24.autocommerce.work/')
        cy.contains('Aceitar').click()

        cy.get('[name="name"]').type(nome)
        cy.get('[name="email"]').type(email)
        cy.get('[name="phone"]').type(telefone)
        cy.get(':nth-child(1) > [name="contactPreference[]"]').check()
        cy.get(':nth-child(3) > [name="contactPreference[]"]').check()
        cy.get('.sc-3675ea87-0').click()

        cy.wait('@enviarLead').then(({ request, response }) => {
            expect(response.statusCode).to.be.oneOf([200, 201, 202])
            expect(request.body).to.include({ name: nome, email, phone: telefone })
        })

        cy.contains('Obrigado!').should('be.visible')

        cy.acessarContaTeste()
        cy.contains('button', 'Leads').click()
        cy.get('[data-cy="Listagem-sidebar-button"]').click()
        cy.contains(nome).should('be.visible')
    })
})
