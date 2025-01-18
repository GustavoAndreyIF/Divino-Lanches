import { Produto } from "../models/produto.js";

export class CarrinhoService {
	static adicionarAoCarrinho(produto: Produto): void {
		console.log(`Produto ${produto._nome} adicionado ao carrinho.`);
	}

	static removerDoCarrinho(produto: Produto): void {
		console.log(`Produto ${produto._nome} removido do carrinho.`);
	}
	static getItemCount(): number {
		return 5;
	}
}
