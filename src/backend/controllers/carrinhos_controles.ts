import { MysqlError } from "mysql";
import { Request, Response } from "express";
import CarrinhoModel from "../models/carrinhos_model";

class Carrinho_Controle extends CarrinhoModel {
    constructor () {super()}
    async get_Todos_Carrinho(req: Request, res: Response) {
        const id_cliente: number = parseInt(req.params.id);
        this.get_Carrinho_cliente(id_cliente, (err: MysqlError | null, Produtos: any) => {
            if (err) return res.send(err);
            res.json(Produtos);
        })
    }
    async Create_Produto_Carrinho(req: Request, res: Response) {
        let id_cliente: number= parseInt(req.body.id_cliente);
        let id_produto: number = parseInt(req.body.id_produto);
        let Qt_Product_Carrinho: number = parseInt(req.body.Qt_Product_Carrinho);
        
        this.create_Carrinho_Produto(id_cliente,id_produto, Qt_Product_Carrinho, (err: MysqlError | null, Resultado: any) => {
            if (err) return res.send(err);
            res.json(Resultado);
        })
    }

}