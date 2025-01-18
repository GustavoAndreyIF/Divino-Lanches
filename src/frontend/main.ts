import { ApiService } from "./services/apiService.js";
import { ProdutoService } from "./services/produtoService.js";
import { ProdutoController } from "./controllers/produtoController.js";
import { DomProduto } from "./utils/domProduto.js";
import { DomHeaderFooter } from "./utils/domHeaderFooter.js";
import { DomMain } from "./utils/domMain.js";

document.addEventListener("DOMContentLoaded", () => {
    const domHeaderFooter = new DomHeaderFooter();
    domHeaderFooter.render();

    const domMain = new DomMain("main");

    const loadProdutos = async () => {
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
    };

    const loadHomePage = () => {
        domMain.renderHeaderCarousel();
        loadProdutos();
    };

    const loadOtherPage = (pageUrl: string) => {
        domMain.clearHeaderCarousel();
        domMain.loadPage(pageUrl);
    };

    domMain.loadPage("./pages/home.html", loadHomePage);

    document.getElementById("linkHome")?.addEventListener("click", () => {
        domMain.loadPage("./pages/home.html", loadHomePage);
    });

    document.getElementById("linkQuemSomos")?.addEventListener("click", () => {
        loadOtherPage("./pages/quemSomos.html");
    });

    document.getElementById("linkProdutos")?.addEventListener("click", () => {
        loadOtherPage("./pages/product.html");
    });

    document.getElementById("linkLogin")?.addEventListener("click", () => {
        loadOtherPage("./pages/login.html");
    });

    document.getElementById("linkCadastrar")?.addEventListener("click", () => {
        loadOtherPage("./pages/cadastro.html");
    });

    document.getElementById("linkPrivacidade")?.addEventListener("click", () => {
        loadOtherPage("./pages/privacidade.html");
    });

    document.getElementById("linkTermos")?.addEventListener("click", () => {
        loadOtherPage("./pages/termos.html");
    });

    document.getElementById("linkQuemSomosFooter")?.addEventListener("click", () => {
        loadOtherPage("./pages/quemSomos.html");
    });

    document.getElementById("linkContato")?.addEventListener("click", () => {
        loadOtherPage("./pages/contato.html");
    });

    document.getElementById("linkCarrinho")?.addEventListener("click", () => {
        loadOtherPage("./pages/carrinho.html");
    });
});