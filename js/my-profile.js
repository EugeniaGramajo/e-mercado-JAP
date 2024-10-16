document.addEventListener('DOMContentLoaded', function () {
    // Verificar si el usuario está logueado
    checkLogin();
  
    // Manejar el evento de envío del formulario
    document.getElementById('profileForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
  
        // Validar que los campos obligatorios estén llenos
        const primerNombre = document.getElementById('primerNombre').value.trim();
        const primerApellido = document.getElementById('primerApellido').value.trim();
  
        if (!primerNombre || !primerApellido) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }
  
        // Obtener el objeto 'user' existente y actualizarlo
        const user = JSON.parse(localStorage.getItem('user'));
  
        // Si el objeto 'user' no existe, se crea uno nuevo
        const updatedUser = {
            ...user,
            primerNombre: primerNombre,
            segundoNombre: document.getElementById('segundoNombre').value.trim(),
            primerApellido: primerApellido,
            segundoApellido: document.getElementById('segundoApellido').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            email: user.email // Mantener el email original
        };
  
        // Guardar el objeto 'user' actualizado en localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));
  
        // Guardar los datos de perfil en localStorage si no existen
        if (!localStorage.getItem('primerNombre')) {
            localStorage.setItem('primerNombre', updatedUser.primerNombre);
            localStorage.setItem('segundoNombre', updatedUser.segundoNombre || "");
            localStorage.setItem('primerApellido', updatedUser.primerApellido);
            localStorage.setItem('segundoApellido', updatedUser.segundoApellido || "");
            localStorage.setItem('telefono', updatedUser.telefono || "");
        }
  
        alert("Datos guardados con éxito.");
        
        // Redirigir a la página de inicio
        redirectToHome();
    });
  
    // Función para verificar si el usuario está logueado
    function checkLogin() {
        const userLoggedIn = localStorage.getItem('user'); // Verifica si el objeto 'user' existe
        if (!userLoggedIn) {
            alert("Debes iniciar sesión para acceder al perfil.");
            window.location.href = 'login.html'; // Redirigir a la página de inicio de sesión
        }
    }
  
    // Función para cargar los datos del perfil al cargar la página
    function loadProfileData() {
        const user = JSON.parse(localStorage.getItem('user')); // Obtiene el objeto 'user' y lo parsea
        if (user) {
            document.getElementById('email').value = user.email; // Cargar el email del usuario
            document.getElementById('primerNombre').value = user.name; // Cargar el primer nombre
            document.getElementById('segundoNombre').value = localStorage.getItem('segundoNombre') || ""; // Cargar el segundo nombre
            document.getElementById('primerApellido').value = user.lastName; // Cargar el primer apellido
            document.getElementById('segundoApellido').value = localStorage.getItem('segundoApellido') || ""; // Cargar el segundo apellido
            document.getElementById('telefono').value = localStorage.getItem('telefono') || ""; // Cargar el teléfono
        }
    }
  
    // Ejecutar las funciones al cargar la página
    loadProfileData(); // Cargar los datos del perfil
});
  
// Función para redirigir a la página de inicio
function redirectToHome() {
    window.location.href = 'index.html'; // Redirige a index.html
}
