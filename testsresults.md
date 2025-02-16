# RESULTADO DOS TESTES UNITÁRIOS DAS CLASSES DO BACKEND.

Foram feitos 25 testes no total, apenas nos métodos sendo utilizados no momento. Outros testes seram feitos a medida que novas implementações forem feitas.

    PASS  src/backend/controllers/produtos_controle.test.ts (5.008 s)
    PASS  src/backend/models/carrinhos_model.test.ts (5.037 s)
    PASS  src/backend/controllers/carrinhos_controles.test.ts
    PASS  src/backend/controllers/clientes_controle.test.ts
    PASS  src/backend/models/produtos_model.test.ts                                                                                                  
    PASS  src/backend/models/clientes_model.test.ts
    PASS  src/backend/models/pedidos_model.test.ts (6.812 s)
    PASS  src/backend/controllers/pedidos_controles.test.ts

    Test Suites: 8 passed, 8 total
    Tests:       25 passed, 25 total
    Snapshots:   0 total
    Time:        7.708 s
    Ran all test suites.

Alguns testes demoraram mais pela questão da natureza do método, como por exemplo, carrinho_controle, que utiliza mais de um método dos modelos em um só método.