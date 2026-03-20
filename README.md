# 🏁 Automação - Autódromo

Projeto de automação de testes E2E utilizando **Cypress**.

---

## 📋 Pré-requisitos

- Node.js 18+
- npm

## ⚙️ Instalação

npm install

##  Como rodar os testes ▶️

Interface gráfica: npx cypress open

Modo headless: npx cypress run

#### Cenários de Teste

```gherkin
Feature: Login no sistema

  Como um usuário cadastrado
  Quero realizar login na plataforma
  Para acessar a área administrativa

  Scenario: Login com sucesso
    Given que estou na página de login
    When preencho o campo de e-mail com um e-mail válido
    And preencho o campo de senha com uma senha válida
    And clico no botão de entrar
    Then devo ser redirecionado para a página de contas
    And a URL deve conter "/contas"

  Scenario: Login com senha incorreta
    Given que estou na página de login
    When preencho o campo de e-mail com um e-mail válido
    And preencho o campo de senha com uma senha inválida
    And clico no botão de entrar
    Then devo ver uma mensagem de erro

  Scenario: Login com campos vazios
    Given que estou na página de login
    When clico no botão de entrar sem preencher os campos
    Then devo ver uma mensagem de erro
```  

##### Feature: Contas
```gherkin
Feature: Buscar conta

  Como um usuário autenticado
  Quero buscar uma conta pelo nome
  Para acessar os sites dessa conta

  Scenario: Buscar conta por nome com sucesso
    Given que estou logado na plataforma
    And estou na página de contas
    When busco pelo nome "Teste QA"
    And clico na conta encontrada
    Then devo ser redirecionado para a página de sites da conta
    And a URL deve conter "/sites"
```    
    
## 📁 Estrutura do Projeto

AUTOMAÇÃO/
├── cypress/
│   ├── e2e/
│   │   ├── login/
│   │   │   └── login.cy.js
│   │   └── contas/
│   │       └── buscar-conta.cy.js
│   ├── fixtures/
│   └── support/
│       └── commands.js
├── cypress.config.js
├── cypress.env.json   ← não versionado
├── .gitignore
└── package.json


