export class Pedidos {
    constructor(
        public id_pedido: string,
	    public id_cliente: string,
	    public id_Produto: string,
	    public Qt_pedido: string,
	    public status_pedido: string
    )
    {}
}