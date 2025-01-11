export class Produto {
  constructor(
    public _id: number,
    public _nome: string,
    public _descricao: string | null,
    public _preco: number,
    public _estoque: number,
    public _categoria: string,
  ) {}
}
