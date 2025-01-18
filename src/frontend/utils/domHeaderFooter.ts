import { AutenService } from "../services/autenticarService.js";
import { Header } from "../components/header.js";
import { Footer } from "../components/footer.js";

export class DomHeaderFooter {
    constructor(
        private autenService: AutenService = new AutenService(),
        private header: Header = new Header(new AutenService()),
        private footer: Footer = new Footer()
    ) {}

    async initialize(): Promise<void> {
        await this.checkLoginStatus();
        this.render();
    }

    private async checkLoginStatus(): Promise<void> {
        const loggedIn = JSON.parse(localStorage.getItem('loggedIn') || 'false');
        this.autenService.setLoggedIn(loggedIn);
    }

    render(): void {
        document.getElementById("header")!.innerHTML = this.header.render();
        document.getElementById("footer")!.innerHTML = this.footer.render();
    }
}