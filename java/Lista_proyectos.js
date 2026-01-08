document.addEventListener('DOMContentLoaded', () => {

    console.log("System Status: Project List Loaded.");

    // Seleccionar todas las tarjetas
    const cards = document.querySelectorAll('.category-card');

    // Efecto de aparición escalonada (Fade-in)
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150); // 150ms de retraso entre cada tarjeta
    });

});