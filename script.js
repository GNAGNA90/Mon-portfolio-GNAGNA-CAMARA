// Gestion de la barre de navigation au défilement
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// Défilement doux vers les sections
const links = document.querySelectorAll('.menu a');
if (links.length > 0) {
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (navbar?.offsetHeight || 0),
                    behavior: 'smooth',
                });
            }
        });
    });
}

// Apparition fluide des sections
const sections = document.querySelectorAll('.section');
if (sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });
}

// Effet au survol des liens du menu
if (links.length > 0) {
    links.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.transform = 'scale(1.1)';
            link.style.transition = 'transform 0.3s ease';
        });
        link.addEventListener('mouseout', () => {
            link.style.transform = 'scale(1)';
        });
    });
}

// Interaction avec les projets (survol et boîte modale)
const projectItems = document.querySelectorAll('.project');
if (projectItems.length > 0) {
    projectItems.forEach(project => {
        project.addEventListener('mouseover', () => {
            project.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
        });
        project.addEventListener('mouseout', () => {
            project.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        });
        project.addEventListener('click', () => {
            const title = project.querySelector('h2')?.textContent || 'Projet';
            const content = project.querySelector('p')?.textContent || 'Détails indisponibles.';
            showModal(title, content);
        });
    });
}

// Fonction pour afficher une boîte modale
function showModal(title, content) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    modal.innerHTML = `
        <div class="modal-content">
            <h2>${title}</h2>
            <p>${content}</p>
            <button class="close-modal">Fermer</button>
        </div>
    `;

    document.body.appendChild(modal);

    const closeModal = modal.querySelector('.close-modal');
    closeModal.addEventListener('click', () => modal.remove());

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Gestion du formulaire de contact
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Empêche l'envoi classique du formulaire

        // Récupération des données du formulaire
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            // Construction de l'URL mailto
            const subject = `Nouveau message de ${name}`;
            const body = `Nom: ${name}\nEmail: ${email}\nMessage:\n${message}`;
            const mailtoLink = `mailto:camaragnagna809@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Ouvre le client de messagerie avec les données
            window.location.href = mailtoLink;
        } else {
            alert('Veuillez remplir tous les champs avant d\'envoyer.');
        }
    });
}
