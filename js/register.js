const registroForm = document.getElementById("registroForm");
const registroModal = document.getElementById("registroModal");
const registroExitoso = document.getElementById("registroExitoso");
const errorMessage = document.getElementById("errorMessage");

registroForm.addEventListener("submit", async function (event) {
  event.preventDefault(); // Evita el envío del formulario

  const name = document.getElementById("name").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    errorMessage.textContent = "Las contraseñas no coinciden.";
    return;
  }

  try {
    const response = await fetch("https://jap-backend.onrender.com/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        lastName,
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();
    console.log(data);

    registroModal.classList.remove("show");
    registroExitoso.classList.add("show");
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    errorMessage.textContent = "Hubo un problema al registrar el usuario.";
  }
});
