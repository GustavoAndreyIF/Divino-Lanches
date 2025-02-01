import { AutenService } from "../services/ServiceAuthenticate.js";
import { DomHeaderFooter } from "../utils/RenderHeaderFooter.js";
import { DomMain } from "../utils/ManagerDOM.js";
import { EventManager } from "../utils/ManagerEvent.js";
import { ToastsAuthenticate } from "../components/ToastsAuthenticate.js";

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
				console.log("logou");
				domMain.loadPage(
					"./pages/home.html",
					eventManager.loadHomePage.bind(eventManager)
				);
			} else {
				ToastsAuthenticate.renderLoginFailed();
			}
		} catch (error) {
			console.error("Erro durante o login:", error);
			//alert("Erro durante o login. Por favor, tente novamente.");
		}
	}

	async handleRegister(email: string, password: string, nome: string): Promise<void> {
		try {
			await this.autenService.register(email, password, nome);

			await this.handleLogin(email, password);
		} catch (error) {
			console.error("Erro durante o Registro:", error);
		}
	}
}
