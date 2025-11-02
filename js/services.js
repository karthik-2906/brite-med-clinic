(function () {
    class Services {
        constructor() {
            this.servicesCardContainer = document.querySelector('.services__card-container');
        }

        async populateServiceCards() {
            const response = await fetch('../assets/data/services.json');
            const servicesData = await response.json();

            servicesData.forEach(service => {
                const card = document.createElement('div');
                card.className = 'services__card';
                card.innerHTML = `
                    <div class="services__card-img-container">
                        <img src="${service.icon}" alt="${service.iconAlt}" width="28px" height="28px" class="services__card-img">
                    </div>
                    <h2 class="services__card-title">${service.title}</h2>
                    <p class="services__card-desc">${service.desc}</p>`;
                this.servicesCardContainer.appendChild(card);
            })
        }

        init() {
            this.populateServiceCards();
        }
    }

    window.addEventListener("DOMContentLoaded", () => {
        const ServicesObj = new Services();
        ServicesObj.init();
    });
})();
