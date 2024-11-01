import { alertComponent } from "../components/alertComponent.js";
import cartListComponent from "../components/cartListComponent.js";

document.addEventListener("DOMContentLoaded", function () {
  const containerProductos = document.querySelector(".productos");
  const subtotalUsdElement = document.getElementById("subtotal-usd");
  const subtotalUyuElement = document.getElementById("subtotal-uyu");
  const totalUsdElement = document.getElementById("total-usd");
  const totalUyuElement = document.getElementById("total-uyu");
  const discountElement = document.getElementById("descuento");
  const applyDiscountButton = document.querySelector(".button-cupon");
  const couponInput = document.querySelector(".input-cupon");

  let discount = 0; // Variable de descuento global

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

     // Verificación de carrito vacío
     if (selectedProducts.length === 0) {
      productoRow.innerHTML = `
          <h1 class="text-center mt-5">El carrito está vacío</h1>
      `;
      containerProductos.appendChild(productoRow);
      updateTotals(); // Actualiza los totales a cero
      return;
  }

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

    const totalUsd = subtotalUsd * (1 - discount);
    const totalUyu = subtotalUyu * (1 - discount);

    subtotalUsdElement.innerText = `$${subtotalUsd.toFixed(2)} USD`;
    subtotalUyuElement.innerText = `$${subtotalUyu.toFixed(2)} UYU`;
    totalUsdElement.innerText = `$${totalUsd.toFixed(2)} USD`;
    totalUyuElement.innerText = `$${totalUyu.toFixed(2)} UYU`;
    discountElement.innerText = `${(discount * 100).toFixed(0)}%`;
  };

  const applyDiscount = () => {
    const couponCode = couponInput.value.trim().toUpperCase();

    if (couponCode === "DISCOUNT10") {
      discount = 0.1; // 10% de descuento
      alertComponent({
        title: "Cupón aplicado con éxito!",
        icon: "success",
        text: "Cupón de 10% aplicado",
      });
    } else if (couponCode === "DISCOUNT20") {
      discount = 0.2; // 20% de descuento
      alertComponent({
        title: "Cupón aplicado con éxito!",
        icon: "success",
        text: "Cupón de 20% aplicado",
      });
    } else {
      discount = 0; // Sin descuento
      alertComponent({
        title: "Cupón no aplicado",
        icon: "error",
        text: "Cupón no válido.",
      });
    }

    updateTotals(); // Actualizar totales con el descuento aplicado
  };

  applyDiscountButton.addEventListener("click", applyDiscount);

  renderCart(selectedProducts);
  containerProductos.appendChild(productoRow);
});
