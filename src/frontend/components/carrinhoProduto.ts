import { ProdutoCarrinho } from "../models/produtoCarrinho.js";
import { ProdutoService } from "../services/produtoService.js";
import { ApiService } from "../services/apiService.js";

export class CarrinhoProduto {
    private produtoService: ProdutoService;

    constructor(public produtoCarrinho: ProdutoCarrinho) {
        const apiService = new ApiService("http://localhost:3000");
        this.produtoService = new ProdutoService(apiService);
    }

    async render(): Promise<string> {
        const produto = await this.produtoService.getProdutoPorId(this.produtoCarrinho._idProduto);
        if (!produto) {
            throw new Error("Produto não encontrado.");
        }
        return `
            <li class="list-group-item py-3">
                <div class="row g-3">
                    <div class="col-4 col-md-3 col-lg-2">
                        <a href="#">
                            <img src="./assets/images/produtosImg/${produto._nome.replace(/\s+/g, "_")}.png" class="img-thumbnail" />
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
                            <input type="text" class="form-control text-center border-dark" value="${this.produtoCarrinho._quantia}">
                            <button class="btn btn-outline-dark btn-sm" type="button">
                                <i class="bi-caret-up" style="font-size: 16px; line-height: 16px;"></i>
                            </button>
                            <button class="btn btn-outline-danger border-dark btn-sm" type="button" id="deletar-${this.produtoCarrinho._id}">
                                <i class="bi-trash" style="font-size: 16px; line-height: 16px;"></i>
                            </button>
                        </div>
                        <div class="text-end mt-2">
                            <small class="text-secondary">Valor Unitário: R$ ${produto._preco.toFixed(2)}</small><br>
                            <span class="text-dark">Valor Total: R$ ${(produto._preco * this.produtoCarrinho._quantia).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </li>
        `;
    }
}