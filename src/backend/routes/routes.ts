import ProdutoControles from "../controllers/produtos_controles";
import Carrinho_Controle from "../controllers/carrinhos_controles";
import ClienteControle from "../controllers/clientes_controle";
import db from "../config/db.js";
import * as app from "express";
import PedidoControle from "../controllers/pedidos_controles";

let router = app.Router();

let mainProdutos = new ProdutoControles();
let mainCarrinhos = new Carrinho_Controle();
let mainCliente = new ClienteControle();
let mainPedidos = new PedidoControle(mainProdutos, mainCarrinhos);

router.use(app.urlencoded({ extended: true }));
router.get("/Produtos", (req, res) =>
  mainProdutos.listarTodosProdutos(req, res),
);
router.get("/Produtos/:categoria", (req, res) =>
  mainProdutos.listarProdutosCategoria(req, res),
);
router.put("/AlterarProdutoEstoque", (req, res) =>
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
  mainCliente.criar_cliente(req,res),
);

//login

router.post('/Login', async (req,res) => 
  mainCliente.logar_cliente(req,res),
);


//Pedidos

router.get('/getPedidos', async (req, res) =>
  mainPedidos.pegar_pedido(req, res),
);

router.post('/criarpedido', async (req, res) => 
  mainPedidos.criar_pedido(req, res),
)

router.delete('/deletarpedido/:id_pedido', async (req, res) => 
  mainPedidos.deletar_pedido(req, res),
)

router.put('/alterarStatusPedido', async (req, res) =>
  mainPedidos.alterar_status(req, res),
)
// Os callbacks das instâncias precisam ser chamadas por arrow, pois caso contrário o referencial this não apontará para o controle

export default router;
