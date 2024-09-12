document.addEventListener('DOMContentLoaded', function() {
    fetch("https://japceibal.github.io/emercado-api/cats/cat.json")
      .then(response => response.json()) // Parsear la respuesta como JSON
      .then(data => {
        // Iterar sobre las categorías y actualizar el contenido de cada contenedor
        data.forEach((categoria, index) => {
          // Seleccionar el contenedor correspondiente
          const container = document.querySelector(`#categoria-${index + 1}`);
  
          if (container) {
            // Reemplazar el nombre de la categoría
            container.querySelector('.name-categorias').textContent = categoria.name;
  
            // Reemplazar la imagen
            container.querySelector('.img-categorias').src = categoria.imgSrc;
  
            // Reemplazar la descripción
            container.querySelector('.description-categorias').textContent = categoria.description;
  
            // Añadir un click listener a cada contenedor de categoría
            container.addEventListener('click', function() {
              // Guardar el ID de la categoría en localStorage
              localStorage.setItem('selectedCategoryID', categoria.id); // Asegúrate de que el JSON de categorías tenga un campo 'id'
              // Redirigir a la página de productos
              window.location.href = 'products.html';
            });
          }
        });
      })
      .catch(error => console.error('Error al cargar el JSON:', error));
  });