import { ApiService } from "./apiService.js";
import { Produto } from "../models/produto.js";

export class ProdutoService {
	constructor(private _apiService: ApiService) {}

	async getTodosProdutos(): Promise<Produto[]> {
		const produtos = await this._apiService.get("Produtos", undefined);
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
}
