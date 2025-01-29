import { ProdutoService } from "../services/ServiceProduct.js";
import { Produto } from "../models/produto.js";
import { DomProduto } from "../utils/RenderProductHome.js";

export class ProdutoController {
	private produtosOriginais: Produto[] = [];

	constructor(private produtoService: ProdutoService) {}

	async ordenarProdutos(): Promise<void> {
		try {
			const selectOrdenar = document.getElementById(
				"selectOrdenar"
			) as HTMLSelectElement;
			if (!selectOrdenar) {
				throw new Error("Elemento selectOrdenar não encontrado");
			}

			const criterio = parseInt(selectOrdenar.value);

			if (this.produtosOriginais.length === 0) {
				this.produtosOriginais = await this.produtoService.getTodosProdutos();
			}

			let produtos: Produto[] = [...this.produtosOriginais];

			switch (criterio) {
				case 1:
					produtos.sort((a, b) => a._nome.localeCompare(b._nome));
					break;
				case 2:
					produtos.sort((a, b) => a._preco - b._preco);
					break;
				case 3:
					produtos.sort((a, b) => b._preco - a._preco);
					break;
				default:
					// Caso 0 ou qualquer outro valor, mantenha a ordem original
					produtos = [...this.produtosOriginais];
					break;
			}

			DomProduto.renderProdutos(produtos);
		} catch (error) {
			console.error("Erro ao ordenar produtos:", error);
		}
	}
}
