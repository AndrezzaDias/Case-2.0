import { faker } from '@faker-js/faker/locale/pt_BR'

describe('Seminovos', () => {

  const titulo = faker.commerce.productName()
  const descricao = faker.lorem.words(3)
  const preco = faker.commerce.price({ min: 10000, max: 100000 })
  const marca = faker.vehicle.manufacturer()
  const veiculo = faker.vehicle.model()
  const ano = faker.date.past({ years: 10 }).getFullYear().toString()
  const km = faker.number.int({ min: 1000, max: 100000 }).toString()
  const  placa = faker.number.int({ min: 1000, max: 100000 }).toString()
  const observacao = faker.lorem.paragraph()
  const slug = faker.helpers.slugify(titulo).toLowerCase()

  beforeEach(() => {
    cy.login()
    cy.get('.md\\:gap-0 > :nth-child(1) > .relative > .flex').type('Empresa And Qa')
    cy.get('.flex.items-center.gap-2').contains('Empresa And Qa').click()
    cy.url().should('include', '/sites')
    cy.get('[data-cy="Conteúdos-sidebar-button"]').click()
    cy.url().should('include', '/conteudos')
  })

  it('Cadastrar conteúdo de Seminovos com sucesso', () => {
    cy.get('.flex-wrap > :nth-child(2)').click()
    // Mira pelo texto/título do card em vez do nth-child (que muda conforme a lista).
    cy.contains('.font-medium', 'Seminovos').click()
    cy.get('[data-cy="header-button"]').contains('Novo item').click()
    cy.get('#dynamic-form > :nth-child(1) > .relative > .flex').type(titulo)
    //cy.get('#dynamic-form > :nth-child(2) > .relative > .flex').type(preco)
    cy.get(':nth-child(3) > .relative > .w-full').type(preco)
    cy.get('#image-input').selectFile('cypress/fixtures/imagem-teste01.png.png', { force: true })
    // "Marca" é um combobox (Radix Select), não um input de texto: abre o dropdown
    // e seleciona uma marca que existe na lista fixa (faker geraria marca inexistente).
    cy.contains('button[role="combobox"]', 'Selecione a marca')
      .should('be.visible')
      .click()
    cy.get('[role="option"]').contains('Chery').click()
    cy.get('#image-input').selectFile('cypress/fixtures/imagem-teste02.png.png.png', { force: true })
    cy.get(':nth-child(11) > .relative > .flex').type(veiculo)
    cy.get(':nth-child(12) > .relative > .flex').type(marca)
    // Terceira imagem (galeria): o .w-full é o dropzone (uma div);
    // o selectFile precisa do <input type="file"> escondido dentro dele.
    cy.get(':nth-child(10) > .gap-1 input[type="file"]').selectFile('cypress/fixtures/imagem-teste03.png', { force: true })
    cy.get(':nth-child(16) > .relative > .flex').type(km)
    cy.get(':nth-child(18) > .relative > .flex').type(placa)
    // Lista de itens: escreve o conteúdo e clica em "Adicionar à lista"
    cy.get('.items-end > .flex-col > .relative > .flex').type(descricao)
    cy.contains('button', 'Adicionar à lista').click()
    cy.get('iframe[id^="tiny-react"]').then(($iframe) => {
      cy.wrap($iframe.contents().find('#tinymce'))
        .focus()
        .click()
        .type(observacao, { force: true })
    })
    cy.get('[data-cy="input-slug"]').clear().type(slug)
    cy.get('.border.flex-col > .inline-flex').click()
    // ✅ Validações
    cy.url().should('include', '/conteudos')
  })
})