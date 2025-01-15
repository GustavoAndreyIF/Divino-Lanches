import ProdutoControles from "../controllers/produtos_controles";
import Carrinho_Controle from "../controllers/carrinhos_controles";
import ClienteControle from "../controllers/clientes_controle";
import db from "../config/db.js";
import * as app from "express";
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

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

router.post('/Registrar', async (req, res) => {
  const { name, email, password } = req.body;
  db.query('SELECT cliente_email FROM tb_clientes WHERE cliente_email = ?', [email], async (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }else{
      mainCliente.criar_cliente(req,res)
    }
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }else{
      res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    }
  })
})

//login

router.post('/Login', async (req,res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM tb_clientes WHERE cliente_email = ?', [email], async (err, results) => {
    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    else{
      if (password === results.cliente_log_senha){
        const token = jwt.sign({ id: results.id_cliente, email: results.cliente_email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
      }else{
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }
    }
  })
})


// Os callbacks das instâncias precisam ser chamadas por arrow, pois caso contrário o referencial this não apontará para o controle

export default router;
