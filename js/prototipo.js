document.addEventListener('DOMContentLoaded', function(){

    document.getElementById('conteiner-v').addEventListener('click', function(){
        window.location.href = 'sell.html';
    });

    document.querySelectorAll('.conteiner-autos').forEach(container => {
        let overlay = container.querySelector('.overlay');
        let content = container.querySelector('.content');

        // Maneja el clic en el SVG para abrir y cerrar la descripción
        overlay.addEventListener('click', (event) => {
            content.classList.add('show'); // Alterna la visibilidad
        });

        // Oculta el contenido cuando el mouse salga del contenedor
        container.addEventListener('mouseleave', () => {
            content.classList.remove('show');
        });
    });
    
});