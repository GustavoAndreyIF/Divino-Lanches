import ProdutoControles from "../controllers/produtos_controles";
import ProdutosModel from "../models/produtos_model";

import * as app from "express";
let router = app.Router();

let mainProdutos = new ProdutoControles();
router.use(app.urlencoded({ extended: true }));
router.get("/Produtos", (req, res) =>
  mainProdutos.listarTodosProdutos(req, res),
);
router.get("/Produtos/:categoria", (req, res) =>
  mainProdutos.listarProdutosCategoria(req, res),
);
router.put("/AlterarProdutoEstoque/:id", (req, res) =>
  mainProdutos.alterarQuantidadeEstoque(req, res),
);
// Os callbacks das instâncias precisam ser chamadas por arrow, pois caso contrário o referencial this não apontará para o controle

export default router;
