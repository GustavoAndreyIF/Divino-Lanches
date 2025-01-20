import { CardProduto } from "./cardProduto.js";

export class Carrinho {
	private cardProduto: CardProduto;

	constructor() {
		this.cardProduto = new CardProduto();
		this.carregarProdutos();
	}

	private async carregarProdutos(): Promise<void> {
		let userdataString: string = localStorage.getItem("user") ?? "";
		const idCliente = parseInt(JSON.parse(userdataString)["id_cliente"] || "0", 10);
		const produtosHtml = await this.cardProduto.render(idCliente);
		this.render(produtosHtml);
	}

	private render(produtosHtml: string): void {
		const carrinhoProdutoContainer = document.getElementById("carrinhoProduto");
		if (carrinhoProdutoContainer) {
			carrinhoProdutoContainer.innerHTML = produtosHtml;
		} else {
			console.error("Contêiner do carrinho não encontrado");
		}
	}
}
