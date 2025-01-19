import { AutenService } from "../services/autenticarService.js";
import { CarrinhoService } from "../services/carrinhoService.js";
import { ApiService } from "../services/apiService.js";

export class Navbar {
	constructor(private autenService: AutenService) {}

  async render(): Promise<string> {
    const idCliente = parseInt(localStorage.getItem("id_cliente") || "0", 10);
		if (idCliente > 0) {
      const apiServiceCarrinho = new ApiService(
				"http://localhost:3000/ProdutosCarrinho/:id"
			);
			const carrinhoService = new CarrinhoService(apiServiceCarrinho);
			const carrinho = await carrinhoService.getCarrinhoCliente(
        idCliente
			);
			const itemCount = carrinho.length
			return `
      <li class="nav-item">
        <span id="badgeCarrinho" class="badge rounded-pill bg-light text-danger position-absolute ms-4 mt-0" title="${itemCount} produto(s) no carrinho"><small>${itemCount}</small></span>
        <a href="#" id="linkCarrinho" class="nav-link text-dark">
          <i class="bi-cart" style="font-size: 24px; line-height: 24px"></i>
        </a>
        </li>
      `;
		} else {
			return `
        <li class="nav-item" id="btnLogin">
          <a href="#" id="linkLogin" class="btn btn-light">Entrar</a>
        </li>
                <li class="nav-item" id="btnLogin">
          <a href="#" id="linkCadastrar" class="btn btn-warning">Registrar</a>
        </li>
      `;
		}
	}
}
