import { categoryIndex } from "../components/categoryComponent.js";
import { productsIndex } from "../components/productsIndex.js";

document.addEventListener("DOMContentLoaded", function () {
  /* lISTADO DE PRODUCTOS */
  const ofertasList = document.getElementsByClassName("ofertas-list")[0];
  fetch("https://jap-backend.onrender.com/products/bestSellers")
    .then((res) => res.json())
    .then((data) => {
      const products = data
        .slice(0, 4)
        .map((product) => {
          return productsIndex(product);
        })
        .join("");

      ofertasList.innerHTML = products;
    })
    .catch((error) => console.error(error));

  /* lISTA DE CATEGORIAS */
  const categoriesList = document.getElementsByClassName("categories-list")[0];
  fetch("https://jap-backend.onrender.com/categories/footer")
    .then((res) => res.json())
    .then((data) => {
      const categories = data
        .slice(0, 4)
        .map((category) => {
          return categoryIndex(category);
        })
        .join("");

      categoriesList.innerHTML = categories;
    })
    .catch((error) => console.error(error));
});
