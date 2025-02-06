import { ApiService } from "../services/ServiceAPI";
import { PedidosService } from "../services/ServiceOrder";
import { OrderObject } from "../models/OrderObject";

export class ControllerOrder {
    private pedidosService: PedidosService;

    constructor() {
        const apiService = new ApiService("http://localhost:3000");
        this.pedidosService = new PedidosService(apiService);
    }

    async getPedidos(): Promise<OrderObject[]> {
        try {
            const userdataString: string = localStorage.getItem("user") ?? "";
            const idCliente = parseInt(JSON.parse(userdataString)["id_cliente"] || "0", 10);
            const pedidos = await this.pedidosService.getAllPedidos(idCliente);
            return pedidos;
        } catch (error) {
            console.error("Erro ao obter pedidos:", error);
            return [];
        }
    }
}