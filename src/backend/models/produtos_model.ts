import db from  '../config/db.js'
class ProdutosModel {
    constructor() {}
    getAll(callback: Function): any{
        const query = 'SELECT * FROM tb_products';
        db.query(query, callback);
    }
}
export default ProdutosModel;