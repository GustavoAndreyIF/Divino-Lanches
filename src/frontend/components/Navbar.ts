import { AutenService } from "../services/ServiceAuthenticate.js";
import { CarrinhoService } from "../services/ServiceCart.js";
import { ApiService } from "../services/ServiceAPI.js";

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
                <li class="nav-item" id="carrinhoNav">
                    <span id="badgeCarrinho" class="badge rounded-pill bg-light text-danger position-absolute ms-4 mt-0" title="${itemCount} produto(s) no carrinho"><small>${itemCount}</small></span>
                    <a href="#" id="linkCarrinho" class="nav-link text-dark">
                        <i class="bi-cart" style="font-size: 24px; line-height: 24px"></i>
                    </a>
                </li>
                <li class="nav-item">
                    <span class="nav-link disabled">|</span>
                </li>
                <div class="dropdown">
                    <button class="btn btn-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Logado como <b></b>
                    ${JSON.parse(userData).nm_cliente}
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                    <li class="nav-item">
                        <a href="#" id="linkPedidos" class="btn btn-light">Pedidos</a>
                    </li>
                      <li><hr class="dropdown-divider"></li>
                    <li class="nav-item">
                        <a href="#" id="linkLogout" class="btn btn-light">Sair</a>
                    </li>
                    </ul>
                </div>
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
    async updateCartBadge(): Promise<void> {
        const userData = this.autenService.getUserData();
		const idCliente = parseInt(JSON.parse(userData).id_cliente);
		const apiServiceCarrinho = new ApiService("http://localhost:3000");
		const carrinhoService = new CarrinhoService(apiServiceCarrinho);
		const carrinho = await carrinhoService.getCarrinhoCliente(idCliente);
		const itemCount = carrinho.length;
        document.getElementById("carrinhoNav")!.innerHTML = 
            `<span id="badgeCarrinho" class="badge rounded-pill bg-light text-danger position-absolute ms-4 mt-0" title="${itemCount} produto(s) no carrinho"><small>${itemCount}</small></span>
            <a href="#" id="linkCarrinho" class="nav-link text-dark">
                <i class="bi-cart" style="font-size: 24px; line-height: 24px"></i>
            </a>`
    }
}
