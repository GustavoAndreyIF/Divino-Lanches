import { Produto } from "../models/produto.js";
import { Navbar } from "../components/Navbar.js";
import { AutenService } from "../services/ServiceAuthenticate.js";
import { ProdutoCarrinho } from "../models/produtoCarrinho.js";
import { CarrinhoService } from "../services/ServiceCart.js";
import { ApiService } from "../services/ServiceAPI.js";
import { ToastsProduct } from "../components/ToastsProduct.js";

export class DomProduto {
	static renderProdutos(produtos: Produto[]): void {
		const divProdutos = document.getElementById("divProdutos");
		if (!divProdutos) return;

		divProdutos.innerHTML = produtos
			.map(
				(produto) => `
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <div class="card text-center bg-light" id="cardProduto">
                <img src="./assets/images/produtosImg/${produto._nome.replace(/\s+/g, "_")}.png" class="card-img-top" />
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

		produtos.forEach((produto) => {
			const button = document.querySelector(
				`#btnCardProduto${produto._id} button`
			);
			if (button) {
				if (!localStorage.getItem("user")) {
					(button as HTMLButtonElement).disabled = true;
					button.classList.remove("btn-warning", "btn-danger");
					button.classList.add("btn-secondary");
					button.textContent = "Faça login para comprar";
					return;
				}
				button.addEventListener("click", () => this.handleButtonClick(produto));
				let userDataString: string = localStorage.getItem("user") ?? "";
				const idCliente = parseInt(
					JSON.parse(userDataString)["id_cliente"] || "0",
					10
				);
				const apiService = new ApiService("http://localhost:3000");
				const carrinhoService = new CarrinhoService(apiService);
				carrinhoService
					.getCarrinhoCliente(idCliente)
					.then((produtosCarrinho) => {
						const produtoNoCarrinho = produtosCarrinho.some(
							(produtoCarrinho: ProdutoCarrinho) =>
								produtoCarrinho._idProduto === produto._id
						);
						if (produtoNoCarrinho) {
							button.classList.remove("btn-warning");
							button.classList.add("btn-danger");
							button.textContent = "Remover do Carrinho";
						} else {
							button.classList.remove("btn-danger");
							button.classList.add("btn-warning");
							button.textContent = "Adicionar ao Carrinho";
						}
					});
			}
		});
	}

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

	static async handleButtonClick(produto: Produto): Promise<void> {
		const button = document.querySelector(`#btnCardProduto${produto._id} button`);
		if (!button) return;

		const isAddedToCart = button.classList.contains("btn-warning");
		let userDataString: string = localStorage.getItem("user") ?? "";
		const idCliente = parseInt(JSON.parse(userDataString)["id_cliente"] || "0", 10);

		const apiService = new ApiService("http://localhost:3000");
		const carrinhoService = new CarrinhoService(apiService);

		const autenService = new AutenService();
		const navbar = new Navbar(autenService);

		if (isAddedToCart) {
			await carrinhoService.adicionarCarrinhoProduto(idCliente, produto._id, 1);
			button.classList.remove("btn-warning");
			button.classList.add("btn-danger");
			button.textContent = "Remover do Carrinho";
			navbar.updateCartBadge();
			ToastsProduct.renderProductsAdd();
		} else {
			const produtosCarrinho =
				await carrinhoService.getCarrinhoCliente(idCliente);
			const produtoCarrinho = produtosCarrinho.find(
				(produtoCarrinho: ProdutoCarrinho) =>
					produtoCarrinho._idProduto === produto._id &&
					produtoCarrinho._idcliente === idCliente
			);
			if (produtoCarrinho) {
				await carrinhoService.deletarProdutoCarrinho(
					produtoCarrinho._id,
					idCliente
				);
				ToastsProduct.renderProductsRemove();
				navbar.updateCartBadge();
			}
			button.classList.remove("btn-danger");
			button.classList.add("btn-warning");
			button.textContent = "Adicionar ao Carrinho";
		}
	}
}
