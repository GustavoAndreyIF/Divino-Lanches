import { queryCallback } from "mysql";
import db from "../config/db.js";
class PedidoModel{
    constructor(){}
    get_Pedido(id_pedido: number,id_cliente:number, callback:queryCallback) {
        const query = `SELECT * FROM tb_pedidos WHERE id_pedido = ${id_pedido} AND id_cliente = ${id_cliente}`;
        db.query(query, callback);
    };
    create_Pedido(id_cliente: number, id_produto: number, qt_pedido: number, status_pedido: string, id_pedido: number,  callback:queryCallback){
        const query = `INSERT INTO tb_pedidos (id_cliente, id_Produto, Qt_Pedido, status_pedido, id_pedido) VALUES (${id_cliente}, ${id_produto}, ${qt_pedido}, ${status_pedido}, ${id_pedido})`;
        db.query(query, callback)
    };
    delete_Pedido(id_pedido: number, callback:queryCallback) {
        const query = `DELETE FROM tb_pedidos WHERE id_pedido = ${id_pedido}`;
        db.query(query, callback);
    }
    alt_status_pedido(id_pedido: number, status_pedido: string, callback:queryCallback){
        const query = `UPDATE tb_pedidos WHERE id_pedido = ${id_pedido} SET status_pedido = ${status_pedido}`
        db.query(query, callback)
    }
}
export default PedidoModel;