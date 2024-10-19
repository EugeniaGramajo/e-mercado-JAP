import { alertComponent } from "../components/alertComponent.js";

document.addEventListener("DOMContentLoaded", () => {
  const submit = document.getElementById("submit");
  const resetPassword = document.getElementById("resetPassword");
  resetPassword.addEventListener("click", () => {
    alertComponent({
      icon: "warning",
      title: "¿No recordas tu contraseña?",
      text: "Nosotros tampoco",
    });
  });
  submit.addEventListener("click", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log(email, password, "Intentando iniciar sesión");

    try {
      const response = await fetch(
        "https://jap-backend.onrender.com/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));

      console.log(JSON.parse(localStorage.getItem("user")));

      Swal.fire({
        title: "¡Bienvenido de nuevo!",
        text: "Te has logueado correctamente!",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "index.html";
        }
      });
    } catch (error) {
      const errorData = JSON.parse(error.message);
      Swal.fire({
        title: "Ocurrió un error",
        text: errorData.message, // Muestra el mensaje de error
        icon: "error",
      });
    }
  });

  function reloadPage() {
    location.reload(); // Recarga la página
  }
});
