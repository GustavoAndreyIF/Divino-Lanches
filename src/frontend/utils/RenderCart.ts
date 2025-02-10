import { CardProduto } from "../components/CardCartProduct.js";
import { ProdutoCarrinho } from "../models/produtoCarrinho.js";
import { ApiService } from "../services/ServiceAPI.js";
import { CarrinhoService } from "../services/ServiceCart.js";
import { ProdutoService } from "../services/ServiceProduct.js";

export class Carrinho {
	private cardProduto: CardProduto;
	private carrinhoService: CarrinhoService;
	private produtoService: ProdutoService;

	constructor() {
		const apiService = new ApiService("http://localhost:3000");
		this.cardProduto = new CardProduto();
		this.carrinhoService = new CarrinhoService(apiService);
		this.produtoService = new ProdutoService(apiService);
	}

	public async carregarProdutos(): Promise<void> {
		let userdataString: string = localStorage.getItem("user") ?? "";
		const idCliente = parseInt(JSON.parse(userdataString)["id_cliente"] || "0", 10);
		const produtosHtml = await this.cardProduto.render(idCliente);
		this.renderProdutos(produtosHtml);

		const produtosCarrinho: ProdutoCarrinho[] =
			await this.carrinhoService.getCarrinhoCliente(idCliente);
		await this.renderTotal(produtosCarrinho);
	}

	private renderProdutos(produtosHtml: string): void {
		const carrinhoProdutoContainer = document.getElementById("carrinhoProduto");
		if (carrinhoProdutoContainer) {
			carrinhoProdutoContainer.innerHTML = produtosHtml;
		} else {
			console.error("Contêiner do carrinho não encontrado");
		}
	}

	private async calcularTotal(produtosCarrinho: ProdutoCarrinho[]): Promise<number> {
		let total = 0;
		for (const produtoCarrinho of produtosCarrinho) {
			const produto = await this.produtoService.getProdutoPorId(
				produtoCarrinho._idProduto
			);
			total += produto._preco * produtoCarrinho._quantia;
		}
		return total;
	}

	private async renderTotal(produtosCarrinho: ProdutoCarrinho[]): Promise<void> {
		const total = await this.calcularTotal(produtosCarrinho);
		const valorTotalElement = document.getElementById("valorTotal");
		if (valorTotalElement) {
			valorTotalElement.innerHTML = `Valor Total: R$ ${total.toFixed(2)}`;
		} else {
			console.error("Elemento com ID 'valorTotal' não encontrado.");
		}
	}
	public async renderProdutoTotal(produtoCarrinho: ProdutoCarrinho): Promise<void> {
		const produto = await this.produtoService.getProdutoPorId(
			produtoCarrinho._idProduto
		);
		const valorTotalElement = document.getElementById(
			`valorTotal-${produtoCarrinho._id}`
		);
		if (valorTotalElement) {
			valorTotalElement.innerHTML = `
                <small class="text-secondary">Valor Unitário: R$ ${produto._preco.toFixed(
					2
				)}</small><br>
                <span class="text-dark">Valor Total: R$ ${(
					produto._preco * produtoCarrinho._quantia
				).toFixed(2)}</span>
            `;
		} else {
			console.error(
				`Elemento com ID 'valorTotal-${produtoCarrinho._id}' não encontrado.`
			);
		}
	}
}
