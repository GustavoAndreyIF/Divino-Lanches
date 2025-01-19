import { MysqlError } from "mysql";
import { Request, Response } from "express";
import ClienteModel from "../models/clientes_model";
import db from "../config/db.js";
import { queryCallback } from "mysql";

class ClienteControle extends ClienteModel{
    constructor(){super()}
    async obter_cliente(req: Request, res: Response){
        const cliente_email: string = req.params.id_cliente;
        this.get_Cliente(cliente_email, (err: MysqlError | null, Resultado: any) => {
            if (err) return res.send(err);
            res.json(Resultado)
        })
    }
    async logar_cliente(req:Request, res:Response){
        const email: string = req.body.email;
        const password: string = req.body.password;
        db.query('SELECT * FROM tb_clientes WHERE cliente_email = ?', [email], async (err, results) => {
            if (results.length === 0) {
              return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            else{
              if (password === results.cliente_log_senha){
                this.obter_cliente(results.liente_email,res)
              }else{
                return res.status(401).json({ message: 'Credenciais inválidas.' });
              }
            }
          })
    }
    async criar_cliente(req: Request, res: Response){
        const cliente_email: string = req.body.cliente_email;
        const cliente_log_senha: string = req.body.cliente_log_senha;
        const nm_cliente: string = req.body.nm_cliente;

        let email_existe: boolean = await new Promise((resolve,reject) =>{
          this.get_Email_Cliente(cliente_email, (err: MysqlError | null, results: any) => {
            if (err) return res.send(err);
            if (results) {
              resolve(true);
              return;
            }
            resolve(false);
            return;
          });

        });
        if (!email_existe){
        this.create_Cliente(cliente_email,cliente_log_senha,nm_cliente, (err: MysqlError | null, Resultado: any) => {
            if (err) return res.send(err);
            res.send('<h1>Usuário criado com sucesso!</h1>');
        });
      }
      else {
        res.send('<h1>este email já existe </h1>')
      }
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