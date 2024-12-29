# Guia de Configuração do Projeto Divino-Lanches

Este guia explica a configuração do projeto Divino-Lanches, incluindo a finalidade de cada arquivo, o que cada script faz e quando usar, e uma visão geral das tecnologias utilizadas.

## Arquivos de Configuração

### `prettier.config.js`

Este arquivo configura o Prettier, um formatador de código.

```javascript
module.exports = {
  semi: true,
  trailingComma: "all",
  singleQuote: false,
  printWidth: 80,
  tabWidth: 2,
};
```

- **semi**: Adiciona ponto e vírgula no final de cada linha.
- **trailingComma**: Adiciona vírgulas finais onde possível.
- **singleQuote**: Usa aspas duplas para strings.
- **printWidth**: Define a largura máxima da linha.
- **tabWidth**: Define a largura da tabulação como 2 espaços.

### `package.json`

Este arquivo contém metadados sobre o projeto e as dependências necessárias.

```json
{
{
  "name": "divino-lanches",
  "version": "1.0.0",
  "description": "",
  "main": "prettier.config.js",
  "scripts": {
    "start": "node dist/index.js",
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "format": "prettier --write \"src/**/*.{ts,js,json,css,md}\""
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/express": "^5.0.0",
    "@types/node": "^22.10.2",
    "prettier": "^3.4.2",
    "ts-node": "^10.9.2",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.7.2"
  },
  "dependencies": {
    "express": "^4.21.2"
  }
}
```

- **scripts**: Scripts para automação de tarefas:
  - **start**: Executa o arquivo principal compilado.
  - **dev**: Executa o projeto em modo de desenvolvimento com `ts-node-dev`.
  - **build**: Compila o projeto TypeScript.
  - **format**: Formata o código com Prettier.

### `tsconfig.json`

Este arquivo configura o compilador TypeScript.

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

- **compilerOptions**: Opções do compilador TypeScript.
  - **target**: Define a versão alvo do JavaScript (`ES6`).
  - **module**: Define o sistema de módulos (`commonjs`).
  - **outDir**: Diretório de saída para os arquivos compilados (`./dist`).
  - **rootDir**: Diretório raiz do código-fonte (`./src`).
  - **strict**: Habilita verificações estritas.
  - **esModuleInterop**: Habilita interoperabilidade com módulos ES.
  - **skipLibCheck**: Pula verificação de tipos em arquivos de declaração.

## Tecnologias Utilizadas

- **TypeScript**: Um superset tipado de JavaScript que compila para JavaScript simples.
- **ts-node-dev**: Ferramenta que reinicia automaticamente o servidor quando há mudanças no código TypeScript.
- **ESLint**: Ferramenta para identificar e corrigir problemas no código JavaScript/TypeScript.
- **Prettier**: Formatador de código que aplica um estilo consistente.
- **Express**: Framework web para Node.js para criar servidores e APIs.

## Quando Usar Cada Script

- **`npm run start`**: Use para rodar o projeto em produção, executando o código compilado.
- **`npm run dev`**: Use durante o desenvolvimento para rodar o projeto com reinicialização automática.
- **`npm run build`**: Use para compilar o código TypeScript para JavaScript.
- **`npm run lint`**: Use para verificar se há problemas de lint no código.
- **`npm run lint:fix`**: Use para corrigir automaticamente problemas de lint no código.
- **`npm run format`**: Use para formatar o código de acordo com as regras do Prettier.
