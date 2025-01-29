import { ApiService } from "./ServiceAPI.js";
import { Produto } from "../models/produto.js";
import { promises } from "dns";

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
	async getProdutoPorId(id_produto: number): Promise<any> {
		const produto = await this._apiService.get(`PegarProduto/${id_produto}`);
		const produto_object = new Produto(
			produto[0].id_Product,
			produto[0].nm_Product,
			produto[0].descricao,
			produto[0].price_Product,
			produto[0].qt_Estoque,
			produto[0].categoria
		);
		return produto_object;
	}
}
