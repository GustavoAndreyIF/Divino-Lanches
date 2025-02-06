import { PedidosService } from "../services/ServiceOrder.js";
import { ProdutoService } from "../services/ServiceProduct.js";
import { OrderObject } from "../models/OrderObject.js";
import { Produto } from "../models/produto.js";

export class CardOrderProduct {
    private pedidosService: PedidosService;
    private produtoService: ProdutoService;

    constructor(apiService: any) {
        this.pedidosService = new PedidosService(apiService);
        this.produtoService = new ProdutoService(apiService);
    }

    async render(idCliente: number): Promise<string> {
        const pedidos = await this.pedidosService.getAllPedidos(idCliente);
        let htmlContent = "";

        for (const pedido of pedidos) {
            let produtosHtml = "";
            let totalProdutos = 0;

            for (let i = 0; i < pedido.id_Produto.length; i++) {
                try {
                    const produto = await this.produtoService.getProdutoPorId(pedido.id_Produto[i]);
                    const subtotal = produto._preco * pedido.Qt_pedido[i];
                    totalProdutos += subtotal;
                    produtosHtml += `
                        <tr>
                            <td>${produto._nome}</td>
                            <td class="text-end">R$ ${produto._preco.toFixed(2)}</td>
                            <td class="text-center">${pedido.Qt_pedido[i]}</td>
                            <td class="text-end">R$ ${subtotal.toFixed(2)}</td>
                        </tr>
                    `;
                } catch (error) {
                    console.error(`Erro ao renderizar produto com ID ${pedido.id_Produto[i]}:`, error);
                }
            }

            const valorFrete = 3.00;
            const valorTotal = totalProdutos + valorFrete;

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
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th class="text-end" colspan="3">Valor dos Produtos:</th>
                                        <td class="text-end">R$ ${totalProdutos.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-end" colspan="3">Valor do Frete:</th>
                                        <td class="text-end">R$ ${valorFrete.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-end" colspan="3">Valor a Pagar:</th>
                                        <td class="text-end">R$ ${valorTotal.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-end" colspan="3">Forma de Pagamento:</th>
                                        <td class="text-end">pix</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        }

        return htmlContent;
    }
}