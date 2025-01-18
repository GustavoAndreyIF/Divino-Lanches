import { HeaderCarousel } from "../components/headerCarousel.js";

export class DomMain {
    constructor(private containerId: string) {}

    async loadPage(pageUrl: string, callback?: () => void): Promise<void> {
        try {
            const response = await fetch(pageUrl);
            const html = await response.text();
            this.updateContainer(html);
            if (callback) {
                callback();
            }
        } catch (error) {
            console.error("Erro ao carregar a página:", error);
        }
    }

    private updateContainer(html: string): void {
        const container = document.getElementById(this.containerId);
        if (container) {
            container.innerHTML = html;
        } else {
            console.error(`Container com ID ${this.containerId} não encontrado.`);
        }
    }

    render(): void {
        this.loadPage("../pages/home.html");
    }

    renderHeaderCarousel(): void {
        const headerCarousel = new HeaderCarousel();
        const headerContainer = document.getElementById("slide");
        if (headerContainer) {
            headerContainer.innerHTML = headerCarousel.render();
        }
    }

    clearHeaderCarousel(): void {
        const headerContainer = document.getElementById("slide");
        if (headerContainer) {
            headerContainer.innerHTML = "";
        }
    }
}