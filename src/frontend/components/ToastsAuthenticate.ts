export class ToastsAuthenticate {
	static renderLoginFailed() {
		const toastContainer: HTMLElement | null =
			document.getElementById("toastPlacement");
		if (!toastContainer) return;
		toastContainer.innerHTML = `
            <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <i class="bi bi-x-circle-fill text-danger me-2"></i>
                <strong class="me-auto"> O login falhou</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Por favor, verifique suas credenciais.
            </div>
            </div>
        `;

		const toastElement: HTMLElement | null = document.getElementById("liveToast");
		if (toastElement) {
			toastElement.classList.add("show");
			setTimeout(() => {
				toastElement.classList.remove("show");
			}, 5000);
		}
	}
}
