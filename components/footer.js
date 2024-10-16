document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelector("footer");
  const footerComponent = `
  <div class="container-footer">
          <div>
          <section>
            <img
              src="img/NovaShop.png"
            />
          </section>
          <section class="info">
            <section>
              <h3>Seguí explorando</h3>
              <p id="categories-list">
              </p>
            </section>
            <section>
              <h3>Conocenos!</h3>
              <p>
              <a   href="/about.html">Sobre nosotros</a>
              <a   href="https://github.com/EugeniaGramajo/e-mercado-JAP" target="_blank">Repo Frontend</a>
              <a   href="https://github.com/EugeniaGramajo/jap-backend" target="_blank">Repo Backend</a>
              <a   href="/register form.html">Registrate</a>
             </p>
              </section>
              <section>
              <h3 >Síguenos</h3>
            <div class="redes">
              <a href="https://www.facebook.com" target="_blank" >
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
              <a href="https://www.instagram.com" target="_blank" >
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
              <a href="https://twitter.com" target="_blank" >
                <ion-icon name="logo-twitter"></ion-icon>
              </a></section>
          </section>
        </div>
        <div class="legales">Copyright © 2024 - Jóvenes a programar</div>
        </div>
        
        `;
  footer.innerHTML = footerComponent;

  const categoriesList = document.getElementById("categories-list");

  fetch("https://jap-backend.onrender.com/categories/footer")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((category) => {
        const categoryLink = `
            <a href="#" class="category-link" id="${category.id}">${category.name}</a>
          `;
        categoriesList.innerHTML += categoryLink;
      });

      const categoryLinks = document.querySelectorAll(".category-link");
      categoryLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          localStorage.setItem("catID", link.id);
          window.location.href = "products.html";
        });
      });
    })
    .catch(console.error);
});
