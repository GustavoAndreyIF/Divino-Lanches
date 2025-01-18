import { CarrinhoProduto } from "./carrinhoProduto.js";
import { CarrinhoControles } from "./carrinhoControles.js";
import { CarrinhoService } from "../services/carrinhoService.js";

export class Carrinho {
	private produtos: CarrinhoProduto[] = [];
	private controles: CarrinhoControles;

	constructor() {
		this.controles = new CarrinhoControles();
		this.carregarProdutos();
	}

	private carregarProdutos(): void {
		const produtos = CarrinhoService.getProdutos();
		this.produtos = produtos.map((produto) => new CarrinhoProduto(produto));
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
	}
}
