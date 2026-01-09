/* =========================================
   CONTROLADOR PRINCIPAL: CONTACTO + SIDEBAR
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // =======================================================
    // 1. LÓGICA DEL FORMULARIO Y VALIDACIÓN
    // =======================================================
    const form = document.getElementById('contactForm');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const telefonoInput = document.getElementById('telefono');
    const submitBtn = document.getElementById('submitBtn');
    const statusDiv = document.getElementById('formStatus');

    // Reglas de validación
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{9}$/;

    function validateForm() {
        const nombreVal = nombreInput.value.trim();
        const emailVal = emailInput.value.trim();
        const telefonoVal = telefonoInput.value.trim();

        const isNombreOk = nombreVal.length > 0;
        const isEmailOk = emailRegex.test(emailVal);
        const isPhoneOk = phoneRegex.test(telefonoVal);

        updateInputStyle(nombreInput, isNombreOk);
        updateInputStyle(emailInput, isEmailOk);
        updateInputStyle(telefonoInput, isPhoneOk);

        if (isNombreOk && isEmailOk && isPhoneOk) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = "INITIATE TRANSMISSION";
            submitBtn.style.opacity = "1";
        } else {
            submitBtn.disabled = true;
            submitBtn.innerHTML = "🔒 AWAITING VALID DATA...";
            submitBtn.style.opacity = "0.6";
        }
    }

    function updateInputStyle(input, isValid) {
        if (input.value === "") {
            input.classList.remove('valid', 'invalid');
            return;
        }
        isValid ? input.classList.replace('invalid', 'valid') || input.classList.add('valid')
                : input.classList.replace('valid', 'invalid') || input.classList.add('invalid');
    }

    // Listeners del Formulario
    if(form) { // Solo ejecutamos si el formulario existe
        [nombreInput, emailInput, telefonoInput].forEach(input => {
            input.addEventListener('input', validateForm);
        });

        telefonoInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
            validateForm();
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.innerHTML = "ENCRYPTING & SENDING...";

            setTimeout(() => {
                statusDiv.textContent = ">> PACKET DELIVERED SUCCESSFULLY <<";
                statusDiv.classList.add('status-success');
                form.reset();
                [nombreInput, emailInput, telefonoInput].forEach(input => input.classList.remove('valid', 'invalid'));
                submitBtn.disabled = true;
                submitBtn.innerHTML = "🔒 AWAITING VALID DATA...";
                setTimeout(() => { statusDiv.textContent = ""; }, 4000);
            }, 2000);
        });
    }

    // =======================================================
    // 2. LÓGICA DEL SIDEBAR (MENÚ LATERAL)
    // =======================================================
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const body = document.body;
    let closeTimer;

    if (toggle && sidebar) { // Solo ejecutamos si el menú existe
        // Abrir al entrar en el botón
        toggle.addEventListener('mouseenter', () => {
            clearTimeout(closeTimer);
            sidebar.classList.add('active');
            body.classList.add('is-menu-open');
        });

        // Esperar para cerrar al salir del botón
        toggle.addEventListener('mouseleave', () => {
            closeTimer = setTimeout(() => {
                sidebar.classList.remove('active');
                body.classList.remove('is-menu-open');
            }, 300);
        });

        // Mantener abierto si entramos en el menú
        sidebar.addEventListener('mouseenter', () => {
            clearTimeout(closeTimer);
        });

        // Cerrar al salir del menú
        sidebar.addEventListener('mouseleave', () => {
            sidebar.classList.remove('active');
            body.classList.remove('is-menu-open');
        });
    }
});