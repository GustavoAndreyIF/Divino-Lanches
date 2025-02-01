import { CarrinhoService } from "../services/ServiceCart.js";
import { ProdutoService } from "../services/ServiceProduct.js";
import { ToastsProduct } from "../components/ToastsProduct.js";
import { ApiService } from "../services/ServiceAPI.js";
import { ProdutoCarrinho } from "../models/produtoCarrinho.js";

export class ManagerCart {
    private produtoService: ProdutoService;

    constructor(private carrinhoService: CarrinhoService) {
        const apiService = new ApiService("http://localhost:3000");
        this.produtoService = new ProdutoService(apiService);
    }

    async handleIncrease(produtoCarrinho: ProdutoCarrinho): Promise<void> {
        const input = document.getElementById(`quantia-${produtoCarrinho._id}`) as HTMLInputElement;
        if (input) {
            let quantity = parseInt(input.value, 10);
            quantity += 1;
            input.value = quantity.toString();
            await this.updateQuantity(produtoCarrinho._id, quantity);
        } else {
            console.error(`Input element not found for id: ${produtoCarrinho._id}`);
        }
    }

    async handleDecrease(produtoCarrinho: ProdutoCarrinho): Promise<void> {
        const input = document.getElementById(`quantia-${produtoCarrinho._id}`) as HTMLInputElement;
        if (input) {
            let quantity = parseInt(input.value, 10);
            if (quantity > 1) {
                quantity -= 1;
                input.value = quantity.toString();
                await this.updateQuantity(produtoCarrinho._id, quantity);
            }
        } else {
            console.error(`Input element not found for id: ${produtoCarrinho._id}`);
        }
    }

    async handleDelete(produtoCarrinho: ProdutoCarrinho): Promise<void> {
        const userDataString: string = localStorage.getItem("user") ?? "";
        const idCliente = parseInt(JSON.parse(userDataString)["id_cliente"] || "0", 10);
        await this.carrinhoService.deletarProdutoCarrinho(produtoCarrinho._id, idCliente);
        document.getElementById(`produtoCarrinho-${produtoCarrinho._id}`)?.remove();
        ToastsProduct.renderProductsRemove();
        this.updateTotal();
    }

    async handleInputChange(event: Event, produtoCarrinho: ProdutoCarrinho): Promise<void> {
        const input = event.target as HTMLInputElement;
        let quantity = parseInt(input.value, 10);
        if (quantity < 1) {
            quantity = 1;
            input.value = "1";
        }
        await this.updateQuantity(produtoCarrinho._id, quantity);
    }

    async updateQuantity(id: number, quantity: number): Promise<void> {
        await this.carrinhoService.alterarProdutoQuantia(quantity, id);
        this.updateTotal();
    }

    async updateTotal(): Promise<void> {
        const userDataString: string = localStorage.getItem("user") ?? "";
        const idCliente = parseInt(JSON.parse(userDataString)["id_cliente"] || "0", 10);
        const produtosCarrinho = await this.carrinhoService.getCarrinhoCliente(idCliente);
        let total = 0;
        for (const produtoCarrinho of produtosCarrinho) {
            const produto = await this.produtoService.getProdutoPorId(produtoCarrinho._idProduto);
            total += produto._preco * produtoCarrinho._quantia;
        }
        const valorTotalElement = document.getElementById("valorTotal");
        if (valorTotalElement) {
            valorTotalElement.innerHTML = `Valor Total: R$ ${total.toFixed(2)}`;
        } else {
            console.error("Elemento com ID 'valorTotal' não encontrado.");
        }
    }
}