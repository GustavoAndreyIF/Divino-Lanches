import { DomMain } from "./domMain.js";
import { ApiService } from "../services/apiService.js";
import { ProdutoService } from "../services/produtoService.js";
import { ProdutoController } from "../controllers/produtoController.js";
import { DomProduto } from "./domProduto.js";

/**
 * Esta classe gerencia os eventos da interface do usuário, como cliques em links de navegação.
 *
 * @class EventManager
 */
export class EventManager {
	/**
	 * Cria uma instância de EventManager.
	 * @param domMain - Instância de DomMain usada para carregar e atualizar o conteúdo da página.
	 */
	constructor(private domMain: DomMain) {}

	/**
	 * Inicializa os eventos de clique para os links de navegação.
	 */
	initializeEvents(): void {
		// Adiciona um ouvinte de evento para o link "Home"
		document.getElementById("linkHome")?.addEventListener("click", () => {
			this.domMain.loadPage("./pages/home.html", this.loadHomePage.bind(this));
		});

		// Adiciona um ouvinte de evento para o link "Quem Somos"
		document.getElementById("linkQuemSomos")?.addEventListener("click", () => {
			this.loadOtherPage("./pages/quemSomos.html");
		});

		// Adiciona um ouvinte de evento para o link "Produtos"
		document.getElementById("linkProdutos")?.addEventListener("click", () => {
			this.loadOtherPage("./pages/product.html");
		});

		// Adiciona um ouvinte de evento para o link "Login"
		document.getElementById("linkLogin")?.addEventListener("click", () => {
			this.loadOtherPage("./pages/login.html");
		});

		// Adiciona um ouvinte de evento para o link "Cadastrar"
		document.getElementById("linkCadastrar")?.addEventListener("click", () => {
			this.loadOtherPage("./pages/cadastro.html");
		});

		// Adiciona um ouvinte de evento para o link "Política de Privacidade"
		document.getElementById("linkPrivacidade")?.addEventListener("click", () => {
			this.loadOtherPage("./pages/privacidade.html");
		});

		// Adiciona um ouvinte de evento para o link "Termos de Uso"
		document.getElementById("linkTermos")?.addEventListener("click", () => {
			this.loadOtherPage("./pages/termos.html");
		});

		// Adiciona um ouvinte de evento para o link "Quem Somos" no rodapé
		document
			.getElementById("linkQuemSomosFooter")
			?.addEventListener("click", () => {
				this.loadOtherPage("./pages/quemSomos.html");
			});

		// Adiciona um ouvinte de evento para o link "Contato"
		document.getElementById("linkContato")?.addEventListener("click", () => {
			this.loadOtherPage("./pages/contato.html");
		});

		// Adiciona um ouvinte de evento para o link "Carrinho"
		document.getElementById("linkCarrinho")?.addEventListener("click", () => {
			this.loadOtherPage("./pages/carrinho.html");
		});
	}

	/**
	 * Carrega a página inicial e renderiza o carrossel de cabeçalho.
	 */
	public loadHomePage(): void {
		this.domMain.renderHeaderCarousel();
		this.loadProdutos();
	}

	/**
	 * Carrega os produtos da API e os renderiza na página.
	 */
	private async loadProdutos(): Promise<void> {
		const apiService = new ApiService("http://localhost:3000");
		const produtoService = new ProdutoService(apiService);
		const produtoController = new ProdutoController(produtoService);

		try {
			const produtos = await produtoService.getTodosProdutos();
			DomProduto.renderProdutos(produtos);
		} catch (error) {
			console.error("Erro ao consumir a API:", error);
		}

		(window as any).produtoController = produtoController;
	}

	/**
	 * Carrega uma página diferente e limpa o carrossel de cabeçalho.
	 * @param pageUrl - URL da página a ser carregada.
	 */
	private loadOtherPage(pageUrl: string): void {
		this.domMain.clearHeaderCarousel();
		this.domMain.loadPage(pageUrl);
	}
}
