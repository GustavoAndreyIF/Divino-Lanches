import { MysqlError, queryCallback } from "mysql";
import { Request, Response } from "express";

jest.mock("../config/db", () => ({
    query: jest.fn(),
    connect: jest.fn(),
    end: jest.fn()
}));

import PedidoControle from "./pedidos_controles";
import Carrinho_Controle from "./carrinhos_controles";
import db from "../config/db";
import { TIMEOUT } from "dns";

describe("testando o pedido controle",()=>{
    let model: PedidoControle;
    let carrinho: Carrinho_Controle
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() =>{
        carrinho = new Carrinho_Controle();
        model = new PedidoControle(carrinho);

        req = {
            params: {
                id_cliente: '1',
                status_pedido: 'status',
                id_pedido: '1',
            },
            body: {
                id_cliente: '1',
                status_pedido: 'status',
                id_pedido: '1',
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

    test("Deve retornar pedido", async () => {
        const id_cliente = parseInt(req.params!.id_cliente!);

        jest.spyOn(model, "get_Pedido").mockImplementation(
            (id_cliente: number, callback: (err: MysqlError | null, results: any) => void) => {
                callback(null, [{id: 1, nome: 'produto 1'}]);
            }
        );

        await model.pegar_pedido(req as Request, res as Response);

        expect(model.get_Pedido).toHaveBeenCalledWith(id_cliente, expect.any(Function));

        expect(res.json).toHaveBeenCalledWith([{id: 1, nome: 'produto 1'}]);
    });
});
