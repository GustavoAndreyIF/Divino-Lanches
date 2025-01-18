/**
 * Esta classe Footer é responsável por renderizar o rodapé da interface do usuário.
 *
 * @class Footer
 */
export class Footer {
	/**
	 * Renderiza o rodapé da interface do usuário.
	 * @returns Uma string contendo o HTML do rodapé.
	 */
	render(): string {
		// Retorna o HTML do rodapé, incluindo informações de contato e links de navegação
		return `
            <footer class="border-top text-muted bg-warning">
                <div class="container">
                    <div class="row py-3">
                        <div class="col-12 col-md-4 text-center">
                            &copy; 2025 - Divino Lanches LTDA<br />
                            Rua Tchurusbango Tudusbago, 002, info2m <br />
                            CPNJ 99.999.999/999-99
                        </div>
                        <div class="col-12 col-md-4 text-center">
                            <a href="#" id="linkPrivacidade" class="text-decoration-none text-dark">
                                Política de Privacidade
                            </a><br />
                            <a href="#" id="linkTermos" class="text-decoration-none text-dark">
                                Termos de Uso
                            </a><br />
                            <a href="#" id="linkQuemSomosFooter" class="text-decoration-none text-dark">
                                Quem Somos
                            </a>
                        </div>
                        <div class="col-12 col-md-4 text-center">
                            <a href="#" id="linkContato" class="text-decoration-none text-dark">
                                Contato pelo Site
                            </a><br />
                            E-mail:
                            <a href="#" class="text-decoration-none text-dark">
                                divinolanches@suporte.com
                            </a><br />
                            Telefone:
                            <a href="#" class="text-decoration-none text-dark">
                                (99) 9999-00009
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
	}
}
