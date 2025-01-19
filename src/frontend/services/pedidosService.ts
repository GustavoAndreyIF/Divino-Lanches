import { ApiService } from "./apiService.js";
import { Pedidos } from "../models/pedidosModel.js";
class PedidosService {
    constructor(private _apiService: ApiService) {}
    
    async getPedido(id_cli: number, id_ped: number): Promise<any> {
        let reqBody = new URLSearchParams({id_cliente: id_cli.toString(), id_pedido: id_ped.toString()})
        let pedido_Produtos= await this._apiService.get('getPedidos', reqBody);
        let pedido: Pedidos[] =[];
        pedido_Produtos.forEach((produto: any) => {
            pedido.push(new Pedidos(produto.id_pedido, produto.id_cliente, produto.id_produto, produto.Qt_Pedido, produto.status_pedido));
        });
        return pedido;
    }

    async criarPedido(id_cliente: number, status_pedido: string, id_pedido: number) {
        
    } 
}