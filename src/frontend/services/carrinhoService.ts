import { Produto } from "../models/produto.js";
import { ApiService } from "./apiService.js";

/**
 * Esta classe fornece serviços relacionados ao carrinho de compras, incluindo a adição, remoção e sincronização de produtos.
 *
 * @class CarrinhoService
 */
export class CarrinhoService {
	// Chave usada para armazenar os itens do carrinho no localStorage
	private static readonly STORAGE_KEY = "cartItems";
	// Instância do serviço de API para fazer requisições HTTP
	private static apiService = new ApiService("http://localhost:3000");

	/**
	 * Obtém os produtos armazenados no carrinho a partir do localStorage.
	 * @returns Um array de objetos Produto.
	 */
	static getProdutos(): Produto[] {
		// Obtém os itens armazenados no localStorage usando a chave definida
		const storedItems = localStorage.getItem(this.STORAGE_KEY);
		// Retorna os itens como um array de objetos Produto ou um array vazio se não houver itens armazenados
		return storedItems ? JSON.parse(storedItems) : [];
	}

	/**
	 * Adiciona um produto ao carrinho e sincroniza o carrinho com o servidor.
	 * @param produto - O objeto Produto a ser adicionado ao carrinho.
	 */
	static adicionarAoCarrinho(produto: Produto): void {
		// Obtém os produtos atuais do carrinho
		const items = this.getProdutos();
		// Adiciona o novo produto ao array de produtos
		items.push(produto);
		// Salva os itens atualizados no localStorage
		this.saveItems(items);
		// Sincroniza o carrinho com o servidor
		this.syncCarrinho();
		// Loga no console que o produto foi adicionado ao carrinho
		console.log(`Produto ${produto._nome} adicionado ao carrinho.`);
	}

	/**
	 * Remove um produto do carrinho e sincroniza o carrinho com o servidor.
	 * @param produto - O objeto Produto a ser removido do carrinho.
	 */
	static removerDoCarrinho(produto: Produto): void {
		// Obtém os produtos atuais do carrinho
		let items = this.getProdutos();
		// Filtra o array de produtos para remover o produto especificado
		items = items.filter((item) => item._id !== produto._id);
		// Salva os itens atualizados no localStorage
		this.saveItems(items);
		// Sincroniza o carrinho com o servidor
		this.syncCarrinho();
		// Loga no console que o produto foi removido do carrinho
		console.log(`Produto ${produto._nome} removido do carrinho.`);
	}

	/**
	 * Obtém a contagem de itens no carrinho.
	 * @returns O número de itens no carrinho.
	 */
	static getItemCount(): number {
		// Retorna o número de produtos no carrinho
		return this.getProdutos().length;
	}

	/**
	 * Salva os itens do carrinho no localStorage.
	 * @param items - Um array de objetos Produto a ser salvo.
	 */
	private static saveItems(items: Produto[]): void {
		// Converte o array de produtos para uma string JSON e salva no localStorage
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
	}

	/**
	 * Sincroniza o carrinho com o servidor enviando os itens atuais.
	 */
	private static async syncCarrinho(): Promise<void> {
		// Obtém os produtos atuais do carrinho
		const items = this.getProdutos();
		try {
			// Faz uma requisição POST para sincronizar os produtos do carrinho com o servidor
			await this.apiService.post("carrinho/sync", { produtos: items });
			// Loga no console que a sincronização foi bem-sucedida
			console.log("Carrinho sincronizado com sucesso.");
		} catch (error) {
			// Loga no console um erro caso a sincronização falhe
			console.error("Erro ao sincronizar o carrinho:", error);
		}
	}
}
