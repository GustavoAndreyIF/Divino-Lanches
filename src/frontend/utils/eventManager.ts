import { DomMain } from "./domMain.js";
import { ApiService } from "../services/apiService.js";
import { ProdutoService } from "../services/produtoService.js";
import { ProdutoController } from "../controllers/produtoController.js";
import { DomProduto } from "./domProduto.js";
import { DomHeaderFooter } from "./domHeaderFooter.js";

export class EventManager {
	constructor(private domMain: DomMain) {}

	initializeEvents(): void {
		document.getElementById("linkHome")?.addEventListener("click", () => {
			this.domMain.loadPage("./pages/home.html", this.loadHomePage.bind(this));
		});

		document.getElementById("linkLogout")?.addEventListener("click", () => {
			localStorage.removeItem("user");
			this.domMain.loadPage("./pages/home.html", this.loadHomePage.bind(this));
			const domHeaderFooter = new DomHeaderFooter();
			domHeaderFooter.initialize();
		});

		document.getElementById("linkQuemSomos")?.addEventListener("click", () => {
			this.loadOtherPage("./pages/quemSomos.html");
		});

		document.getElementById("linkProdutos")?.addEventListener("click", () => {
			this.loadOtherPage("./pages/home.html");
		});

		document.getElementById("linkLogin")?.addEventListener("click", () => {
			this.loadOtherPage("./pages/login.html");
		});

		document.getElementById("linkCadastrar")?.addEventListener("click", () => {
			this.loadOtherPage("./pages/cadastro.html");
		});

		document.getElementById("linkPrivacidade")?.addEventListener("click", () => {
			this.loadOtherPage("./pages/privacidade.html");
		});

		document.getElementById("linkTermos")?.addEventListener("click", () => {
			this.loadOtherPage("./pages/termos.html");
		});

		document
			.getElementById("linkQuemSomosFooter")
			?.addEventListener("click", () => {
				this.loadOtherPage("./pages/quemSomos.html");
			});

		document.getElementById("linkContato")?.addEventListener("click", () => {
			this.loadOtherPage("./pages/contato.html");
		});

		document.getElementById("linkCarrinho")?.addEventListener("click", () => {
			this.loadOtherPage("./pages/carrinho.html");
		});
	}

	public loadHomePage(): void {
		this.domMain.renderHeaderCarousel();
		this.loadProdutos();
	}

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

	private loadOtherPage(pageUrl: string): void {
		this.domMain.clearHeaderCarousel();
		this.domMain.loadPage(pageUrl);
	}
}
