(function () {
    class HomePage {
        constructor() {
            this.statsContainer = document.querySelector('.intro__stats-container');
            this.counters = document.querySelectorAll('.intro__stats-number span');
            this.servicesCardContainer = document.querySelector('.services__card-container');
            this.wcuCardContainer = document.querySelector('.wcu__card-container');
            this.doctorsCardContainer = document.querySelector('.our-doctors__card-container');
            this.testimonialsCardContainer = document.querySelector('.testimonials__card-container');
        }

        animateCounters() {
            this.counters.forEach(counter => {
                const target = +counter.dataset.count;
                const duration = 500;
                const stepTime = 20;
                const increment = target / (duration / stepTime);
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, stepTime);
            });
        }

        observeCounters() {
            if (!this.statsContainer) return;

            let hasAnimated = false;
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasAnimated) {
                        hasAnimated = true;
                        this.animateCounters();
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.4 });

            observer.observe(this.statsContainer);
        }

        async populateServiceCards() {
            const response = await fetch('js/services.json');
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

        async populateWcuCards() {
            const response = await fetch('js/wcu.json');
            const wcuData = await response.json();

            wcuData.forEach(wcu => {
                const card = document.createElement('div');
                card.className = 'wcu__card';
                card.innerHTML = `
                <div class="wcu__card-img-container">
                    <img src="${wcu.icon}" alt="${wcu.iconAlt}" width="28px" height="28px" class="wcu__card-img">
                </div>
                <div class="wcu__card-text-container">
                    <h2 class="wcu__card-title">${wcu.title}</h2>
                    <p class="wcu__card-desc">${wcu.desc}</p>
                </div>`;
                this.wcuCardContainer.appendChild(card);
            })
        }

        async populateDoctorsCards() {
            const response = await fetch('js/doctors.json');
            const doctorsData = await response.json();

            doctorsData.forEach(doctor => {
                const card = document.createElement('div');
                card.className = 'our-doctors__card';

                card.innerHTML = `
                    <img src="${doctor.img}" alt="${doctor.imgAlt}" class="our-doctors__card-img">
                    <div class="our-doctors__text-container">
                        <h2 class="our-doctors__card-title">${doctor.name}</h2>
                        <p class="our-doctors__card-subtitle">${doctor.designation}</p>
                        <p class="our-doctors__card-subtitle text-dark-grey">License No: ${doctor.licenseNo}</p>
                        <a href="our-doctors/#${doctor.licenseNo}" class="our-doctors__card-btn">Learn More</a>
                    </div>`;

                this.doctorsCardContainer.appendChild(card);
            })
        }

        async populateTestimonialsCards() {
            const response = await fetch('js/testimonials.json');
            const testimonialsData = await response.json();

            testimonialsData.forEach(testimonial => {
                const card = document.createElement('a');
                card.className = 'testimonials__card';
                card.href = testimonial.link;
                card.target = '_blank';

                card.innerHTML = `
                    <div class="testimonials__card-rating">★★★★★</div>
                    <p class="testimonials__card-desc">${testimonial.desc}</p>
                    <p class="testimonials__card-name">${testimonial.name}</p>`;
                this.testimonialsCardContainer.appendChild(card);
            })
        }

        init() {
            this.observeCounters();
            this.populateServiceCards();
            this.populateWcuCards();
            this.populateDoctorsCards();
            this.populateTestimonialsCards();
        }
    }

    window.addEventListener("DOMContentLoaded", () => {
        const HomePageObj = new HomePage();
        HomePageObj.init();
    });
})();
