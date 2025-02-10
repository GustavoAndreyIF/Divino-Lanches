# Estrutura de Pastas do Projeto
```
Divino-Lanches/
├── src/
│ ├── backend/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── services/
│ │ ├── middlewares/
│ │ ├── index.ts
│ ├── frontend/
│ │ ├── images/
│ │ │ ├── logo.png
│ │ ├── pages/
│ │ │ ├── home.html
│ │ │ ├── product.html
│ │ ├── scripts/
│ │ │ ├── main.ts
│ │ ├── styles/
│ │ │ ├── main.css
│ │ ├── index.html
├── dist/
│ ├── backend/
│ ├── frontend/
├── package.json
├── tsconfig.json
├── .gitignore
├── README.md
```

## Detalhamento das Pastas e Arquivos

### src/
Esta é a pasta raiz que contém todo o código fonte do projeto.

### backend/
Contém todo o código do servidor (backend).

- **controllers/**: Controladores que lidam com as requisições e respostas. Eles recebem as requisições dos clientes, chamam os serviços necessários e retornam as respostas.
- **models/**: Modelos do banco de dados. Definem a estrutura dos dados que serão salvos e manipulados.
- **routes/**: Definição das rotas da aplicação. Cada rota mapeia uma URL a uma função de controlador específica.
- **services/**: Lógica de negócios, como interações com o banco de dados e outras operações complexas.
- **middlewares/**: Middlewares para manipulação de requisições/respostas. Podem ser usados para autenticação, validação, etc.
- **index.ts**: Ponto de entrada do backend. Este arquivo configura e inicia o servidor Express.

### frontend/
Contém todo o código do cliente (frontend).

- **images/**: Arquivos de imagens.
  - **logo.png**: Exemplo de arquivo de imagem.
- **pages/**: Arquivos HTML das páginas da aplicação.
  - **home.html**: Página inicial.
  - **product.html**: Página de produtos.
- **scripts/**: Arquivos TypeScript para o frontend.
  - **main.ts**: Arquivo principal de script.
- **styles/**: Arquivos CSS para estilização.
  - **main.css**: Arquivo principal de estilo.
- **index.html**: Ponto de entrada HTML principal.

### dist/
Pasta para os arquivos compilados tanto do backend quanto do frontend.

- **backend/**: Código compilado do backend.
- **frontend/**: Código compilado do frontend.

## Configuração do Express para Servir Arquivos Estáticos

No arquivo `src/backend/index.ts`, configuramos o Express para servir os arquivos estáticos do frontend:

```typescript
import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
const port = 3000;

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../../dist/frontend')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../dist/frontend/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

## Passos para Desenvolvimento

### Instalar Dependências:
- Execute `npm install` para instalar todas as dependências listadas no `package.json`.

### Desenvolver o Backend:
- Trabalhe nos arquivos dentro de `src/backend/` para construir a lógica do servidor.
- Use `ts-node-dev` para rodar o servidor em modo de desenvolvimento com o comando `npm run dev`.

### Desenvolver o Frontend:
- Trabalhe nos arquivos dentro de `src/frontend/` para construir a interface do usuário.
- Compile o TypeScript para JavaScript usando `tsc`.

### Build do Projeto:
- Execute `npm run build` para compilar o código TypeScript do backend e frontend para a pasta `dist/`.

### Iniciar o Servidor:
- Execute `npm start` para iniciar o servidor Express e servir os arquivos estáticos do frontend.

## Considerações Finais
- **Organização Clara**: A estrutura de pastas separa bem o backend e o frontend, facilitando a navegação e organização do código.
- **TypeScript no Frontend e Backend**: Permite usar TypeScript tanto no backend quanto no frontend, alinhado com o requisito de usar POO em TypeScript.
- **Configuração do Express**: Configura o servidor para servir arquivos estáticos do frontend, integrando perfeitamente as duas partes da aplicação.