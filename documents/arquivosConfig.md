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
  "name": "divino-lanches",
  "version": "1.0.0",
  "description": "E-commerce site for Divino Lanches",
  "main": "dist/backend/index.js",
  "scripts": {
    "start": "node dist/backend/index.js",
    "dev": "ts-node-dev --respawn --transpile-only src/backend/index.ts",
    "build-backend": "tsc --project tsconfig.backend.json",
    "build-frontend": "tsc --project tsconfig.frontend.json",
    "build": "npm run build-backend && npm run build-frontend",
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
  - **build**: Compila o projeto.
  - **build-backend**: Compila os arquivos do backend.
  - **build-frontend**: Compila os arquivos do frontend.
  - **format**: Formata o código com Prettier.

### `tsconfig.json`

Este arquivo configura o compilador TypeScript.

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "*": ["node_modules/*"]
    }
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

## `compilerOptions`

Opções do compilador TypeScript.

- **target**: Define a versão alvo do JavaScript (`ES2020`).
- **module**: Define o sistema de módulos (`commonjs`).
- **strict**: Habilita verificações estritas.
- **esModuleInterop**: Habilita interoperabilidade com módulos ES.
- **skipLibCheck**: Pula verificação de tipos em arquivos de declaração.
- **forceConsistentCasingInFileNames**: Força consistência de capitalização nos nomes dos arquivos.
- **baseUrl**: Define a base para resolução de módulos não relativos (`.`).
- **paths**: Mapeia importações de módulos para localizações específicas no sistema de arquivos.

## Arquivos de Configuração Específicos

### `tsconfig.backend.json`

Este arquivo estende o `tsconfig.json` principal e adiciona configurações específicas para o backend.
```
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist/backend",
    "rootDir": "./src/backend"
  },
  "include": ["src/backend/**/*"]
}
```

### `tsconfig.frontend.json`

Este arquivo estende o `tsconfig.json` principal e adiciona configurações específicas para o frontend.

```
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist/frontend",
    "rootDir": "./src/frontend"
  },
  "include": ["src/frontend/**/*"]
}
```

## Tecnologias Utilizadas

- **TypeScript**: Um superset tipado de JavaScript que compila para JavaScript simples.
- **ts-node-dev**: Ferramenta que reinicia automaticamente o servidor quando há mudanças no código TypeScript.
- **Prettier**: Formatador de código que aplica um estilo consistente.
- **Express**: Framework web para Node.js para criar servidores e APIs.

## Quando Usar Cada Script

- **`npm run start`**: Use para rodar o projeto em produção, executando o código compilado.
- **`npm run dev`**: Use durante o desenvolvimento para rodar o projeto com reinicialização automática.
- **`npm run build`**: Use para compilar o projeto.
- **`npm run build-backend`**: Use para compilar os arquivos do backend.
- **`npm run build-frontend`**: Use para compilar os arquivos do frontend.
- **`npm run format`**: Use para formatar o código de acordo com as regras do Prettier.