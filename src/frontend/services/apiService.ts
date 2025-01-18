export class ApiService {
	// O construtor da classe ApiService recebe uma string _baseUrl que será usada como a base para todas as requisições.
	constructor(private _baseUrl: string) {}

	// Método assíncrono get que recebe uma URL como parâmetro e retorna uma Promise de qualquer tipo.
	async get(url: string): Promise<any> {
		// Faz uma requisição HTTP GET para a URL combinada _baseUrl e url.
		const response = await fetch(`${this._baseUrl}/${url}`);
		// Converte a resposta da requisição para JSON e a retorna.
		return response.json();
	}

	// Método assíncrono post que recebe uma URL e dados como parâmetros e retorna uma Promise de qualquer tipo.
	async post(url: string, data: any): Promise<any> {
		// Faz uma requisição HTTP POST para a URL combinada _baseUrl e url.
		const response = await fetch(`${this._baseUrl}/${url}`, {
			method: "POST", // Define o método HTTP como POST.
			body: JSON.stringify(data), // Converte os dados para uma string JSON e os inclui no corpo da requisição.
			headers: {
				"Content-Type": "application/json", // Define o cabeçalho Content-Type como application/json.
			},
		});
		// Converte a resposta da requisição para JSON e a retorna.
		return response.json();
	}

	// Método assíncrono put que recebe uma URL e dados como parâmetros e retorna uma Promise de qualquer tipo.
	async put(url: string, data: any): Promise<any> {
		// Faz uma requisição HTTP PUT para a URL combinada _baseUrl e url.
		const response = await fetch(`${this._baseUrl}/${url}`, {
			method: "PUT", // Define o método HTTP como PUT.
			body: JSON.stringify(data), // Converte os dados para uma string JSON e os inclui no corpo da requisição.
			headers: {
				"Content-Type": "application/json", // Define o cabeçalho Content-Type como application/json.
			},
		});
		// Converte a resposta da requisição para JSON e a retorna.
		return response.json();
	}
}
