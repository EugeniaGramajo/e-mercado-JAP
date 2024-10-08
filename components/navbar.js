document.addEventListener("DOMContentLoaded", function () {
  const realNavBar = document.getElementById("navbar");

  realNavBar.innerHTML = `      
    <div class="navbar-section">
  <span class="logo">
    <img alt="logo" src="https://i0.wp.com/puppis.blog/wp-content/uploads/2020/02/Particularidades-de-los-felinos.jpg?resize=900%2C600&ssl=1">
  </span>
</div>

<button id="hamburger" class="hamburger" aria-label="Menú" aria-expanded="false">
  <span></span>
  <span></span>
  <span></span>
</button>

<div class="navbar-section" id="nav-links">
  
  <div id="links">
    <a href="index.html" class="nav-Link">Inicio</a>
    <a href="categories.html" class="nav-Link">Categorias</a>
    <a href="sell.html" class="nav-Link">Vender</a>
    <a href="about.html" class="nav-Link">About</a>
  </div>
  <div class="icons">
    <span class="icon" id="favorites.html">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. --><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
    </span>
    <span class="icon" id="cart-icon" aria-label="Carrito" aria-expanded="false">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
    </span> 
  </div>
  <div id="cart-menu" class="cart-menu">
  <h2>Carrito de Compras</h2>
  <div id="cart-items"></div>
  <div id="cart-total">Total: $0.00</div>
  <button id="checkout-button">Ir a Pagar</button>
</div>
  <div id="user-info"></div>
</div>`;
  const user = JSON.parse(localStorage.getItem("user"));
  const userInfo = document.getElementById("user-info");
  const navLinks = document.getElementById("nav-links");
  const hamburger = document.querySelector(".hamburger");
  const favorites = document.getElementById("favorites.html")

  favorites.addEventListener("click", ()=>{
      window.location.href = "favorites.html"
    })

  function toggleMenu() {
    navLinks?.classList.toggle("active");
    hamburger?.setAttribute(
      "aria-expanded",
      hamburger.getAttribute("aria-expanded") === "false" ? "true" : "false"
    );
  }

  document.getElementById("hamburger").addEventListener("click", toggleMenu);

  const logOut = () => {
    localStorage.clear();
    window.location.href = "login.html";
  };

  if (user?.name) {
    userInfo.innerHTML = `
      <a href="my-profile.html">Bienvenid@, ${user.name}!</a>
      <button id="logOut">Cerrar Sesión</button>
    `;
    document.getElementById("logOut").addEventListener("click", logOut);
  } else {
    userInfo.innerHTML = `
      <button id="loginButton">Iniciar Sesión</button>
    `;
    document.getElementById("loginButton").addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }

  //* Logica carrito de compras

  const cartIcon = document.getElementById("cart-icon");
  const cartMenu = document.getElementById("cart-menu");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const checkoutButton = document.getElementById("checkout-button");

  let cart = [
    { name: "Item 1", price: 10.99 },
    { name: "Item 2", price: 15.99 },
    { name: "Item 3", price: 7.99 }
  ];

  function toggleCartMenu() {
    cartMenu.classList.toggle("active");
    cartIcon.setAttribute(
      "aria-expanded",
      cartIcon.getAttribute("aria-expanded") === "false" ? "true" : "false"
    );
  }

  function updateCartDisplay() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      const itemElement = document.createElement("div");
      itemElement.textContent = `${item.name} - $${item.price.toFixed(2)}`;
      cartItems.appendChild(itemElement);
      total += item.price;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }

  cartIcon.addEventListener("click", toggleCartMenu);

  checkoutButton.addEventListener("click", () => {
    alert("Redirigiendo al proceso de pago...");
    // Implement your checkout logic here
  });

  // Close cart menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!cartMenu.contains(event.target) && !cartIcon.contains(event.target)) {
      cartMenu.classList.remove("active");
      cartIcon.setAttribute("aria-expanded", "false");
    }
  });

  // Initial cart display update
  updateCartDisplay();


  const currentPage = window.location.pathname.split("/").pop();
  const navLink = document.querySelectorAll(".nav-Link");
  navLink.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});
