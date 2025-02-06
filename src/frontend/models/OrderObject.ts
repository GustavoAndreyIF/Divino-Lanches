export class OrderObject {
    constructor(
        public id_pedido: number,
	    public id_cliente: number,
	    public id_Produto: number[],
	    public Qt_pedido: number[],
	    public status_pedido: string
    )
    {}
}