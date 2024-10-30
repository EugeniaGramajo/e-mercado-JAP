const cartListComponent = (product) => {
  return `
            <div class="row align-items-center">
                <div class="col-sm-3 d-flex align-items-center justify-content-center">
                    <img src="${product.image}" alt="${
    product.name
  }" class="img-fluid me-2" style="max-width: 60px; height: auto;">
                    <span>${product.name}</span>
                </div>
                <div class="col-sm-3">$${product.cost}</div>
                <div class="col-sm-3 d-flex justify-content-center">
                    <input type="number" class="form-control text-center p-1 custom-border" value="${
                      product.quantity
                    }" min="1" style="width: 70px; height: 30px;">
                </div>
                <div class="col-sm-3">$${(
                  product.cost * product.quantity
                )}</div>
            </div>
        `;
};

export default cartListComponent;
