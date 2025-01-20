import { MysqlError } from "mysql";
import { Request, Response } from "express";
import CarrinhoModel from "../models/carrinhos_model";

class Carrinho_Controle extends CarrinhoModel {
    constructor () {super()}
    async get_Carrinho_cliente(req: Request, res: Response) {
        const id_cliente: number = parseInt(req.params.id_cliente);
        this.get_Carrinho('id_cliente', id_cliente, (err: MysqlError | null, Produtos: any) => {
            if (err) return res.send(err);
            res.json(Produtos);
        })
    }
    async create_Produto_Carrinho(req: Request, res: Response) {
        let id_cliente: number= parseInt(req.body.id_cliente);
        let id_produto: number = parseInt(req.body.id_produto);
        let Qt_Product_Carrinho: number = parseInt(req.body.Qt_Product_Carrinho);
        
        this.create(id_cliente,id_produto, Qt_Product_Carrinho, (err: MysqlError | null, Resultado: any) => {
            if (err) return res.send(err);
            res.json(Resultado);
        })
    }
    async deletar_Produto_Carrinho(req: Request, res: Response) {
        let id_produto: number = parseInt(req.params.id_produto);
        let id_cliente: number = parseInt(req.params.id_cliente);
        this.remover_keyCliente('id_carrinho_produto',id_produto, id_cliente, (err:MysqlError|null, Resultado: any) => {
            if (err) return res.send(err); 
            res.json(Resultado);
        });
    }
    async deletar_Carrinho_Todo(req: Request, res: Response) {
        let id_cliente: number = parseInt(req.body.id_cliente);
        this.remover('id_cliente', id_cliente, (err: MysqlError | null, results) => {
            if (err) return res.send(err);
            res.json(results);
        })
    }
    async alterar_carrinho_Produto_Qt(req: Request, res: Response) {
        let id_carrinho_produto: number = parseInt(req.body.id_carrinho_produto);
        let Qt_Product_Carrinho: number = parseInt(req.body.Qt_Product_Carrinho);

        this.alt_Atributo('Qt_Product_Carrinho', Qt_Product_Carrinho, 'id_carrinho_produto', id_carrinho_produto, (err:MysqlError|null, Resultado: any) => {
            if (err) return res.send(err); 
            res.json(Resultado);
        });
    }

}

export default Carrinho_Controle;