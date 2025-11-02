(function () {
    class Doctors {
        constructor() {
            this.doctorsCardContainer = document.querySelector('.doctors');
        }

        async populateDoctorCards() {
            const response = await fetch('../assets/data/doctors.json');
            const doctorsData = await response.json();

            doctorsData.forEach(doctor => {
                const card = document.createElement('div');
                card.className = 'doctors__card';
                card.id = doctor.licenseNo;

                const subSectionsData = doctor.subsections.map(subsection => `
                    <div class="doctors__card-subsection">
                        <h2 class="doctors__card-title font-semibold text-black">${subsection.title}</h2>
                        <ul>
                        ${subsection.items.map(item => `
                            <li class="doctors__card-list-item">
                                <img src="../assets/icons/wcu/check-circle-icon.svg" height="24" width="24">
                                ${item}
                            </li>
                            `).join('')}
                        </ul>
                    </div>
                    `).join('');

                card.innerHTML = `
                    <img src="${doctor.img}" alt="${doctor.imgAlt}" class="doctors__card-img">
                    <div class="doctors__card-text-container">
                        <h2 class="doctors__card-title">${doctor.name}</h2>
                        <p class="doctors__card-subtitle text-green">${doctor.designation}</p>
                        <p class="doctors__card-subtitle">${doctor.degrees}</p>
                        <p class="doctors__card-subtitle text-dark-grey">License No: ${doctor.licenseNo}</p>
                        <p class="doctors__card-desc">${doctor.desc}</p>
                        ${subSectionsData}
                        
                    </div>`;

                this.doctorsCardContainer.appendChild(card);
            })
            this.scrollToCardFromURL();
        }

        scrollToCardFromURL() {
            const hash = window.location.hash.substring(1);
            if (hash) {
                const card = document.getElementById(hash);
                if (card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }

        init() {
            this.populateDoctorCards();
        }
    }

    window.addEventListener("DOMContentLoaded", () => {
        const DoctorsObj = new Doctors();
        DoctorsObj.init();
    });
})();
