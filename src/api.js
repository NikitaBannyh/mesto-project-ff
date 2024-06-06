export const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-14',
  headers: {
    authorization: '7f6bd3f9-ee45-457e-9d9b-ce5c69a6f369',
    'Content-Type': 'application/json'
  }
}


export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers : config.headers
  })
  .then(res => {
    if(res.ok){
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}


export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers : config.headers
  })
  .then(res => {
    if(res.ok){
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const editUserInfo = (newName, newAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers : config.headers,
    body: JSON.stringify({
      name: newName,
      about: newAbout
    })
  })
}

export const addCard = (name, url) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers : config.headers,
    body: JSON.stringify({
      name: name,
      link: url
    })
  })
}

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers : config.headers,
  })
}

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers : config.headers,
  })
}

export const postProfileImage = (imageUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers : config.headers,
    body: JSON.stringify({
      avatar: imageUrl,
    })
  })
}
