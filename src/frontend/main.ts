/**
 * Este código inicializa a interface do usuário de uma aplicação web quando o documento HTML é completamente carregado.
 *
 * @file Este arquivo é o ponto de entrada principal para a inicialização do frontend da aplicação.
 */

// Importa a classe DomHeaderFooter do módulo utils/domHeaderFooter.js
import { DomHeaderFooter } from "./utils/domHeaderFooter.js";

// Importa a classe DomMain do módulo utils/domMain.js
import { DomMain } from "./utils/domMain.js";

// Importa a classe EventManager do módulo utils/eventManager.js
import { EventManager } from "./utils/eventManager.js";

// Adiciona um ouvinte de evento para o evento DOMContentLoaded, que é disparado quando o documento HTML foi completamente carregado e analisado
document.addEventListener("DOMContentLoaded", async () => {
	// Cria uma instância da classe DomHeaderFooter
	const domHeaderFooter = new DomHeaderFooter();

	// Inicializa a instância de DomHeaderFooter, carregando e configurando cabeçalho e rodapé
	await domHeaderFooter.initialize();

	// Cria uma instância da classe DomMain, passando o seletor "main" como argumento
	const domMain = new DomMain("main");

	// Cria uma instância da classe EventManager, passando a instância de DomMain como argumento
	const eventManager = new EventManager(domMain);

	// Inicializa os eventos gerenciados pela instância de EventManager
	eventManager.initializeEvents();

	// Carrega a página inicial (home.html) e vincula o método loadHomePage do EventManager ao evento de carregamento da página
	domMain.loadPage("./pages/home.html", eventManager.loadHomePage.bind(eventManager));
});
