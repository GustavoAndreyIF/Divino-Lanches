import { ApiService } from "./ServiceAPI.js";
import { Pedidos } from "../models/pedidos.js";
export class PedidosService {
    constructor(private _apiService: ApiService) {}
    
    async getPedido(id_cli: number): Promise<any> {
        let pedido_Produtos= await this._apiService.get(`getPedidos/${id_cli}`);
        let pedido: Pedidos[] =[];
        pedido_Produtos.forEach((produto: any) => {
            pedido.push(new Pedidos(produto.id_pedido, produto.id_cliente, produto.id_produto, produto.Qt_Pedido, produto.status_pedido));
        });
        return pedido;
    }

    async criarPedido(id_cliente: number, status_pedido: string,) {
        let reqBody: URLSearchParams = new URLSearchParams({
            id_cliente: id_cliente.toString(), 
            status_pedido: status_pedido.toString(),
        })
        await this._apiService.post('criarpedido/', reqBody);
        return;
    } 
    
}