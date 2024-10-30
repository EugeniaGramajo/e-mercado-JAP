const cartListComponent = (product, updateTotals) => {
  const subtotal = product.cost * product.quantity;

  const componentHTML = `
    <div class="row align-items-center pt-4 pb-4" data-product-id="${product.id}">
        <div class="col-sm-3 d-flex align-items-center justify-content-center">
            <img src="${product.image[0]}" alt="${product.name}" class="img-fluid me-2" style="max-width: 60px; height: auto;">
            <span>${product.name}</span>
        </div>
        <div class="col-sm-3">${product.currency} ${product.cost}</div>
        <div class="col-sm-3 d-flex justify-content-center">
            <input type="number" class="form-control text-center p-1 custom-border" value="${product.quantity}" min="1" style="width: 70px; height: 30px;">
        </div>
        <div class="col-sm-3 subtotal">${product.currency} ${subtotal}</div> <!-- Cambié aquí a "subtotal" -->
    </div>
  `;

  const componentElement = document.createElement("div");
  componentElement.innerHTML = componentHTML;

  const input = componentElement.querySelector('input[type="number"]');
  const subtotalElement = componentElement.querySelector(".subtotal");

  input.addEventListener("input", (event) => {
    const newQuantity = parseInt(event.target.value) || 1;
    product.quantity = newQuantity;
    const newSubtotal = product.cost * newQuantity;
    subtotalElement.innerText = `${product.currency} ${newSubtotal}`;

    updateTotals();
  });

  return componentElement;
};

export default cartListComponent;
