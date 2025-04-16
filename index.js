// Elementos del formulario
const form = document.getElementById('inscripcionForm');
const submitButton = document.getElementById('submitButton');
const resetButton = document.getElementById('resetButton');
const toast = document.getElementById('toast');
const themeToggle = document.getElementById('themeToggle');

// Campos del formulario
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const dni = document.getElementById('dni');
const telefono = document.getElementById('telefono');
const email = document.getElementById('email');
const deportes = document.getElementById('deportes');
const edad = document.getElementById('edad');

// Inicializar tema
initTheme();

// Inicializar validación
initFormValidation();

function initTheme() {
    // Obtener tema guardado o usar claro por defecto
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Event listener para el botón de tema
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
        themeToggle.title = 'Cambiar a tema claro';
    } else {
        icon.className = 'fas fa-moon';
        themeToggle.title = 'Cambiar a tema oscuro';
    }
}

function initFormValidation() {
    // Event listeners para validación en tiempo real
    nombre.addEventListener('input', validateForm);
    apellido.addEventListener('input', validateForm);
    dni.addEventListener('input', validateForm);
    telefono.addEventListener('input', validateForm);
    email.addEventListener('input', validateForm);
    deportes.addEventListener('change', validateForm);
    edad.addEventListener('input', validateForm);

    // Event listeners para el formulario
    form.addEventListener('submit', handleSubmit);
    resetButton.addEventListener('click', resetForm);
}

function validateField(input, fieldName) {
    const error = document.getElementById(`${fieldName}-error`);
    const successIcon = input.parentElement.querySelector('.success-icon');
    const errorIcon = input.parentElement.querySelector('.error-icon');
    
    if (input.value.trim() === '') {
        input.classList.add('error');
        error.classList.add('visible');
        successIcon.classList.remove('visible');
        errorIcon.classList.add('visible');
        return false;
    } else {
        input.classList.remove('error');
        error.classList.remove('visible');
        successIcon.classList.add('visible');
        errorIcon.classList.remove('visible');
        return true;
    }
}

function validateDNI() {
    const input = dni;
    const error = document.getElementById('dni-error');
    const successIcon = input.parentElement.querySelector('.success-icon');
    const errorIcon = input.parentElement.querySelector('.error-icon');
    
    const dniRegex = /^[0-9]{8}$/;
    
    if (!dniRegex.test(input.value)) {
        input.classList.add('error');
        error.classList.add('visible');
        successIcon.classList.remove('visible');
        errorIcon.classList.add('visible');
        return false;
    } else {
        input.classList.remove('error');
        error.classList.remove('visible');
        successIcon.classList.add('visible');
        errorIcon.classList.remove('visible');
        return true;
    }
}

function validateTelefono() {
    const input = telefono;
    const error = document.getElementById('telefono-error');
    const successIcon = input.parentElement.querySelector('.success-icon');
    const errorIcon = input.parentElement.querySelector('.error-icon');
    
    const telefonoRegex = /^[0-9]{10}$/;
    
    if (!telefonoRegex.test(input.value)) {
        input.classList.add('error');
        error.classList.add('visible');
        successIcon.classList.remove('visible');
        errorIcon.classList.add('visible');
        return false;
    } else {
        input.classList.remove('error');
        error.classList.remove('visible');
        successIcon.classList.add('visible');
        errorIcon.classList.remove('visible');
        return true;
    }
}

function validateEmail() {
    const input = email;
    const error = document.getElementById('email-error');
    const successIcon = input.parentElement.querySelector('.success-icon');
    const errorIcon = input.parentElement.querySelector('.error-icon');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(input.value)) {
        input.classList.add('error');
        error.classList.add('visible');
        successIcon.classList.remove('visible');
        errorIcon.classList.add('visible');
        return false;
    } else {
        input.classList.remove('error');
        error.classList.remove('visible');
        successIcon.classList.add('visible');
        errorIcon.classList.remove('visible');
        return true;
    }
}

function validateDeportes() {
    const input = deportes;
    const error = document.getElementById('deportes-error');
    const successIcon = input.parentElement.querySelector('.success-icon');
    const errorIcon = input.parentElement.querySelector('.error-icon');
    
    const selectedOptions = Array.from(input.selectedOptions);
    
    if (selectedOptions.length === 0) {
        input.classList.add('error');
        error.classList.add('visible');
        successIcon.classList.remove('visible');
        errorIcon.classList.add('visible');
        return false;
    } else {
        input.classList.remove('error');
        error.classList.remove('visible');
        successIcon.classList.add('visible');
        errorIcon.classList.remove('visible');
        return true;
    }
}

function validateEdad() {
    const input = edad;
    const error = document.getElementById('edad-error');
    const successIcon = input.parentElement.querySelector('.success-icon');
    const errorIcon = input.parentElement.querySelector('.error-icon');
    
    const value = parseInt(input.value);
    
    if (isNaN(value) || value < 1 || value > 120) {
        input.classList.add('error');
        error.classList.add('visible');
        successIcon.classList.remove('visible');
        errorIcon.classList.add('visible');
        return false;
    } else {
        input.classList.remove('error');
        error.classList.remove('visible');
        successIcon.classList.add('visible');
        errorIcon.classList.remove('visible');
        return true;
    }
}

function validateForm() {
    const isNombreValid = validateField(nombre, 'nombre');
    const isApellidoValid = validateField(apellido, 'apellido');
    const isDNIValid = validateDNI();
    const isTelefonoValid = validateTelefono();
    const isEmailValid = validateEmail();
    const isDeportesValid = validateDeportes();
    const isEdadValid = validateEdad();

    const isFormValid = isNombreValid && 
                       isApellidoValid && 
                       isDNIValid && 
                       isTelefonoValid && 
                       isEmailValid &&
                       isDeportesValid &&
                       isEdadValid;
    
    submitButton.disabled = !isFormValid;
    
    return isFormValid;
}

function handleSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        showToast('Por favor, complete todos los campos correctamente.', 'error');
        return;
    }
    
    // Preparar los datos para enviar
    const formData = new FormData(form);
    
    // Deshabilitar el botón y mostrar loader
    submitButton.disabled = true;
    submitButton.innerHTML = '<div class="loader"></div> Enviando...';
    
    // Enviar datos al servidor
    fetch('submit.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
    })
    .then(data => {
        console.log('Respuesta del servidor:', data);
        if (data.success) {
            showToast(data.message, 'success');
            resetForm();
        } else {
            showToast(data.message || 'Error al procesar el formulario', 'error');
        }
    })
    .catch(error => {
        showToast('Error al enviar el formulario', 'error');
        console.error('Error:', error);
    })
    .finally(() => {
        // Resetear estado del botón
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-check"></i> Enviar Inscripción';
    });
}

function resetForm() {
    form.reset();
    
    // Limpiar errores
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.classList.remove('visible'));
    
    // Limpiar clases de error
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => input.classList.remove('error'));
    
    // Ocultar íconos
    const successIcons = document.querySelectorAll('.success-icon');
    successIcons.forEach(icon => icon.classList.remove('visible'));
    
    const errorIcons = document.querySelectorAll('.error-icon');
    errorIcons.forEach(icon => icon.classList.remove('visible'));
    
    // Deshabilitar botón de envío
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-check"></i> Enviar Inscripción';
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}