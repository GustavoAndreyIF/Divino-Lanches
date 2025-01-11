import { MysqlError } from "mysql";
import { Request, Response } from "express";
import ClienteModel from "../models/clientes_model";

class ClienteControle extends ClienteModel{
    constructor(){super()}
    async obter_cliente(req: Request, res: Response){
        const id_cliente: number = parseInt(req.params.id_cliente);
        this.get_Cliente(id_cliente, (err: MysqlError | null, Resultado: any) => {
            if (err) return res.send(err);
            res.json(Resultado)
        })
    }
    async criar_cliente(req: Request, res: Response){
        const cliente_email: string = req.params.cliente_email;
        const cliente_log_senha: string = req.params.cliente_log_senha;
        const nm_cliente: string = req.params.nm_cliente;
        this.create_Cliente(cliente_email,cliente_log_senha,nm_cliente, (err: MysqlError | null, Resultado: any) => {
            if (err) return res.send(err);
            res.json(Resultado)
        })
    }
    async deletar_cliente(req: Request, res: Response){
        const id_cliente: number = parseInt(req.params.id_cliente);
        this.delete_cliente(id_cliente, (err: MysqlError | null, Resultado: any) => {
            if (err) return res.send(err);
            res.json(Resultado)
        })
    }
}

export default ClienteControle