import { ProdutoService } from "../services/produtoService.js";
import { Produto } from "../models/produto.js";
import { DomProduto } from "../utils/domProduto.js";

/**
 * Esta classe é responsável por controlar a lógica relacionada aos produtos, incluindo a ordenação dos produtos.
 *
 * @class ProdutoController
 */
export class ProdutoController {
	private produtosOriginais: Produto[] = [];

	/**
	 * Cria uma instância de ProdutoController.
	 * @param produtoService - Instância de ProdutoService usada para obter os produtos.
	 */
	constructor(private produtoService: ProdutoService) {}

	/**
	 * Ordena os produtos com base no critério selecionado pelo usuário.
	 * @returns Uma Promise que resolve quando a ordenação estiver completa.
	 */
	async ordenarProdutos(): Promise<void> {
		try {
			// Obtém o elemento select que contém o critério de ordenação
			const selectOrdenar = document.getElementById(
				"selectOrdenar"
			) as HTMLSelectElement;
			if (!selectOrdenar) {
				throw new Error("Elemento selectOrdenar não encontrado");
			}

			// Converte o valor selecionado para um número inteiro
			const criterio = parseInt(selectOrdenar.value);

			// Se a lista de produtos originais estiver vazia, obtém todos os produtos do serviço
			if (this.produtosOriginais.length === 0) {
				this.produtosOriginais = await this.produtoService.getTodosProdutos();
			}

			// Cria uma cópia da lista de produtos originais
			let produtos: Produto[] = [...this.produtosOriginais];

			// Ordena os produtos com base no critério selecionado
			switch (criterio) {
				case 1:
					// Ordena pelo nome em ordem alfabética
					produtos.sort((a, b) => a._nome.localeCompare(b._nome));
					break;
				case 2:
					// Ordena pelo menor preço
					produtos.sort((a, b) => a._preco - b._preco);
					break;
				case 3:
					// Ordena pelo maior preço
					produtos.sort((a, b) => b._preco - a._preco);
					break;
				default:
					// Caso 0 ou qualquer outro valor, mantém a ordem original
					produtos = [...this.produtosOriginais];
					break;
			}

			// Renderiza os produtos ordenados na interface do usuário
			DomProduto.renderProdutos(produtos);
		} catch (error) {
			// Exibe um erro no console se ocorrer um problema durante a ordenação dos produtos
			console.error("Erro ao ordenar produtos:", error);
		}
	}
}
