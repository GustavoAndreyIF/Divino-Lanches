import ClienteModel from "./clientes_model";
import db from "../config/db";

jest.mock("../config/db", () => ({
    query: jest.fn()
}))

describe('testando o modelo cliente', () => {
    let model: any;
    beforeEach(() =>{
        model = new ClienteModel();
    });

    afterEach(() => {
        jest.clearAllMocks();
    })
    
    describe('pegar o cliente', () => {
        test('pegar o cliente', () => {
            const mockCallback = jest.fn();
            model.get_Cliente("onedirectionxd@gmail.com",mockCallback)
            expect(db.query).toHaveBeenCalledWith(
                `SELECT * FROM tb_clientes WHERE cliente_email = 'onedirectionxd@gmail.com'`,
                expect.any(Function)
            );
        });
    });
});