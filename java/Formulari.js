/* =========================================
   CONTROLADOR PRINCIPAL: CONTACTO + SIDEBAR + ENVÍO REAL
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // !!! PEGA AQUÍ TU URL DE FORMSPREE !!!
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjggbvnp";

    // =======================================================
    // 1. LÓGICA DEL FORMULARIO Y VALIDACIÓN
    // =======================================================
    const form = document.getElementById('contactForm');

    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const telefonoInput = document.getElementById('telefono');
    const mensajeInput = document.getElementById('mensaje');

    const submitBtn = document.getElementById('submitBtn');
    const statusDiv = document.getElementById('formStatus');

    // Reglas de validación
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{9}$/;

    function validateForm() {
        const nombreVal = nombreInput.value.trim();
        const emailVal = emailInput.value.trim();
        const telefonoVal = telefonoInput.value.trim();
        const mensajeVal = mensajeInput.value.trim();

        const isNombreOk = nombreVal.length > 0;
        const isEmailOk = emailRegex.test(emailVal);
        const isPhoneOk = phoneRegex.test(telefonoVal);
        const isMensajeOk = mensajeVal.length > 0;

        updateInputStyle(nombreInput, isNombreOk);
        updateInputStyle(emailInput, isEmailOk);
        updateInputStyle(telefonoInput, isPhoneOk);
        updateInputStyle(mensajeInput, isMensajeOk);

        if (isNombreOk && isEmailOk && isPhoneOk && isMensajeOk) {
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

    if(form) {
        [nombreInput, emailInput, telefonoInput, mensajeInput].forEach(input => {
            input.addEventListener('input', validateForm);
        });

        telefonoInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
            validateForm();
        });

        // --- AQUÍ ESTÁ EL CAMBIO PARA ENVIAR EL CORREO REAL ---
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // 1. Bloqueamos el botón y mostramos "Enviando..."
            submitBtn.disabled = true;
            submitBtn.innerHTML = "ENCRYPTING & SENDING...";
            statusDiv.textContent = "";
            statusDiv.className = "status-message"; // Resetear clases

            // 2. Preparamos los datos para enviar
            const formData = new FormData(form);

            try {
                // 3. Petición real a Formspree
                const response = await fetch(FORMSPREE_ENDPOINT, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                // 4. Si el envío fue exitoso (Código 200)
                if (response.ok) {
                    statusDiv.textContent = ">> PACKET DELIVERED SUCCESSFULLY <<";
                    statusDiv.classList.add('status-success');
                    form.reset(); // Limpiar formulario

                    // Quitar bordes verdes
                    [nombreInput, emailInput, telefonoInput, mensajeInput].forEach(input => {
                        input.classList.remove('valid', 'invalid');
                    });
                } else {
                    // Si hubo un error en el servidor
                    throw new Error('Server reject');
                }
            } catch (error) {
                // 5. Si algo falló (internet o servidor)
                statusDiv.textContent = ">> TRANSMISSION FAILED. RETRY <<";
                statusDiv.classList.add('status-error');
                console.error("Error envío:", error);
            } finally {
                // 6. Restaurar botón (sea éxito o error)
                submitBtn.disabled = true;
                submitBtn.innerHTML = "🔒 AWAITING VALID DATA...";

                // Borrar mensaje después de 5 seg
                setTimeout(() => { statusDiv.textContent = ""; }, 5000);
            }
        });
    }

    // =======================================================
    // 2. LÓGICA DEL SIDEBAR
    // =======================================================
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const body = document.body;
    let closeTimer;

    if (toggle && sidebar) {
        toggle.addEventListener('mouseenter', () => {
            clearTimeout(closeTimer);
            sidebar.classList.add('active');
            body.classList.add('is-menu-open');
        });
        toggle.addEventListener('mouseleave', () => {
            closeTimer = setTimeout(() => {
                sidebar.classList.remove('active');
                body.classList.remove('is-menu-open');
            }, 300);
        });
        sidebar.addEventListener('mouseenter', () => { clearTimeout(closeTimer); });
        sidebar.addEventListener('mouseleave', () => {
            sidebar.classList.remove('active');
            body.classList.remove('is-menu-open');
        });
    }
});