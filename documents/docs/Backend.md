# O Backend  
  
## Sobre Rotas  
  
### Rotas dos produtos  
  
> As requisições ```POST``` e ```PUT``` usam body no formato ```x-www-urlencoded``` 

```./Produtos```  
  
Rota ```GET``` que lista todos os produtos salvos.  
  
```./PegarProduto/:id_produto```  
  
Rota ```GET``` que retorna uma **lista** contendo um único produto da tabela, visto que todos os produtos tem id único, o id é passado como parâmetro da rota.  
  
```/Produtos/:categoria```  
  
Rota ```GET``` que retorna uma lista de produtos filtrados por sua categoria.  

### Rotas dos produtos em carrinho  
  
```/ProdutosCarrinho/:id_cliente ```  

Rota ```GET``` que retorna uma lista de produtos dentro de um carrinho, cada cliente possui apenas um carrinho, por tanto a chave de referência é o ```id_cliente``` passado como parâmetro da rota.

```/DeletarProdutoCarrinho/:id_produto/cliente/:id_cliente```

Rota ```DELETE``` que apaga um produto de um carrinho do banco de dados.

```/CriarProdutoCarrinho/``` 

Rota ```POST``` que adiciona um produto ao carrinho de um cliente logado. Especificamente cria um produto carrinho dentro da tabela de produtos dentro de carrinhos.  
  
```/ProdutoCarrinhoAltQt```

Rota ```PUT``` que altera o atributo ```Qt_Product_Carrinho``` de uma linha da tabela de produtos carrinho. Na prática altera a quantidade do produto no carrinho do cliente.


### 