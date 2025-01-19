import { MysqlError } from "mysql";
import { Request, Response } from "express";
import PedidoModel from "../models/pedidos_model";
import ProdutoControles from "./produtos_controles";
class PedidoControle extends PedidoModel{
    constructor(public ProdutoControle: ProdutoControles){super()}
    async pegar_pedido(req: Request, res: Response){
        const id_pedido: number = parseInt(req.params.id_pedido);
        this.get_Pedido(id_pedido, (err: MysqlError | null, Pedidos: any) => {
            if (err) return res.send(err);
            res.json(Pedidos)
        })
    }
    async criar_pedido(req: Request, res: Response){
        const id_cliente: number = parseInt(req.body.id_cliente);
        const id_produto: number = parseInt(req.body.id_Produto);
        const qt_pedido: number = parseInt(req.body.quantia);
        const status_pedido: string = req.body.status_pedido;

        await this.ProdutoControle.alterarQuantidadeEstoque(req, res);

        this.create_Pedido(id_cliente,id_produto,qt_pedido,status_pedido, (err: MysqlError | null, Resultado: any) => {
            if (err) return res.send(err);
            res.json(Resultado)
        })
    }
    async deletar_pedido(req: Request, res: Response){
        const id_pedido: number = parseInt(req.params.id_pedido);
        this.delete_Pedido(id_pedido, (err: MysqlError | null, Resultado: any) => {
            if (err) return res.send(err);
            res.json(Resultado)
        })
    }
    async alterar_status(req: Request, res: Response){
        const id_pedido: number = parseInt(req.body.id_pedido);
        const status_pedido: string = req.body.status_pedido;
        this.alt_status_pedido(id_pedido,status_pedido, (err: MysqlError | null, Resultado: any) => {
            if (err) return res.send(err);
            res.json(Resultado)
        })
    }
}

export default PedidoControle