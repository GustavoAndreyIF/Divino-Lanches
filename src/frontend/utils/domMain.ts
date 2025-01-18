import { HeaderCarousel } from "../components/headerCarousel.js";

/**
 * Esta classe é responsável por gerenciar o carregamento e a atualização de páginas na interface do usuário.
 *
 * @class DomMain
 */
export class DomMain {
    /**
     * Cria uma instância de DomMain.
     * @param containerId - O ID do contêiner onde o conteúdo da página será carregado.
     */
    constructor(private containerId: string) {}

    /**
     * Carrega uma página a partir de uma URL e atualiza o contêiner com o conteúdo da página.
     * @param pageUrl - A URL da página a ser carregada.
     * @param callback - Uma função de callback opcional a ser executada após o carregamento da página.
     */
    async loadPage(pageUrl: string, callback?: () => void): Promise<void> {
        try {
            // Faz uma requisição para obter o conteúdo da página.
            const response = await fetch(pageUrl);
            // Converte a resposta para texto HTML.
            const html = await response.text();
            // Atualiza o contêiner com o conteúdo da página.
            this.updateContainer(html);
            // Executa a função de callback, se fornecida.
            if (callback) {
                callback();
            }
        } catch (error) {
            // Exibe um erro no console se ocorrer um problema durante o carregamento da página.
            console.error("Erro ao carregar a página:", error);
        }
    }

    /**
     * Atualiza o contêiner com o conteúdo HTML fornecido.
     * @param html - O conteúdo HTML a ser inserido no contêiner.
     */
    private updateContainer(html: string): void {
        // Obtém o contêiner pelo ID.
        const container = document.getElementById(this.containerId);
        // Se o contêiner for encontrado, atualiza seu conteúdo.
        if (container) {
            container.innerHTML = html;
        } else {
            // Exibe um erro no console se o contêiner não for encontrado.
            console.error(`Container com ID ${this.containerId} não encontrado.`);
        }
    }

    /**
     * Carrega e renderiza a página inicial.
     */
    render(): void {
        this.loadPage("../pages/home.html");
    }

    /**
     * Renderiza o carrossel de cabeçalho na página.
     */
    renderHeaderCarousel(): void {
        // Cria uma instância do carrossel de cabeçalho.
        const headerCarousel = new HeaderCarousel();
        // Obtém o contêiner do carrossel pelo ID.
        const headerContainer = document.getElementById("slide");
        // Se o contêiner for encontrado, atualiza seu conteúdo com o carrossel.
        if (headerContainer) {
            headerContainer.innerHTML = headerCarousel.render();
        }
    }

    /**
     * Limpa o conteúdo do carrossel de cabeçalho.
     */
    clearHeaderCarousel(): void {
        // Obtém o contêiner do carrossel pelo ID.
        const headerContainer = document.getElementById("slide");
        // Se o contêiner for encontrado, limpa seu conteúdo.
        if (headerContainer) {
            headerContainer.innerHTML = "";
        }
    }
}