// filepath: src/server.ts

import express from "express";
import path from "path";

const app = express();
const PORT = 3000;

// Servir arquivos estáticos da pasta dist
app.use(express.static(path.join(__dirname, "../dist")));

// Rota para servir o index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
