import { HeaderCarousel } from "../components/Carousel.js";

export class DomMain {
    constructor(private containerId: string) {}

    async loadPage(pageUrl: string, callback?: () => void): Promise<void> {
        try {
            const response = await fetch(pageUrl);
            const html = await response.text();
            this.updateContainer(html);

            if (pageUrl.includes("login")) {
                const script = document.createElement("script");
                script.type = "module";
                script.src = "./scripts/login.js";
                document.body.appendChild(script);
            }
            if (pageUrl.includes("cadastro")) {
                const script1 = document.createElement("script");
                script1.type = "module";
                script1.src = "./scripts/register.js";
                document.body.appendChild(script1);
            }
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