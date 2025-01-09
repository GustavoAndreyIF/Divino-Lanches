import { Produto } from '../models/produto';

export class DomProduto {
    // Este método é estático, o que significa que pode ser chamado diretamente na classe DomProduto sem precisar instanciar um objeto.
    static renderProdutos(produtos: Produto[]): void {
        const divProdutos = document.getElementById('divProdutos');
        if (!divProdutos) return;

        divProdutos.innerHTML = produtos.map(produto => `
                <div class="card text-center bg-light">
                    <img src="images/produtosImg/${produto.imagem}" class="card-img-top" />
                    <div class="card-header">
                        <h5 class="card-title">${produto.nome}</h5>
                    </div>
                    <div class="card-body">
                        <p class="card-text truncate-3l">${produto.descricao}</p>
                        <h5 class="card-title">R$${produto.preco}</h5>
                    </div>
                    <div class="card-footer">
                        <form class="d-block">
                            <button type="button" class="btn btn-warning">Adicionar ao Carrinho</button>
                        </form>
                        <small class="text-success">Disponível</small>
                    </div>
                </div>
        `).join('');
    }
}