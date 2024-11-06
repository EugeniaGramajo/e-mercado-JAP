document.getElementById("finalizar").addEventListener("click", function() {
    // Crear el HTML del modal
    const modalHTML = `
      <div class="modal fade" id="dynamicModal" tabindex="-1" role="dialog" aria-labelledby="dynamicModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="dynamicModalLabel">Título del Modal Dinámico</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Este es el contenido del modal dinámico.
            </div>
          </div>
        </div>
      </div>`;
  
    // Insertar el HTML del modal en el contenedor
    document.getElementById("modal-container").innerHTML = modalHTML;
  
    // Inicializar el modal con Bootstrap
    $('#dynamicModal').modal('show');
  
    // Asegurarse de que el botón de cerrar funciona
    $('#dynamicModal .close').on('click', function() {
      $('#dynamicModal').modal('hide');
    });
  
    // Opcional: limpiar el modal del DOM al cerrarlo
    $('#dynamicModal').on('hidden.bs.modal', function () {
      document.getElementById("modal-container").innerHTML = '';
    });
  });