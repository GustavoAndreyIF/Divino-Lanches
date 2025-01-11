import { Navbar } from "./navBar.js";
import { AutenService } from "../services/autenticarService.js";

export class Header {
	private navbar: Navbar;

	constructor(autenService: AutenService) {
		this.navbar = new Navbar(autenService);
	}

	render(): string {
		return `
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm mb-3">
          <div class="container">
            <div class="d-flex align-items-center">
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03">
                <span class="navbar-toggler-icon"></span>
              </button>
              <a class="navbar-brand ms-2" href="index.html">
                <img src="assets/images/produtosImg/produto03.png" width="24" height="24" class="d-inline-block align-text-top" />
                Divino Lanches
              </a>
            </div>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 flex-grow-1">
                <li class="nav-item">
                  <a class="nav-link" href="index.html">Página Inicial</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="pages/quemSomos.html">Quem Somos</a>
                </li>
              </ul>
              <div class="align-self-end">
                <ul class="navbar-nav" id="userNav">
                  ${this.navbar.render()}
                </ul>
              </div>
            </div>
          </div>
        </nav>
    `;
	}
}
