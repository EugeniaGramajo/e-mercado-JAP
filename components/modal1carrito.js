document.addEventListener('DOMContentLoaded', function() {
  let selectedCurrency = "UYU";
  let discount = 0;

  function createModal() {
    const modalHTML = `
      <div class="modal fade" id="dynamicModal" tabindex="-1" aria-labelledby="dynamicModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="dynamicModalLabel">Detalles de facturación</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <!-- El contenido se llenará dinámicamente -->
            </div>
          </div>
        </div>
      </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  function updateModalContent(subtotal, total, selectedCurrency) {
    const modalBody = document.querySelector('#dynamicModal .modal-body');
    if (!modalBody) {
      console.error('Modal body not found');
      return;
    }

    let productsHTML = '';
    const selectedProducts = JSON.parse(localStorage.getItem("cartItems")) || [];

    selectedProducts.forEach(product => {
      const productSubtotal = product.cost * product.quantity;
      productsHTML += `
        <div class="d-flex justify-content-between align-items-center mb-2">
          <div class="d-flex align-items-center">
            <img src="${product.image[0]}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
            <span>${product.name} (x${product.quantity})</span>
          </div>
          <span>${formatCurrency(productSubtotal, selectedCurrency)}</span>
        </div>
      `;
    });

    const shippingCost = calculateShippingCost(subtotal);
    const finalTotal = total + shippingCost;

    const modalContent = `
      <div class="row">
        <div class="col-md-6">
          <form id="shippingForm">
            <div class="mb-3">
              <label for="departamento" class="form-label">Departamento</label>
              <input type="text" class="form-control" id="departamento" required>
            </div>
            <div class="mb-3">
              <label for="localidad" class="form-label">Localidad</label>
              <input type="text" class="form-control" id="localidad" required>
            </div>
            <div class="mb-3">
              <label for="calle" class="form-label">Calle</label>
              <input type="text" class="form-control" id="calle" required>
            </div>
            <div class="mb-3">
              <label for="numero" class="form-label">Número</label>
              <input type="text" class="form-control" id="numero" required>
            </div>
            <div class="mb-3">
              <label for="esquina" class="form-label">Esquina</label>
              <input type="text" class="form-control" id="esquina" required>
            </div>
            <div class="mb-3">
              <label for="telefono" class="form-label">Teléfono</label>
              <input type="tel" class="form-control" id="telefono" required>
            </div>
          </form>
        </div>
        <div class="col-md-6">
          <div class="product-summary">
            <h6 class="mb-3">Resumen de compra</h6>
            ${productsHTML}
            <hr>
            <div class="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span>${formatCurrency(subtotal, selectedCurrency)}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>Descuento:</span>
              <span>${(discount * 100).toFixed(0)}%</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>Costo de envío:</span>
              <span>${formatCurrency(shippingCost, selectedCurrency)}</span>
            </div>
            <div class="d-flex justify-content-between mb-4">
              <strong>Total:</strong>
              <strong>${formatCurrency(finalTotal, selectedCurrency)}</strong>
            </div>
            <h6 class="mb-2">Seleccione un método de pago</h6>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="paymentMethod" id="cardPayment" value="card">
            <label class="form-check-label" for="cardPayment">Tarjeta de crédito/débito</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="paymentMethod" id="bankPayment" value="bank">
            <label class="form-check-label" for="bankPayment">Cuenta bancaria</label>
          </div>
            <button class="btn btn-secondary w-100 mb-3" id="addPaymentMethod">Ingresar Método de Pago</button>
            <button class="btn btn-primary w-100" id="finalizarCompra">Finalizar compra</button>
          </div>
        </div>
      </div>
    `;

    modalBody.innerHTML = modalContent;

     // Configura botón para seleccionar método de pago
    document.getElementById('addPaymentMethod').addEventListener('click', function(e) {
      e.preventDefault();
      const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
      if (!selectedPayment) {
        alert('Seleccione un método de pago antes de continuar.');
        return;
      }
      document.dispatchEvent(new Event('setupFinalizePurchase')); // Dispara el evento
    });

    // Configura el botón Finalizar Compra para validar los campos de facturación
    document.getElementById('finalizarCompra').addEventListener('click', function(e) {
      e.preventDefault();

      // Validar campos de facturación
      const form = document.getElementById('shippingForm');
      if (!form.checkValidity()) {
        form.reportValidity();
        return; // Detener si algún campo es inválido
      }

      if (!localStorage.getItem('paymentMethod')) {
        alert('Por favor, ingrese un método de pago antes de finalizar la compra.');
        return;
      }

      alert('¡Compra finalizada con éxito!');
      
      // Limpiar el carrito en tiempo real
      localStorage.removeItem('cartItems');  // Elimina los productos del carrito
      localStorage.removeItem('paymentMethod');  // Elimina el método de pago seleccionado

      // Actualizar la vista del carrito en tiempo real
      document.dispatchEvent(new Event('cartUpdated'));

      // Cerrar el modal de detalles de facturación
      bootstrap.Modal.getInstance(document.getElementById('dynamicModal')).hide();
    });
  }

  function validateForm() {
    const form = document.getElementById('shippingForm');
    if (form.checkValidity() === false) {
      form.reportValidity();
      return false;
    }
    return true;
  }

  function calculateShippingCost(subtotal) {
    const shippingType = document.querySelector('input[name="options"]:checked')?.id || 'standard';
    switch(shippingType) {
      case 'standard': return subtotal * 0.05;
      case 'express': return subtotal * 0.07;
      case 'premium': return subtotal * 0.15;
      default: return 0;
    }
  }

  function formatCurrency(amount, currency) {
    return new Intl.NumberFormat('es-UY', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  }

  createModal();

  document.addEventListener('openCheckoutModal', function() {
    const modal = new bootstrap.Modal(document.getElementById('dynamicModal'));
    modal.show();
  });

  document.addEventListener('updateCartTotals', function(event) {
    const { subtotal, total, selectedCurrency: currency, discount: newDiscount } = event.detail;
    selectedCurrency = currency;
    discount = newDiscount;
    updateModalContent(subtotal, total, selectedCurrency);
  });
});