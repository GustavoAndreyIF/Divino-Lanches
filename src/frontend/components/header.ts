import { Navbar } from "./navBar.js";
import { AutenService } from "../services/autenticarService.js";

/**
 * Esta classe Header é responsável por renderizar o cabeçalho da interface do usuário, incluindo a barra de navegação.
 *
 * @class Header
 */

// Importa a classe Navbar do módulo navBar.js
// import { Navbar } from "./navBar.js";

// Importa a classe AutenService do módulo autenticarService.js
// import { AutenService } from "../services/autenticarService.js";

export class Header {
	// Declaração da propriedade privada navbar do tipo Navbar
	private navbar: Navbar;

	/**
	 * Cria uma instância de Header.
	 * @param autenService - Instância do serviço de autenticação usada para verificar o estado de login do usuário.
	 */
	constructor(autenService: AutenService) {
		// Inicializa a propriedade navbar com uma nova instância de Navbar, passando autenService como argumento
		this.navbar = new Navbar(autenService);
	}

	/**
	 * Renderiza o cabeçalho da interface do usuário.
	 * @returns Uma string contendo o HTML do cabeçalho.
	 */
	render(): string {
		// Retorna o HTML do cabeçalho, incluindo a barra de navegação
		return `
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm mb-3">
      <div class="container">
      <div class="d-flex align-items-center">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03">
        <span class="navbar-toggler-icon"></span>
        </button>
        <img src="assets/images/divinoLanchesLogo.png" width="56" height="56" class="d-inline-block align-text-top" />
      </div>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 flex-grow-1">
        <li class="nav-item">
          <a class="nav-link" href="#" id="linkHome">Página Inicial</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" id="linkQuemSomos">Quem Somos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" id="linkProdutos">Produtos</a>
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
