document.addEventListener("DOMContentLoaded", function () {
  const categoryID = localStorage.getItem("catID");
  const selectedProductId = localStorage.getItem("selectedProductId");

  const productContainer = document.querySelector(".product-container");

  if (productContainer) {
    productContainer.innerHTML = ''; 
  }

  if (categoryID) {
    fetch("https://japceibal.github.io/emercado-api/cats/cat.json")
      .then(response => response.json())
      .then(categories => {
        const category = categories.find(cat => cat.id === parseInt(categoryID));
        if (category) {
          const categoryNameElement = document.createElement("h2");
          categoryNameElement.textContent = category.name;
          document.querySelector("#productos-esp").textContent = categoryNameElement.textContent;
        } else {
          console.error("Categoría no encontrada.");
        }
      })
      .catch(error => console.error("Error al cargar la categoría:", error));
  }

  if (selectedProductId) {
    fetch(`https://japceibal.github.io/emercado-api/products/${selectedProductId}.json`)
      .then(response => response.json())
      .then(producto => {
        document.getElementById('producto-n').textContent = producto.name;

        const productDetails = `
          <div class="image-container">
            <div class="thumbnail-container">
              ${producto.images.map((imgSrc, index) => `
                <img src="${imgSrc}" class="thumbnail" data-index="${index}">
              `).join('')}
            </div>
            
            <div id="carouselExampleFade" class="carousel slide carousel-fade">
              <div class="carousel-inner">
                ${producto.images.map((imgSrc, index) => `
                  <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="${imgSrc}" class="d-block w-100" alt="Producto">
                  </div>
                `).join('')}
              </div>
              
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div class="product-details">
            <h1 class="product-title" id="nombre">${producto.name}</h1>
            <div class="price-container">
              <h2>Precio:</h2>
              <span class="price">${producto.currency} ${producto.cost}</span>
            </div>
            <div class="sold-quantity">
              <span>Cantidad vendida: ${producto.soldCount}</span>
            </div>
            <p class="product-description">${producto.description}</p>
            <hr>
            <div class="action-buttons">
              <button class="buy-now">Buy Now</button>
              <button class="favorite"><img src="img/corazon.svg" alt="Favorite"></button>
            </div>
            <div class="delivery-info">
              <div class="delivery-item">
                <img src="img/envio-rapido.svg" alt="Free Delivery">
                <span>Free Delivery</span>
              </div>
              <div class="delivery-item">
                <img src="img/actualizar.svg" alt="Return Delivery">
                <span>Return Delivery</span>
                <p>Free 30 Days Delivery Returns.</p>
              </div>
            </div>
          </div>
        `;

        if (productContainer) {
          productContainer.innerHTML = productDetails;

          
          const thumbnails = document.querySelectorAll('.thumbnail');
          const carousel = new bootstrap.Carousel(document.querySelector('#carouselExampleFade'));

          thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
              carousel.to(index);
            });
          });
        }
      })
      .catch(error => console.error("Error al cargar el producto:", error));
  } else {
    console.error("No se encontró el ID del producto en el localStorage");
  }
});
