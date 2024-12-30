import express, { Request, Response } from 'express';
import path from 'path';
import router from './routes/routes.js';
import './config/db.js';

const app = express();
const port = 3000;

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../../dist/frontend')));

app.use('/', router); // testes sobre rotas

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../dist/frontend/index.html'));
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});