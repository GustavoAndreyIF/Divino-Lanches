import { MysqlError } from "mysql";
import ProdutosModel from "../models/produtos_model";
import { Request, Response } from "express"; // os tipos request e response do express são diferentes e precisam estar

class ProdutoControles extends ProdutosModel {
  constructor() {
    super();
  }
  async listarTodosProdutos(req: Request, res: Response) {
    this.getAll((err: MysqlError | null, Produtos: any) => {
      if (err) return res.send(err);
      res.json(Produtos);
    });
  }
  async PegarProduto(req: Request, res: Response) {
    let id_produto: number = parseInt(req.params.id_produto);
    this.getAllFiltered('id_Product', id_produto, (err: MysqlError | null, produtos: any) => {
      if (err) return res.send(err);
      res.json(produtos);
    });
  }
  async listarProdutosCategoria(req: Request, res: Response) {
    let categoria: string = req.params.categoria;
    this.getAllFiltered(
      "categoria",
      categoria,
      (err: MysqlError | null, Produtos: any) => {
        if (err) return res.send(err);
        res.json(Produtos);
      },
    );
  }
  async alterarQuantidadeEstoque(req: Request, res: Response) {
    let quantia: number = parseInt(req.body.quantia);
    let estoque_qt: number;
    let product_id: number = parseInt(req.body.id_Produto);

    estoque_qt = await new Promise((resolve, reject) => {
      this.getCell(
        "id_Product",
        "qt_Estoque",
        product_id,
        (err: MysqlError | null, Produtos: any) => {
          if (err) return res.send(err);
          resolve(Produtos[0].qt_Estoque);
          return;
        },
      );
    }); // precisa ser uma promessa, por que? Porque se não essa merda de estoque_qt fica undefined durante a requisição
    estoque_qt = estoque_qt - quantia;

    this.alterLinha(
      product_id,
      "qt_Estoque",
      estoque_qt,
      "id_Product",
      (err: MysqlError | null, Resultado: any) => {
        if (err) return res.send(err);
        res.json(Resultado);
      },
    );
  }
}
export default ProdutoControles;
