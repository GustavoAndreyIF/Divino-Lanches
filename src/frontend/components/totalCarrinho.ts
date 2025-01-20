import { ProdutoCarrinho } from "../models/produtoCarrinho.js";
import { ProdutoService } from "../services/produtoService.js";
import { ApiService } from "../services/apiService.js";

export class TotalCarrinho {
    private produtoService: ProdutoService;

    constructor() {
        const apiService = new ApiService("http://localhost:3000");
        this.produtoService = new ProdutoService(apiService);
    }

    async calcularTotal(produtosCarrinho: ProdutoCarrinho[]): Promise<number> {
        let total = 0;
        for (const produtoCarrinho of produtosCarrinho) {
            const produto = await this.produtoService.getProdutoPorId(produtoCarrinho._idProduto);
            total += produto._preco * produtoCarrinho._quantia;
        }
        return total;
    }

    async render(produtosCarrinho: ProdutoCarrinho[]): Promise<void> {
        const total = await this.calcularTotal(produtosCarrinho);
        const valorTotalElement = document.getElementById("valorTotal");
        if (valorTotalElement) {
            valorTotalElement.innerHTML = `Valor Total: R$ ${total.toFixed(2)}`;
        } else {
            console.error("Elemento com ID 'valorTotal' não encontrado.");
        }
    }
}