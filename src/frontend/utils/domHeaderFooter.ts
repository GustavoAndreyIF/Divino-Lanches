import { AutenService } from "../services/autenticarService.js";
import { Header } from "../components/header.js";
import { Footer } from "../components/footer.js";

export class DomHeaderFooter {
    constructor(
        private header: Header = new Header(new AutenService()),
        private footer: Footer = new Footer()
    ) {}

    async initialize(): Promise<void> {
        await this.render();
    }

    private async render(): Promise<void> {
        document.getElementById("header")!.innerHTML = await this.header.render();
        document.getElementById("footer")!.innerHTML = this.footer.render();
    }
}