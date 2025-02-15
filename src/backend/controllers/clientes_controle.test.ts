import { MysqlError, queryCallback } from "mysql";
import { Request, Response } from "express";

jest.mock("../config/db", () => ({
    query: jest.fn(),
    connect: jest.fn(),
    end: jest.fn()
}));

import ClienteControle from "./clientes_controle";
import db from "../config/db";
import { TIMEOUT } from "dns";

describe("testando o cliente controle",()=>{
    let model: ClienteControle;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() =>{
        model = new ClienteControle();

        req = {
            params: {
                id_cliente: '1',
                cliente_email: 'email@gmail.com',
                cliente_log_senha: 'senha',
                nm_cliente: 'nome',
            },
            body: {
                id_cliente: '1',
                cliente_email: 'email@gmail.com',
                cliente_log_senha: 'senha',
                nm_cliente: 'nome',
            }
          };
          
          res = {
            json: jest.fn(),
            send: jest.fn(),
          };
    });

    afterEach(() => {
        jest.clearAllMocks();
        if (db.end) db.end()
    })

    test("Deve retornar cliente", async () => {
        const cliente_email = req.params!.cliente_email!;

        jest.spyOn(model, "get_Cliente").mockImplementation(
            (cliente_email: string, callback: (err: MysqlError | null, results: any) => void) => {
                callback(null, [{ id: 1, nome: 'nome', email: 'email', senha: 'senha' }]);
            }
        );

        await model.obter_cliente(req as Request, res as Response);

        expect(model.get_Cliente).toHaveBeenCalledWith(cliente_email, expect.any(Function));

        expect(res.json).toHaveBeenCalledWith([{ id: 1, nome: 'nome', email: 'email', senha: 'senha' }]);
    });
    test("Deve criar cliente", async () => {
        const cliente_email = req.params!.cliente_email!;
        const cliente_log_senha = req.body!.cliente_log_senha!;
        const nm_cliente = req.body!.nm_cliente!;

        jest.spyOn(model, "get_Email_Cliente").mockImplementation(
            (cliente_email: string, callback: (err: MysqlError | null, results: any) => void) => {
                callback(null, []);
            }
        );
        jest.spyOn(model, "create_Cliente").mockImplementation(
            (cliente_email: string, cliente_log_senha: string, nm_cliente:string, callback: (err: MysqlError | null, results: any) => void) => {
                callback(null, '<h1>Usuário criado com sucesso!</h1>');
            }
        );

        await model.criar_cliente(req as Request, res as Response);

        expect(model.create_Cliente).toHaveBeenCalledWith(cliente_email,cliente_log_senha,nm_cliente, expect.any(Function));

        expect(res.send).toHaveBeenCalledWith('<h1>Usuário criado com sucesso!</h1>');
    });
})
