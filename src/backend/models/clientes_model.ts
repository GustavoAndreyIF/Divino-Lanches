import { queryCallback } from "mysql";
import db from "../config/db.js";

class ClienteModel{
    constructor(){}
    get_Cliente(id_cliente: number, callback:queryCallback) {
        const query = `SELECT * FROM tb_clientes WHERE id_cliente = ${id_cliente}`;
        db.query(query, callback);
    };
    create_Cliente(cliente_email: string, cliente_log_senha: string, nm_cliente: string, callback:queryCallback){
        const query = `INSERT INTO tb_clientes (cliente_email, cliente_log_senha, nm_cliente) VALUES (${cliente_email}, ${cliente_log_senha}, ${nm_cliente}`;
        db.query(query, callback);
    };
    delete_cliente(id_cliente: number, callback:queryCallback){
        const query = `DELETE from tb_clientes WHERE id_cliente = ${id_cliente}`
        db.query(query,callback);
    }
}