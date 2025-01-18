import { CarrinhoProduto } from "./carrinhoProduto.js";
import { CarrinhoControles } from "./carrinhoControles.js";
import { CarrinhoService } from "../services/carrinhoService.js";

/**
 * Esta classe representa o carrinho de compras da aplicação.
 *
 * @class Carrinho
 */
export class Carrinho {
	// Array que armazena os produtos no carrinho.
	private produtos: CarrinhoProduto[] = [];
	// Instância da classe CarrinhoControles para gerenciar os controles do carrinho.
	private controles: CarrinhoControles;

	/**
	 * Cria uma instância de Carrinho.
	 * Inicializa os controles do carrinho e carrega os produtos.
	 */
	constructor() {
		// Inicializa a instância de CarrinhoControles.
		this.controles = new CarrinhoControles();
		// Carrega os produtos do carrinho.
		this.carregarProdutos();
	}

	/**
	 * Carrega os produtos do carrinho a partir do serviço CarrinhoService.
	 * Mapeia os produtos para instâncias de CarrinhoProduto e chama o método render para atualizar a interface.
	 */
	private carregarProdutos(): void {
		// Obtém os produtos do carrinho a partir do serviço CarrinhoService.
		const produtos = CarrinhoService.getProdutos();
		// Mapeia os produtos para instâncias de CarrinhoProduto.
		this.produtos = produtos.map((produto) => new CarrinhoProduto(produto));
		// Renderiza os produtos e controles do carrinho na interface.
		this.render();
	}

	/**
	 * Renderiza os produtos e controles do carrinho na interface do usuário.
	 * Atualiza os elementos HTML com os produtos e controles do carrinho.
	 */
	private render(): void {
		// Obtém o contêiner HTML onde os produtos do carrinho serão renderizados.
		const carrinhoProdutoContainer = document.getElementById("carrinhoProduto");
		// Se o contêiner for encontrado, atualiza seu conteúdo com os produtos do carrinho.
		if (carrinhoProdutoContainer) {
			carrinhoProdutoContainer.innerHTML = this.produtos
				.map((produto) => produto.render())
				.join("");
		}

		// Obtém o contêiner HTML onde os controles do carrinho serão renderizados.
		const carrinhoControlesContainer = document.getElementById("carrinhoControles");
		// Se o contêiner for encontrado, atualiza seu conteúdo com os controles do carrinho.
		if (carrinhoControlesContainer) {
			carrinhoControlesContainer.innerHTML = this.controles.render();
		}
	}
}
