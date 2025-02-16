import { MysqlError, queryCallback } from "mysql";
import { Request, Response } from "express";

jest.mock("../config/db", () => ({
    query: jest.fn(),
    connect: jest.fn(),
    end: jest.fn()
}));

import ProdutoControle from "./produtos_controles";
import db from "../config/db";

describe("testando o cliente controle",()=>{
    let model: ProdutoControle;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() =>{
        model = new ProdutoControle();

        req = {
            params: {
                id_produto: "1",
                categoria: "salgado"

            },
            body: {
                quantia: "1",
                id_produto: "1"
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


    test("Deve retornar todos os produtos.", async () => {

        jest.spyOn(model, "getAll").mockImplementation(
            (callback: (err: MysqlError | null, results: any) => void) => {
                callback(null, [{ 
                    id_Product: 1,
                    nm_Product: "Pão pizza",
                    price_Product: 3.5,
                    qt_Estoque: 24,
                    categoria: "salgado",
                    descricao: "Pão recheado com recheio de pizza." }]);
            }
        );

        await model.listarTodosProdutos(req as Request, res as Response);

        expect(model.getAll).toHaveBeenCalledWith(expect.any(Function));

        expect(res.json).toHaveBeenCalledWith([{ 
            id_Product: 1,
            nm_Product: "Pão pizza",
            price_Product: 3.5,
            qt_Estoque: 24,
            categoria: "salgado",
            descricao: "Pão recheado com recheio de pizza." }]);
    });

    test("Deve retornar um produto.", async () => {

        let id_produto: number = parseInt(req.params!.id_produto!, 10);

        jest.spyOn(model, "getAllFiltered").mockImplementation(
            (keyCollumn: string, filter: string | number,callback: (err: MysqlError | null, results: any) => void) => {
                callback(null, [{ 
                    id_Product: 1,
                    nm_Product: "Pão pizza",
                    price_Product: 3.5,
                    qt_Estoque: 24,
                    categoria: "salgado",
                    descricao: "Pão recheado com recheio de pizza." }]);
            }
        );

        await model.PegarProduto(req as Request, res as Response);

        expect(model.getAllFiltered).toHaveBeenCalledWith('id_Product', id_produto, expect.any(Function));

        expect(res.json).toHaveBeenCalledWith([{ 
            id_Product: 1,
            nm_Product: "Pão pizza",
            price_Product: 3.5,
            qt_Estoque: 24,
            categoria: "salgado",
            descricao: "Pão recheado com recheio de pizza." }]);
    });
});