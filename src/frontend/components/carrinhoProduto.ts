import { Produto } from "../models/produto.js";
import { CarrinhoService } from "../services/carrinhoService.js";

export class CarrinhoProduto {
    constructor(private produto: Produto) {}

    render(): string {
        return `
            <li class="list-group-item py-3">
                <div class="row g-3">
                    <div class="col-4 col-md-3 col-lg-2">
                        <a href="#">
                            <img src="${this.produto._nome}" class="img-thumbnail" />
                        </a>
                    </div>
                    <div class="col-8 col-md-9 col-lg-10">
                        <h4>${this.produto._nome}</h4>
                        <p class="mb-0">${this.produto._descricao}</p>
                        <div class="d-flex justify-content-between align-items-center mt-2">
                            <div>
                                <button class="btn btn-sm btn-outline-secondary" id="editar-${this.produto._id}">Editar</button>
                                <button class="btn btn-sm btn-outline-danger" id="deletar-${this.produto._id}">Deletar</button>
                            </div>
                            <div>
                                <span class="text-muted">${this.produto._preco}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        `;
    }
}