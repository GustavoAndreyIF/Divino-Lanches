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