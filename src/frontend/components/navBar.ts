import { AutenService } from "../services/autenticarService.js";
import { CarrinhoService } from "../services/carrinhoService.js";
import { ApiService } from "../services/apiService.js";

export class Navbar {
    constructor(private autenService: AutenService) {}

    async render(): Promise<string> {
        if (this.autenService.isLoggedIn()) {
            const userData = this.autenService.getUserData();
            const idCliente = parseInt(JSON.parse(userData).id_cliente);
            const apiServiceCarrinho = new ApiService("http://localhost:3000");
            const carrinhoService = new CarrinhoService(apiServiceCarrinho);
            const carrinho = await carrinhoService.getCarrinhoCliente(idCliente);
            const itemCount = carrinho.length;
            return `
                <li class="nav-item">
                    <span id="badgeCarrinho" class="badge rounded-pill bg-light text-danger position-absolute ms-4 mt-0" title="${itemCount} produto(s) no carrinho"><small>${itemCount}</small></span>
                    <a href="#" id="linkCarrinho" class="nav-link text-dark">
                        <i class="bi-cart" style="font-size: 24px; line-height: 24px"></i>
                    </a>
                </li>
                <li class=nav-item">
                    <a href="#" id="linkPedidos" class="btn btn-light">Pedidos</a>
                </li>
                <li class="nav-item">
                    <a href="#" id="linkLogout" class="btn btn-light">Sair</a>
                </li>
            `;
        } else {
            return `
                <li class="nav-item">
                    <a href="#" id="linkLogin" class="btn btn-light">Entrar</a>
                </li>
                <li class="nav-item">
                    <a href="#" id="linkCadastrar" class="btn btn-warning">Registrar</a>
                </li>
            `;
        }
    }
}