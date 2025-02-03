import { queryCallback } from "mysql";
import db from "../config/db.js";
class CarrinhoModel {
  constructor() {}
  get_Carrinho(id_key: string, value:number, callback: queryCallback): any {
    const query = `SELECT * FROM tb_carrinho_produtos WHERE ${id_key} = ${value}`;
    db.query(query, callback);
  }
  create (
    id_cliente: number,
    id_produto: number,
    Qt_Product_Carrinho: number,
    callback: queryCallback,
  ): any {
    const query = `INSERT INTO tb_carrinho_produtos (id_cliente, id_Product, Qt_Product_Carrinho) VALUES (${id_cliente}, ${id_produto}, ${Qt_Product_Carrinho})`;
    db.query(query, callback);
  }
  remover(
    keyCollumn: string,
    value: number,
    callback: queryCallback,
  ): any {
    const query = `DELETE FROM tb_carrinho_produtos WHERE ${keyCollumn} = ${value}`;
    db.query(query, callback);
  }
  remover_keyCliente(
    keyCollumn: string,
    value: number,
    cliente_id:number,
    callback: queryCallback,
  ): any {
    const query = `DELETE FROM tb_carrinho_produtos WHERE ${keyCollumn} = ${value} AND id_cliente = ${cliente_id}`;
    db.query(query, callback);
  }
  alt_Atributo(
    targetCollumn: string,
    value: string | number,
    id_Collumn: string,
    id_carrinho_produto: number,
    callback: queryCallback,
  ): any {
    let query = `UPDATE tb_carrinho_produtos SET ${targetCollumn} = '${value}' WHERE ${id_Collumn} = ${id_carrinho_produto}`;
    if (typeof value === "number") {
      query = `UPDATE tb_carrinho_produtos SET ${targetCollumn} = ${value} WHERE ${id_Collumn} = ${id_carrinho_produto}`;
    }
    db.query(query, callback);
  }
}
export default CarrinhoModel;
