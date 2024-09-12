document.addEventListener('DOMContentLoaded', () => {
  // Obtener el ID de categoría almacenado en localStorage
  const categoryID = localStorage.getItem('selectedCategoryID');

  // Verificar si el ID de la categoría está en localStorage
  console.log("Category ID from localStorage:", categoryID);

  if (categoryID) {
    // Hacer la solicitud usando el ID de categoría almacenado
    fetch(`https://japceibal.github.io/emercado-api/cats_products/${categoryID}.json`)
      .then(response => response.json())
      .then(data => {
        const productos = data.products;
        const contenedor = document.querySelector('.tarjeta-producto');

        // Limpiar el contenedor antes de agregar nuevos productos
        contenedor.innerHTML = '';

        productos.forEach(producto => {
          const productoDiv = document.createElement('div');
          productoDiv.classList.add('producto');

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
        });
      })
      .catch(error => console.error('Error al obtener los productos:', error));
  } else {
    console.error('No se encontró el ID de categoría en el localStorage');
  }
});