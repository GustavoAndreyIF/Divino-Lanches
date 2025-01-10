import { ApiService } from "./services/apiService.js";
import { ProdutoService } from "./services/produtoService.js";
import { ProdutoController } from "./controllers/produtoController.js";
import { DomProduto } from "./utils/domProduto.js";

(async () => {
	const apiService = new ApiService("http://localhost:3000");
	const produtoService = new ProdutoService(apiService);
	const produtoController = new ProdutoController(produtoService);

	try {
		const produtos = await produtoService.getTodosProdutos();
		DomProduto.renderProdutos(produtos);
	} catch (error) {
		console.error("Erro ao consumir a API:", error);
	}

	(window as any).produtoController = produtoController;
})();
