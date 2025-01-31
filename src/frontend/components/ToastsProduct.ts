export class ToastsProduct {
    static renderProductsAdd() {
        const toastContainer: HTMLElement | null = document.getElementById("toastPlacement");
        if (!toastContainer) return;
        toastContainer.innerHTML = `
            <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                <strong class="me-auto"> Produto Adicionado</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Seu produto foi adicionado ao carrinho com sucesso!
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

    static renderProductsRemove() {
        const toastContainer: HTMLElement | null = document.getElementById("toastPlacement");
        if (!toastContainer) return;
        toastContainer.innerHTML = `
            <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <i class="bi bi-x-circle-fill text-danger me-2"></i>
                <strong class="me-auto"> Produto Removido</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                O produto foi removido do seu carrinho com sucesso!
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