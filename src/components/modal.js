const popupArr = document.querySelectorAll('.popup');

export function openPopup(popup){
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', closeCheck);
  document.addEventListener('keydown', closeCheck);
}

export function closePopup(popup){
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', closeCheck);
  document.removeEventListener('keydown', closeCheck);
}

function closeCheck(evt){
  if((evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) || evt.key === 'Escape'){
   popupArr.forEach((popup)=>{
    closePopup(popup);
   })
  }
}
