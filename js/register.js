const registroForm = document.getElementById('registroForm');
    const registroModal = document.getElementById('registroModal');
    const registroExitoso = document.getElementById('registroExitoso');
    const errorMessage = document.getElementById('errorMessage');

    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const correo = document.getElementById('correo');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    const errorNombre = document.getElementById('errorNombre');
    const errorApellido = document.getElementById('errorApellido');
    const errorCorreo = document.getElementById('errorCorreo');
    const errorPassword = document.getElementById('errorPassword');
    const errorConfirmPassword = document.getElementById('errorConfirmPassword');

    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

    togglePassword.addEventListener('click', function () {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.querySelector('img').src = type === 'password' ? 'img/mostrar.png' : 'img/ocultar.png';
    });

    toggleConfirmPassword.addEventListener('click', function () {
        const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPassword.setAttribute('type', type);
        this.querySelector('img').src = type === 'password' ? 'img/mostrar.png' : 'img/ocultar.png';
    });

    registroForm.addEventListener('submit', function(event) {
        event.preventDefault();

        let formIsValid = true;

        // Validar nombre
        if (nombre.value.trim() === "") {
            errorNombre.textContent = "Este campo es obligatorio.";
            errorNombre.style.display = "block";
            formIsValid = false;
        } else {
            errorNombre.style.display = "none";
        }

        // Validar apellido
        if (apellido.value.trim() === "") {
            errorApellido.textContent = "Este campo es obligatorio.";
            errorApellido.style.display = "block";
            formIsValid = false;
        } else {
            errorApellido.style.display = "none";
        }

        // Validar correo electrónico
        if (correo.value.trim() === "") {
            errorCorreo.textContent = "Este campo es obligatorio.";
            errorCorreo.style.display = "block";
            formIsValid = false;
        } else if (!validateEmail(correo.value)) {
            errorCorreo.textContent = "El formato del correo no es válido.";
            errorCorreo.style.display = "block";
            formIsValid = false;
        } else {
            errorCorreo.style.display = "none";
        }

        // Validar contraseña
        if (password.value.trim() === "") {
            errorPassword.textContent = "Este campo es obligatorio.";
            errorPassword.style.display = "block";
            formIsValid = false;
        } else {
            errorPassword.style.display = "none";
        }

        // Validar confirmación de contraseña
        if (confirmPassword.value.trim() === "") {
            errorConfirmPassword.textContent = "Este campo es obligatorio.";
            errorConfirmPassword.style.display = "block";
            formIsValid = false;
        } else if (password.value !== confirmPassword.value) {
            errorConfirmPassword.textContent = "Las contraseñas no coinciden.";
            errorConfirmPassword.style.display = "block";
            formIsValid = false;
        } else {
            errorConfirmPassword.style.display = "none";
        }

        if (formIsValid) {
            errorMessage.textContent = "";
            registroModal.classList.remove('show');
            registroExitoso.classList.add('show');
        }
    });