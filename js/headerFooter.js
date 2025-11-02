(function () {
    class HeaderFooter {
        constructor() {
            this.overlay = document.querySelector('.overlay')
            this.header = document.querySelector('header');
            this.nav = document.querySelector('.header__nav');
            this.menuToggle = document.querySelector('.menu-toggle');
            this.copyrightText = document.querySelector('.footer__copyright-text')
        }

        populateCurrentYear() {
            const currentYear = new Date().getFullYear();
            this.copyrightText.textContent = `© ${currentYear} BriteMed Clinic. All Rights Reserved.`;
        }

        bindingEvents() {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 0) {
                    this.header.classList.add('header-scrolled');
                } else {
                    this.header.classList.remove('header-scrolled');
                }
            });

            this.menuToggle.addEventListener('click', () => {
                const isOpen = this.nav.classList.toggle('open');
                this.menuToggle.classList.toggle('active');
                this.menuToggle.setAttribute('aria-expanded', isOpen);
                this.overlay.classList.toggle('active');
            });

            this.overlay.addEventListener('click', () => {
                this.nav.classList.remove('open');
                this.menuToggle.classList.remove('active');
                this.menuToggle.setAttribute('aria-expanded', false);
                this.overlay.classList.remove('active');
            });
        }

        init() {
            this.populateCurrentYear();
            this.bindingEvents();
        }
    }

    window.addEventListener("DOMContentLoaded", () => {
        const HeaderFooterObj = new HeaderFooter();
        HeaderFooterObj.init();
    });
})();
