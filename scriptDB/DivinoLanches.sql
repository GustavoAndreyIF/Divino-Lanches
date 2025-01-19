-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 19/01/2025 às 22:45
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `divinolanches`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_carrinho_produtos`
--

CREATE TABLE `tb_carrinho_produtos` (
  `id_carrinho_produto` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_Product` int(11) NOT NULL,
  `Qt_Product_Carrinho` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tb_carrinho_produtos`
--

INSERT INTO `tb_carrinho_produtos` (`id_carrinho_produto`, `id_cliente`, `id_Product`, `Qt_Product_Carrinho`) VALUES
(1, 1, 1, 3);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_clientes`
--

CREATE TABLE `tb_clientes` (
  `id_cliente` int(11) NOT NULL,
  `cliente_email` varchar(256) NOT NULL,
  `cliente_log_senha` varchar(256) NOT NULL,
  `nm_cliente` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tb_clientes`
--

INSERT INTO `tb_clientes` (`id_cliente`, `cliente_email`, `cliente_log_senha`, `nm_cliente`) VALUES
(1, 'onedirectionxd@gmail.com', 'palio123##', 'Leonildus Franciscus'),
(2, 'frontendnocode@gmail.com', 'senhaForte123', 'Gustavo Xagoniscus'),
(3, 'letgames@gmail.com', 'games123*', 'Letucio cici'),
(4, 'trojan456@gmail.com', 'malware123&', 'trojan da Silva'),
(5, 'naoseioqnaoseioqla@gmail.com', 'musga123*', 'raarfaaf viivniinciicussu');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_pedidos`
--

CREATE TABLE `tb_pedidos` (
  `id_pedido` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_Produto` int(11) NOT NULL,
  `Qt_pedido` int(11) NOT NULL,
  `status_pedido` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_products`
--

CREATE TABLE `tb_products` (
  `id_Product` int(11) NOT NULL,
  `nm_Product` varchar(255) NOT NULL,
  `price_Product` float NOT NULL,
  `qt_Estoque` int(11) NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `descricao` varchar(510) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tb_products`
--

INSERT INTO `tb_products` (`id_Product`, `nm_Product`, `price_Product`, `qt_Estoque`, `categoria`, `descricao`) VALUES
(1, 'Pão pizza', 3.5, 24, 'salgado', 'Pão recheado com recheio de pizza'),
(2, 'Bolo de pote', 5, 16, 'doce', 'Bolo de pote sabor chocolate'),
(3, 'Rosquinha doce', 4, 12, 'doce', 'Rosquinha com recheio de chocolate'),
(4, 'Cone trufado', 5, 20, 'doce', 'Cone trufado com recheio de ninho'),
(5, 'Mini pizza', 4, 10, 'salgado', 'Mini pizza de calabresa');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `tb_carrinho_produtos`
--
ALTER TABLE `tb_carrinho_produtos`
  ADD PRIMARY KEY (`id_carrinho_produto`),
  ADD UNIQUE KEY `id_carrinho_produto` (`id_carrinho_produto`),
  ADD KEY `Tb_Carrinho_Produtos_fk1` (`id_cliente`),
  ADD KEY `Tb_Carrinho_Produtos_fk2` (`id_Product`);

--
-- Índices de tabela `tb_clientes`
--
ALTER TABLE `tb_clientes`
  ADD PRIMARY KEY (`id_cliente`),
  ADD UNIQUE KEY `id_cliente` (`id_cliente`),
  ADD UNIQUE KEY `cliente_email` (`cliente_email`),
  ADD UNIQUE KEY `nm_cliente` (`nm_cliente`);

--
-- Índices de tabela `tb_pedidos`
--
ALTER TABLE `tb_pedidos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `Tb_Pedidos_fk2` (`id_cliente`),
  ADD KEY `Tb_Pedidos_fk3` (`id_Produto`);

--
-- Índices de tabela `tb_products`
--
ALTER TABLE `tb_products`
  ADD PRIMARY KEY (`id_Product`),
  ADD UNIQUE KEY `id_Product` (`id_Product`),
  ADD UNIQUE KEY `nm_Product` (`nm_Product`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tb_carrinho_produtos`
--
ALTER TABLE `tb_carrinho_produtos`
  MODIFY `id_carrinho_produto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tb_clientes`
--
ALTER TABLE `tb_clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `tb_pedidos`
--
ALTER TABLE `tb_pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_products`
--
ALTER TABLE `tb_products`
  MODIFY `id_Product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `tb_carrinho_produtos`
--
ALTER TABLE `tb_carrinho_produtos`
  ADD CONSTRAINT `Tb_Carrinho_Produtos_fk1` FOREIGN KEY (`id_cliente`) REFERENCES `tb_clientes` (`id_cliente`),
  ADD CONSTRAINT `Tb_Carrinho_Produtos_fk2` FOREIGN KEY (`id_Product`) REFERENCES `tb_products` (`id_Product`);

--
-- Restrições para tabelas `tb_pedidos`
--
ALTER TABLE `tb_pedidos`
  ADD CONSTRAINT `Tb_Pedidos_fk2` FOREIGN KEY (`id_cliente`) REFERENCES `tb_clientes` (`id_cliente`),
  ADD CONSTRAINT `Tb_Pedidos_fk3` FOREIGN KEY (`id_Produto`) REFERENCES `tb_products` (`id_Product`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
