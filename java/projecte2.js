/* =========================================
   ARCHIVO: js/main.js
   LÓGICA DEL MENÚ INTERACTIVO (CORREGIDA)
   ========================================= */

function openMenu() {
    const sidebar = document.getElementById('sidebar');

    if (sidebar) {
        // 1. Activa l'animació del menú lateral
        sidebar.classList.add('active');

        // 2. Afegeix una classe a tot el BODY per indicar l'estat
        // Això ens permetrà controlar el difuminat des del CSS globalment
        document.body.classList.add('is-menu-open');
    }
}

function closeMenu() {
    const sidebar = document.getElementById('sidebar');

    if (sidebar) {
        // 1. Tanca el menú lateral
        sidebar.classList.remove('active');

        // 2. Treu la classe d'estat del BODY
        document.body.classList.remove('is-menu-open');
    }
}