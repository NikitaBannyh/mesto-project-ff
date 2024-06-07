import "./pages/index.css";
import { createCard, handleDeleteCard } from "./components/card";
import { openPopup, closePopup } from "./components/modal";
import { enableValidation, clearValidation } from "./validation";
import {
  config,
  getInitialCards,
  getUserInfo,
  editUserInfo,
  addCard,
  putLike,
  deleteLike,
  postProfileImage,
} from "./api";

const cardPlacement = document.querySelector(".places__list");

const imageCardPopup = document.querySelector(".popup_type_image");
const popupImage = imageCardPopup.querySelector(".popup__image");
const popupCaption = imageCardPopup.querySelector(".popup__caption");
const popupProfileEdit = document.querySelector(".popup_edit_profile_image");

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const profileButton = document.querySelector(".profile__image");

const addButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_new-card");

const formEdit = document.forms.editProfile;
const formAdd = document.forms.newPlace;
const formProfile = document.forms.newProfile;

const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");
const profileImg = document.querySelector(".profile__image-img");

const nameInput = formEdit.elements.name;
const descInput = formEdit.elements.description;

function renderCard(cardElement, pre) {
  if (pre) {
    cardPlacement.prepend(cardElement);
  } else {
    cardPlacement.append(cardElement);
  }
}

function openImagePopup(data) {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupCaption.textContent = data.name;
  openPopup(imageCardPopup);
}

function likeFunc(evt, cardId, likeCountPlacement) {
  const isLiked = evt.target.classList.contains("card__like-button_is-active");
  const likeMethod = isLiked ? deleteLike : putLike;
  likeMethod(cardId)
    .then((res) => {
      likeCountPlacement.textContent = res.likes.length;
      evt.target.classList.toggle("card__like-button_is-active");
    })
}

addButton.addEventListener("click", () => {
  formAdd.reset();
  clearValidation(formAdd, validationConfig);
  openPopup(addCardPopup);
});

editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  descInput.value = profileDesc.textContent;
  clearValidation(formEdit, validationConfig);
  openPopup(editPopup);
});

profileButton.addEventListener("click", () => {
  formProfile.reset();
  clearValidation(formProfile, validationConfig);
  openPopup(popupProfileEdit);
});

function editFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(formEdit, true);
  editUserInfo(nameInput.value, descInput.value)
  .then(() => {
    profileTitle.textContent = nameInput.value;
    profileDesc.textContent = descInput.value;
  })
  .finally(() => {
    closePopup(editPopup);
    renderLoading(formEdit, false);
  });
}

formEdit.addEventListener("submit", editFormSubmit);

function addFormSubmit(evt) {
  evt.preventDefault();
  const cardName = formAdd.elements.placeName.value;
  const cardLink = formAdd.elements.link.value;
  renderLoading(formAdd, true);
  addCard(cardName, cardLink)
  .then((res) => {
    renderCard(createCard(res, handleDeleteCard, openImagePopup, likeFunc, id), true)
  })
  .finally(() => {
    closePopup(addCardPopup);
    renderLoading(formAdd, false);
  });
}

formAdd.addEventListener("submit", addFormSubmit);

function profileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(formProfile, true);
  postProfileImage(formProfile.elements.link.value)
  .then((res) => {
    profileImg.src = res.avatar;
  })
  .finally(() => {
    closePopup(popupProfileEdit);
    renderLoading(formProfile, false);
  });
}

formProfile.addEventListener("submit", profileFormSubmit);

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button-inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__span-error-active",
};

enableValidation(validationConfig);

let id;

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, cards]) => {
    profileTitle.textContent = userInfo.name;
    profileDesc.textContent = userInfo.about;
    profileImg.src = userInfo.avatar;
    id = userInfo._id;
    cards.forEach((card) => {
      renderCard(
        createCard(
          card,
          handleDeleteCard,
          openImagePopup,
          likeFunc,
          userInfo._id
        )
      );
    });
  })
  .catch((res) => {
    console.log(res);
  });

function renderLoading(form, isloading) {
  form.querySelector(".popup__button").textContent = isloading ? "Сохранение..." : "Сохранить";
}
