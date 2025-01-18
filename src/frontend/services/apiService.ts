/**
 * Esta classe fornece métodos para fazer requisições HTTP para uma API.
 *
 * @class ApiService
 */
export class ApiService {
	// O construtor da classe ApiService recebe uma string _baseUrl que será usada como a base para todas as requisições.
	constructor(private _baseUrl: string) {}

	/**
	 * Método assíncrono que faz uma requisição HTTP GET para a URL especificada.
	 *
	 * @param url - A URL para a qual a requisição GET será feita.
	 * @returns Uma Promise que resolve para a resposta da requisição em formato JSON.
	 */
	async get(url: string): Promise<any> {
		// Faz uma requisição HTTP GET para a URL combinada _baseUrl e url.
		const response = await fetch(`${this._baseUrl}/${url}`);
		// Converte a resposta da requisição para JSON e a retorna.
		return response.json();
	}

	/**
	 * Método assíncrono que faz uma requisição HTTP POST para a URL especificada com os dados fornecidos.
	 *
	 * @param url - A URL para a qual a requisição POST será feita.
	 * @param data - Os dados a serem enviados no corpo da requisição.
	 * @returns Uma Promise que resolve para a resposta da requisição em formato JSON.
	 */
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

	/**
	 * Método assíncrono que faz uma requisição HTTP PUT para a URL especificada com os dados fornecidos.
	 *
	 * @param url - A URL para a qual a requisição PUT será feita.
	 * @param data - Os dados a serem enviados no corpo da requisição.
	 * @returns Uma Promise que resolve para a resposta da requisição em formato JSON.
	 */
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
