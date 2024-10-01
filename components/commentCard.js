export const commentCard = ({ comment }) => {
  return `
              <div class="comment-header" style="display: flex; justify-content: space-between; align-items: center;">
                  <h4 class="comentario-user" style="margin: 0;">
                      ${comment.user}
                  </h4>
                  <span class="comment-date" style="font-size: 0.9em; color: #888;">
                      ${comment.dateTime}
                  </span>
              </div>
              <div class="star-rating">
                  ${"★"
                    .repeat(comment.score)
                    .split("")
                    .map(() => '<span class="filled">★</span>')
                    .join("")}
                  ${"☆"
                    .repeat(5 - comment.score)
                    .split("")
                    .map(() => "<span>☆</span>")
                    .join("")}
              </div>
              <p>${comment.description}</p>
          `;
};
