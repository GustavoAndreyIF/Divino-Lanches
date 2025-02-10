import { DomMain } from "./ManagerDOM.js";
import { ApiService } from "../services/ServiceAPI.js";
import { ProdutoService } from "../services/ServiceProduct.js";
import { ProdutoController } from "../controllers/ControllerProduct.js";
import { DomProduto } from "./RenderProductHome.js";
import { DomHeaderFooter } from "./RenderHeaderFooter.js";
import { Carrinho } from "./RenderCart.js";
import { UserMenu } from "../components/UserMenu.js";

export class EventManager {
	constructor(private domMain: DomMain) {}

	initializeEvents(): void {
		document.querySelectorAll("#linkHome").forEach((element) => {
			element.addEventListener("click", () => {
				this.domMain.loadPage(
					"./pages/home.html",
					this.loadHomePage.bind(this)
				);
			});
		});

		document.querySelectorAll("#linkLogout").forEach((element) => {
			element.addEventListener("click", () => {
				localStorage.removeItem("user");
				window.location.reload();
			});
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
			this.domMain.loadPage(
				"./pages/carrinho.html",
				this.loadCarrinhoPage
			);
			this.domMain.clearHeaderCarousel();
		});

		document.getElementById("linkCliente")?.addEventListener("click", () => {
			this.domMain.loadPage("./pages/cliente.html", () => {
				const mainClienteDom = new DomMain("mainCliente");
				const userMenu = new UserMenu(mainClienteDom);
				userMenu.initialize();
			});
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
	private loadCarrinhoPage(): void {
		const cart = new Carrinho();
		cart.carregarProdutos()
	}

}
