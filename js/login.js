const submit = document.getElementById("submit");

submit.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log(email, password, "Intentando iniciar sesión");

  try {
    const response = await fetch("https://jap-backend.onrender.com/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Asegúrate de enviar el tipo de contenido correcto
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Obtén el texto de error si existe
      throw new Error(errorText);
    }

    const data = await response.json(); // Convierte la respuesta a JSON
    localStorage.setItem("user", JSON.stringify(data)); // Asegúrate de almacenar como JSON

    Swal.fire({
      title: "Te has logueado correctamente!",
      text: "¡Bienvenido de nuevo!",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "index.html"; 
      }
    });
  } catch (error) {
    Swal.fire({
      title: "Ocurrió un error",
      text: error.message, // Muestra el mensaje de error
      icon: "error",
    });
  }
});

function showModal(event) {
  event.preventDefault(); // Evita que el formulario se envíe
  document.getElementById("modal").style.display = "flex"; // Muestra el modal
}

function reloadPage() {
  location.reload(); // Recarga la página
}
