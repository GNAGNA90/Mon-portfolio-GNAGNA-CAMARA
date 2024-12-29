// Gestion de la barre de navigation au défilement
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Défilement doux vers les sections
const links = document.querySelectorAll('.menu a');
links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - navbar.offsetHeight,
            behavior: 'smooth',
        });
    });
});

// Apparition fluide des sections
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    section.classList.add('hidden'); // Ajout d'une classe pour les styles initiaux
    observer.observe(section);
});

// Effet au survol des liens du menu
links.forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.transform = 'scale(1.1)';
        link.style.transition = 'transform 0.3s ease';
    });
    link.addEventListener('mouseout', () => {
        link.style.transform = 'scale(1)';
    });
});

// Interaction avec les projets (survol et boîte modale)
const projectItems = document.querySelectorAll('.project');
projectItems.forEach(project => {
    project.addEventListener('mouseover', () => {
        project.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
    });
    project.addEventListener('mouseout', () => {
        project.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
    });
    project.addEventListener('click', () => {
        showModal(project.querySelector('h2').textContent, project.querySelector('p').textContent);
    });
});

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
    closeModal.addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}
