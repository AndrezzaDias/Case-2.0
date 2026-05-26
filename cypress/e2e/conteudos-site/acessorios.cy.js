import { faker } from '@faker-js/faker/locale/pt_BR'

describe('Conteúdos - Acessórios', () => {
  const data = faker.date.past({ years: 2 }).toLocaleDateString('pt-BR')
  const slug = faker.helpers.slugify(faker.commerce.productName()).toLowerCase()

  beforeEach(() => {
    cy.login()
    cy.get('.md\\:gap-0 > :nth-child(1) > .relative > .flex').type('Empresa And Qa')
    cy.get('.flex.items-center.gap-2').contains('Empresa And Qa').click()
    cy.url().should('include', '/sites')
  })

  it('Cadastrar Acessório com sucesso', () => {
    cy.get(':nth-child(1) > .p-6 > a.w-full > [data-cy="control-panel-button"]').click()
    cy.get('[data-cy="Conteúdos-sidebar-button"]').click()
    cy.get(':nth-child(3) > .flex-wrap > :nth-child(1)').should('contain', 'Acessórios').click()
    cy.get('[data-cy="header-button"]').click()
  })
})
