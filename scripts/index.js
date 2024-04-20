const cardTemplate = document.querySelector('#card-template').content;
const cardPlacement = document.querySelector('.places__list');

function createCard(data, onDelete){
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image')
  cardImg.src = data.link;
  cardImg.alt = data.name;
  cardElement.querySelector('.card__title').textContent = data.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', onDelete);
  return cardElement;
}

function handleDeleteCard(event){
  event.target.closest('.card').remove();
}


function renderCard(cardElement){
  cardPlacement.append(cardElement)
}

initialCards.forEach((cards) => {
  renderCard(createCard(cards, handleDeleteCard))
});
