import { queryCallback } from "mysql";
import db from "../config/db.js";
class PedidoModel{
    constructor(){}
    get_Pedido(id_pedido: number,id_cliente:number, callback:queryCallback): any {
        const query = `SELECT * FROM tb_pedidos WHERE id_pedido = ${id_pedido} AND id_cliente = ${id_cliente}`;
        db.query(query, callback);
    };
    create_Pedido(id_pedido: number, id_cliente: number, id_produto: number, qt_pedido: number, status_pedido: string,  callback:queryCallback): any{
        const query = `INSERT INTO tb_pedidos (id_pedido, id_cliente, id_Produto, Qt_pedido, status_pedido) VALUES (${id_pedido}, ${id_cliente}, ${id_produto}, ${qt_pedido}, '${status_pedido}')`;
        db.query(query, callback)
    };
    get_id_Pedido_cliente(id_cliente: number, callback:queryCallback):any {
        const query = `SELECT id_pedido from tb_pedidos WHERE id_cliente = ${id_cliente}`;
        db.query(query, callback);
    }
    delete_Pedido(id_pedido: number, callback:queryCallback): any {
        const query = `DELETE FROM tb_pedidos WHERE id_pedido = ${id_pedido}`;
        db.query(query, callback);
    }
    alt_status_pedido(id_pedido: number, status_pedido: string, callback:queryCallback): any{
        const query = `UPDATE tb_pedidos WHERE id_pedido = ${id_pedido} SET status_pedido = ${status_pedido}`
        db.query(query, callback)
    }
}
export default PedidoModel;