// Obtener productos desde la API
let products = [];

fetch('https://japceibal.github.io/emercado-api/cats_products/101.json')
  .then(response => response.json())
  .then(data => {
    products = data.products;
    renderProducts(products); // Mostrar los productos al cargar la página
  })
  .catch(error => console.error('Error al obtener los productos:', error));

// Función para renderizar productos
function renderProducts(filteredProducts) {
    const contenedor = document.querySelector('.tarjeta-producto');
    contenedor.innerHTML = ''; // Limpiar los productos actuales

    filteredProducts.forEach(product => {
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('producto');

      const imagenDiv = document.createElement('div');
      imagenDiv.classList.add('producto-imagen');
      imagenDiv.innerHTML = `<img src="${product.image}" alt="${product.name}">`;

      const detallesDiv = document.createElement('div');
      detallesDiv.classList.add('producto-detalles');
      detallesDiv.innerHTML = `
        <h3 class="nombre">${product.name}</h3>
        <p class="descripcion">${product.description}</p>
        <p class="precio">${product.currency} ${product.cost}</p>
        <p class="un">Unidades vendidas: ${product.soldCount}</p>
      `;

      productoDiv.appendChild(imagenDiv);
      productoDiv.appendChild(detallesDiv);

      contenedor.appendChild(productoDiv);
    });
}

// Filtrar por rango de precios
document.getElementById('filterButton').addEventListener('click', () => {
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;

    const filteredProducts = products.filter(product => product.cost >= minPrice && product.cost <= maxPrice);

    renderProducts(filteredProducts);
    console.log(`Filtrar productos entre ${minPrice} y ${maxPrice}`);
});

// Ordenar por precio ascendente
document.getElementById('orderPriceAsc').addEventListener('click', () => {
    const sortedProducts = [...products].sort((a, b) => a.cost - b.cost);
    renderProducts(sortedProducts);
    console.log('Ordenar productos por precio ascendente');
});

// Ordenar por precio descendente
document.getElementById('orderPriceDesc').addEventListener('click', () => {
    const sortedProducts = [...products].sort((a, b) => b.cost - a.cost);
    renderProducts(sortedProducts);
    console.log('Ordenar productos por precio descendente');
});

// Ordenar por relevancia (cantidad de vendidos)
document.getElementById('orderRelevance').addEventListener('click', () => {
    const sortedProducts = [...products].sort((a, b) => b.soldCount - a.soldCount);
    renderProducts(sortedProducts);
    console.log('Ordenar productos por relevancia');
});

// Limpiar filtros
document.getElementById('resetFilters').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';

    // Mostrar todos los productos nuevamente
    renderProducts(products);
    console.log('Limpiar filtros');
});

