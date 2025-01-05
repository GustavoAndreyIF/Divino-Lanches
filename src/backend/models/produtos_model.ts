
import { queryCallback } from "mysql";
import db from "../config/db.js";
class ProdutosModel {
  constructor() {}
  getAll(callback: Function): any {
    const query = "SELECT * FROM tb_products";
    db.query(query, callback);
  }
  getAllFiltered(keyCollumn: string, filter: string | number, callback:queryCallback): any {
    let query = `SELECT * FROM tb_products WHERE ? = ? ;`;
    db.query(query, [keyCollumn, filter], callback);
  }
  getCell (idCollumn: string, targetCollumn: string, id_produto: number, callback: queryCallback): any {
    let query = `SELECT ? FROM tb_products WHERE ? = ?;`;
    db.query(query, [targetCollumn, idCollumn, id_produto], callback);
  }
  alterLinha(id_produto: number, targetCollumn: string, value: any, id_Collumn: string,callback: queryCallback): any {
    let query = `UPDATE tb_Products SET ? = ? WHERE `;
    db.query(query, [targetCollumn, id_Collumn, id_produto], callback);
  }
}
export default ProdutosModel;
