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

        <!-- menu desplegable -->
        <div class="dropdown-container">
          <a><ion-icon name="person-circle-outline" class="icono-login" id="userIcon"></ion-icon></a>
          <div class="dropdown-menu" id="dropdownMenu">
            <ul>
              <li>
                <div class="perfil-dropdown">
                  <img src="img/cat-perfil.jpeg" id="imagen-perfil">
                  <h3 id="welcomeMessage">Bienvenido</h3>
                  <a href="my-profile.html">Mi perfil</a>
                </div>
              </li>
              <li><a href="#">Configuración</a></li>
              <li><a href="#" id="logoutLink">Cerrar sesión</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div id="cart-menu" class="cart-menu">
        <h2>Carrito de Compras</h2>
        <div id="cart-items"></div>
        <div id="cart-total">Total: $0.00</div>
        <button id="checkout-button">Ir a Pagar</button>
      </div>
      <div id="user-info"></div>
    </div>`;

  const userIcon = document.getElementById('userIcon');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const welcomeMessage = document.getElementById('welcomeMessage');
  const user = JSON.parse(localStorage.getItem("user"));

  // Actualizar el mensaje de bienvenida si hay un usuario
  if (user && user.name) {
    welcomeMessage.textContent = `Bienvenido, ${user.name}`;
  }

  userIcon.addEventListener('click', function() {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });

  window.addEventListener('click', function(e) {
    if (!userIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.style.display = 'none';
    }
  });

  const navLinks = document.getElementById("nav-links");
  const hamburger = document.querySelector(".hamburger");

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

  // Agregar evento de clic al enlace de cerrar sesión en el dropdown
  document.getElementById("logoutLink").addEventListener("click", function(event) {
    event.preventDefault(); // Previene la acción por defecto del enlace
    logOut(); // Llama a la función de cierre de sesión
  });

  const userInfo = document.getElementById("user-info");
  if (user?.name) {
    userInfo.innerHTML = `<a href="my-profile.html">Bienvenid@, ${user.name}!</a>`;
  } else {
    userInfo.innerHTML = `<button id="loginButton">Iniciar Sesión</button>`;
    document.getElementById("loginButton").addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }
});
