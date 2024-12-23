# Guia de Configuração do Projeto Divino-Lanches

Este guia explica a configuração do projeto Divino-Lanches, incluindo a finalidade de cada arquivo, o que cada script faz e quando usar, e uma visão geral das tecnologias utilizadas.

## Arquivos de Configuração

### `.eslintrc.json`

Este arquivo configura o ESLint, uma ferramenta para identificar e corrigir problemas no código JavaScript/TypeScript.

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": ["@typescript-eslint", "prettier"],
  "rules": {
    "prettier/prettier": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }
    ],
    "no-console": "warn",
    "semi": ["error", "always"],
    "quotes": ["error", "single"]
  }
}
```

- **env**: Define os ambientes onde o código será executado (navegador, ES2021, Node.js).
- **parser**: Define o parser para TypeScript.
- **parserOptions**: Configurações para o parser, incluindo o projeto TypeScript.
- **extends**: Usa configurações recomendadas do ESLint, TypeScript e Prettier.
- **plugins**: Adiciona plugins do TypeScript e Prettier.
- **rules**: Define regras específicas, incluindo a integração com Prettier e boas práticas de codificação.

```javascript
// Lint é uma ferramenta que analisa o código-fonte para encontrar erros, padrões problemáticos, bugs, e inconsistências estilísticas. O objetivo principal do lint é ajudar os desenvolvedores a manterem um código mais limpo, consistente e livre de erros, melhorando assim a qualidade geral do software.
```

### `prettier.config.js`

Este arquivo configura o Prettier, um formatador de código.

```javascript
module.exports = {
  semi: true,
  trailingComma: 'all',
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
  "name": "divino-lanches",
  "version": "1.0.0",
  "description": "",
  "main": "prettier.config.js",
  "scripts": {
    "start": "node dist/index.js",
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "lint": "eslint . --ext .ts,.js",
    "lint:fix": "eslint . --ext .ts,.js --fix",
    "format": "prettier --write \"src/**/*.{ts,js,json,css,md}\""
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/express": "^5.0.0",
    "@types/node": "^22.10.2",
    "@typescript-eslint/eslint-plugin": "^8.18.1",
    "@typescript-eslint/parser": "^8.18.1",
    "eslint": "^9.17.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.2.1",
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
  - **lint**: Verifica o código com ESLint.
  - **lint:fix**: Corrige problemas de lint automaticamente.
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
