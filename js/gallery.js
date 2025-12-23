(function () {
    class Gallery {
        constructor() {
            this.galleryCardContainer = document.querySelector('.gallery__card-container');
            this.collageContainer = document.querySelector('.gallery__collage-container');
        }

        async populateGalleryCards() {
            const response = await fetch('../assets/data/gallery.json');
            const galleryData = await response.json();

            galleryData.beforeAfter.forEach(image => {
                const card = document.createElement('div');
                card.className = 'gallery__card';

                card.innerHTML = `
                    <div class="gallery__card-img-container">
                        <div class="gallery__card-before-container">
                        <p class="gallery__card-before-title">BEFORE</p>
                        <img src="${image.beforeImage.src}" alt="${image.beforeImage.alt}" class="gallery__card-before-img">
                        </div>
                        <div class="gallery__card-after-container">
                        <p class="gallery__card-after-title">AFTER</p>
                        <img src="${image.afterImage.src}" alt="${image.afterImage.alt}" class="gallery__card-after-img">
                        </div>
                    </div>
                    <div class="gallery__card-text-container">
                        <h2 class="gallery__card-text-title">${image.procedureName}</h2>
                        <p class="gallery__card-text-subtitle">${image.procedureType}</p>
                    </div>`;

                this.galleryCardContainer.appendChild(card);
            })

            galleryData.collage.forEach(image => {
                const card = document.createElement('div');
                card.className = 'gallery__card';

                card.innerHTML = `
                    <div class="gallery__card-img-container">
                        <img src="${image.imgSrc}" alt="${image.imgAlt}" class="gallery__collage-img" />
                    </div>
                    <div class="gallery__card-text-container">
                        <h2 class="gallery__card-text-title">${image.procedureName}</h2>
                        <p class="gallery__card-text-subtitle">${image.procedureType}</p>
                    </div>`;

                this.collageContainer.appendChild(card);
            })
        }

        init() {
            this.populateGalleryCards();
        }
    }

    window.addEventListener("DOMContentLoaded", () => {
        const GalleryObj = new Gallery();
        GalleryObj.init();
    });
})();