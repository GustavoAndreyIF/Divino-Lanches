import { AutenService } from "../services/autenticarService.js";
import { Header } from "../components/header.js";
import { Footer } from "../components/footer.js";

export class DomHeaderFooter {
	constructor(
		private autenService: AutenService = new AutenService(),
		private header: Header = new Header(autenService),
		private footer: Footer = new Footer()
	) {
		this.autenService.setLoggedIn(false); // Altere para true ou false para simular o estado de login
	}

	render(): void {
		document.getElementById("header")!.innerHTML = this.header.render();
		document.getElementById("footer")!.innerHTML = this.footer.render();
	}
}
