import { AutenService } from "../services/autenticarService.js";
import { Header } from "../components/header.js";
import { Footer } from "../components/footer.js";

/**
 * Esta classe é responsável por gerenciar a renderização do cabeçalho e rodapé da interface do usuário,
 * bem como verificar o status de login do usuário.
 *
 * @class DomHeaderFooter
 */
export class DomHeaderFooter {
	/**
	 * Cria uma instância de DomHeaderFooter.
	 * @param autenService - Serviço de autenticação usado para verificar o status de login do usuário.
	 * @param header - Componente de cabeçalho a ser renderizado.
	 * @param footer - Componente de rodapé a ser renderizado.
	 */
	constructor(
		private autenService: AutenService = new AutenService(),
		private header: Header = new Header(new AutenService()),
		private footer: Footer = new Footer()
	) {}

	/**
	 * Inicializa a instância de DomHeaderFooter, verificando o status de login e renderizando o cabeçalho e rodapé.
	 */
	async initialize(): Promise<void> {
		await this.checkLoginStatus();
		this.render();
	}

	/**
	 * Verifica o status de login do usuário a partir do localStorage e atualiza o serviço de autenticação.
	 */
	private async checkLoginStatus(): Promise<void> {
		const loggedIn = JSON.parse(localStorage.getItem("loggedIn") || "false");
		this.autenService.setLoggedIn(loggedIn);
	}

	/**
	 * Renderiza o cabeçalho e rodapé na interface do usuário.
	 */
	render(): void {
		document.getElementById("header")!.innerHTML = this.header.render();
		document.getElementById("footer")!.innerHTML = this.footer.render();
	}
}
