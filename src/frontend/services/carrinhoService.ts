import { Produto } from "../models/produto.js";
import { ApiService } from "./apiService.js";

export class CarrinhoService {
    private static readonly STORAGE_KEY = "cartItems";
    private static apiService = new ApiService("http://localhost:3000");

    static getProdutos(): Produto[] {
        const storedItems = localStorage.getItem(this.STORAGE_KEY);
        return storedItems ? JSON.parse(storedItems) : [];
    }

    static adicionarAoCarrinho(produto: Produto): void {
        const items = this.getProdutos();
        items.push(produto);
        this.saveItems(items);
        this.syncCarrinho();
        console.log(`Produto ${produto._nome} adicionado ao carrinho.`);
    }

    static removerDoCarrinho(produto: Produto): void {
        let items = this.getProdutos();
        items = items.filter(item => item._id !== produto._id);
        this.saveItems(items);
        this.syncCarrinho();
        console.log(`Produto ${produto._nome} removido do carrinho.`);
    }

    static getItemCount(): number {
        return this.getProdutos().length;
    }

    private static saveItems(items: Produto[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    }

    private static async syncCarrinho(): Promise<void> {
        const items = this.getProdutos();
        try {
            await this.apiService.post("carrinho/sync", { produtos: items });
            console.log("Carrinho sincronizado com sucesso.");
        } catch (error) {
            console.error("Erro ao sincronizar o carrinho:", error);
        }
    }
}