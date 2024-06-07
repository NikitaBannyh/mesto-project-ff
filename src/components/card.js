import { deleteCard } from "../api.js";

const cardTemplate = document.querySelector("#card-template").content;
export function createCard(data, onDelete, openImagePopup, likeFunc, userId) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const likeCountPlacement = cardElement.querySelector(".card__like-count");
  const likeButton = cardElement.querySelector(".card__like-button");
  cardImg.src = data.link;
  cardImg.alt = data.name;
  likeCountPlacement.textContent = data.likes.length;
  cardElement.querySelector(".card__title").textContent = data.name;
  if (userId === data.owner._id) {
    cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", (evt) => {
        deleteCard(data._id)
        .then(() => {
          onDelete(evt);
        })
      });
  } else {
    cardElement.querySelector(".card__delete-button").style.display = "none";
  }
  if(data.likes.some(user => {return user._id === userId})){
    likeButton.classList.add("card__like-button_is-active");
  }
  cardImg.addEventListener("click", () => {
    openImagePopup(data);
  });
  likeButton.addEventListener("click", (evt) => {
    likeFunc(evt, data._id, likeCountPlacement);
  });
  return cardElement;
}

export function handleDeleteCard(event) {
  event.target.closest(".card").remove();
}
