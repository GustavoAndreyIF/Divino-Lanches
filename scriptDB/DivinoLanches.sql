CREATE TABLE IF NOT EXISTS `Tb_Products` (
	`id_Product` int AUTO_INCREMENT NOT NULL UNIQUE,
	`nm_Product` varchar(255) NOT NULL UNIQUE,
	`price_Product` float NOT NULL,
	`qt_Estoque` int NOT NULL,
	`categoria` varchar(255) NOT NULL,
	`descricao` varchar(510),
	PRIMARY KEY (`id_Product`)
);

CREATE TABLE IF NOT EXISTS `tb_clientes` (
	`id_cliente` int AUTO_INCREMENT NOT NULL UNIQUE,
	`cliente_email` varchar(256) NOT NULL UNIQUE,
	`cliente_log_senha` varchar(256) NOT NULL,
	`nm_cliente` varchar(256) NOT NULL UNIQUE,
	PRIMARY KEY (`id_cliente`)
);

CREATE TABLE IF NOT EXISTS `Tb_Carrinho_Produtos` (
	`id_carrinho_produto` int AUTO_INCREMENT NOT NULL UNIQUE,
	`id_cliente` int NOT NULL,
	`id_Product` int NOT NULL,
	`Qt_Product_Carrinho` int NOT NULL,
	PRIMARY KEY (`id_carrinho_produto`)
);

CREATE TABLE IF NOT EXISTS `Tb_Pedidos` (
	`id_pedido` int NOT NULL,
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`id_cliente` int NOT NULL,
	`id_Produto` int NOT NULL,
	`Qt_pedido` int NOT NULL,
	`status_pedido` varchar(256) NOT NULL,
	PRIMARY KEY (`id`)
);



ALTER TABLE `Tb_Carrinho_Produtos` ADD CONSTRAINT `Tb_Carrinho_Produtos_fk1` FOREIGN KEY (`id_cliente`) REFERENCES `tb_clientes`(`id_cliente`);

ALTER TABLE `Tb_Carrinho_Produtos` ADD CONSTRAINT `Tb_Carrinho_Produtos_fk2` FOREIGN KEY (`id_Product`) REFERENCES `Tb_Products`(`id_Product`);
ALTER TABLE `Tb_Pedidos` ADD CONSTRAINT `Tb_Pedidos_fk2` FOREIGN KEY (`id_cliente`) REFERENCES `tb_clientes`(`id_cliente`);

ALTER TABLE `Tb_Pedidos` ADD CONSTRAINT `Tb_Pedidos_fk3` FOREIGN KEY (`id_Produto`) REFERENCES `Tb_Products`(`id_Product`);

INSERT INTO tb_products (nm_Product, price_Product, qt_Estoque, descricao, categoria) VALUES
    ('Product A', 10.50, 100, 'Description for Product A', 'Category 1'),
    ('Product B', 25.99, 50, 'Description for Product B', 'Category 2'),
    ('Product C', 7.80, 0, 'Description for Product C', 'Category 3'),
    ('Product D', 18.75, 30, 'Description for Product D', 'Category 1'),
    ('Product E', 40.00, 5, 'Description for Product E', 'Category 2'),
    ('Product F', 3.99, 0, 'Description for Product F', 'Category 3'),
    ('Product G', 55.00, 20, 'Description for Product G', 'Category 1'),
    ('Product H', 12.25, 0, 'Description for Product H', 'Category 2'),
    ('Product I', 8.49, 150, 'Description for Product I', 'Category 3'),
    ('Product J', 100.00, 10, 'Description for Product J', 'Category 1');
