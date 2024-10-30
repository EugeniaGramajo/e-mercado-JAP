import cartListComponent from "../components/cartListComponent.js";

document.addEventListener("DOMContentLoaded", function () {
  const containerProductos = document.querySelector(".productos");
  const subtotalUsdElement = document.getElementById("subtotal-usd");
  const subtotalUyuElement = document.getElementById("subtotal-uyu");
  const totalUsdElement = document.getElementById("total-usd");
  const totalUyuElement = document.getElementById("total-uyu");
  const discountElement = document.getElementById("descuento");

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

  const productoRow = document.createElement("div");
  productoRow.className = "container text-center mb-4 p-4 productos-style";

  const selectedProducts = JSON.parse(localStorage.getItem("cartItems")) || [];

  const renderCart = (selectedProducts) => {
    productoRow.innerHTML = "";

    selectedProducts.forEach((product) => {
      const productElement = cartListComponent(product, updateTotals);
      productoRow.appendChild(productElement);
    });

    updateTotals();
  };

  const updateTotals = () => {
    let subtotalUsd = 0;
    let subtotalUyu = 0;

    selectedProducts.forEach((product) => {
      if (product.currency === "USD") {
        subtotalUsd += product.cost * product.quantity;
      } else if (product.currency === "UYU") {
        subtotalUyu += product.cost * product.quantity;
      }
    });

    const discount = 0; // Aquí podrías cambiarlo por la lógica de tu descuento
    const totalUsd = subtotalUsd - discount;
    const totalUyu = subtotalUyu - discount;

    // Actualiza el DOM con los subtotales y totales por moneda
    subtotalUsdElement.innerText = `USD ${subtotalUsd.toFixed(2)} `;
    subtotalUyuElement.innerText = `UYU ${subtotalUyu.toFixed(2)} `;
    totalUsdElement.innerText = `USD ${totalUsd.toFixed(2)} `;
    totalUyuElement.innerText = ` UYU ${totalUyu.toFixed(2)} `;
    discountElement.innerText = `${(discount * 100).toFixed(0)}%`;
  };

  const applyDiscountButton = document.querySelector(".button-cupon");
  applyDiscountButton.addEventListener("click", () => {
    updateTotals();
  });

  renderCart(selectedProducts);
  containerProductos.appendChild(productoRow);
});
