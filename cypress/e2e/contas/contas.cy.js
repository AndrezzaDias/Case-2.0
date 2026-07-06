describe('Contas - Smoke Test', () => {
    beforeEach(() => {
        cy.login()
    })

    it('O total de contas bate com a soma de contas de clientes e contas de teste', () => {
        cy.get('.text-2xl.text-foreground.font-bold').then(($valores) => {
            const contasDeClientes = parseInt($valores.eq(1).text())
            const totalDeContasDeTeste = parseInt($valores.eq(2).text())
            const totalDeContas = parseInt($valores.eq(3).text())

            expect(totalDeContas).to.eq(contasDeClientes + totalDeContasDeTeste)
        })
    })

    it('A tabela de contas carrega com itens', () => {
        cy.get('.\\[\\&_tr\\:last-child\\]\\:border-0').find('tr').should('have.length.greaterThan', 0)
    })
})
