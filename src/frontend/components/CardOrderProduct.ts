import { PedidosService } from "../services/ServiceOrder.js";
import { ProdutoService } from "../services/ServiceProduct.js";
import { Pedidos } from "../models/pedidos.js";
import { Produto } from "../models/produto.js";

export class CardOrderProduct {
    private pedidosService: PedidosService;
    private produtoService: ProdutoService;

    constructor(apiService: any) {
        this.pedidosService = new PedidosService(apiService);
        this.produtoService = new ProdutoService(apiService);
    }

    async render(idCliente: number): Promise<string> {
        const pedidos = await this.pedidosService.getPedido(idCliente);
        let htmlContent = '';
        let currentPedidoId = null;

        for (const pedido of pedidos) {
            let produtosHtml = '';

            const produto = await this.produtoService.getProdutoPorId(Number(pedido.id_Produto));
            produtosHtml += `
                <tr>
                    <td>${produto._nome}</td>
                    <td class="text-end">R$ ${produto._preco.toFixed(2)}</td>
                    <td class="text-center">${pedido.Qt_pedido}</td>
                    <td class="text-end">R$ ${(produto._preco * Number(pedido.Qt_pedido)).toFixed(2)}</td>
                </tr>
            `;

            if (currentPedidoId !== pedido.id_pedido) {
                if (currentPedidoId !== null) {
                    htmlContent += `
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th class="text-end" colspan="3">Valor dos Produtos:</th>
                                        <td class="text-end">R$ ${pedido.valor_total}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-end" colspan="3">Valor do Frete:</th>
                                        <td class="text-end">R$ ${pedido.frete}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-end" colspan="3">Valor a Pagar:</th>
                                        <td class="text-end">R$ ${pedido.preco_total}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-end" colspan="3">Forma de Pagamento:</th>
                                        <td class="text-end">${pedido.forma_pagamento}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>`;
                }

                currentPedidoId = pedido.id_pedido;

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
                                <tbody id="pedidoProdutos${pedido.id_pedido}">
                                    ${produtosHtml}
                `;
            } else {
                htmlContent += produtosHtml;
            }
        }

        if (currentPedidoId !== null) {
            htmlContent += `
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th class="text-end" colspan="3">Valor dos Produtos:</th>
                                        <td class="text-end">R$ ${pedido.valor_total}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-end" colspan="3">Valor do Frete:</th>
                                        <td class="text-end">R$ ${pedido.frete}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-end" colspan="3">Valor a Pagar:</th>
                                        <td class="text-end">R$ ${pedido.preco_total}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-end" colspan="3">Forma de Pagamento:</th>
                                        <td class="text-end">${pedido.forma_pagamento}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>`;
        }

        return htmlContent;
    }
}