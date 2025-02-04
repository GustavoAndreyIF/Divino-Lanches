import { PedidosService } from "../services/ServiceOrder.js"; // Adjust the import path as necessary
import { Pedidos } from "../models/pedidos.js"; // Adjust the import path as necessary

export class CardOrderProduct {
    private pedidosService: PedidosService;

    constructor(apiService: any) { // Pass the ApiService instance
        this.pedidosService = new PedidosService(apiService);
    }

    async renderOrderProducts(id_cliente: number, id_pedido: number): Promise<string> {
        const pedidos = await this.pedidosService.getPedido(id_cliente, id_pedido);
        let htmlContent = '';

        pedidos.forEach((pedido: Pedidos) => {
            htmlContent += `
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#pedido${pedido.id_pedido}"
                        >
                            <b>Pedido ${pedido.id_pedido}</b>
                            <span class="mx-1">Status do Pedido (${pedido.status_pedido})</span>
                        </button>
                    </h2>
                    <div
                        id="pedido${pedido.id_pedido}"
                        class="accordion-collapse collapse"
                        data-bs-parent="#divPedidos"
                    >
                        <div class="accordion-body">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Produto</th>
                                        <th class="text-end">R$ Unit.</th>
                                        <th class="text-center">Qtde.</th>
                                        <th class="text-end">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody id="pedidoProdutos">
                                    <tr>
                                        <td>${pedido.id_Produto}</td> <!-- Adjust this to show product name -->
                                        <td class="text-end">R$ ${pedido.preco_unitario}</td> <!-- Adjust this to show product price -->
                                        <td class="text-center">${pedido.Qt_Pedido}</td>
                                        <td class="text-end">R$ ${pedido.subtotal}</td> <!-- Adjust this to show subtotal -->
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th class="text-end" colspan="3">Valor dos Produtos:</th>
                                        <td class="text-end">R$ ${pedido.valor_total}</td> <!-- Adjust this to show total value -->
                                    </tr>
                                    <tr>
                                        <th class="text-end" colspan="3">Valor do Frete:</th>
                                        <td class="text-end">R$ ${pedido.frete}</td> <!-- Adjust this to show freight -->
                                    </tr>
                                    <tr>
                                        <th class="text-end" colspan="3">Valor a Pagar:</th>
                                        <td class="text-end">R$ ${pedido.preco_total}</td> <!-- Adjust this to show total price -->
                                    </tr>
                                    <tr>
                                        <th class="text-end" colspan="3">Forma de Pagamento:</th>
                                        <td class="text-end">${pedido.forma_pagamento}</td> <!-- Adjust this to show payment method -->
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        });

        return htmlContent;
    }
}