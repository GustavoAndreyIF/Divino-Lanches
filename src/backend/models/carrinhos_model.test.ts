jest.mock("../config/db", () => ({
    query: jest.fn(),
    connect: jest.fn(),
    end: jest.fn()
}));


import CarrinhoModel from "./carrinhos_model";
import db from "../config/db";

describe('testando o modelo dos carrinhos',() => {
    let model: any;
    beforeEach(() =>{
        model = new CarrinhoModel();
    });

    afterEach(() => {
        jest.clearAllMocks();
        if (db.end) db.end()
    })

    const mockCallback = jest.fn();

    describe('pegar o carrinho', () => {
        test('pegar o carrinho', () => {
            model.get_Carrinho("key",1,mockCallback);
            expect(db.query).toHaveBeenCalledWith(
                `SELECT * FROM tb_carrinho_produtos WHERE key = 1`,
                expect.any(Function)
            );
        });
    });
    describe('criar o carrinho', () => {
        test('criar o carrinho', () => {
            model.create(2,3,4,mockCallback);
            expect(db.query).toHaveBeenCalledWith(
                `INSERT INTO tb_carrinho_produtos (id_cliente, id_Product, Qt_Product_Carrinho) VALUES (2, 3, 4)`,
                expect.any(Function)
            );
        });
    });
    describe('remover o carrinho', () => {
        test('remover o carrinho', () => {
            model.remover('key',5,mockCallback);
            expect(db.query).toHaveBeenCalledWith(
                `DELETE FROM tb_carrinho_produtos WHERE key = 5`,
                expect.any(Function)
            );
        });
    });
    describe('remover keyclient', () => {
        test('remover keyclient', () => {
            model.remover_keyCliente('key',6,7,mockCallback);
            expect(db.query).toHaveBeenCalledWith(
                `DELETE FROM tb_carrinho_produtos WHERE key = 6 AND id_cliente = 7`,
                expect.any(Function)
            );
        });
    });
    describe('alterar atributo', () => {
        test('alterar atributo', () => {
            model.alt_Atributo('target',8,'collumn',9,mockCallback);
            expect(db.query).toHaveBeenCalledWith(
                `UPDATE tb_carrinho_produtos SET target = 8 WHERE collumn = 9`,
                expect.any(Function)
            );
        });
    });
})