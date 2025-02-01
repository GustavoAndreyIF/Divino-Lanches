import { ProdutoCarrinho } from "../models/produtoCarrinho.js";
import { Produto } from "../models/produto.js";
import { CarrinhoService } from "../services/ServiceCart.js";
import { ProdutoService } from "../services/ServiceProduct.js";
import { ApiService } from "../services/ServiceAPI.js";
import { ManagerCart } from "../utils/ManagerCart.js";

export class CardProduto {
    private carrinhoService: CarrinhoService;
    private produtoService: ProdutoService;

    constructor() {
        const apiService = new ApiService("http://localhost:3000");
        this.carrinhoService = new CarrinhoService(apiService);
        this.produtoService = new ProdutoService(apiService);
    }

    async render(idCliente: number): Promise<string> {
        const produtosCarrinho = await this.carrinhoService.getCarrinhoCliente(idCliente);
        let html = "";

        for (const produtoCarrinho of produtosCarrinho) {
            try {
                const produto = await this.produtoService.getProdutoPorId(produtoCarrinho._idProduto);
                html += `
                <li class="list-group-item py-3" id="produtoCarrinho-${produtoCarrinho._id}">
                    <div class="row g-3 align-items-start" >
                        <div class="col-4 col-md-3 col-lg-2">
                            <a href="#">
                                <img src="./assets/images/produtosImg/${produto._nome.replace(/\s+/g, "_")}.png" class="img-thumbnail">
                            </a>
                        </div>
                        <div class="col-8 col-md-9 col-lg-7 col-xl-8 text-left align-self-top">
                            <h3>
                                <span class="badge text-bg-warning">
                                <a href="#" class="text-decoration-none text-dark">
                                        ${produto._nome}</a></span>
                            </h3>
                            <h4>
                                ${produto._descricao}
                            </h4>
                        </div>
                        <div class="col-6 offset-6 col-sm-6 offset-sm-6 col-md-4 offset-md-8 col-lg-3 offset-lg-0 col-xl-2 align-self-start mt-3">
                            <div class="input-group">
                                <button class="btn btn-outline-dark btn-sm" type="button" id="decrease-${produtoCarrinho._id}">
                                    <i class="bi-caret-down" style="font-size: 16px; line-height: 16px;"></i>
                                </button>
                                <input type="text" class="form-control text-center border-dark" value="${produtoCarrinho._quantia}" id="quantia-${produtoCarrinho._id}">
                                <button class="btn btn-outline-dark btn-sm" type="button" id="increase-${produtoCarrinho._id}">
                                    <i class="bi-caret-up" style="font-size: 16px; line-height: 16px;"></i>
                                </button>
                                <button class="btn btn-outline-danger border-dark btn-sm" type="button" id="delete-${produtoCarrinho._id}">
                                    <i class="bi-trash" style="font-size: 16px; line-height: 16px;"></i>
                                </button>
                            </div>
                            <div class="text-end mt-2">
                                <small class="text-secondary">Valor Unitário: R$ ${produto._preco.toFixed(2)}</small><br>
                                <span class="text-dark">Valor Total: R$ ${(produto._preco * produtoCarrinho._quantia).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </li>
                `;
            } catch (error) {
                console.error(`Erro ao carregar produto com ID ${produtoCarrinho._idProduto}:`, error);
            }
        }

        // Adicionar event listeners após renderizar os produtos
        setTimeout(() => {
            const managerCart = new ManagerCart(this.carrinhoService);
            produtosCarrinho.forEach((produtoCarrinho) => {
                document.getElementById(`increase-${produtoCarrinho._id}`)?.addEventListener("click", () => managerCart.handleIncrease(produtoCarrinho));
                document.getElementById(`decrease-${produtoCarrinho._id}`)?.addEventListener("click", () => managerCart.handleDecrease(produtoCarrinho));
                document.getElementById(`delete-${produtoCarrinho._id}`)?.addEventListener("click", () => managerCart.handleDelete(produtoCarrinho));
                document.getElementById(`quantia-${produtoCarrinho._id}`)?.addEventListener("change", (event) => managerCart.handleInputChange(event, produtoCarrinho));
            });
        }, 0);

        return html;
    }
}