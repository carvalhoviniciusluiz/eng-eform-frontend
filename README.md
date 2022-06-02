# Eng-Eform-FrontEnd
Este projeto está arquitetado no framework **Next.js**, [leia a documentação](https://nextjs.org/docs/getting-started) para mais detalhes ou veja o resumo existente na sessão `Configurações > Next.js`.

__IMPORTANTE__ existe uma demo publicada no heroku [clicar aqui](https://eform.herokuapp.com/), o primeiro acesso pode levar até 30s para ser estabelecido devido a conta ser gratuita.

- Conteúdo
    - [Configurações](#configs)
        - Dotenv
        - Scripts
        - Typescript
        - Nextjs
    - [Sobre o projeto](#about)
        - [Requisitos](#requirements)
        - [Instalação](#install)
        - [Rodando o Projeto](#run)
        - [Projeto Endpoints](#endpoints)
        - [Credenticial de Acesso](#credentials)

## Configurações <a name="configs"></a>

<details>
  <summary><b>Dotenv</b> (click to show)</summary>

O projeto depende do arquivo `.env` que deve existir na pasta raiz. Este arquivo não é versionado apesar do arquivo `.env.sample` ser.

__DETALHAMENTO__

| Variável | Descrição |
| ------ | ------ |
| NEXT_PUBLIC_BASE_URL | Define a url de acesso ao banco de dados.

</details>

<details>
  <summary><b>Scripts</b> (click to show)</summary>

O projeto conta com diversos scripts de linha de comando para uso via terminal, i.e., `yarn <SCRIPT>` ou `npm run <SCRIPT>`

__DETALHAMENTO__

| Script | Descrição |
| ------ | ------ |
| build | Compila o projeto gerando na pasta dist os scripts para produção |
| lint | Roda o ESLINT padrão do Nextjs |
| start | Inicia o servidor sem hot auto-reload |
| dev | Inicia o servidor de desenvolvimento com hot auto-reload |
</details>

<details>
  <summary><b>Typescript</b> (click to show)</summary>

Esta arquitetura utiliza [**Typescript**](https://www.typescriptlang.org/) como linguagem de codificação. Todas as features disponíveis pelo framework estão em Typescript e são altamente extensiveis, o que torna todo o código produzido super flexível para o desenvolvimento de softwares.

Apesar de adicionar uma estrutura diferente há sintaxe do javascript e que muitos programadores poderão não estar habitualidos a usar, TS trás vários benefícios a codificação:
- Suporte [intellisense](https://code.visualstudio.com/docs/editor/intellisense) para prover auto-completo, informações de parametros, informações rápidas, lista de membros, etc., tudo a nível de IDEs de código-fonte.
- Melhor tooling para debug do desenvolvedor, fazendo verificações de erros e garantias de tipagens ao codificar.
- Adição de suporte para design patterns como Abstract, Factories, Decorators, Singles, etc., para facilitar a gerência das dependências de forma padronizada e reutilizável.
- Fornece um código mais confiável e explícito, menos sucetível a erros durante a programação.
- Entre outros.

O projeto já possui um linter e o prettier configurados para garantir boa parte da formatação desejada no padrão de código definido. Arquivos de configuração `.prettierrc` e `.eslintrc.js` explicitam as configurações que dentre as poucas decisões definem: **utilização obrigatória de aspas SIMPLES** e a **não-utilização de ponto e vírgula**.

Um arquivo `.editorconfig` também dita as configurações acerca da formatação de arquivos: **identação com 2 espaços**, com **codificação em UTF-8** e com **linha em branco ao final dos arquivos**.
</details>

<details>
  <summary><b>NextJs</b> (click to show)</summary>

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
</details>

## Sobre o projeto <a name="about"></a>

### **Requisitos:**

- [NodeJs ``>17.0.0``](https://nodejs.org/en/)

- [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

### **Instalação:** <a name="install"></a>
No terminal faça:
```bash
yarn
```

### **Rodando o Projeto:** <a name="run"></a>

Na linha de comando faça:
```bash
yarn dev
```

__NOTA__: caso tenha dúvidas veja a sessão `Configurações > Dotenv` & `Configurações > Scripts`

### **Projeto Endpoints:** <a name="endpoints"></a>

#### Questionarios
*   `#GET /` - Tela publica, exibe todos formulários cadastrados e publicados de todos os usuários registrados.
*   `#GET /{id}` - Tela publica, exibe um formulário específico apra ser alimentado.

#### Auth
*   `#GET /login` - Tela de login.
*   `#GET /register` - Tela para registar uma conta de acesso.

#### Gerenciador
*   `#GET /forms` - Tela autenticada, exibe todas as opções de cadastro para se criar um formulário.

### **Credenticial de Acesso:** <a name="credentials"></a>

__IMPORTANTE__: Para facilitar o primeiro acesso está disponível a conta de usuário válido abaixo:

Dados de acesso:

| Param | Value
|---------|--------------
| Email | carvalho.viniciusluiz@gmail.com
| PASSWORD | Ch@nge123

__OBS__ Caso não queira a conta padrão, use a tela de cadastro de usuários para registrar uma conta nova.

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2022-present
