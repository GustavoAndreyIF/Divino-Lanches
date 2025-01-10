export class AutenService {
constructor(private loggedIn = false) {}
  
    isLoggedIn(): boolean {
      return this.loggedIn;
    }
  
    setLoggedIn(status: boolean): void {
      this.loggedIn = status;
    }
  }