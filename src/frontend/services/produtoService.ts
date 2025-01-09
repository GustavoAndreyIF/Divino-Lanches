import { ApiService } from "./apiService";

export class ProdutoService {
    constructor(private _apiService: ApiService) {}

    async getTodosProdutos(): Promise<any> {
        return this._apiService.get('Produtos');
    }
    async getProdutoPorId(id: number): Promise<any> {
        return this._apiService.get(`Produtos/${id}`);
    }
    async alterarQuantidadeProduto(id: number, quantidade: number): Promise<any> {
        return this._apiService.put(`Produtos/${id}`, { quantidade });
    }
}