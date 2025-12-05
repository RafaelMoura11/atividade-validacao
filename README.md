# 🧪 Testes Automatizados -- Plataforma de Análise de Dados

Este repositório contém o código e os testes desenvolvidos para a
atividade da disciplina, incluindo testes **unitários (Jest)** e
**funcionais (Selenium WebDriver)**, além de automação via **GitHub
Actions**.

------------------------------------------------------------------------

## 📦 Tecnologias Utilizadas

-   Node.js
-   Jest
-   Selenium WebDriver
-   ChromeDriver
-   GitHub Actions

------------------------------------------------------------------------

## 📁 Estrutura do Projeto

    /app
      /src
        /utils
          filterHelpers.js

      /tests
        example.test.js
        filterHelpers.test.js
        functional.selenium.mjs

      package.json
      README.md

    /.github
      /workflows
        ci.yml

------------------------------------------------------------------------

## ▶️ Como Executar o Projeto

### 1. Instalar dependências

``` bash
cd app
npm install
```

------------------------------------------------------------------------

## 🧪 Rodando os Testes

### ▶️ Testes Unitários (Jest)

``` bash
npm test
```

### ▶️ Testes Funcionais (Selenium WebDriver)

Certifique-se de que a plataforma está rodando na URL configurada no
arquivo:

`tests/functional.selenium.mjs`

Depois execute:

``` bash
npm run test:functional
```

------------------------------------------------------------------------

## 🤖 Integração Contínua (GitHub Actions)

O arquivo `.github/workflows/ci.yml` faz:

-   Instalação do Node\
-   Instalação de dependências\
-   Execução dos testes unitários automaticamente em *push* e *pull
    requests*

Isso garante que o código seja sempre validado antes de merge.

------------------------------------------------------------------------

## 👥 Autores

Projeto desenvolvido como parte da disciplina de Qualidade e Testes de
Software.

-   Rafael Moura
-   André Nascimento

