const cardTemplate = document.querySelector('#card-template').content;
const cardPlacement = document.querySelector('.places__list');

function deleteCard(event){
  event.target.closest('.card').remove();
}

function addCard(card){
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  cardPlacement.append(cardElement)
}

initialCards.forEach(addCard);
