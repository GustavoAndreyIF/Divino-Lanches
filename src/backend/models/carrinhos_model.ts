import { queryCallback } from "mysql";
import db from "../config/db.js";
class CarrinhoModel {
  constructor() {}
  get_Carrinho_cliente(id_cliente: number, callback: queryCallback) {
    const query = `SELECT * FROM tb_carrinho_produtos WHERE id_cliente = ${id_cliente}`;
    db.query(query, callback);
  }
  create_Carrinho_Produto(
    id_cliente: number,
    id_produto: number,
    Qt_Product_Carrinho: number,
    callback: queryCallback,
  ) {
    const query = `INSERT INTO tb_carrinho_produtos (id_cliente, id_Product, Qt_Product_Carrinho) VALUES (${id_cliente}, ${id_produto}, ${Qt_Product_Carrinho})`;
    db.query(query, callback);
  }
  remover_Produto_carrinho(
    id_carrinho_produto: number,
    callback: queryCallback,
  ) {
    const query = `DELETE FROM tb_carrinho_produtos WHERE id_carrinho_produto = ${id_carrinho_produto}`;
    db.query(query, callback);
  }
  alt_Qt_Carrinho_Produto(
    id_carrinho_produto: number,
    Qt_Product_Carrinho: number,
    callback: queryCallback,
  ) {
    const query = `UPDATE tb_carrinho_produtos WHERE id_carrinho_produto = ${id_carrinho_produto} SET Qt_Product_Carrinho = ${Qt_Product_Carrinho}`;
    db.query(query, callback);
  }
}
export default CarrinhoModel;
