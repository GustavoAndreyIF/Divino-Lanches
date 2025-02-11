
jest.mock("../config/db", () => ({
    query: jest.fn(),
    connect: jest.fn(),
    end: jest.fn()
}));


import ProdutosModel from "./produtos_model";
import db from "../config/db";

describe('ProdutosModel', () => {
    let model: any;

    beforeEach(() => {
        model = new ProdutosModel();
    });

    afterEach(() => {
        jest.clearAllMocks();
        if (db.end) db.end()
    });

    describe('metodo getAll', () => {
        it('should call db.query in getAll method', () => {
            const mockCallback = jest.fn();
            model.getAll(mockCallback);
            expect(db.query).toHaveBeenCalledWith(
                "SELECT * FROM tb_products",
                mockCallback
            );
        });
    });

    describe('metodo getAllFiltered', () => {
        it('obter registros da tabela produtos', () => {
            const keyCollumn = 'nome';
            const filter = 'produto1';
            const mockCallback = jest.fn();
            const expectedQuery = `SELECT * FROM tb_products WHERE ${keyCollumn} = '${filter};'`

            model.getAllFiltered(keyCollumn, filter, mockCallback);
            expect(db.query).toHaveBeenCalledWith(expectedQuery, mockCallback);
        });
    });
});
