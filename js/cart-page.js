import { alertComponent } from "../components/alertComponent.js";
import cartListComponent from "../components/cartListComponent.js";

document.addEventListener("DOMContentLoaded", function () {
  const containerProductos = document.querySelector(".productos");
  const carritoTotalElement = document.getElementById("carrito-total");
  const totalConDescuentoElement = document.getElementById("total-con-descuento");
  const discountElement = document.getElementById("descuento");
  const applyDiscountButton = document.querySelector(".button-cupon");
  const couponInput = document.querySelector(".input-cupon");

  let discount = 0;
  let selectedCurrency = "UYU";
  const exchangeRate = 0.025;

  containerProductos.innerHTML = `
    <div class="container text-center mt-5 mb-5 p-3 cuerpo-editable1">
        <div class="row align-items-center"> 
            <div class="col-4">Producto</div>
            <div class="col-2 ms-1">Precio</div>
            <div class="col-3 ms-3">Cantidad</div>
            <div class="col-1 ms-3">Subtotal</div>
            <div class="col-1">
                <div class="dropdown">
                    <button class="button-cupon button-edit dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        ${selectedCurrency}
                    </button>
                    <ul class="dropdown-menu edit-dropdown" aria-labelledby="dropdownMenuButton">
                        <li><a class="dropdown-item" href="#" data-value="UYU">UYU</a></li>
                        <li><a class="dropdown-item" href="#" data-value="USD">USD</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  `;

  const dropdownButton = document.getElementById("dropdownMenuButton");
  const dropdownItems = document.querySelectorAll(".dropdown-item");

  dropdownItems.forEach(item => {
    item.addEventListener("click", (event) => {
      event.preventDefault(); 
      selectedCurrency = event.target.getAttribute("data-value"); 
      dropdownButton.innerText = selectedCurrency; 
      localStorage.setItem("selectedCurrency", selectedCurrency);
      renderCart();
    });
  });

  const productoContent = document.createElement("div"); 
  productoContent.classList.add("container", "text-center", "mt-5", "mb-5", "p-3"); 
  containerProductos.appendChild(productoContent);

  let selectedProducts = JSON.parse(localStorage.getItem("cartItems")) || [];

  const renderCart = () => {
    productoContent.innerHTML = ""; 

    if (selectedProducts.length === 0) {
      productoContent.innerHTML = `
        <h1 class="text-center mt-5 mb-5 p-5 productos-style">El carrito está vacío</h1>
      `;
      updateTotals();
      return;
    }

    selectedProducts.forEach((product) => {
      const productoRow = document.createElement("div");
      productoRow.className = "row align-items-center productos-style mb-4 p-3";

      const productContainer = document.createElement("div");
      productContainer.className = "row w-100 align-items-center";

      const deleteButtonCol = document.createElement("div");
      deleteButtonCol.className = "col-1";
      const deleteButton = document.createElement("button");
      deleteButton.className = "button-cupon eliminar-producto";
      deleteButton.textContent = "X";
      deleteButtonCol.appendChild(deleteButton);

      const contentCol = document.createElement("div");
      contentCol.className = "col-11";
      const productElement = cartListComponent(product, updateTotals, selectedCurrency, exchangeRate);
      contentCol.appendChild(productElement);

      productContainer.appendChild(deleteButtonCol);
      productContainer.appendChild(contentCol);
      productoRow.appendChild(productContainer);

      deleteButton.addEventListener("click", () => {
        selectedProducts = selectedProducts.filter((item) => item.id !== product.id);
        localStorage.removeItem(`product_${product.id}_quantity`);
        localStorage.setItem("cartItems", JSON.stringify(selectedProducts));
        renderCart(); 
        updateTotals(); 
      });

      productoContent.appendChild(productoRow);
    });

    updateTotals(); 
  };

  const updateTotals = () => {
    let subtotal = 0;

    selectedProducts.forEach((product) => {
      if (product.currency === selectedCurrency) {
        subtotal += product.cost * product.quantity;
      } else if (product.currency === "UYU" && selectedCurrency === "USD") {
        subtotal += (product.cost * product.quantity) * exchangeRate;
      } else if (product.currency === "USD" && selectedCurrency === "UYU") {
        subtotal += (product.cost * product.quantity) / exchangeRate;
      }
    });

    const total = subtotal * (1 - discount);

    const currencyFormatter = new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: selectedCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const formatCurrency = (amount, currency) => {
      if (currency === "UYU") {
        return `${currencyFormatter.format(amount).replace("UYU", "").trim()} UYU$`;
      }
      return currencyFormatter.format(amount);
    };

    const formattedSubtotal = formatCurrency(subtotal, selectedCurrency);
    const formattedTotal = formatCurrency(total, selectedCurrency);

    let subtotalHtml = `
      <div class="d-flex justify-content-between mt-5 mb-2">
        <span>Subtotal:</span>
        <span>${formattedSubtotal}</span>
      </div>
    `;
    let totalHtml = `
      <div class="d-flex justify-content-between mt-4 mb-3">
        <span>Total:</span>
        <span>${formattedTotal}</span>
      </div>
    `;

    carritoTotalElement.innerHTML = subtotalHtml;
    totalConDescuentoElement.innerHTML = totalHtml;
    discountElement.innerText = `${(discount * 100).toFixed(0)}%`;

    // Trigger an event to update the modal content
    const event = new CustomEvent('updateCartTotals', { 
      detail: { subtotal, total, selectedCurrency, discount } 
    });
    document.dispatchEvent(event);
  };

  const applyDiscount = () => {
    const couponCode = couponInput.value.trim().toUpperCase();

    if (couponCode === "DISCOUNT10") {
      discount = 0.1;
      alertComponent({
        title: "Cupón aplicado con éxito!",
        icon: "success",
        text: "Cupón de 10% aplicado",
      });
    } else if (couponCode === "DISCOUNT20") {
      discount = 0.2;
      alertComponent({
        title: "Cupón aplicado con éxito!",
        icon: "success",
        text: "Cupón de 20% aplicado",
      });
    } else {
      discount = 0;
      alertComponent({
        title: "Cupón no aplicado",
        icon: "error",
        text: "Cupón no válido.",
      });
    }

    updateTotals();
  };

  applyDiscountButton.addEventListener("click", applyDiscount);

  renderCart();

  document.querySelectorAll('input[name="options"]').forEach(radio => {
    radio.addEventListener('change', updateTotals);
  });

  // Evento para abrir el modal.
  const finalizarButton = document.getElementById("finalizar");
  if (finalizarButton) {
    finalizarButton.addEventListener("click", function (event) {
      const formaEnvio = document.querySelector('input[name="options"]:checked');
      
      if (!formaEnvio) {
        alertComponent({
          title: "Falta seleccionar el tipo de envío",
          icon: "error",
          text: "Debes seleccionar una opción de envío antes de continuar.",
        });
        event.preventDefault(); // Evita que se abra el modal si no hay selección
        return;
      }

      if (selectedProducts.length === 0) {
        alertComponent({
          title: "Carrito vacío",
          icon: "error",
          text: "No hay productos en el carrito.",
        });
        return;
      }
      // Disparar evento para abrir el modal.
      document.dispatchEvent(new Event('openCheckoutModal'));
      
    });
  } else {
    console.error("El botón 'finalizar' no se encontró en el DOM");
  }

});




