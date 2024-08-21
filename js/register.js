const registroForm = document.getElementById("registroForm");
const registroModal = document.getElementById("registroModal");
const registroExitoso = document.getElementById("registroExitoso");
const errorMessage = document.getElementById("errorMessage");

registroForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Evita el envío del formulario

  const name = document.getElementById("name").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword =
    document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    errorMessage.textContent = "Las contraseñas no coinciden.";
    return; // Detiene el proceso si las contraseñas no coinciden
  }

  fetch("http://localhost:5000/users/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      lastName,
      email,
      password,
    }),
  })
    .then((res) => {
        console.log(res)
      if (!res.ok) {
        alert("Socorro Jesús");
      }
      registroExitoso.classList.add("show");
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log("fdsahjksadfhkjsadfhjk", error);
    });

  errorMessage.textContent = ""; // Limpia el mensaje de error
  registroModal.classList.remove("show"); // Oculta el modal de registro
  registroExitoso.classList.add("show"); // Muestra el modal de registro exitoso
});