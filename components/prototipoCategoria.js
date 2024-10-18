import { categoryComponent } from "./categoryComponent.js";

document.addEventListener("DOMContentLoaded", function () {
  const contenedor = document.getElementById("main-container");
  fetch("https://jap-backend.onrender.com/categories")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((categoria) => {
        contenedor.innerHTML += categoryComponent(categoria);
      });

      const contenedores = Array.from(
        document.getElementsByClassName("container-categoria")
      );

      contenedores.forEach((element) => {
        element.addEventListener("click", () => {
          localStorage.setItem("catID", element.id);
          window.location = "products.html";
        });
      });
    })
    .catch((error) => console.error("Error al cargar el JSON:", error));
});
