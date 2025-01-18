export class CarrinhoControles {
	render(): string {
		return `
            <div class="d-flex justify-content-between mt-3">
                <button class="btn btn-outline-light" id="editarCarrinho">Editar Carrinho</button>
                <button class="btn btn-warning" id="finalizarCompra">Finalizar Compra</button>
            </div>
        `;
	}
}
