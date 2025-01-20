import { ProdutoCarrinho } from "../models/produtoCarrinho.js";
import { Produto } from "../models/produto.js";
import { CarrinhoService } from "../services/carrinhoService.js";
import { ProdutoService } from "../services/produtoService.js";
import { ApiService } from "../services/apiService.js";

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
        let html = '';

        for (const produtoCarrinho of produtosCarrinho) {
            try {
                const produto = await this.produtoService.getProdutoPorId(produtoCarrinho._idProduto);
                html += `
                    <div class="row g-3" id="produtoCarrinho-${produtoCarrinho._id}">
                        <div class="col-4 col-md-3 col-lg-2">
                            <a href="#">
                                <img src="/img/produtos/${produto._nome.replace(/\s+/g, "_")}.jpg" class="img-thumbnail">
                            </a>
                        </div>
                        <div class="col-8 col-md-9 col-lg-7 col-xl-8 text-left align-self-center">
                            <h4>
                                <b><a href="#" class="text-decoration-none text-danger">
                                        ${produto._nome}</a></b>
                            </h4>
                            <h5>
                                ${produto._descricao}
                            </h5>
                        </div>
                        <div class="col-6 offset-6 col-sm-6 offset-sm-6 col-md-4 offset-md-8 col-lg-3 offset-lg-0 col-xl-2 align-self-center mt-3">
                            <div class="input-group">
                                <button class="btn btn-outline-dark btn-sm" type="button">
                                    <i class="bi-caret-down" style="font-size: 16px; line-height: 16px;"></i>
                                </button>
                                <input type="text" class="form-control text-center border-dark" value="${produtoCarrinho._quantia}">
                                <button class="btn btn-outline-dark btn-sm" type="button">
                                    <i class="bi-caret-up" style="font-size: 16px; line-height: 16px;"></i>
                                </button>
                                <button class="btn btn-outline-danger border-dark btn-sm" type="button" id="deletar-${produtoCarrinho._id}">
                                    <i class="bi-trash" style="font-size: 16px; line-height: 16px;"></i>
                                </button>
                            </div>
                            <div class="text-end mt-2">
                                <small class="text-secondary">Valor Unitário: R$ ${produto._preco.toFixed(2)}</small><br>
                                <span class="text-dark">Valor Total: R$ ${(produto._preco * produtoCarrinho._quantia).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                `;
            } catch (error) {
                console.error(`Erro ao carregar produto com ID ${produtoCarrinho._idProduto}:`, error);
            }
        }

        return html;
    }
}