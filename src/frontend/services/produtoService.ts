import { ApiService } from "./apiService.js";
import { Produto } from "../models/produto.js";

/**
 * Esta classe fornece serviços relacionados aos produtos, incluindo a obtenção de todos os produtos,
 * a obtenção de um produto por ID e a alteração da quantidade de um produto.
 *
 * @class ProdutoService
 */
export class ProdutoService {
	/**
	 * Cria uma instância de ProdutoService.
	 * @param _apiService - Instância de ApiService usada para fazer requisições HTTP.
	 */
	constructor(private _apiService: ApiService) {}

	/**
	 * Obtém todos os produtos da API.
	 * @returns Uma Promise que resolve para um array de objetos Produto.
	 */
	async getTodosProdutos(): Promise<Produto[]> {
		// Faz uma requisição GET para a API para obter todos os produtos.
		const produtos = await this._apiService.get("Produtos");
		// Mapeia os dados recebidos para instâncias da classe Produto.
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

	/**
	 * Obtém um produto da API pelo seu ID.
	 * @param id - O ID do produto a ser obtido.
	 * @returns Uma Promise que resolve para uma instância de Produto.
	 */
	async getProdutoPorId(id: number): Promise<Produto> {
		// Faz uma requisição GET para a API para obter um produto pelo ID.
		const produto = await this._apiService.get(`Produtos/${id}`);
		// Retorna uma instância da classe Produto com os dados recebidos.
		return new Produto(
			produto.id_Product,
			produto.nm_Product,
			produto.descricao,
			produto.price_Product,
			produto.qt_Estoque,
			produto.categoria
		);
	}

	/**
	 * Altera a quantidade de um produto na API.
	 * @param id - O ID do produto cuja quantidade será alterada.
	 * @param quantidade - A nova quantidade do produto.
	 * @returns Uma Promise que resolve para a resposta da API.
	 */
	async alterarQuantidadeProduto(id: number, quantidade: number): Promise<any> {
		// Faz uma requisição PUT para a API para alterar a quantidade de um produto.
		return this._apiService.put(`Produtos/${id}`, { quantidade });
	}
}
