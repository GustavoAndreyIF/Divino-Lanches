jest.mock("../config/db", () => ({
    query: jest.fn(),
    connect: jest.fn(),
    end: jest.fn()
}));


import db from "../config/db";
import PedidoModel from "./pedidos_model";

describe('testando o modelo cliente', () => {
    let model: any;
    beforeEach(() =>{
        model = new PedidoModel();
    });

    afterEach(() => {
        jest.clearAllMocks();
        if (db.end) db.end()
    })

    const mockCallback = jest.fn();

    describe('Pegar Pedido.', () => {
        test('Pegar Pedido.', () => {
            model.get_Pedido(1, mockCallback);
            expect(db.query).toHaveBeenCalledWith(
                `SELECT * FROM tb_pedidos WHERE id_cliente = 1`,
                expect.any(Function)
            );
        });
    });

    describe('Criar Pedido.', () => {
        test('Criar Pedido.', () => {
            model.create_Pedido(1,1,1,1,"Pendente", mockCallback);
            expect(db.query).toHaveBeenCalledWith(
                `INSERT INTO tb_pedidos (id_pedido, id_cliente, id_Produto, Qt_pedido, status_pedido) VALUES (1, 1, 1, 1, 'Pendente')`,
                expect.any(Function)
            );
        });
    });

    describe('Pega id_pedido a partir de um cliente.', () => {
        test('Pega id_pedido a partir de um cliente.', () => {
            model.get_id_Pedido_cliente(1, mockCallback);
            expect(db.query).toHaveBeenCalledWith(
                `SELECT id_pedido from tb_pedidos WHERE id_cliente = 1`,
                expect.any(Function)
            );
        });
    });

    describe('Deletar Pedido.', () => {
        test('Deletar Pedido.', () => {
            model.delete_Pedido(1, 1, mockCallback);
            expect(db.query).toHaveBeenCalledWith(
                `DELETE FROM tb_pedidos WHERE id_pedido = 1 AND id_cliente = 1`,
                expect.any(Function)
            );
        });
    });
});
