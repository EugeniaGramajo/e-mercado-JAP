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
                ${producto.images.map(imgSrc => `<img src="${imgSrc}" class="thumbnail">`).join('')}
              </div>
              <img src="${producto.images[0]}" class="main-image" />
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
          }
        })
        .catch(error => console.error("Error al cargar el producto:", error));
    } else {
      console.error("No se encontró el ID del producto en el localStorage");
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const commentContainer = document.getElementById('comment-container');
    const commentForm = document.getElementById('comment-form');
    const starRatingContainer = document.getElementById('star-rating');
    const commentInput = document.getElementById('comment-input');
    
    // Obtener el ID del producto seleccionado
    const selectedProductId = localStorage.getItem("selectedProductId");

    // Obtener los comentarios del localStorage por producto
    let commentsByProduct = JSON.parse(localStorage.getItem('commentsByProduct')) || {};

    // Si no hay comentarios para el producto actual, crea un array vacío
    let comments = commentsByProduct[selectedProductId] || [];

    // Mostrar los comentarios existentes para el producto actual
    function displayComments() {
        commentContainer.innerHTML = '';
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `
                <h4>${comment.user}</h4>
                <p>${comment.text}</p>
                <div class="star-rating">
                    ${'★'.repeat(comment.rating).split('').map(() => '<span class="filled">★</span>').join('')}
                    ${'☆'.repeat(5 - comment.rating).split('').map(() => '<span>☆</span>').join('')}
                </div>
            `;
            commentContainer.appendChild(commentElement);
        });
    }

    // Manejar la selección de estrellas
    starRatingContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('star')) {
            const stars = [...starRatingContainer.children];
            const rating = stars.indexOf(e.target) + 1;
            stars.forEach((star, index) => {
                star.textContent = index < rating ? '★' : '☆';
                star.classList.toggle('selected', index < rating); // Cambia el color a amarillo
            });
            commentForm.rating.value = rating; // Asignar la calificación seleccionada
        }
    });

    // Manejar el envío de comentarios
    commentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const newComment = {
            user: "Anonymous", // Cambiar esto con el nombre de usuario del backend
            text: commentInput.value,
            rating: parseInt(commentForm.rating.value)
        };
        
        // Agregar el nuevo comentario al array de comentarios del producto actual
        comments.push(newComment);
        
        // Guardar los comentarios actualizados en localStorage para el producto actual
        commentsByProduct[selectedProductId] = comments;
        localStorage.setItem('commentsByProduct', JSON.stringify(commentsByProduct));

        displayComments(); // Mostrar los comentarios actualizados
        commentForm.reset(); // Reiniciar el formulario
    });

    // Inicializar mostrando los comentarios
    displayComments();
});

