import './pages/index.css';
import { createCard, handleDeleteCard } from './components/card';
import { openPopup, closePopup } from './components/modal';
import { initialCards } from './cards';



const cardPlacement = document.querySelector('.places__list');

const imageCardPopup = document.querySelector('.popup_type_image');
const popupImage = imageCardPopup.querySelector('.popup__image');
const popupCaption = imageCardPopup.querySelector('.popup__caption');

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');

const addButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');

const formEdit = document.forms.editProfile;
const formAdd = document.forms.newPlace;

const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');

const nameInput = formEdit.elements.name;
const descInput = formEdit.elements.description;

function renderCard(cardElement){
  cardPlacement.append(cardElement)
}

initialCards.forEach((cards) => {
  renderCard(createCard(cards, handleDeleteCard, openImagePopup, likeFunc))
});

function openImagePopup(data){
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupCaption.textContent = data.name
  openPopup(imageCardPopup);
}

function likeFunc(evt){
  evt.target.classList.toggle('card__like-button_is-active');
}

addButton.addEventListener('click', ()=>{
  openPopup(addCardPopup)
})

editButton.addEventListener('click', ()=>{
  nameInput.value = profileTitle.textContent;
  descInput.value = profileDesc.textContent;
  openPopup(editPopup)
})

function editFormSubmit(evt){
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDesc.textContent = descInput.value;
  closePopup(editPopup);
}

formEdit.addEventListener('submit',editFormSubmit);

function addFormSubmit(evt){
  evt.preventDefault();
  const cardName = formAdd.elements.placeName.value;
  const cardLink = formAdd.elements.link.value;
  cardPlacement.prepend(createCard({name: cardName, link: cardLink}, handleDeleteCard, openImagePopup, likeFunc));
  formAdd.reset();
  closePopup(addCardPopup);
}

formAdd.addEventListener('submit',addFormSubmit)




