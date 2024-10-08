document.addEventListener("DOMContentLoaded", function () {
  const realNavBar = document.getElementById("navbar");

  realNavBar.innerHTML = `      
    <div class="navbar-section">
  <span class="logo">
    <img alt="logo" src="img/NovaShop(white).png">
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
