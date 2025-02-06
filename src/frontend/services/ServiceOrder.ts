import { ApiService } from "./ServiceAPI.js";
import { OrderObject } from "../models/OrderObject.js";

export class PedidosService {
    constructor(private _apiService: ApiService) {}

    async getAllPedidos(id_cliente: number): Promise<OrderObject[]> {
        const pedidosData = await this._apiService.get(`getPedidos/${id_cliente}`);
        const pedidosMap: { [key: number]: OrderObject } = {};

        pedidosData.forEach((pedido: any) => {
            if (!pedidosMap[pedido.id_pedido]) {
                pedidosMap[pedido.id_pedido] = new OrderObject(
                    pedido.id_pedido,
                    pedido.id_cliente,
                    [],
                    [],
                    pedido.status_pedido
                );
            }
            pedidosMap[pedido.id_pedido].id_Produto.push(pedido.id_Produto);
            pedidosMap[pedido.id_pedido].Qt_pedido.push(pedido.Qt_pedido);
        });

        return Object.values(pedidosMap);
    }

    async criarPedido(id_cliente: number, status_pedido: string) {
        const reqBody: URLSearchParams = new URLSearchParams({
            id_cliente: id_cliente.toString(),
            status_pedido: status_pedido.toString(),
        });
        await this._apiService.post('criarpedido/', reqBody);
        return;
    }
}