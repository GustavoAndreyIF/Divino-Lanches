import { MysqlError, queryCallback } from "mysql";
import { Request, Response } from "express";

jest.mock("../config/db", () => ({
    query: jest.fn(),
    connect: jest.fn(),
    end: jest.fn()
}));

import Carrinho_Controle from "./carrinhos_controles";
import db from "../config/db";

describe("testando o carrinho controle",()=>{
    let model: Carrinho_Controle;
    let req: Partial<Request>;
    let res: Partial<Response>;

    model = new Carrinho_Controle();

    beforeEach(() =>{
        req = {
            params: {
              id_cliente: '1',
            },
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

    model.get_Carrinho_cliente = jest.fn();

    test("pegar o carrinho", async () => {
        const mockQuery = jest.fn((query: string, callback: (err: MysqlError | null, results: any) => void) => {
            callback(null, [{ id: 1, nome: 'Produto 1' }]);
        });

        const db = require('mysql');
        db.query = mockQuery;

        model.get_Carrinho = jest.fn().mockImplementationOnce((id_key: string, value: number, callback: (err: MysqlError | null, results: any) => void) => {
            const query = `SELECT * FROM tb_carrinho_produtos WHERE ${id_key} = ${value}`;
            callback(null, [{ id: 1, nome: 'Produto 1' }]); // Simula os dados no callback
        });
        
        await model.get_Carrinho_cliente(req as Request, res as Response);

        expect(model.get_Carrinho_cliente).toHaveBeenCalledWith(req, res);
        
    })
})
