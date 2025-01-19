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
        return `
            <li class="list-group-item py-3">
                <div class="row g-3">
                    <div class="col-4 col-md-3 col-lg-2">
                        <a href="#">
                            <img src="${produto._nome}" class="img-thumbnail" />
                        </a>
                    </div>
                    <div class="col-8 col-md-9 col-lg-10">
                        <h4>${produto._nome}</h4>
                        <p class="mb-0">${produto._descricao}</p>
                        <div class="d-flex justify-content-between align-items-center mt-2">
                            <div>
                                <button class="btn btn-sm btn-outline-secondary" id="editar-${this.produtoCarrinho._id}">Editar</button>
                                <button class="btn btn-sm btn-outline-danger" id="deletar-${this.produtoCarrinho._id}">Deletar</button>
                            </div>
                            <div>
                                <span class="text-muted">${produto._preco}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        `;
    }
}