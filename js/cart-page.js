import cartListComponent from "../components/cartListComponent.js";

document.addEventListener("DOMContentLoaded", function () {
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

    const selectedProducts = [localStorage.getItem("selectedProduct")];

    productoRow.innerHTML = selectedProducts.forEach((e) => {
      return cartListComponent(e);
    });

    // Agregar el producto como hijo de containerProductos
    containerProductos.appendChild(productoRow);
  }

  // Ejemplo de cómo usar la función agregarProducto
  agregarProducto("https://via.placeholder.com/60", "Producto A", 10.0, 2);
  agregarProducto("https://via.placeholder.com/60", "Producto B", 20.5, 1);
});
