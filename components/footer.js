document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelector("footer");
  const footerComponent = `
          <div>
          <!------------------------------>
          <section>
            <img
              src="https://i0.wp.com/puppis.blog/wp-content/uploads/2020/02/Particularidades-de-los-felinos.jpg?resize=900%2C600&ssl=1"
            />
          </section>
  
          <!-------------------------------->
          <section class="info">
            <section>
              <h3>Seguí explorando</h3>
              <p id="categories-list">
              </p>
            </section>
            <section>
              <h3>Conocenos!</h3><br/>
              <a href="/about.html">Sobre nosotros</a>
              <a href="https://github.com/EugeniaGramajo/e-mercado-JAP" target="_blank">Repo Frontend</a>
              <a href="https://github.com/EugeniaGramajo/jap-backend" target="_blank">Repo Backend</a>
              <a href="/register form.html">Registrate</a>
            </section>

          </section>
          <!------------------------------------>
        </div>`;
  footer.innerHTML = footerComponent;

  const categoriesList = document.getElementById("categories-list");

  fetch("https://jap-backend.onrender.com/categories/footer")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((category) => {
        const categoryLink = `
            <a href="#" class="category-link" id="${category.id}">${category.name}</a><br/>
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
