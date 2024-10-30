import { showComments } from "../components/comments.js";
import { productDetailsCard } from "../components/productDetailsCard.js";
import { getData } from "../components/relatedProducts.js";
import { alertComponent } from "../components/alertComponent.js"; // Importa el alertComponent

const categoryID = localStorage.getItem("catID");

document.addEventListener("DOMContentLoaded", function () {
  const selectedProductId = localStorage.getItem("selectedProductId");
  const productContainer = document.querySelector(".product-container");

  if (productContainer) {
    productContainer.innerHTML = "";
  }

  if (categoryID) {
    fetch("https://japceibal.github.io/emercado-api/cats/cat.json")
      .then((response) => response.json())
      .then((categories) => {
        const category = categories.find(
          (cat) => cat.id === parseInt(categoryID)
        );
        if (category) {
          const categoryNameElement = document.createElement("h2");
          categoryNameElement.textContent = category.name;
          document.querySelector("#productos-esp").textContent =
            categoryNameElement.textContent;
        } else {
          console.error("Categoría no encontrada.");
        }
      })
      .catch((error) => console.error("Error al cargar la categoría:", error));
  }

  if (selectedProductId) {
    fetch(`https://jap-backend.onrender.com/products/info/${selectedProductId}`)
      .then((response) => response.json())
      .then((producto) => {
        document.getElementById("producto-n").textContent = producto.name;

        const productDetails = productDetailsCard({ producto });

        if (productContainer) {
          productContainer.innerHTML = productDetails;

          const thumbnails = document.querySelectorAll(".thumbnail");
          const carousel = new bootstrap.Carousel(
            document.querySelector("#carouselExampleFade")
          );

          thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener("click", () => {
              carousel.to(index);
            });
          });
        }

        // botón de compra - guardar info en localStorage
        const buyButton = document.getElementById("buy-now");
        if (buyButton) {
          buyButton.addEventListener("click", () => {
            const product = {
              id: producto.id,
              name: producto.name,
              description: producto.description,
              cost: producto.cost,
              image: producto.image,
              quantity: 1,
            };

            // Obtener el array de productos del carrito desde localStorage
            const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

            // Agregar el nuevo producto al array de cartItems
            cartItems.push(product);

            // Guardar el array actualizado en localStorage
            localStorage.setItem("cartItems", JSON.stringify(cartItems));

            alertComponent({
              title: "Producto agregado",
              text: "El producto se ha añadido al carrito.",
              icon: "success"
            });
          });
        }

        // Mostrar productos relacionados
        getData({ relatedProducts: producto.relatedProducts });
      })
      .catch((error) => console.error("Error al cargar el producto:", error));
  } else {
    console.error("No se encontró el ID del producto en el localStorage");
  }
});

showComments();
