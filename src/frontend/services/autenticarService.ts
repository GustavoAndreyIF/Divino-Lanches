export class AutenService {
	constructor() {}

	// Método assíncrono para realizar login
	async login(email: string, password: string): Promise<void> {
		try {
			// Faz uma requisição POST para a URL de login
			const response = await fetch("http://localhost:3000/Login", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded", // Define o tipo de conteúdo como URL encoded
				},
				// Converte os parâmetros de email e senha para o formato URL encoded
				body: new URLSearchParams({
					cliente_email: email,
					cliente_log_senha: password,
				}).toString(),
			});

			if (!response.ok)
				throw new Error(`Login falhou com status: ${response.status}`);

			const userData = await response.json();
			console.log("Login concluido:", userData);
			localStorage.setItem("user", JSON.stringify(userData[0]));
		} catch (error) {
			console.error("Erro durante o login:", error);
		}
	}

	async register(email: string, password: string, name: string): Promise<void> {
		try {
			const bodyResponse = new URLSearchParams({
				cliente_email: email,
				cliente_log_senha: password,
				nm_cliente: name,
			});
			const response = await fetch("http://localhost:3000/Registrar", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: bodyResponse.toString(),
			});

			if (!response.ok)
				throw new Error(`Registro falhou com status: ${response.status}`);
			console.log(response);
			console.log("Registo comcluido");
		} catch (error) {
			console.error("Erro durante registro:", error);
			throw error;
		}
	}
	// Método para verificar se há um usuário logado no localStorage
	isLoggedIn(): boolean {
		return localStorage.getItem("user") !== null;
	}

	// Método para obter os dados do usuário logado
	getUserData(): any {
		const user = localStorage.getItem("user");
		return user ? user: null;
	}
}
