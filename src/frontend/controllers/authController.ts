import { AutenService } from "../services/autenticarService.js";

/**
 * Esta classe AuthController é responsável por controlar a lógica de autenticação, incluindo login e registro de usuários.
 *
 * @class AuthController
 */
export class AuthController {
	private authService: AutenService;

	/**
	 * Cria uma instância de AuthController.
	 * Inicializa o serviço de autenticação (AutenService).
	 */
	constructor() {
		this.authService = new AutenService();
	}

	/**
	 * Manipula o processo de login do usuário.
	 * @param email - O email do usuário.
	 * @param password - A senha do usuário.
	 * @returns Uma Promise que resolve quando o processo de login estiver completo.
	 */
	async handleLogin(email: string, password: string): Promise<void> {
		// Chama o método de login do serviço de autenticação com o email e senha fornecidos.
		await this.authService.login(email, password);
		// Verifica se o usuário está logado.
		if (this.authService.isLoggedIn()) {
			// Redireciona o usuário para a página principal se o login for bem-sucedido.
			window.location.href = "../index.html";
		} else {
			// Exibe um alerta se o login falhar.
			alert("Login failed");
		}
	}

	/**
	 * Manipula o processo de registro do usuário.
	 * @param email - O email do usuário.
	 * @param password - A senha do usuário.
	 * @param name - O nome do usuário.
	 * @returns Uma Promise que resolve quando o processo de registro estiver completo.
	 */
	async handleRegister(email: string, password: string, name: string): Promise<void> {
		// Chama o método de registro do serviço de autenticação com o email, senha e nome fornecidos.
		await this.authService.register(email, password, name);
		// Verifica se o usuário está logado após o registro.
		if (this.authService.isLoggedIn()) {
			// Redireciona o usuário para a página principal se o registro for bem-sucedido.
			window.location.href = "../index.html";
		} else {
			// Exibe um alerta se o registro falhar.
			alert("Registration failed");
		}
	}
}
