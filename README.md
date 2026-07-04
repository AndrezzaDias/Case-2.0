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

Rodar um spec específico:
```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
npx cypress run --spec "cypress/e2e/criar-site.cy.js"
npx cypress run --spec "cypress/e2e/envio-lead.cy.js"
```
---
## 📁 Estrutura do Projeto
```
AUTOMAÇÃO/
├── cypress/
│   ├── e2e/
│   │   ├── login.cy.js
│   │   ├── sidebar.cy.js
│   │   ├── workspace-site.cy.js
│   │   ├── sidebar-painel-controle.cy.js
│   │   ├── contas.cy.js
│   │   ├── criar-site.cy.js
│   │   └── envio-lead.cy.js
│   ├── fixtures/
│   │   └── imagem-teste.png
│   └── support/
│       ├── commands.js
│       └── e2e.js
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
| `cy.acessarContaTeste()` | Faz login, busca e acessa a conta "Testes Automatizados QA [Não Alterar]" |
| `cy.acessarPainelDoSite()` | Acessa a conta de teste e entra no Painel de Controle do site "Site do Zero" |

---

##### Configurações relevantes (`cypress.config.js`)

| Opção | Motivo |
|---|---|
| `chromeWebSecurity: false` | Necessário para testes que navegam entre domínios diferentes (ex: site público → painel admin), como em `envio-lead.cy.js` |
| `pageLoadTimeout: 120000` | Dá mais margem para o carregamento em transições entre domínios |

Erros de scripts de terceiros (New Relic, Clarity, Google Analytics) que disparam `postMessage` após o Cypress limpar a página entre testes são ignorados via `Cypress.on('uncaught:exception', ...)` em `cypress/support/e2e.js`.

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

##### Feature: Sidebar - Área Administrativa
```gherkin
Feature: Validação da sidebar da Área Administrativa

  Como um usuário autenticado
  Quero ver todos os elementos da sidebar administrativa
  Para garantir que nada quebrou em um deploy

  Scenario: Exibição do logo e label
    Given que estou logado na plataforma
    Then devo ver o logo da Autódromo
    And devo ver o label "Área Administrativa"

  Scenario: Exibição dos itens principais do menu
    Then devo ver os itens Contas, Administradores, Tipos de conteúdo, Integradores e Paddock

  Scenario: Exibição do menu Templates com seus submenus
    When clico no menu "Templates"
    Then devo ver os itens Sites, Páginas e Módulos

  Scenario: Exibição da seção Outros
    Then devo ver os itens Central de Ajuda e Sair
```

##### Feature: Sidebar - Workspace do Site
```gherkin
Feature: Validação da sidebar de Workspace e da tela de Sites

  Como um usuário autenticado em uma conta
  Quero ver todos os elementos da sidebar de Workspace
  Para garantir que nada quebrou em um deploy

  Scenario: Exibição dos itens do menu Workspace
    Given que acessei a conta de teste
    Then devo ver os itens Sites, Conteúdos, Unidades, Configurações, Integradores e Paddock

  Scenario: Exibição do menu Leads com seus submenus
    When clico no menu "Leads"
    Then devo ver os itens Listagem e Equipes

  Scenario: Exibição dos itens da Área Administrativa
    Then devo ver os itens Contas, Administradores, Templates e Paddock

  Scenario: Exibição dos elementos da tela de Sites
    Then devo ver o título, o botão "Novo site", a busca, os filtros e o card do site existente
```

##### Feature: Sidebar - Painel de Controle do Site
```gherkin
Feature: Validação da sidebar do Painel de Controle de um site

  Como um usuário autenticado
  Quero ver todos os elementos da sidebar do Painel de Controle
  Para garantir que nada quebrou em um deploy

  Scenario: Exibição do nome do site e itens de configuração
    Given que acessei o Painel de Controle do site de teste
    Then devo ver o nome do site e os itens Painel de controle, Conteúdos, Informações, Unidades, WhatsApp, Integrações e Domínio

  Scenario: Exibição do menu Formulários com seus submenus
    When clico no menu "Formulários"
    Then devo ver os itens Cookies, Scripts e Ações sensíveis

  Scenario: Exibição da seção Global
    Then devo ver os itens Header e Footer
```

---

##### Feature: Contas (Smoke Test)
```gherkin
Feature: Consistência da tela de Contas

  Como um usuário autenticado
  Quero garantir que os números e a listagem de contas carregam corretamente
  Para pegar quebras em um deploy

  Scenario: Consistência do total de contas
    Given que estou logado na plataforma
    Then o valor de "Total de contas" deve ser igual à soma de "Contas de clientes" e "Total de contas de teste"

  Scenario: Carregamento da tabela de contas
    Then a tabela de contas deve conter ao menos uma linha
```

---

##### Feature: Criar site
```gherkin
Feature: Criação e exclusão de site

  Como um usuário autenticado
  Quero criar um novo site do zero
  Para garantir que o fluxo de criação de sites funciona

  Scenario: Criar e excluir um site com sucesso
    Given que acessei a conta de teste
    When clico em "Novo site"
    And preencho o título do site
    And avanço para a próxima etapa
    And seleciono o template vazio
    Then devo ser redirecionado para o editor do site ("/builder")
    And devo ver "Personalize seu Header"
    When volto para o Painel de Controle e salvo as alterações
    Then o site deve aparecer com o nome correto
    When excluo o site criado, confirmando o nome
    Then devo ver a mensagem de exclusão com sucesso
```

##### Feature: Envio de Lead
```gherkin
Feature: Envio de lead pelo site público

  Como um visitante do site
  Quero preencher o formulário de conversão de lead
  Para que meus dados cheguem até a equipe comercial

  Scenario: Enviar lead com sucesso e conferir na listagem
    Given que estou no site público do cliente
    When aceito os cookies
    And preencho Nome, E-mail e Telefone
    And marco a preferência de contato por e-mail
    And clico em "Enviar"
    Then a requisição de conversão deve retornar sucesso (200/201/202)
    And o corpo enviado deve conter o nome, e-mail e telefone informados
    And devo ver a mensagem "Obrigado!"
    When acesso a listagem de Leads no painel admin
    Then o lead enviado deve aparecer na listagem
```

---

#### Dependências

| Pacote | Versão | Descrição |
|---|---|---|
| `cypress` | `^15.12.0` | Framework de testes E2E |
| `@faker-js/faker` | latest | Geração de dados aleatórios |
