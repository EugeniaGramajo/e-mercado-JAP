//productos relacionados

export async function getData({ categoryID }) {
  try {
    const apiUrl = `https://japceibal.github.io/emercado-api/cats_products/${categoryID}.json`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    const productContainer = document.querySelector(".productos-relacionados");
    const titleContainer = document.querySelector(
      ".titulo-poductos-relacionados"
    ); // Asegúrate de que la clase esté bien escrita
    const selectedProductId = localStorage.getItem("selectedProductId");

    productContainer.innerHTML = "";
    titleContainer.innerHTML = "";

    const filteredProducts = data.products.filter(
      (product) => product.id !== parseInt(selectedProductId)
    );

    if (filteredProducts.length > 0) {
      const titleElement = document.createElement("h4");
      titleElement.classList.add("title-productos-relacionados");
      titleElement.textContent = "Estos artículos también podrían interesarte";
      titleContainer.appendChild(titleElement);
    }

    const shuffledProducts = filteredProducts.sort(() => 0.5 - Math.random());

    const limitedProducts = shuffledProducts.slice(0, 3);

    limitedProducts.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("card", "mb-3", "col-md-4");
      card.setAttribute("data-id", product.id);

      const cardImage = document.createElement("img");
      cardImage.classList.add("card-img-top");
      cardImage.src = product.image;
      cardImage.alt = product.name;

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.textContent = product.name;

      const cardPrice = document.createElement("p");
      cardPrice.classList.add("card-text");
      cardPrice.textContent = `${product.currency} ${product.cost}`;

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardPrice);

      card.appendChild(cardImage);
      card.appendChild(cardBody);

      productContainer.appendChild(card);

      card.addEventListener("mousemove", (evt) => {
        const { layerX } = evt;
        const height = card.clientHeight;
        const width = card.clientWidth;

        const xRotation = ((layerX - width / 2) / width) * 20;

        const transformString = `
            perspective(500px)
            scale(1.01)
            rotateX(0) /* No rotación en Y */
            rotateY(${xRotation}deg)`;

        card.style.transform = transformString;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = `
            perspective(500px)
            scale(1)
            rotateX(0)
            rotateY(0)`;
      });

      card.addEventListener("click", function () {
        localStorage.setItem("selectedProductId", product.id);
        window.location.href = "product-info.html";
      });
    });
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}
