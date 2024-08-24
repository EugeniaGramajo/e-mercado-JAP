document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("user"));
  const navBar = document.getElementById("navbar");
  const welcome = document.createElement("li");
  
  const logOut = ()=>{
    localStorage.clear()
    window.location.href = "login.html";
  }

  if (user?.name) {
    welcome.innerHTML = `
    <div class='d-flex flex-row'>
    <a class="nav-link" href="my-profile.html">Bienvenid@, ${user.name}!</a>
    <button class="btn btn-danger" id="logOut">Cerrar Sesión</button>
    <div>
    `;
    navBar.appendChild(welcome);
  } else {
    window.location.href = "login.html";
  }

  const buttonLogOut = document.getElementById("logOut")
  buttonLogOut.addEventListener("click", ()=>{
    logOut()
  })
  

  document.getElementById("autos").addEventListener("click", function () {
    localStorage.setItem("catID", 101);
    window.location = "products.html";
  });
  document.getElementById("juguetes").addEventListener("click", function () {
    localStorage.setItem("catID", 102);
    window.location = "products.html";
  });
  document.getElementById("muebles").addEventListener("click", function () {
    localStorage.setItem("catID", 103);
    window.location = "products.html";
  });
});
