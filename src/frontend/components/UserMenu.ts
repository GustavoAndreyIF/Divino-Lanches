import { DomMain } from "../utils/ManagerDOM.js";

export class UserMenu {
    constructor(private domMain: DomMain) {}

    initialize(): void {
        this.renderMenu();
        const menuItems = document.querySelectorAll("#divMenuCliente .list-group-item");

        menuItems.forEach((item) => {
            item.addEventListener("click", async (event) => {
                event.preventDefault();
                await this.handleMenuClick(item);
            });
        });

        // Adicionar evento de clique para o botão de logout
        const logoutButton = document.getElementById("linkLogoutMenu");
        if (logoutButton) {
            logoutButton.addEventListener("click", (event) => {
                event.preventDefault();
                localStorage.removeItem("user");
                window.location.reload();
            });
        }
    }

    private renderMenu(): void {
        const menuHtml = `
            <div class="list-group">
                <a href="#" id="linkClienteDados" class="list-group-item list-group-item-action bg-warning text-dark">
                    <i class="bi-person fs-6"></i> Dados Pessoais
                </a>
                <a href="#" id="linkClienteEndereco" class="list-group-item list-group-item-action">
                    <i class="bi-house-door fs-6"></i> Endereço
                </a>
                <a href="#" id="linkClientePedidos" class="list-group-item list-group-item-action">
                    <i class="bi-truck fs-6"></i> Pedidos
                </a>
                <a href="#" id="linkClienteSenha" class="list-group-item list-group-item-action">
                    <i class="bi-lock fs-6"></i> Alterar Senha
                </a>
                <a href="#" id="linkLogoutMenu" class="list-group-item list-group-item-action">
                    <i class="bi-door-open fs-6"></i> Sair
                </a>
            </div>
        `;

        const menuContainer = document.getElementById("divMenuCliente");
        if (menuContainer) {
            menuContainer.innerHTML = menuHtml;
        } else {
            console.error("Menu container not found");
        }
    }

    private async handleMenuClick(clickedItem: Element): Promise<void> {
        const menuItems = document.querySelectorAll("#divMenuCliente .list-group-item");

        menuItems.forEach((item) => {
            item.classList.remove("bg-warning", "text-dark");
        });

        clickedItem.classList.add("bg-warning", "text-dark");

        const pageMap: { [key: string]: string } = {
            "linkClienteDados": "./pages/dadosPessoais.html",
            "linkClienteEndereco": "./pages/endereco.html",
            "linkClientePedidos": "./pages/pedidos.html",
            "linkClienteSenha": "./pages/alterarSenha.html",
        };

        const pageId = clickedItem.getAttribute("id");
        if (pageId && pageMap[pageId]) {
            const mainClienteDom = new DomMain("mainCliente");
            await mainClienteDom.loadPage(pageMap[pageId]);
            // carregar script das paginas aqu
        }
    }
}