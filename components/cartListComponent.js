const cartListComponent = (product, updateTotals) => {
  const selectedCurrency = localStorage.getItem("selectedCurrency") || "UYU"; // Moneda seleccionada (por defecto UYU)
  const exchangeRate = 40; // Ejemplo: 1 USD = 40 UYU (ajusta según tu tasa real)

  // Configuración del formateador de moneda
  const currencyFormatter = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: selectedCurrency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Función para formatear la moneda
  const formatCurrency = (amount, currency) => {
    const formatter = new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Modifica la visualización de UYU para que muestre UYU$
    if (currency === "UYU") {
      return `${formatter.format(amount).replace("UYU", "").trim()} UYU$`; // Cambia UYU a UYU$
    }
    return formatter.format(amount);
  };

  // Calcular el subtotal en la moneda seleccionada
  const calculateSubtotal = (quantity) => {
    return selectedCurrency === "UYU"
      ? product.currency === "USD"
        ? product.cost * quantity * exchangeRate
        : product.cost * quantity
      : product.currency === "UYU"
        ? product.cost * quantity / exchangeRate
        : product.cost * quantity;
  };

  // Obtener cantidad desde localStorage
  const storedQuantity = localStorage.getItem(`product_${product.id}_quantity`);
  const initialQuantity = storedQuantity ? parseInt(storedQuantity) : product.quantity;

  // Calcular el subtotal inicial
  const subtotalInSelectedCurrency = calculateSubtotal(initialQuantity);
  const formattedSubtotal = formatCurrency(subtotalInSelectedCurrency, selectedCurrency);

  // Formatear el precio original del producto manteniendo su tipo de moneda
  const formattedPrice = formatCurrency(product.cost, product.currency);

  // Crear un elemento para el componente
  const componentHTML = `
    <div class="row align-items-center pt-4 pb-4" data-product-id="${product.id}">
        <div class="col-sm-3 d-flex align-items-center justify-content-start">
            <img src="${product.image[0]}" alt="${product.name}" class="img-fluid me-2" style="max-width: 60px; height: auto;">
            <span class="ms-3">${product.name}</span>
        </div>
        <div class="col-sm-3 text-center">${formattedPrice}</div> <!-- Precio original formateado manteniendo su moneda original -->
        <div class="col-sm-3 d-flex justify-content-center">
            <input type="number" class="form-control text-center p-1 custom-border" value="${initialQuantity}" min="1" style="width: 70px; height: 30px;">
        </div>
        <div class="col-sm-3 text-center subtotal">${formattedSubtotal}</div> <!-- Subtotal formateado -->
    </div>
  `;

  const componentElement = document.createElement("div");
  componentElement.innerHTML = componentHTML;

  const input = componentElement.querySelector('input[type="number"]');
  const subtotalElement = componentElement.querySelector(".subtotal");

  // Establecer la cantidad inicial en el producto
  product.quantity = initialQuantity;

  input.addEventListener("input", (event) => {
    const newQuantity = parseInt(event.target.value) || 1;
    product.quantity = newQuantity;

    // Guardar la nueva cantidad en localStorage
    localStorage.setItem(`product_${product.id}_quantity`, newQuantity);

    // Recalcular subtotal en la moneda seleccionada
    const newSubtotalInSelectedCurrency = calculateSubtotal(newQuantity);
    const formattedNewSubtotal = formatCurrency(newSubtotalInSelectedCurrency, selectedCurrency);
    subtotalElement.innerText = formattedNewSubtotal;

    updateTotals();
  });

  return componentElement;
};

export default cartListComponent;
