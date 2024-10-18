export const productsIndex = (product)=>{
    return `
              <div class="product-card">
            <img
              src="${product.image}"
            />
            <section>
              <h3 class="product-title">${product.name}</h3>
              <span>${product.currency} ${product.cost}</span>
              <button class="button">Añadir al Carrito</button>
            </section>
          </div>
    `
}