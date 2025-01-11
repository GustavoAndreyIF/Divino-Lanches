import { AutenService } from "../services/autenticarService.js";

export class Navbar {
    constructor(private autenService: AutenService) {}

    render(): string {
        if (this.autenService.isLoggedIn()) {
            return `
        <li class="nav-item">
          <span id="badgeCarrinho" class="badge rounded-pill bg-light text-warning position-absolute ms-4 mt-0" title="5 produto(s) no carrinho"><small>5</small></span>
          <a href="pages/carrinho.html" class="nav-link text-dark">
            <i class="bi-cart" style="font-size: 24px; line-height: 24px"></i>
          </a>
        </li>
      `;
        } else {
            return `
        <li class="nav-item" id="btnLogin">
          <a href="pages/login.html" class="btn btn-warning">Entrar</a>
        </li>
      `;
        }
    }
}