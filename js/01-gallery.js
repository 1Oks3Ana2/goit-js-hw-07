import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryContainerRef = document.querySelector(".gallery");
const galleryMarkup = createGalleryCardsMarkup(galleryItems);

galleryContainerRef.insertAdjacentHTML("beforeend", galleryMarkup);
galleryContainerRef.addEventListener("click", onImageClick);

function createGalleryCardsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
    `;
    })
    .join("");
}

function onImageClick(e) {
  e.preventDefault();

  if (!e.target.classList.contains("gallery__image")) {
    return;
  }

  onOpenModal(e);
}

function onOpenModal(e) {
  window.addEventListener("keydown", onEscKeyPress);

  const instance = basicLightbox.create(`
    <div class="modal">
        <img src='${e.target.dataset.source}' alt='${e.target.alt}' width='940' />
    </div>
`);

  instance.show();
}

function onCloseModal() {
  window.removeEventListener("keydown", onEscKeyPress);

  const modalContainer = document.querySelector(".basicLightbox--visible");

  modalContainer.remove();
}

function onEscKeyPress(e) {
  if (e.code === "Escape") {
    onCloseModal();
  }
}
