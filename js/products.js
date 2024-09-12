document.addEventListener('DOMContentLoaded', () => {
  
  const categoryID = localStorage.getItem('catID');

  console.log("Category ID from localStorage:", categoryID);

  if (categoryID) {

    fetch("https://japceibal.github.io/emercado-api/cats/cat.json")
        .then(response => response.json())
        .then(categories => {
          const category = categories.find(cat => cat.id === parseInt(categoryID));
          if (category) {
            const categoryNameElement = document.createElement("h2");
            categoryNameElement.textContent = category.name;
            document.querySelector("#producto-n").textContent = categoryNameElement.textContent;
          } else {
            console.error("Categoría no encontrada.");
          }
        })
        .catch(error => console.error("Error al cargar la categoría:", error));
    
    fetch(`https://japceibal.github.io/emercado-api/cats_products/${categoryID}.json`)
      .then(response => response.json())
      .then(data => {
        const productos = data.products;
        const contenedor = document.querySelector('.tarjeta-producto');

        contenedor.innerHTML = '';

        productos.forEach(producto => {
          const productoDiv = document.createElement('div');
          productoDiv.classList.add('producto');
          productoDiv.dataset.id = producto.id;

          const imagenDiv = document.createElement('div');
          imagenDiv.classList.add('producto-imagen');
          imagenDiv.innerHTML = `<img src="${producto.image}" alt="${producto.name}">`;

          const detallesDiv = document.createElement('div');
          detallesDiv.classList.add('producto-detalles');
          detallesDiv.innerHTML = `
            <h3 class="nombre">${producto.name}</h3>
            <p class="descripcion">${producto.description}</p>
            <p class="precio">${producto.currency} ${producto.cost}</p>
            <p class="un">Unidades vendidas: ${producto.soldCount}</p>
          `;

          productoDiv.appendChild(imagenDiv);
          productoDiv.appendChild(detallesDiv);

          contenedor.appendChild(productoDiv);

          productoDiv.addEventListener('click', () => {
            localStorage.setItem('selectedProductId', producto.id);  
            window.location.href = 'product-info.html';  
          });

        });
      })
      .catch(error => console.error('Error al obtener los productos:', error));
  } else {
    console.error('No se encontró el ID de categoría en el localStorage');
  }
});
    
