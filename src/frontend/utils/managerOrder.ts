import { CardOrderProduct } from "../components/CardOrderProduct.js";
import { ApiService } from "../services/ServiceAPI.js";

export class ManagerOrder {
    private cardOrderProduct: CardOrderProduct;

    constructor() {
        const apiService = new ApiService("http://localhost:3000");
        this.cardOrderProduct = new CardOrderProduct(apiService);
    }

    public async carregarPedidos(): Promise<void> {
        let userdataString: string = localStorage.getItem("user") ?? "";
        const idCliente = parseInt(JSON.parse(userdataString)["id_cliente"] || "0", 10);
        const pedidosHtml = await this.cardOrderProduct.render(idCliente);
        this.renderPedidos(pedidosHtml);
    }

    private renderPedidos(pedidosHtml: string): void {
        const pedidosContainer = document.getElementById("divPedidos");
        if (pedidosContainer) {
            pedidosContainer.innerHTML = pedidosHtml;
        } else {
            console.error("Contêiner de pedidos não encontrado");
        }
    }
}