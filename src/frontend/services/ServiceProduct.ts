import { ApiService } from "./ServiceAPI.js";
import { Produto } from "../models/produto.js";

export class ProdutoService {
	constructor(private _apiService: ApiService) {}

	async getTodosProdutos(): Promise<Produto[]> {
		const produtos = await this._apiService.get("Produtos");
		return produtos.map(
			(produto: any) =>
				new Produto(
					produto.id_Product,
					produto.nm_Product,
					produto.descricao,
					produto.price_Product,
					produto.qt_Estoque,
					produto.categoria
				)
		);
	}

	async getProdutoPorId(id_produto: number): Promise<Produto> {
		try {
			const produtos = await this._apiService.get(`PegarProduto/${id_produto}`);
			if (!produtos || produtos.length === 0) {
				throw new Error(`Produto com ID ${id_produto} não encontrado`);
			}
			const produto = produtos[0];
			return new Produto(
				produto.id_Product,
				produto.nm_Product,
				produto.descricao,
				produto.price_Product,
				produto.qt_Estoque,
				produto.categoria
			);
		} catch (error) {
			console.error(`Erro ao obter produto com ID ${id_produto}:`, error);
			throw error;
		}
	}
}
