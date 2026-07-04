// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Ignora erros de scripts de terceiros (New Relic, Clarity, Google Analytics)
// que tentam usar postMessage após o Cypress limpar a página entre testes.
Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('postMessage')) {
        return false
    }
})