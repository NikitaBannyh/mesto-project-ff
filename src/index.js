import './pages/index.css';
import { createCard, handleDeleteCard } from './components/card';
import { openPopup } from './components/modal';
import { initialCards } from './cards';
import { doc } from 'prettier';
import { display } from '@splidejs/splide/src/js/utils';


const cardPlacement = document.querySelector('.places__list');

function renderCard(cardElement){
  cardPlacement.append(cardElement)
}

initialCards.forEach((cards) => {
  renderCard(createCard(cards, handleDeleteCard))
});

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');

const addButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');

const imageCardPopup = document.querySelector('.popup_type_image');

const formEdit = document.forms.editProfile;
const formAdd = document.forms.newPlace;

cardPlacement.addEventListener('click',(evt)=>{
  if(evt.target.classList.contains('card__image')){
    const popupImage = imageCardPopup.querySelector('.popup__image');
    const popupCaption = imageCardPopup.querySelector('.popup__caption');
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.closest('.card').querySelector('.card__title').textContent;
    openPopup(imageCardPopup)
  }
  if(evt.target.classList.contains('card__like-button')){
    evt.target.classList.toggle('card__like-button_is-active');
  }
})

addButton.addEventListener('click', ()=>{
  openPopup(addCardPopup)
})

editButton.addEventListener('click', ()=>{
  const profileTitle = document.querySelector('.profile__title');
  const profileDesc = document.querySelector('.profile__description');
  formEdit.elements.name.value = profileTitle.textContent;
  formEdit.elements.description.value = profileDesc.textContent;
  openPopup(editPopup)
})

function handleFormSubmit(evt){
  evt.preventDefault();
  const profileTitle = document.querySelector('.profile__title');
  const profileDesc = document.querySelector('.profile__description');
  profileTitle.textContent = formEdit.elements.name.value;
  profileDesc.textContent = formEdit.elements.description.value;
}

formEdit.addEventListener('submit',handleFormSubmit);

function addFormSubmit(evt){
  evt.preventDefault();
  const cardName = formAdd.elements.placeName.value;
  const cardLink = formAdd.elements.link.value;
  cardPlacement.prepend(createCard({name: cardName, link: cardLink}, handleDeleteCard))
}

formAdd.addEventListener('submit',addFormSubmit)




