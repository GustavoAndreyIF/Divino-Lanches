import { Produto } from "../models/produto.js";
import { CarrinhoService } from "../services/carrinhoService.js";

/**
 * Esta classe é responsável por renderizar os produtos na interface do usuário e gerenciar as interações com os botões de adicionar e remover do carrinho.
 */
export class DomProduto {
	/**
	 * Renderiza uma lista de produtos no elemento com o ID "divProdutos".
	 *
	 * @param produtos - Array de objetos Produto a serem renderizados.
	 */
	static renderProdutos(produtos: Produto[]): void {
		// Obtém o elemento HTML onde os produtos serão renderizados.
		const divProdutos = document.getElementById("divProdutos");
		if (!divProdutos) return;

		// Gera o HTML para cada produto e insere no elemento "divProdutos".
		divProdutos.innerHTML = produtos
			.map(
				(produto) => `
		  <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
			<div class="card text-center bg-light" id="cardProduto">
				<img src="./assets/images/produtosImg/${produto._nome}" class="card-img-top" />
				<div class="card-header">
				<h5 class="card-title">${produto._nome}</h5>
			  </div>
			  <div class="card-body">
				<p class="card-text truncate-3l">${produto._descricao}</p>
				<h5 class="card-title">R$ ${produto._preco.toFixed(2)}</h5>
			  </div>
			  <div class="card-footer">
				${this.getButtonHtml(produto)}
				<small class="${produto._estoque > 0 ? "text-success" : "text-danger"}">
				  ${produto._estoque > 0 ? `Disponível` : "Indisponível"} 
				</small>
			  </div>
			</div>
		  </div>
		`
			)
			.join("");

		// Adiciona event listeners aos botões de cada produto.
		produtos.forEach((produto) => {
			const button = document.querySelector(
				`#btnCardProduto${produto._id} button`
			);
			if (button) {
				button.addEventListener("click", () => this.handleButtonClick(produto));
			}
		});
	}

	/**
	 * Retorna o HTML do botão de adicionar ou remover do carrinho, dependendo do estoque do produto.
	 *
	 * @param produto - O objeto Produto para o qual o botão será gerado.
	 * @returns O HTML do botão.
	 */
	static getButtonHtml(produto: Produto): string {
		if (produto._estoque <= 0) {
			return `
			<form class="d-block" id="btnCardProduto${produto._id}">
				<button type="button" class="btn btn-light" disabled>
					Produto Indisponível
				</button>
			</form>
		`;
		}

		return `
		<form class="d-block" id="btnCardProduto${produto._id}">
			<button type="button" class="btn btn-warning">
				Adicionar ao Carrinho
			</button>
		</form>
	`;
	}

	/**
	 * Manipula o clique no botão de adicionar ou remover do carrinho.
	 *
	 * @param produto - O objeto Produto que será adicionado ou removido do carrinho.
	 */
	static handleButtonClick(produto: Produto): void {
		const button = document.querySelector(`#btnCardProduto${produto._id} button`);
		if (!button) return;

		const isAddedToCart = button.classList.contains("btn-warning");

		if (isAddedToCart) {
			CarrinhoService.adicionarAoCarrinho(produto);
			button.classList.remove("btn-warning");
			button.classList.add("btn-danger");
			button.textContent = "Remover do Carrinho";
		} else {
			CarrinhoService.removerDoCarrinho(produto);
			button.classList.remove("btn-danger");
			button.classList.add("btn-warning");
			button.textContent = "Adicionar ao Carrinho";
		}
	}
}
