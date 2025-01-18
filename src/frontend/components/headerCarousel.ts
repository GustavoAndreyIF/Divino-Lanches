export class HeaderCarousel {
    render(): string {
        return `
            <header class="container">
                <div
                    id="carouselMain"
                    class="carousel slide carousel-dark"
                    data-bs-ride="carousel"
                >
                    <div class="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target="#carouselMain"
                            data-bs-slide-to="0"
                            class="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselMain"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselMain"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                        ></button>
                    </div>
                    <div class="carousel-inner">
                        <div
                            class="carousel-item active text-center"
                            data-bs-interval="3000"
                        >
                            <img
                                src="assets/images/slidesPromo/slide01.png"
                                class="d-none d-md-block w-100"
                                alt="..."
                            />
                            <img
                                src="assets/images/slidesPromo/slide01small.png"
                                class="d-block d-md-none w-100"
                                alt="..."
                            />
                        </div>
                        <div class="carousel-item text-center" data-bs-interval="3000">
                            <img
                                src="assets/images/slidesPromo/slide02.png"
                                class="d-none d-md-block w-100"
                                alt="..."
                            />
                            <img
                                src="assets/images/slidesPromo/slide02small.png"
                                class="d-block d-md-none w-100"
                                alt="..."
                            />
                        </div>
                        <div class="carousel-item text-center" data-interval="3000">
                            <img
                                src="assets/images/slidesPromo/slide03.png"
                                class="d-none d-md-block w-100"
                                alt="..."
                            />
                            <img
                                src="assets/images/slidesPromo/slide03small.png"
                                class="d-block d-md-none w-100"
                                alt="..."
                            />
                        </div>
                    </div>
                    <button
                        class="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselMain"
                        data-bs-slide="prev"
                    >
                        <span class="carousel-control-prev-icon"></span>
                        <span class="visually-hidden">Anterior</span>
                    </button>
                    <button
                        class="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselMain"
                        data-bs-slide="next"
                    >
                        <span class="carousel-control-next-icon"></span>
                        <span class="visually-hidden">Próximo</span>
                    </button>
                </div>
                <hr class="mt-3" />
            </header>
        `;
    }
}