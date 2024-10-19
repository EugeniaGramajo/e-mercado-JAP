export const commentCard = ({ comment }) => {
  return `
    <div class="comment-header" style="display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center;">
            <h4 class="comentario-user" style="margin: 0; margin-right: 10px;">
                ${comment.user}
            </h4>
            <div class="star-rating" style="display: flex;">
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
        </div>
        <span class="comment-date" style="font-size: 0.9em; color: #888; margin-left: auto;">
            ${comment.dateTime}
        </span>
    </div>
    <p>${comment.description}</p>
  `;
};
