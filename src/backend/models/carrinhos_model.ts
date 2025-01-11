import { queryCallback } from "mysql";
import db from "../config/db.js";
class CarrinhoModel {
  constructor() {}
  get_Carrinho(id_key: string, value:number, callback: queryCallback) {
    const query = `SELECT * FROM tb_carrinho_produtos WHERE ${id_key} = ${value}`;
    db.query(query, callback);
  }
  create (
    id_cliente: number,
    id_produto: number,
    Qt_Product_Carrinho: number,
    callback: queryCallback,
  ) {
    const query = `INSERT INTO tb_carrinho_produtos (id_cliente, id_Product, Qt_Product_Carrinho) VALUES (${id_cliente}, ${id_produto}, ${Qt_Product_Carrinho})`;
    db.query(query, callback);
  }
  remover(
    id_carrinho_produto: number,
    callback: queryCallback,
  ) {
    const query = `DELETE FROM tb_carrinho_produtos WHERE id_carrinho_produto = ${id_carrinho_produto}`;
    db.query(query, callback);
  }
  alt_Atributo(
    targetCollumn: string,
    value: string | number,
    id_Collumn: string,
    id_carrinho_produto: number,
    callback: queryCallback,
  ) {
    let query = `UPDATE tb_carrinho_produtos SET ${targetCollumn} = '${value}' WHERE ${id_Collumn} = ${id_carrinho_produto}`;
    if (typeof value === "number") {
      query = `UPDATE tb_carrinho_produtos SET ${targetCollumn} = ${value} WHERE ${id_Collumn} = ${id_carrinho_produto}`;
    }
    db.query(query, callback);
  }
}
export default CarrinhoModel;
