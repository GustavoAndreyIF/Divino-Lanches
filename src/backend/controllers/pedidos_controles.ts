import { MysqlError } from "mysql";
import { Request, Response } from "express";
import PedidoModel from "../models/pedidos_model";
import ProdutoControles from "./produtos_controles";
import Carrinho_Controle from "./carrinhos_controles";
class PedidoControle extends PedidoModel{
    constructor(public ProdutoControle: ProdutoControles, public Carrinho_Controle: Carrinho_Controle){super()}
    async pegar_pedido(req: Request, res: Response){
        const id_pedido: number = parseInt(req.params.id_pedido);
        const id_cliente: number = parseInt(req.params.id_cliente)
        this.get_Pedido(id_pedido, id_cliente, (err: MysqlError | null, Pedidos: any) => {
            if (err) return res.send(err);
            res.json(Pedidos)
        })
    }
    async criar_pedido(req: Request, res: Response){
        const id_cliente: number = parseInt(req.body.id_cliente);
        const status_pedido: string = req.body.status_pedido;
        const id_pedido: number = parseInt(req.body.id_pedido)
        
        req.params.id_cliente = req.body.id_cliente; //gambiarra sinistra

        let CarrinhoObjects: any = await this.Carrinho_Controle.get_Carrinho_cliente(req, res);

        await this.Carrinho_Controle.deletar_Carrinho_Todo(req, res);

        CarrinhoObjects.forEach((object: any) => {
            req.body.quantia = object.Qt_Product_Carrinho;
            this.create_Pedido(id_cliente,object.id_Product,object.Qt_Product_Carrinho,status_pedido, id_pedido,(err: MysqlError | null, Resultado: any) => {
                if (err) return res.send(err);
            })
        });
        res.send('Pedido criado!')
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