import { AutenticarController } from "../controllers/autenticarController.js";

    console.log('carregou');
    setTimeout(() => {
        let txtNome = document.getElementById("txtNome") as HTMLInputElement;
        txtNome.focus() ;
    }, 0);
    

    let RegisterForm = document.getElementById("registerForm") as HTMLFormElement
    RegisterForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const name = (document.getElementById("txtNome") as HTMLInputElement).value ;
        const email = (document.getElementById("txtEmail")as HTMLInputElement).value;
        const password = (document.getElementById("txtSenha")as HTMLInputElement).value;
        const confirmPassword = (document.getElementById("txtConfirmacaoSenha")as HTMLInputElement).value;

        // Validação do email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Por favor, insira um email válido.");
            return;
        }

        // Validação da senha
        if (password.length < 8) {
            alert("A senha deve ter no mínimo 8 caracteres.");
            return;
        }

        // Validação do nome
        if (name.length > 256) {
            alert("O nome deve ter no máximo 256 caracteres.");
            return;
        }

        if (password !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }

        const AutenticarControl: AutenticarController = new AutenticarController();
        try {
            await AutenticarControl.handleRegister(email, password, name);
        } catch (error) {
            console.error('Erro ao registrar:', error);
            alert('Erro ao registrar. Por favor, tente novamente.');
        }
    });