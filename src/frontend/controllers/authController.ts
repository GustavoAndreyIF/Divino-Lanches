import { AutenService } from "../services/autenticarService.js";

export class AuthController {
  private authService: AutenService;

  constructor() {
    this.authService = new AutenService();
  }

  async handleLogin(email: string, password: string): Promise<void> {
    await this.authService.login(email, password);
    if (this.authService.isLoggedIn()) {
      window.location.href = "../index.html";
    } else {
      alert("Login failed");
    }
  }

  async handleRegister(email: string, password: string, name: string): Promise<void> {
    await this.authService.register(email, password, name);
    if (this.authService.isLoggedIn()) {
      window.location.href = "../index.html";
    } else {
      alert("Registration failed");
    }
  }
}