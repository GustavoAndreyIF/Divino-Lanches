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

    beforeEach(() =>{
        model = new Carrinho_Controle();

        req = {
            params: {
              id_cliente: '1',
              id_produto: '1',
              Qt_Product_Carrinho: '1',
            },
            body: {
              id_cliente: '1',
              id_produto: '1',
              Qt_Product_Carrinho: '1',
              id_carrinho_produto: '1'
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

    test("Deve retornar produtos do carrinho", async () => {
        const id_cliente = parseInt(req.params!.id_cliente!, 10);

        jest.spyOn(model, "get_Carrinho").mockImplementation(
            (id_key: string, value: number, callback: (err: MysqlError | null, results: any) => void) => {
                callback(null, [{ id: 1, nome: 'Produto 1' }]);
            }
        );

        await model.get_Carrinho_cliente(req as Request, res as Response);

        expect(model.get_Carrinho).toHaveBeenCalledWith("id_cliente", id_cliente, expect.any(Function));

        expect(res.json).toHaveBeenCalledWith([{ id: 1, nome: 'Produto 1' }]);
    });
    test("Deve criar produtos no carrinho", async () => {
        const id_cliente = parseInt(req.body!.id_cliente!, 10);
        const id_produto = parseInt(req.body!.id_produto!, 10);
        const Qt_Product_Carrinho = parseInt(req.body!.Qt_Product_Carrinho!,10);

        jest.spyOn(model, "create").mockImplementation(
            (id_cliente: number, id_produto: number, Qt_Product_Carrinho: number, callback: (err: MysqlError | null, results: any) => void) => {
                callback(null, [{ id: 1, nome: 'Produto 1', qt_produto: 1 }]);
            }
        );

        await model.create_Produto_Carrinho(req as Request, res as Response);

        expect(model.create).toHaveBeenCalledWith(id_cliente, id_produto, Qt_Product_Carrinho, expect.any(Function));

        expect(res.json).toHaveBeenCalledWith([{ id: 1, nome: 'Produto 1', qt_produto: 1 }]);
    });
    test("Deve deletar produtos no carrinho", async () => {
        const id_cliente = parseInt(req.params!.id_cliente!, 10);
        const id_produto = parseInt(req.params!.id_produto!, 10);

        jest.spyOn(model, "remover_keyCliente").mockImplementation(
            (keyCollumn: string, value: number, cliente_id:number, callback: (err: MysqlError | null, results: any) => void) => {
                callback(null, [{id: 1, nome: 'Produto 1', qt_produto: '1'}]);
            }
        );

        await model.deletar_Produto_Carrinho(req as Request, res as Response);

        expect(model.remover_keyCliente).toHaveBeenCalledWith('id_carrinho_produto',id_cliente, id_produto, expect.any(Function));

        expect(res.json).toHaveBeenCalledWith([{id: 1, nome: 'Produto 1', qt_produto: '1'}]);
    });
    test("Deve deletar o carrinho", async () => {
        const id_cliente = parseInt(req.body!.id_cliente!, 10);

        jest.spyOn(model, "remover").mockImplementation(
            (keyCollumn: string, value: number, callback: (err: MysqlError | null, results: any) => void) => {
                callback(null, []);
            }
        );

        await model.deletar_Carrinho_Todo(req as Request, res as Response);

        expect(model.remover).toHaveBeenCalledWith('id_cliente',id_cliente, expect.any(Function));

        expect(res.json).toHaveBeenCalledWith([]);
    });
    test("Deve alterar a quantidade de produto", async () => {
        const id_carrinho_produto = parseInt(req.body!.id_carrinho_produto!, 10);
        const Qt_Product_Carrinho = parseInt(req.body!.Qt_Product_Carrinho!, 10);

        jest.spyOn(model, "alt_Atributo").mockImplementation(
            (targetCollumn: string, value: string | number, id_Collumn: string, id_carrinho_produto: number, callback: (err: MysqlError | null, results: any) => void) => {
                callback(null, [{id: 1, nome:1, qt: 2}]);
            }
        );

        await model.alterar_carrinho_Produto_Qt(req as Request, res as Response);

        expect(model.alt_Atributo).toHaveBeenCalledWith('Qt_Product_Carrinho', Qt_Product_Carrinho, 'id_carrinho_produto', id_carrinho_produto, expect.any(Function));

        expect(res.json).toHaveBeenCalledWith([{id: 1, nome:1, qt: 2}]);
    });
})
