import { CarrinhoProduto } from "./carrinhoProduto.js";
import { CarrinhoControles } from "./carrinhoControles.js";
import { CarrinhoService } from "../services/carrinhoService.js";
import { ProdutoCarrinho } from "../models/produtoCarrinho.js";
import { ApiService } from "../services/apiService.js";

export class Carrinho {
    private produtos: CarrinhoProduto[] = [];
    private controles: CarrinhoControles;
    private carrinhoService: CarrinhoService;

    constructor() {
        const apiService = new ApiService("http://localhost:3000");
        this.carrinhoService = new CarrinhoService(apiService);
        this.controles = new CarrinhoControles();
        this.carregarProdutos();
    }

    private async carregarProdutos(): Promise<void> {
        const idCliente = parseInt(localStorage.getItem("id_cliente") || "0", 10);
        const produtosCarrinho = await this.carrinhoService.getCarrinhoCliente(idCliente);
        this.produtos = produtosCarrinho.map(produtoCarrinho => new CarrinhoProduto(produtoCarrinho));
        this.render();
    }

    private render(): void {
        const carrinhoProdutoContainer = document.getElementById("carrinhoProduto");
        if (carrinhoProdutoContainer) {
            carrinhoProdutoContainer.innerHTML = this.produtos
                .map((produto) => produto.render())
                .join("");
        }

        const carrinhoControlesContainer = document.getElementById("carrinhoControles");
        if (carrinhoControlesContainer) {
            carrinhoControlesContainer.innerHTML = this.controles.render();
        }

        this.addEventListeners();
    }

    private addEventListeners(): void {
        this.produtos.forEach(produto => {
            const editarButton = document.getElementById(`editar-${produto.produtoCarrinho._id}`);
            const deletarButton = document.getElementById(`deletar-${produto.produtoCarrinho._id}`);

            if (editarButton) {
                editarButton.addEventListener("click", () => this.editarProduto(produto.produtoCarrinho));
            }

            if (deletarButton) {
                deletarButton.addEventListener("click", () => this.deletarProduto(produto.produtoCarrinho._id));
            }
        });

        const editarCarrinhoButton = document.getElementById("editarCarrinho");
        const finalizarCompraButton = document.getElementById("finalizarCompra");

        if (editarCarrinhoButton) {
            editarCarrinhoButton.addEventListener("click", () => this.editarCarrinho());
        }

        if (finalizarCompraButton) {
            finalizarCompraButton.addEventListener("click", () => this.finalizarCompra());
        }
    }

    private editarProduto(produtoCarrinho: ProdutoCarrinho): void {
        // Implementar lógica para editar produto
    }

    private async deletarProduto(idProdutoCarrinho: number): Promise<void> {
        await this.carrinhoService.deletarProdutoCarrinho(idProdutoCarrinho);
        this.carregarProdutos();
    }

    private editarCarrinho(): void {
        // Implementar lógica para editar carrinho
    }

    private finalizarCompra(): void {
        // Implementar lógica para finalizar compra
    }
}