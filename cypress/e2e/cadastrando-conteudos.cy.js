import { faker } from '@faker-js/faker/locale/pt_BR'

describe('Conteúdos', () => {
  beforeEach(() => {
    cy.login()
    cy.get('.md\\:gap-0 > :nth-child(1) > .relative > .flex').type('Teste QA')
    cy.get('.flex.items-center.gap-2').contains('Teste QA').click()
    cy.url().should('include', '/sites')
  })

  Array.from({ length: 3 }).forEach((_, index) => {

    it(`Cadastrar conteúdo de Blog com sucesso - execução ${index + 1}`, () => {

      const nome = faker.commerce.productName()
      const titulo = faker.lorem.words(3)
      const conteudo = faker.lorem.paragraph()
      const slug = faker.helpers.slugify(nome).toLowerCase()
      cy.get('[data-cy="Conteúdos-sidebar-button"]').click()
      cy.url().should('include', '/conteudos')
      cy.get('.flex-wrap > :nth-child(1) > .flex > .font-medium').contains('Blog').click()
      cy.get('button').contains('Novo item').click()
      cy.get('.pt-2 > .flex-col > .relative > .flex').type(nome)
      cy.get('#image-input').selectFile('cypress/fixtures/imagem-teste.jpg.png', { force: true })
      cy.get('#dynamic-form > :nth-child(2) > .relative > .flex').type(titulo)
      cy.get(':nth-child(3) > .flex-col > .h-10').click()
      cy.contains('[role="option"]', 'Lançamentos / Guia de Compra').click()
      cy.get('iframe[id^="tiny-react"]').then(($iframe) => {
        cy.wrap($iframe.contents().find('#tinymce'))
          .focus()
          .click()
          .type(conteudo, { force: true })
      })
      cy.get(':nth-child(6) > .flex-col > .h-10').click()
      cy.contains('[role="option"]', 'Qa').click()
      cy.get('[data-cy="input-slug"]').clear().type(slug)
      cy.get('.border.flex-col > .inline-flex').click()
      cy.url().should('include', '/conteudos')
      cy.contains('Lançamentos / Guia de Compra').should('be.visible')
    })
  })
})