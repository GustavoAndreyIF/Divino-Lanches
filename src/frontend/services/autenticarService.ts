/**
 * Esta classe fornece serviços de autenticação, incluindo login e registro de usuários.
 *
 * @class AutenService
 */
export class AutenService {
  // Construtor da classe que inicializa a propriedade 'loggedIn' com o valor padrão 'false'
  constructor(private loggedIn = false) {}

  // Método que retorna o estado de login (true ou false)
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  // Método que define o estado de login e armazena esse estado no localStorage
  setLoggedIn(status: boolean): void {
    this.loggedIn = status;
    localStorage.setItem('loggedIn', JSON.stringify(status));
  }

  // Método assíncrono para realizar o login do usuário
  async login(email: string, password: string): Promise<void> {
    try {
      // Faz uma requisição POST para a rota '/Login' com o email e senha do usuário
      const response = await fetch('/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Se a resposta for bem-sucedida (status 200-299)
      if (response.ok) {
        // Converte a resposta em JSON e armazena os dados do usuário
        const userData = await response.json();
        // Define o estado de login como true
        this.setLoggedIn(true);
        // Armazena os dados do usuário no localStorage
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        // Lança um erro se o login falhar
        throw new Error('Login failed');
      }
    } catch (error) {
      // Exibe um erro no console se ocorrer um problema durante o login
      console.error('Error during login:', error);
    }
  }

  // Método assíncrono para registrar um novo usuário
  async register(email: string, password: string, name: string): Promise<void> {
    try {
      // Faz uma requisição POST para a rota '/Registrar' com os dados do novo usuário
      const response = await fetch('/Registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cliente_email: email, cliente_log_senha: password, nm_cliente: name }),
      });

      // Se a resposta for bem-sucedida (status 200-299)
      if (response.ok) {
        // Chama o método de login para logar o usuário recém-registrado
        await this.login(email, password);
      } else {
        // Lança um erro se o registro falhar
        throw new Error('Registration failed');
      }
    } catch (error) {
      // Exibe um erro no console se ocorrer um problema durante o registro
      console.error('Error during registration:', error);
    }
  }
}