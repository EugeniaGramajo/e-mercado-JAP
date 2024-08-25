fetch('https://japceibal.github.io/emercado-api/cats_products/101.json')
  .then(response => response.json())
  .then(data => {
    const productos = data.products;
    const contenedor = document.querySelector('.tarjeta-producto');

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
