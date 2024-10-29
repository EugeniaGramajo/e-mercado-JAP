import { darkModeToggle } from "../js/darkMode.js";

document.addEventListener("DOMContentLoaded", function () {
  const realNavBar = document.getElementById("navbar");
  const user = JSON.parse(localStorage.getItem("user")); // Verificamos si el usuario está iniciado

  // Generar el contenido del navbar dependiendo si el usuario está logueado o no
  realNavBar.innerHTML = `      
    <div class="navbar-section">
      <span class="logo">
        <img id="logo" alt="logo" src="img/NovaShop(white).png">
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
        ${
          user
            ? `
        <!-- menu desplegable -->
        <div class="dropdown-container">
  <a href="#" class="user-icon-link">
    <ion-icon name="person-circle-outline" class="icono-login nav-Link" id="userIcon"></ion-icon>
  </a>
  <div class="dropdown-menu" id="dropdownMenu">
    <ul>
      <li class="profile-item">
  <div class="profile-content">
    <a href="my-profile.html" class="profile-link">
      <img src="${user.image}" alt="Imagen de perfil" class="profile-image" id="imagen-perfil">
      <div class="profile-info">
        <h4 id="welcomeMessage">Bienvenid@, ${user.name}!</h4>
        <h6 class="mi-perfil">Mi perfil</h6>
      </div>
    </a>
  </div>
</li>
      <hr>
      <li class="mode-toggle hover-navbar">
        <span class="mode-text">Modo Oscuro</span>
        <label class="switch">
          <input type="checkbox" id="dark-mode-toggle">
          <span class="slider round"></span>
        </label>
      </li>
      <li class="menu-item hover-navbar">
        <a href="cart.html" id="carrito">
          <ion-icon name="cart-outline"></ion-icon>
          <span>Mi Carrito</span>
        </a>
      </li>
      <li class="menu-item hover-navbar">
        <a href="#">
          <ion-icon name="star-outline"></ion-icon>
          <span>Favoritos</span>
        </a>
      </li>
      <li class="menu-item hover-navbar">
        <a href="#">
          <ion-icon name="time-outline"></ion-icon>
          <span>Historial</span>
        </a>
      </li>
      <li class="menu-item hover-navbar">
        <a href="#">
          <ion-icon name="settings-outline"></ion-icon>
          <span>Configuración</span>
        </a>
      </li>
      <hr>
      <li class="menu-item logout-item hover-navbar">
        <a href="#" id="logoutLink">
          <ion-icon name="log-out-outline" class="icon-logout"></ion-icon>
          <span>Cerrar sesión</span>
        </a>
      </li>
    </ul>
  </div>
</div>
        `
            : `
        <!-- Botón de Iniciar Sesión si el usuario no está logueado -->
        <buttton><a href="login.html" class="login-button" style="color: #fff">Iniciar Sesión</a></buttton>
        `
        }
      </div>
    </div>`;

  if (user) {
    // Agregar evento de clic al enlace de cerrar sesión en el dropdown
    document
      .getElementById("logoutLink")
      .addEventListener("click", function (event) {
        event.preventDefault(); // Previene la acción por defecto del enlace
        logOut(); // Llama a la función de cierre de sesión
      });

    // Mostrar/ocultar el menú desplegable al hacer clic en el ícono de usuario
    const userIcon = document.getElementById("userIcon");
    const dropdownMenu = document.getElementById("dropdownMenu");

    userIcon.addEventListener("click", function (event) {
      event.preventDefault();
      dropdownMenu.classList.toggle("show");
    });

    // Cerrar el menú desplegable si se hace clic fuera de él
    document.addEventListener("click", function (event) {
      // Verifica si el clic fue fuera del contenedor del menú desplegable
      if (
        !dropdownMenu.contains(event.target) &&
        !userIcon.contains(event.target)
      ) {
        dropdownMenu.classList.remove("show");
      }
    });
  }

  /* DarkMode */
  darkModeToggle();

  /*  */

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
});
