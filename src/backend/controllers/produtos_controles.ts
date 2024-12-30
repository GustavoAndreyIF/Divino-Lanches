import ProdutosModel from "../models/produtos_model";
import {Request, Response} from 'express'; // os tipos request e response do express são diferentes e precisam estar

class ProdutoControles extends ProdutosModel {
    constructor() {super()}

    listarTodosProdutos(req: Request, res: Response) {
        this.getAll((err: Error, Produtos: any) => {
            if (err) return res.send(err);
            res.json(Produtos);
        })
    }
}
export default ProdutoControles;