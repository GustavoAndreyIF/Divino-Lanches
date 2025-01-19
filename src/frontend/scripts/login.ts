import { AutenticarController } from "../controllers/autenticarController.js";

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm") as HTMLFormElement;

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); 

        const email = (document.getElementById("txtEmail") as HTMLInputElement).value;
        const password = (document.getElementById("txtSenha") as HTMLInputElement).value;

        const autenticarController = new AutenticarController();
        await autenticarController.handleLogin(email, password);
    });
});