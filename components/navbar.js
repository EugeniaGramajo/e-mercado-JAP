document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("user"));
  const welcome = document.createElement("li");
  const realNavBar = document.getElementById("navbar")

  realNavBar.innerHTML = `<div class="container">
  <button
    class="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarNav"
    aria-controls="navbarNav"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul id="navbar-ul" class="navbar-nav w-100 justify-content-between">
      <li class="nav-item">
        <a class="nav-link active" href="index.html">Inicio</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="categories.html">Categorías</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="sell.html">Vender</a>
      </li>
      <li class="nav-item"></li>
    </ul>
  </div>
</div>`


const navBar = document.getElementById("navbar-ul");

  const logOut = () => {
    localStorage.clear();
    window.location.href = "login.html";
  };

  if (user?.name) {
    welcome.innerHTML = `
  <div class='d-flex flex-row'>
  <a class="nav-link" href="my-profile.html">Bienvenid@, ${user.email}!</a>
  <button class="btn btn-danger" id="logOut">Cerrar Sesión</button>
  <div>
  `;
    navBar.appendChild(welcome);
  } else {
    window.location.href = "login.html";
  }

  const buttonLogOut = document.getElementById("logOut");
  buttonLogOut.addEventListener("click", () => {
    logOut();
  });
});
