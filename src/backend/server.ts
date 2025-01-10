// filepath: /home/gustavoady/Documentos/cloneRepoGithub/Divino-Lanches/src/backend/index.ts
import express from "express";
import path from "path";

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "../../dist/frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/frontend/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
