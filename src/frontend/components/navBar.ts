import { AutenService } from "../services/autenticarService.js";
import { CarrinhoService } from "../services/carrinhoService.js";

/**
 * Esta classe Navbar é responsável por renderizar a barra de navegação da aplicação.
 *
 * @class Navbar
 * @param autenService - Instância do serviço de autenticação usada para verificar o estado de login do usuário.
 */
export class Navbar {
	constructor(private autenService: AutenService) {}

	/**
	 * Renderiza a barra de navegação com base no estado de autenticação do usuário.
	 * Se o usuário estiver logado, exibe o ícone do carrinho com a contagem de itens.
	 * Caso contrário, exibe os botões de login e registro.
	 *
	 * @returns Uma string contendo o HTML da barra de navegação.
	 */
	render(): string {
		// Verifica se o usuário está logado
		if (this.autenService.isLoggedIn()) {
			// Obtém a contagem de itens no carrinho
			const itemCount = CarrinhoService.getItemCount();
			// Retorna o HTML para o ícone do carrinho com a contagem de itens
			return `
        <li class="nav-item">
          <span id="badgeCarrinho" class="badge rounded-pill bg-light text-danger position-absolute ms-4 mt-0" title="${itemCount} produto(s) no carrinho"><small>${itemCount}</small></span>
          <a href="#" id="linkCarrinho" class="nav-link text-dark">
            <i class="bi-cart" style="font-size: 24px; line-height: 24px"></i>
          </a>
        </li>
      `;
		} else {
			// Retorna o HTML para os botões de login e registro
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
