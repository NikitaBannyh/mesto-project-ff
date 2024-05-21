const popupArr = document.querySelectorAll('.popup');

export function openPopup(popup){
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', closePopup);
  document.addEventListener('keydown',closePopup)
}

function closePopup(evt){
  if((evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup__button')) || evt.key === 'Escape'){
    popupArr.forEach((popup)=>{
      popup.classList.remove('popup_is-opened');
      popup.removeEventListener('click', closePopup);
    })
    document.removeEventListener('keydown',closePopup)
  }
}
