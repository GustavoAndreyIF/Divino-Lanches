import { MysqlError } from "mysql";
import { Request, Response } from "express";
import PedidoModel from "../models/pedidos_model";
import Carrinho_Controle from "./carrinhos_controles";
import { rejects } from "assert";
import { resolve } from "path";
class PedidoControle extends PedidoModel{
    constructor(private Carrinho_Controle: Carrinho_Controle){super()}
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

        let id_pedido_list: any = await new Promise((resolve, rejects) => {
            this.get_id_Pedido_cliente(id_cliente, (err: MysqlError | null, ids: any) => {
                if(err) return res.send(err);
                return resolve(ids);
            })
        })

        let id_pedido: number; 
        if (id_pedido_list.length == 0) {
            id_pedido = 1;
        }
        else {
            id_pedido = id_pedido_list.sort()[id_pedido_list.length - 1].id_pedido + 1;
        }

        let CarrinhoObjects: any = await new Promise((resolve, rejects) => {
            this.Carrinho_Controle.get_Carrinho('id_cliente', id_cliente, (err: MysqlError | null, Produtos: any) => {
                if (err) return res.send(err);
                return resolve(Produtos);
            })
        })
        
        await new Promise((resolve, rejects) => {
            this.Carrinho_Controle.remover('id_cliente', id_cliente, (err: MysqlError | null, results) => {
                if (err) return res.send(err);
                resolve(results);
            })
        })

        for (let object of CarrinhoObjects) {
            await new Promise((resolve, rejects) => {
                this.create_Pedido(id_pedido, id_cliente,object.id_Product,object.Qt_Product_Carrinho,status_pedido,(err: MysqlError | null, Resultado: any) => {
                    if (err) return res.send(err);
                    resolve(Resultado);
                });
            })
        }
        res.send('Pedido criado!');
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