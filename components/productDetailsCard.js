export const productDetailsCard = ({ producto }) => {

  return `
          <div class="image-container">
            <div class="thumbnail-container">
              ${producto?.image
                .map(
                  (imgSrc, index) => `
                <img src="${imgSrc}" class="thumbnail" data-index="${index}">
              `
                )
                .join("")}
            </div>
            
            <div id="carouselExampleFade" class="carousel slide carousel-fade">
              <div class="carousel-inner">
                ${producto?.image
                  .map(
                    (imgSrc, index) => `
                  <div class="carousel-item ${index === 0 ? "active" : ""}">
                    <img src="${imgSrc}" class="d-block w-100" alt="Producto">
                  </div>
                `
                  )
                  .join("")}
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
              <button class="buy-now" id="buy-now">Buy Now</button>
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
};
