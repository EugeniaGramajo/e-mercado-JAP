document.addEventListener('DOMContentLoaded', function(){

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
            }
        });
    })
    .catch(error => console.error('Error al cargar el JSON:', error));

});