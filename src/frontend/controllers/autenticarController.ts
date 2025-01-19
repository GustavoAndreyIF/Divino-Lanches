import { AutenService } from "../services/autenticarService.js";
import { DomHeaderFooter } from "../utils/domHeaderFooter.js";
import { DomMain } from "../utils/domMain.js";
import { EventManager } from "../utils/eventManager.js";

export class AutenticarController {
    private autenService: AutenService;

    constructor() {
        this.autenService = new AutenService();
    }

    async handleLogin(email: string, password: string): Promise<void> {
        try {
            await this.autenService.login(email, password);

            if (this.autenService.isLoggedIn()) {
                const domHeaderFooter = new DomHeaderFooter();
                await domHeaderFooter.initialize();

                const domMain = new DomMain("main");
                const eventManager = new EventManager(domMain);

                eventManager.initializeEvents();

                domMain.loadPage("./pages/home.html", eventManager.loadHomePage.bind(eventManager));
            } else {
                alert("Login falhou. Por favor, verifique suas credenciais.");
            }
        } catch (error) {
            console.error("Erro durante o login:", error);
            alert("Erro durante o login. Por favor, tente novamente.");
        }
    }
}