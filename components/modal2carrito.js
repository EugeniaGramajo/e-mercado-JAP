document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('setupFinalizePurchase', function() {
      const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
  
      // Evitar la validación en este punto, solo abrir el modal correspondiente.
      if (selectedPaymentMethod?.id === 'cardPayment') {
        showCreditCardModal();
      } else if (selectedPaymentMethod?.id === 'bankPayment') {
        showBankAccountModal();
      } else {
        alert('Por favor, seleccione un método de pago.');
      }
    });
  
    // MODAL: Tarjeta de Crédito
    function showCreditCardModal() {
      const cardModalHTML = `
        <div class="modal fade" id="modalCreditCard" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Datos de Tarjeta de Crédito</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="creditCardForm">
                  <div class="mb-3">
                    <label for="cardName" class="form-label">Nombre en la Tarjeta</label>
                    <input type="text" class="form-control" id="cardName" required>
                  </div>
                  <div class="mb-3">
                    <label for="cardNumber" class="form-label">Número de Tarjeta</label>
                    <input type="text" class="form-control" id="cardNumber" required>
                  </div>
                  <div class="mb-3">
                    <label for="expiryDate" class="form-label">Fecha de Expiración</label>
                    <input type="text" class="form-control" id="expiryDate" placeholder="MM/AA" required>
                  </div>
                  <div class="mb-3">
                    <label for="cvc" class="form-label">CVC</label>
                    <input type="text" class="form-control" id="cvc" required>
                  </div>
                  <button type="submit" class="btn btn-success w-100">Guardar Tarjeta</button>
                </form>
              </div>
            </div>
          </div>
        </div>`;
      document.body.insertAdjacentHTML('beforeend', cardModalHTML);
  
      const modal = new bootstrap.Modal(document.getElementById('modalCreditCard'));
      modal.show();
  
      document.getElementById('creditCardForm').addEventListener('submit', function(e) {
        e.preventDefault();
        localStorage.setItem('paymentMethod', 'Tarjeta de Crédito'); // Guarda el método de pago
        modal.hide(); // Cierra el modal de tarjeta
      });
    }
  
    // MODAL: Cuenta Bancaria
    function showBankAccountModal() {
      const bankModalHTML = `
        <div class="modal fade" id="modalBankAccount" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Datos de Cuenta Bancaria</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="bankAccountForm">
                  <div class="mb-3">
                    <label for="bankName" class="form-label">Banco</label>
                    <input type="text" class="form-control" id="bankName" required>
                  </div>
                  <div class="mb-3">
                    <label for="accountNumber" class="form-label">Número de Cuenta</label>
                    <input type="text" class="form-control" id="accountNumber" required>
                  </div>
                  <button type="submit" class="btn btn-success w-100">Guardar Cuenta</button>
                </form>
              </div>
            </div>
          </div>
        </div>`;
      document.body.insertAdjacentHTML('beforeend', bankModalHTML);
  
      const modal = new bootstrap.Modal(document.getElementById('modalBankAccount'));
      modal.show();
  
      document.getElementById('bankAccountForm').addEventListener('submit', function(e) {
        e.preventDefault();
        localStorage.setItem('paymentMethod', 'Cuenta Bancaria'); // Guarda el método de pago
        modal.hide(); // Cierra el modal de cuenta bancaria
      });
    }
  });
  
  
  
  
  
  