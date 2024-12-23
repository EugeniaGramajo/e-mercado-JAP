import { commentCard } from "./commentCard.js";

const currentDate = new Date();
// Formatear la fecha como 'dd/mm/yyyy hh:mm'
const formattedDate = currentDate.toLocaleString("es-ES", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export const showComments = () => {
  const commentContainer = document.getElementById("comment-container");
  const commentForm = document.getElementById("comment-form");
  const starRatingContainer = document.getElementById("star-rating");
  const commentInput = document.getElementById("comment-input");

  // Obtener el ID del producto seleccionado
  const selectedProductId = localStorage.getItem("selectedProductId");

  // Obtener los comentarios del localStorage por producto
  let commentsByProduct =
    JSON.parse(localStorage.getItem("commentsByProduct")) || {};

  // Si no hay comentarios para el producto actual, crea un array vacío
  let comments = commentsByProduct[selectedProductId] || [];

  //Comentarios que vienen del Json
  function displayComments() {
    console.log(comments);
    commentContainer.innerHTML = "";
    comments.forEach((comment) => {
      const commentElement = document.createElement("div");
      commentElement.className = "comment";
      commentElement.innerHTML = commentCard({ comment });
      commentContainer.appendChild(commentElement);
    });
  }
  
  // Cargar comentarios iniciales del JSON remoto
  fetch(
    `https://jap-backend.onrender.com/products-comments/${selectedProductId}.json`
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach((comment) => {
        const newComment = {
          user: comment.user,
          description: comment.description,
          score: parseInt(comment.score),
          dateTime: formattedDate,
        };
        comments.push(newComment);
        displayComments();
      });
    })
    .catch((error) => console.error(error));

  // Manejar la selección de estrellas
  starRatingContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("star")) {
      const stars = [...starRatingContainer.children];
      const rating = stars.indexOf(e.target) + 1;
      stars.forEach((star, index) => {
        star.textContent = index < rating ? "★" : "☆";
        star.classList.toggle("selected", index < rating); // Cambia el color a amarillo
      });
      commentForm.rating.value = rating; // Asignar la calificación seleccionada
    }
  });

  // Manejar el envío de comentarios
  commentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const userName = user.name;
    const userId = user.id; // Supone que el objeto usuario en localStorage tiene una propiedad `id`
    
    const newComment = {
      description: commentInput.value,
      score: parseInt(commentForm.rating.value),
      dateTime: new Date().toISOString(),
      userId: userId,
      productId: parseInt(selectedProductId),
    };

    // Enviar el comentario al backend usando POST
    fetch("https://jap-backend.onrender.com/products-comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          comments.push(newComment);
          commentsByProduct[selectedProductId] = comments;
          localStorage.setItem(
            "commentsByProduct",
            JSON.stringify(commentsByProduct)
          );

          displayComments(); // Mostrar los comentarios actualizados
          commentForm.reset(); // Reiniciar el formulario
        } else {
          console.error("Error al enviar el comentario:", data.message);
        }
      })
      .catch((error) => console.error("Error en la solicitud:", error));
  });

  // Inicializar mostrando los comentarios
  displayComments();
};
