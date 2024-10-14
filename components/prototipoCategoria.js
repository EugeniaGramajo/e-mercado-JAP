document.addEventListener("DOMContentLoaded", function () {
  const contenedor = document.getElementById("main-container");
  fetch("https://jap-backend.onrender.com/categories")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((categoria) => {
        const categoryCard = `
        <div class="container-inicial">
          <div class="container-categoria" id="${categoria?.id}">
            <h3 class="name-categorias">${categoria?.name}</h3>
            <div class="img-overlay">
              <img src=${categoria?.imgSrc} class="img-categorias" alt="${categoria?.name}" />
              <div class="overlay">
                <p class="description-categorias">${categoria?.description}</p>
              </div>
            </div>
          </div>
        </div>
        `;

        contenedor.innerHTML += categoryCard;
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