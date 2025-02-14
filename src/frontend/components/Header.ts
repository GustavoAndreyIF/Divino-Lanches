import { Navbar } from "./Navbar.js";
import { AutenService } from "../services/ServiceAuthenticate.js";

export class Header {
	private navbar: Navbar;

	constructor(autenService: AutenService) {
		this.navbar = new Navbar(autenService);
	}

	async render(): Promise<string> {
		const navbarContent = await this.navbar.render();
		return `
            <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm mb-3">
                <div class="container">
                    <div class="d-flex align-items-center">
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <img id="linkHome" src="assets/images/divinoLanchesLogo.png" width="56" height="56" class="d-inline-block align-text-top" />
                    </div>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 flex-grow-1">
                            <li class="nav-item">
                                <a class="nav-link" href="#" id="linkHome">Página Inicial</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" id="linkQuemSomos">Quem Somos</a>
                            </li>
                        </ul>
                        <div class="align-self-end">
                            <ul class="navbar-nav" id="userNav">
                                ${navbarContent}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        `;
	}
}
