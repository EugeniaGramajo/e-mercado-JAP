const cartListComponent = (product, updateTotals) => {
  const subtotal = product.cost * product.quantity;

  const componentHTML = `
    <div class="row align-items-center pt-4 pb-4" data-product-id="${product.id}">
        <div class="col-sm-3 d-flex align-items-center justify-content-center position-relative">
            <img src="${product.image[0]}" alt="${product.name}" class="img-fluid me-2" style="max-width: 60px; height: auto;">
            <button class="btn btn-danger btn-sm eliminar-producto position-absolute bottom-0 start-0" style="background-color: rgba(255, 0, 0, 0.7); border: none; padding: 0.2rem 0.4rem;">x</button>
            <span class="ms-2">${product.name}</span>
        </div>
        <div class="col-sm-3 text-center">${product.currency} ${product.cost}</div>
        <div class="col-sm-3 d-flex justify-content-center">
            <input type="number" class="form-control text-center p-1 custom-border" value="${product.quantity}" min="1" style="width: 70px; height: 30px;">
        </div>
        <div class="col-sm-3 text-center subtotal">${product.currency} ${subtotal}</div>
    </div>
  `;

  const componentElement = document.createElement("div");
  componentElement.innerHTML = componentHTML;

  const input = componentElement.querySelector('input[type="number"]');
  const subtotalElement = componentElement.querySelector(".subtotal");
  const deleteButton = componentElement.querySelector(".eliminar-producto");

  input.addEventListener("input", (event) => {
    const newQuantity = parseInt(event.target.value) || 1;
    product.quantity = newQuantity;
    const newSubtotal = product.cost * newQuantity;
    subtotalElement.innerText = `${product.currency} ${newSubtotal}`;

    updateTotals();
  });

  // Evento para eliminar el producto del carrito
  deleteButton.addEventListener("click", () => {
    let productos = JSON.parse(localStorage.getItem("cartItems")) || [];
    productos = productos.filter(item => item.id !== product.id);
    localStorage.setItem("cartItems", JSON.stringify(productos));
    componentElement.remove(); // Elimina el elemento del DOM
    updateTotals(); // Actualiza los totales
  });

  return componentElement;
};

export default cartListComponent;
