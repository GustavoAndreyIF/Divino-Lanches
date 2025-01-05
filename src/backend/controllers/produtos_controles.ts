import { MysqlError } from "mysql";
import ProdutosModel from "../models/produtos_model";
import { Request, Response } from "express"; // os tipos request e response do express são diferentes e precisam estar

class ProdutoControles extends ProdutosModel {
  constructor() {
    super();
  }
  listarTodosProdutos(req: Request, res: Response) {
    this.getAll((err: MysqlError | null, Produtos: any) => {
      if (err) return res.send(err);
      res.json(Produtos);
    });
  }
  listarProdutosDisponiveis(req: Request, res: Response) {
    this.getAllFiltered("em_Estoque", "true", (err: MysqlError | null, Produtos: any) => {
      if (err) return res.send(err);
      res.json(Produtos);
    });
  }
  listarProdutosCategoria(req: Request, res: Response) {
    let categoria: string = req.params.categoria;
    this.getAllFiltered("categoria", categoria, (err: MysqlError | null, Produtos: any) => {
        if (err) return res.send(err);
        res.json(Produtos);
      });
  }
  alterarQuantidadeEstoque(req: Request, res: Response) {
    let quantia: number = parseInt(req.body.quantia);
    let estoque_qt: any;
    this.getCell('id_Product', 'qt_Estoque', parseInt(req.params.id),(err: MysqlError | null, Produtos: any) => {
        if (err) return res.send(err);
        estoque_qt = res.json(Produtos);
        console.log(estoque_qt);
      });
    }
}
export default ProdutoControles;
