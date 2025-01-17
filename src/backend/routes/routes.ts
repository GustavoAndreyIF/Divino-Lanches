import ProdutoControles from "../controllers/produtos_controles";
import Carrinho_Controle from "../controllers/carrinhos_controles";
import ClienteControle from "../controllers/clientes_controle";
import db from "../config/db.js";
import * as app from "express";

let router = app.Router();

let mainProdutos = new ProdutoControles();
let mainCarrinhos = new Carrinho_Controle();
let mainCliente = new ClienteControle();

router.use(app.urlencoded({ extended: true }));
router.get("/Produtos", (req, res) =>
  mainProdutos.listarTodosProdutos(req, res),
);
router.get("/Produtos/:categoria", (req, res) =>
  mainProdutos.listarProdutosCategoria(req, res),
);
router.put("/AlterarProdutoEstoque/:id", (req, res) =>
  mainProdutos.alterarQuantidadeEstoque(req, res),
);// produtos


router.get("/ProdutosCarrinho/:id", (req, res) => 
  mainCarrinhos.get_Carrinho_cliente(req, res),
);
router.post("/CriarProdutoCarrinho/", (req, res) =>
  mainCarrinhos.create_Produto_Carrinho(req, res),
);
router.put("/ProdutoCarrinhoAltQt", (req, res) =>
  mainCarrinhos.alterar_carrinho_Produto_Qt(req, res),
);
router.delete("/DeletarProdutoCarrinho/:id", (req, res) =>
  mainCarrinhos.deletar_Produto_Carrinho(req, res),
);

//registro

router.post('/Registrar', async (req, res) =>
  mainCliente.verificar_email(req,res),
);

//login

router.post('/Login', async (req,res) => 
  mainCliente.logar_cliente(req,res),
);


// Os callbacks das instâncias precisam ser chamadas por arrow, pois caso contrário o referencial this não apontará para o controle

export default router;
