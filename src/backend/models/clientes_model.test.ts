jest.mock("../config/db", () => ({
    query: jest.fn(),
    connect: jest.fn(),
    end: jest.fn()
}));


import ClienteModel from "./clientes_model";
import db from "../config/db";

describe('testando o modelo cliente', () => {
    let model: any;
    beforeEach(() =>{
        model = new ClienteModel();
    });

    afterEach(() => {
        jest.clearAllMocks();
        if (db.end) db.end()
    })

    const mockCallback = jest.fn();
    
    describe('pegar o cliente', () => {
        test('pegar o cliente', () => {
            model.get_Cliente("onedirectionxd@gmail.com",mockCallback);
            expect(db.query).toHaveBeenCalledWith(
                `SELECT * FROM tb_clientes WHERE cliente_email = 'onedirectionxd@gmail.com'`,
                expect.any(Function)
            );
        });
    });
    describe('pegar email', () => {
        test('pegar email', () => {
            model.get_Email_Cliente("onedirectionxd@gmail.com",mockCallback);
            expect(db.query).toHaveBeenCalledWith(
                `SELECT cliente_email FROM tb_clientes WHERE cliente_email = 'onedirectionxd@gmail.com'`,
                expect.any(Function)
            )
        });
    });
    describe('criar cliente', () => {
        test('criar cliente', () => {
            model.create_Cliente("teste@gmail.com","senha_generica","O Desempacotador",mockCallback);
            expect(db.query).toHaveBeenCalledWith(
                `INSERT INTO tb_clientes (cliente_email, cliente_log_senha, nm_cliente) VALUES ('teste@gmail.com', 'senha_generica', 'O Desempacotador')`,
                expect.any(Function)
            )
        });
    });
    describe('deletar cliente', () => {
        test('deletar cliente', () => {
            model.delete_cliente(0,mockCallback);
            expect(db.query).toHaveBeenCalledWith(
                `DELETE from tb_clientes WHERE id_cliente = 0`,
                expect.any(Function)
            )
        });
    });
});