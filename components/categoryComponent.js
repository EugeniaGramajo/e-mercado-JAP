export const categoryComponent = (categoria) => {
  return `
<div class="container-inicial">
  <div class="container-categoria" id="${categoria?.id}">
    <h3 class="name-categorias">${categoria?.name}</h3>
    <div class="img-overlay">
      <img src=${categoria?.imgSrc} class="img-categorias" alt="${categoria?.name}" />
      <div class="overlay">
        <p class="description-categorias">${categoria?.description}</p>
      </div>
    </div>
  </div>
</div>
`;
};

export const categoryIndex = (category) => {
  return `  <div class="category">
    <img src="${category.imgSrc}">
    <section>
      <h3>${category?.name}</h3>
      <p>${category?.description}</p>
    </section>
  </div>`;
};
