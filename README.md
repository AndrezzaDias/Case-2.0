#### 🏁 Automação - Autódromo

Projeto de automação de testes E2E utilizando **Cypress**.

---
##### Pré-requisitos

- Node.js 18+
- npm

---

##### Instalação
```bash
npm install
```

---

#### Como rodar os testes

Interface gráfica:
```bash
npx cypress open
```

Headless (sem interface):
```bash
npx cypress run
```

Rodar uma pasta específica:
```bash
npx cypress run --spec "cypress/e2e/01-login/**"
npx cypress run --spec "cypress/e2e/02-contas/**"
npx cypress run --spec "cypress/e2e/03-sites/**"
npx cypress run --spec "cypress/e2e/04-conteudos/**"
```
---
## 📁 Estrutura do Projeto
```
AUTOMAÇÃO/
├── cypress/
│   ├── e2e/
│   │   ├── 01-login/
│   │   │   └── login.cy.js
│   │   ├── 02-contas/
│   │   │   └── buscar-conta.cy.js
│   │   ├── 03-sites/
│   │   │   └── sites.cy.js
│   │   └── 04-conteudos/
│   │       ├── cadastrando-conteudos.cy.js
│   │       └── cadastrando-seminovos.cy.js
│   ├── fixtures/
│   │   └── imagem-teste.png
│   └── support/
│       └── commands.js
├── cypress.config.js
├── cypress.env.json   ← não versionado
├── .gitignore
└── package.json
```

---

##### Comandos Customizados

| Comando | Descrição |
|---|---|
| `cy.login()` | Realiza login com as credenciais do `cypress.env.json` |

---

#### Cenários de Teste
---
##### Feature: Login
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

---

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


##### Feature: Conteúdos
```gherkin
Feature: Cadastro de Conteúdo de Blog

  Como um usuário autenticado
  Quero cadastrar um novo conteúdo de Blog
  Para que ele fique disponível na plataforma

  Scenario: Cadastrar conteúdo de Blog com sucesso (executa 3 vezes com dados aleatórios)
    Given que estou logado na plataforma
    And busquei pela conta "Teste QA"
    And estou na página de Conteúdos
    And cliquei na categoria "Blog"
    And cliquei em "Novo item"
    When preencho o nome com um valor aleatório
    And faço upload da imagem de capa
    And preencho o título com um valor aleatório
    And seleciono a categoria "Lançamentos / Guia de Compra"
    And preencho o conteúdo da postagem com um texto aleatório
    And seleciono o autor "Qa"
    And preencho o slug com um valor aleatório
    And clico em "Salvar"
    Then devo ser redirecionado para a lista de conteúdos
    And o conteúdo criado deve aparecer na listagem com o nome preenchido
    And a categoria "Lançamentos / Guia de Compra" deve estar visível na listagem
```
### Feature: Conteúdos — Seminovos
```gherkin
Feature: Cadastro de Conteúdo de Seminovos

  Como um usuário autenticado
  Quero cadastrar um novo conteúdo de Seminovos
  Para que ele fique disponível na plataforma

  Scenario: Cadastrar conteúdo de Seminovos com sucesso
    Given que estou logado na plataforma
    And busquei pela conta "Teste QA"
    And estou na página de Conteúdos
    And cliquei na categoria "Seminovos"
    And cliquei em "Novo item"
    When preencho o título com um valor aleatório
    And preencho a descrição com um valor aleatório
    And preencho o preço com um valor aleatório
    And faço upload da imagem de capa
    And preencho a marca com um valor aleatório
    And preencho o modelo do veículo com um valor aleatório
    And preencho o ano com um valor aleatório
    And preencho o KM com um valor aleatório
    And preencho as observações do vendedor com um texto aleatório
    And preencho o slug com um valor aleatório
    And clico em "Salvar"
    Then devo ser redirecionado para a lista de conteúdos
    And o conteúdo criado deve aparecer na listagem com o título preenchido
```
---

#### Dependências

| Pacote | Versão | Descrição |
|---|---|---|
| `cypress` | `^15.12.0` | Framework de testes E2E |
| `@faker-js/faker` | latest | Geração de dados aleatórios |