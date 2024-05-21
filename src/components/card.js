const cardTemplate = document.querySelector('#card-template').content;
export function createCard(data, onDelete){
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image')
  cardImg.src = data.link;
  cardImg.alt = data.name;
  cardElement.querySelector('.card__title').textContent = data.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', onDelete);
  return cardElement;
}

export function handleDeleteCard(event){
  event.target.closest('.card').remove();
}
