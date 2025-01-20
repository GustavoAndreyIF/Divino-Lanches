import { queryCallback } from "mysql";
import db from "../config/db.js";
class ProdutosModel {
  constructor() {}
  getAll(callback: queryCallback): any {
    const query = "SELECT * FROM tb_products";
    db.query(query, callback);
  }
  getAllFiltered(
    keyCollumn: string,
    filter: string | number,
    callback: queryCallback,
  ): any {
    let query = `SELECT * FROM tb_products WHERE ${keyCollumn} = '${filter};'`;
    if (typeof filter == "number") {
      query = `SELECT * FROM tb_products WHERE ${keyCollumn} = ${filter};`;
    } 
    db.query(query, callback);
  }
  getCell(
    idCollumn: string,
    targetCollumn: string,
    id_produto: number,
    callback: queryCallback,
  ) {
    const query = `SELECT ${targetCollumn} FROM tb_products WHERE ${idCollumn} = ${id_produto};`;
    db.query(query, callback);
  }
  alterLinha(
    id_produto: number,
    targetCollumn: string,
    value: string | number,
    id_Collumn: string,
    callback: queryCallback,
  ): any {
    let query = `UPDATE tb_Products SET ${targetCollumn} = '${value}' WHERE ${id_Collumn} = ${id_produto}`;
    if (typeof value === "number") {
      query = `UPDATE tb_Products SET ${targetCollumn} = ${value} WHERE ${id_Collumn} = ${id_produto}`;
    }
    db.query(query, callback);
  }
}
export default ProdutosModel;
