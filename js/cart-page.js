document.addEventListener("DOMContentLoaded", function() {
    const containerProductos = document.querySelector(".productos");

    // Encabezado de la tabla de productos
    containerProductos.innerHTML = `
        <div class="container text-center mt-5 mb-5 p-3 cuerpo-editable1">
            <div class="row align-items-center">
                <div class="col-sm-3">Producto</div>
                <div class="col-sm-3">Precio</div>
                <div class="col-sm-3">Cantidad</div>
                <div class="col-sm-3">Subtotal</div>
            </div>
        </div>
    `;

    // Función para agregar un nuevo producto
    function agregarProducto(imagenUrl, nombre, precio, cantidadInicial) {
        const subtotal = precio * cantidadInicial;

        // Crear un nuevo elemento de producto con la misma estructura de "container" y "row"
        const productoRow = document.createElement("div");
        productoRow.className = "container text-center mb-4 p-4 productos-style"; // Clases para alinear y espaciado similar al encabezado

        productoRow.innerHTML = `
            <div class="row align-items-center">
                <div class="col-sm-3 d-flex align-items-center justify-content-center">
                    <img src="${imagenUrl}" alt="${nombre}" class="img-fluid me-2" style="max-width: 60px; height: auto;">
                    <span>${nombre}</span>
                </div>
                <div class="col-sm-3">$${precio.toFixed(2)}</div>
                <div class="col-sm-3 d-flex justify-content-center">
                    <input type="number" class="form-control text-center p-1 custom-border" value="${cantidadInicial}" min="1" style="width: 70px; height: 30px;">
                </div>
                <div class="col-sm-3">$${subtotal.toFixed(2)}</div>
            </div>
        `;

        // Agregar el producto como hijo de containerProductos
        containerProductos.appendChild(productoRow);
    }

    // Ejemplo de cómo usar la función agregarProducto
    agregarProducto("https://via.placeholder.com/60", "Producto A", 10.0, 2);
    agregarProducto("https://via.placeholder.com/60", "Producto B", 20.5, 1);
});
