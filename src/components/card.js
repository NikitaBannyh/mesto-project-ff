const cardTemplate = document.querySelector('#card-template').content;
const imageCardPopup = document.querySelector('.popup_type_image');
const popupImage = imageCardPopup.querySelector('.popup__image');
const popupCaption = imageCardPopup.querySelector('.popup__caption');

export function createCard(data, onDelete, openPopup, likeFunc){
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  cardImg.src = data.link;
  cardImg.alt = data.name;
  cardElement.querySelector('.card__title').textContent = data.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', onDelete);
  cardImg.addEventListener('click', ()=>{
    popupImage.src = data.link;
    popupImage.alt = data.name;
    popupCaption.textContent = data.name
    openPopup(imageCardPopup);
  });
  cardElement.querySelector('.card__like-button').addEventListener('click', likeFunc);
  return cardElement;
}

export function handleDeleteCard(event){
  event.target.closest('.card').remove();
}
