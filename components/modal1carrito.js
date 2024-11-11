import cartListComponent from "../components/cartListComponent.js";

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("finalizar").addEventListener("click", function() {
    // Función para generar el HTML de los productos con la imagen, nombre y subtotal
    function generateProductsHTML(products) {
      return products.map(product => {
        // Verificar si product.image es un array y tomar el primer valor
        const imageUrl = (Array.isArray(product.image) && product.image.length > 0) ? product.image[0] : 'ruta/a/imagen/default.jpg';  // Ruta por defecto si no hay imagen
        const unitCost = parseFloat(product.unitCost); // Asegurar que unitCost sea un número
        const count = parseInt(product.count, 10); // Asegurar que count sea un número entero

        // Calcular el subtotal del producto (unitCost * count)
        const subtotal = (unitCost > 0 && count > 0) ? (unitCost * count) : 0;

        // Obtener la moneda del producto, o usar 'UYU' como predeterminado
        const currency = product.currency;

        return `
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div class="d-flex align-items-center">
              <img src="${imageUrl}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
              <span>${product.name}</span>
            </div>
            <span>${subtotal.toFixed(2)} ${currency}</span> <!-- Mostrar subtotal al lado del nombre -->
          </div>
        `;
      }).join('');
    }

    // Obtener los productos del localStorage
    let selectedProducts = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (selectedProducts.length === 0) {
      alert("No hay productos en el carrito.");
      return; // Detener si no hay productos
    }

    // Generar el HTML del resumen de productos
    const productSummaryHTML = `
      <div class="product-summary">
        ${generateProductsHTML(selectedProducts)}
        <hr>
        <div class="d-flex justify-content-between mb-2">
          <span>Tipo de envío:</span>
          <span id="shippingTypeDisplay">No seleccionado</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span>Costo de envío:</span>
          <span id="shippingCostDisplay">$0.00</span>
        </div>
        <div class="d-flex justify-content-between mb-4">
          <strong>Total:</strong>
          <strong id="totalDisplay">${selectedProducts[0]?.currency || 'UYU'} ${selectedProducts.reduce((sum, product) => {
            const unitCost = parseFloat(product.unitCost);
            const count = parseInt(product.count, 10);
            return sum + (unitCost * count);
          }, 0).toFixed(2)}</strong>
        </div>
        <div class="payment-methods mb-3">
          <button class="btn btn-outline-primary mr-2" id="cardPayment">Tarjeta de crédito/débito</button>
          <button class="btn btn-outline-primary" id="bankPayment">Cuenta bancaria</button>
        </div>
        <button class="btn btn-primary btn-block">Finalizar compra</button>
      </div>
    `;

    // Verificar si el modal ya existe en el DOM antes de insertarlo
    if (!document.getElementById('dynamicModal')) {
      // Crear el HTML del modal
      const modalHTML = `
        <div class="modal fade" id="dynamicModal" tabindex="-1" role="dialog" aria-labelledby="dynamicModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header mb-3">
                <h5 class="modal-title" id="dynamicModalLabel">Detalles de facturación</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-6">
                    <form>
                      <div class="form-group">
                        <label for="departamento">Departamento</label>
                        <input type="text" class="form-control" id="departamento">
                      </div>
                      <div class="form-group">
                        <label for="localidad">Localidad</label>
                        <input type="text" class="form-control" id="localidad">
                      </div>
                      <div class="form-group">
                        <label for="calle">Calle</label>
                        <input type="text" class="form-control" id="calle">
                      </div>
                      <div class="form-group">
                        <label for="numero">Número</label>
                        <input type="text" class="form-control" id="numero">
                      </div>
                      <div class="form-group">
                        <label for="esquina">Esquina</label>
                        <input type="text" class="form-control" id="esquina">
                      </div>
                      <div class="form-group">
                        <label for="telefono">Teléfono</label>
                        <input type="tel" class="form-control" id="telefono">
                      </div>
                      <div class="form-group">
                        <label for="piso">Piso</label>
                        <input type="text" class="form-control" id="piso">
                      </div>
                      <div class="form-group">
                        <label for="apartamento">Apartamento</label>
                        <input type="text" class="form-control" id="apartamento">
                      </div>
                      <div class="form-group">
                        <label for="indicaciones">Indicaciones</label>
                        <input type="text" class="form-control" id="indicaciones">
                      </div>
                      <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" id="savePaymentInfo">
                        <label class="form-check-label" for="savePaymentInfo">
                          Guardar información de pago
                        </label>
                      </div>
                    </form>
                  </div>
                  <div class="col-md-6">
                    ${productSummaryHTML}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;

      // Insertar el HTML del modal en el contenedor
      document.getElementById("modal-container").innerHTML = modalHTML;

      // Inicializar el modal con Bootstrap
      $('#dynamicModal').modal('show');
    }

    // Asegurarse de que el botón de cerrar funciona
    $('#dynamicModal .close').on('click', function() {
      $('#dynamicModal').modal('hide');
    });

    // Limpiar el modal del DOM al cerrarlo
    $('#dynamicModal').on('hidden.bs.modal', function () {
      document.getElementById("modal-container").innerHTML = '';
    });

    // Manejar la selección de método de pago
    document.getElementById('cardPayment').addEventListener('click', function() {
      this.classList.add('active');
      document.getElementById('bankPayment').classList.remove('active');
    });

    document.getElementById('bankPayment').addEventListener('click', function() {
      this.classList.add('active');
      document.getElementById('cardPayment').classList.remove('active');
    });
  });
});
