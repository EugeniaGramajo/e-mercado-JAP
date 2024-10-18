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
      const productElements = document.querySelectorAll(".product-card")
      productElements.forEach(element => {
        element.addEventListener("click",()=>{
          localStorage.setItem('selectedProductId', element.id);  
          window.location.href = 'product-info.html';  
        })
      });
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

      const categoryElements = document.querySelectorAll(".category"); 
      categoryElements.forEach(element => {
        element.addEventListener("click",()=>{
          localStorage.setItem("catID", element.id);
          window.location = "products.html"; 
        })
      });
    })
    .catch((error) => console.error(error));

    /* EXPLORAR CATEGORIAS */
    const explore = document.getElementById("explore")
    explore.addEventListener("click", ()=>{
      window.location.href = "categories.html"
    }) 

    /* SEARCH */
});
