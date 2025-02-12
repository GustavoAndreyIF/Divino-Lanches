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
})