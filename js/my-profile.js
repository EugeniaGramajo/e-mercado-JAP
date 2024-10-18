document.addEventListener("DOMContentLoaded", function () {
  const editButton = document.getElementById("editButton");
  const saveButton = document.getElementById("saveButton");
  const cancelButton = document.getElementById("cancelButton");
  const inputs = document.querySelectorAll("#profileForm input");
  const profileImageInput = document.getElementById("profileImage");
  const imgPreview = document.getElementById("imgPreview");

  checkLogin();
  loadProfileData();

  editButton.addEventListener("click", () => {
    toggleInputs(true);
    editButton.style.display = "none"; // Oculta el botón "Editar"
    saveButton.style.display= "inline" // Habilita el botón "Guardar cambios"
    cancelButton.style.display= "inline" ; // Cambia el texto de "Cancelar"
  });

  // Cancelar edición
  cancelButton.addEventListener("click", () => {
    toggleInputs(false);
    loadProfileData(); // Recargar datos originales
    editButton.style.display = "inline"; // Muestra el botón "Editar"
    saveButton.style.display = "none"; // Deshabilita el botón "Guardar cambios"
    cancelButton.style.display = "none"; // Cambia el texto a "Cancelar"
  });

  // Guardar cambios
  document.getElementById("profileForm").addEventListener("submit", function (e) {
    e.preventDefault();
    if (validateForm()) {
      saveProfileData();
      toggleInputs(false);
      alert("Datos guardados con éxito.");
      editButton.style.display = "inline"; // Muestra el botón "Editar" después de guardar
      saveButton.style.display = "none"; // Deshabilita el botón "Guardar cambios"
      cancelButton.style.display = "none"; // Asegura que el texto sea "Cancelar"
    } else {
      alert("Por favor, completa todos los campos obligatorios.");
    }
  });

  // Cargar imagen de perfil
  profileImageInput.addEventListener("change", handleProfileImageChange);

  function toggleInputs(enable) {
    inputs.forEach((input) => (input.disabled = !enable));
    profileImageInput.disabled = !enable; // También habilita/deshabilita el input de imagen
  }

  function validateForm() {
    const primerNombre = document.getElementById("primerNombre").value.trim();
    const primerApellido = document.getElementById("primerApellido").value.trim();
    return primerNombre && primerApellido;
  }

  function saveProfileData() {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const updatedUser = {
      ...user,
      name: document.getElementById("primerNombre").value.trim()+" "+document.getElementById("segundoNombre").value.trim(),
      lastName: document.getElementById("primerApellido").value.trim()+" "+document.getElementById("segundoApellido").value.trim(),
      phone: document.getElementById("telefono").value.trim(),
      email: user.email,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  }

  function loadProfileData() {
    const user = JSON.parse(localStorage.getItem("user"));
    const names = user.name ? user.name.split(" ") : ["", ""];
    const lastnames = user.lastName ? user.lastName.split(" ") : ["", ""];
    if (user) {
      document.getElementById("primerNombre").value = names[0] || "";
      document.getElementById("segundoNombre").value = names[1] || "";
      document.getElementById("primerApellido").value = lastnames[0] || "";
      document.getElementById("segundoApellido").value = lastnames[1] || "";
      document.getElementById("telefono").value = user.phone || "";
      document.getElementById("email").value = user.email || "";
      document.getElementById("imgPreview").src = user.image || ""; // Imagen por defecto si no hay imagen
    }
  }

  function checkLogin() {
    if (!localStorage.getItem("user")) {
      alert("Debes iniciar sesión para acceder al perfil.");
      window.location.href = "login.html";
    }
  }

  function handleProfileImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64Image = e.target.result;
        imgPreview.src = base64Image;

        // Actualiza el objeto user con la imagen
        const user = JSON.parse(localStorage.getItem("user")) || {};
        user.image = base64Image; // Agrega la imagen al objeto user
        localStorage.setItem("user", JSON.stringify(user)); // Guarda el objeto actualizado
      };
      reader.readAsDataURL(file);
    }
  }
});
