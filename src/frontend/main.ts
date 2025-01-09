import { ApiService } from './services/apiService';
import { ProdutoService } from './services/produtoService';
import { DomProduto } from './utils/domProduto';

(async () => {
    const apiService = new ApiService('http://localhost:3000');
    const produtoService = new ProdutoService(apiService);

    try {
        const produtos = await produtoService.getTodosProdutos();
        DomProduto.renderProdutos(produtos);
    } catch (error) {
        console.error('Erro ao consumir a API:', error);
    }
})();