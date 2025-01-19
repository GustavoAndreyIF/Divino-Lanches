import { ProdutoCarrinho } from "../models/produtoCarrinho.js";
import { ApiService } from "./apiService.js";

export class CarrinhoService {
	constructor(private _apiService: ApiService) {}

	async getCarrinhoCliente(id_cliente: number) {
		let reqBody = new URLSearchParams( {id_cliente: id_cliente.toString()})
		let ProdutosCarrinhoGET = await this._apiService.get(
			`ProdutosCarrinho`, reqBody
		);
		let ProdutosCarrinhoList: ProdutoCarrinho[] = [];

		ProdutosCarrinhoGET.array.forEach((elemento: any) => {
			let Produto: ProdutoCarrinho = new ProdutoCarrinho(
				elemento.id_carrinho_produto,
				elemento.id_cliente,
				elemento.id_Product,
				elemento.Qt_Product_Carrinho
			);
			ProdutosCarrinhoList.push(Produto);
		});

		return ProdutosCarrinhoList;
	}

	async alterarProdutoQuantia(Qt_Product_Carrinho: number, id_crr_prod: number) {
		let Qt_Product_CarrinhoSTR: string = Qt_Product_Carrinho.toString();
		let id_crr_prodSTR: string = id_crr_prod.toString();
		let reqBody = new URLSearchParams({
			id_carrinho_produto: id_crr_prodSTR,
			Qt_Product_Carrinho: Qt_Product_CarrinhoSTR,
		});
		await this._apiService.put("ProdutoCarrinhoAltQt/", reqBody);
		return;
	}

	async adicionarCarrinhoProduto(
		id_cliente: number,
		id_produto: number,
		Qt_Product_Carrinho: number
	) {
		let id_clienteSTR: string = id_cliente.toString();
		let id_produtoSTR: string = id_produto.toString();
		let Qt_Product_CarrinhoSTR: string = Qt_Product_Carrinho.toString();

		let reqBody = new URLSearchParams({
			id_cliente: id_clienteSTR,
			id_produto: id_produtoSTR,
			Qt_Product_Carrinho: Qt_Product_CarrinhoSTR,
		});
		await this._apiService.post("CriarProdutoCarrinho/", reqBody);
		return;
	}

	async deletarProdutoCarrinho(id_carrinho_produto: number) {
		await this._apiService.delete(`DeletarProdutoCarrinho/${id_carrinho_produto}`);
		return;
	}
}
